import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    public_funnel: { executor: 'constant-vus', vus: 900, duration: '10m' },
    studio_api: { executor: 'constant-vus', vus: 750, duration: '10m' },
    exports: { executor: 'constant-vus', vus: 250, duration: '10m' },
    health: { executor: 'constant-vus', vus: 100, duration: '10m' }
  },
  thresholds: { http_req_failed: ['rate<0.005'], http_req_duration: ['p(95)<1800'] }
};

export default function () {
  const pages = ['/', '/pricing', '/create-free-storyboard', '/api/health/ready'];
  const res = http.get('https://www.cineloom.ai' + pages[Math.floor(Math.random() * pages.length)]);
  check(res, { 'acceptable status': (r) => [200, 202, 302, 429, 503].includes(r.status) });
  sleep(1);
}
