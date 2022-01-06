import test from 'ava';

import {
  Comprose,
  // data
} from '../dist/comprose.mjs';

const comprose = new Comprose({
  dataset: 'faker',
  locale: 'fr',
});

test('person name', (t) => {
  const result = comprose.personName();
  t.log(result);
  t.pass();
});

test('city name', (t) => {
  const result = comprose.get('address.cityName');
  t.log(result);
  t.pass();
});
