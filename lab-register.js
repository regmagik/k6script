import http from 'k6/http';
import { sleep, check } from 'k6';
export default function () {
  // HTTP request: we are saving the response to res, which can be accessed later
  const res = http.get('https://lab-fast.com');

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'response body': (r) => r.body.indexOf('enable JavaScript to run this app') !== -1,
  });
}
 
