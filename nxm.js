// N VUs execute M iterations each, for a total of NxM iterations, 
// with a maximum duration of 1 hour and 30 minutes
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
//  discardResponseBodies: true,
  scenarios: {
    register: {
      executor: 'per-vu-iterations',
      vus: 900,
      iterations: 1,
      maxDuration: '1h30m',
    },
  },
};

export default function () {
  const res = http.get('https://shotsfast.com');

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'content': (r) => r.body && r.body.indexOf('enable JavaScript to run this app') !== -1,
  });
}
