import { sample, upperFirst } from 'lodash-es';
import data from './data.json';

// export class Comprose {
//   constructor() {}

//   replaceSymbolWithNumber(string, symbol) {
//     string = string || '';
//     // default symbol is '#'
//     if (symbol === undefined) {
//       symbol = '#';
//     }

//     let str = '';
//     for (let i = 0; i < string.length; i++) {
//       if (string.charAt(i) == symbol) {
//         str += faker.datatype.number(9);
//       } else if (string.charAt(i) == '!') {
//         str += faker.datatype.number({ min: 2, max: 9 });
//       } else {
//         str += string.charAt(i);
//       }
//     }
//     return str;
//   }
// }

export const name = () => {
  return `${upperFirst(sample(data.compromise.people.femaleNames))}`;
};
