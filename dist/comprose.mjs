import { upperFirst, sample } from 'lodash-es';
import _data from './data/data.js';

const data = _data;
const name = () => {
  return `${upperFirst(sample(data.compromise.people.femaleNames))}`;
};

export { data, name };
//# sourceMappingURL=comprose.mjs.map
