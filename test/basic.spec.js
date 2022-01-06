import test from 'ava';

import { name } from '../dist/comprose.mjs';

test('name', (t) => {
  const result = name();
  t.log(result);
  t.pass();
});
