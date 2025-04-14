import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export default registerAs('graphql', () => ({
  gqlSchemaInFile: env.get('GRAPH_QL_SCHEMA_IN_FILE').default('false').asBool(),
  playground: env.get('GRAPH_QL_PLAYGROUND').default('false').asBool(),
  introspection: env.get('GRAPH_QL_INTROSPECTION').default('false').asBool(),
  showErrorInternals: env.get('GRAPH_QL_SHOW_ERROR_INTERNALS').default('false').asBool(),
}));
