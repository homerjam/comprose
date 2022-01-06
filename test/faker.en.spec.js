import test from 'ava';

import { Comprose, data } from '../dist/comprose.mjs';

const comprose = new Comprose({
  dataset: 'faker',
  locale: 'en',
});

test('get (collection)', (t) => {
  const result = comprose.get(data.faker.en.animal.dog);
  t.log(result);
  t.pass();
});

test('get (string)', (t) => {
  const result = comprose.get('animal.dog');
  t.log(result);
  t.pass();
});

test('person name', (t) => {
  const result = comprose.personName();
  t.log(result);
  t.pass();
});

test('job title', (t) => {
  const result = comprose.get(data.faker.en.name.title.job);
  t.log(result);
  t.pass();
});

test('company catch phrase', (t) => {
  const result = comprose.companyCatchPhrase();
  t.log(result);
  t.pass();
});
