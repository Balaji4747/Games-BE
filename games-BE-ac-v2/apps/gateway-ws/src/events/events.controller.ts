import { Controller } from '@nestjs/common';
import { MonitoringService } from '@provfair/monitoring';
import { EventsGateway } from './events.gateway';

const eventType = {
  ACTION: 'action',
  DOMAIN: 'domain',
};

@Controller()
export class EventsController {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly eventsGateway: EventsGateway,
  ) {}
}
