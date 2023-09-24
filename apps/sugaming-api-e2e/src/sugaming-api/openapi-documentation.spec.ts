import axios, { HttpStatusCode } from 'axios';

describe('OpenAPI Documentation', () => {
  it('should return have a web portal', async () => {
    const res = await axios.get('/api');

    // Verify the API is up
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.headers['content-type']).toContain('text/html');
  });

  it('should be exportable in json', async () => {
    const res = await axios.get('/api-json');

    // Verify the documentation page is up
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.headers['content-type']).toContain('application/json');

    // Verify the documentation title
    expect(res.data).toHaveProperty('info.title', 'sugaming-api');

    // Verify the version matches the semver pattern (for example 0.0.1)
    const { version } = res.data.info;
    expect(version).toMatch(/^\d.\d.\d$/);

    // Verify that paths is not empty
    const { paths } = res.data;
    expect(Object.keys(paths).length).not.toEqual(0);
  });

  it('should be exportable in yaml', async () => {
    const res = await axios.get('/api-yaml');

    // Verify the API is up
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.headers['content-type']).toContain('text/yaml');
  });
});
