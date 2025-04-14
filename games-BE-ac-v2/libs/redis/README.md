## How to use?

### RedisModule.forRoot(options, database?)

```ts
import { Module } from '@nestjs/common';
import { RedisModule } from '@provfair/redis';
import { AppController } from './app.controller';

@Module({
  imports: [
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### RedisModule.forRootAsync(options, database?)

```ts
import { Module } from '@nestjs/common';
import { RedisModule, RedisDatabase } from '@provfair/redis';
import { AppController } from './app.controller';

@Module({
  imports: [
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config) => ({
          url: config.url,
        }),
      },
      RedisDatabase.DEFAULT, // Optional. Specify database number (default: 0)
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectRedis(database?)

```ts
import { Controller, Get } from '@nestjs/common';
import { InjectRedis, Redis, RedisDatabase } from '@provfair/redis';

@Controller()
export class AppController {
  constructor(
    @InjectRedis(RedisDatabase.DEFAULT) // Inject database that specified in module. Parameter is optional (default: 0)
    private readonly redis: Redis,
  ) {}

  @Get()
  async getHello() {
    await this.redis.set('key', 'Redis data!');
    const redisData = await this.redis.get('key');
    return { redisData };
  }
}
```
