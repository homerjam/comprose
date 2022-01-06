import test from 'ava';

import { data, name } from '../dist/comprose.mjs';

test('data', (t) => {
  t.log(`${data.compromise.people.femaleNames[0]}`);
  t.pass();
});

test('name', (t) => {
  const result = name();
  t.log(result);
  t.pass();
});
