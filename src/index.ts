import { sample, upperFirst } from 'lodash-es';
import femaleNames from './data/compromise/people/femaleNames.js';

export const name = () => {
  return `${upperFirst(sample(femaleNames))}`;
};
