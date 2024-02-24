import * as ApiClient from './src/index';

ApiClient.OpenAPI.BASE =
  process.env['API_BASE'] ||
  process.env['NEXT_PUBLIC_API_BASE'] ||
  'http://localhost:3000';

export { ApiClient };
export default ApiClient;
