// TODO: docs
// TODO: random data types
// TODO: random date in range (min/max date datatype?)
// TODO: one-of array of templates helper
// TODO: replace # with random number
// TODO: object helper - use values as getters
// TODO: use seed-able random

import { get, isArray, isString, sample, upperFirst } from 'lodash-es';
import _data from './data/data.js';

export const data = _data;

type Dataset = 'compromise' | 'faker';
type Locale = 'en' | 'fr';

interface ComproseParams {
  dataset?: Dataset;
  locale?: Locale;
}

export class Comprose {
  private _data: typeof data;

  dataset: Dataset;
  locale: Locale;
  localeFallback: Locale;

  constructor({ dataset, locale }: ComproseParams) {
    this._data = data;
    this.dataset = dataset || 'faker';
    this.locale = locale || 'en';
    this.localeFallback = locale || 'en';
  }

  get data(): typeof data.faker.en & typeof data.compromise {
    if (this.dataset === 'faker') {
      return (this._data.faker[this.locale] ||
        this._data.faker[this.localeFallback]) as any;
    }

    if (this.dataset === 'compromise') {
      return this._data.compromise as any;
    }

    return this._data.faker.en as any;
  }

  get(collectionOrSelector: string | string[] | string[][] = []) {
    if (isString(collectionOrSelector)) {
      return sample(get(this.data, collectionOrSelector, [])) || '';
    }
    if (isArray(collectionOrSelector)) {
      return sample(collectionOrSelector.flat()) || '';
    }
    return '';
  }

  personFirstName(
    { gender }: Record<'gender', 'male' | 'female' | undefined> = {
      gender: undefined,
    }
  ) {
    const name: string = gender
      ? this.get(this.data.name[`${gender}FirstName`])
      : this.get([
          this.data.name.firstName,
          this.data.name.femaleFirstName,
          this.data.name.maleFirstName,
        ]);

    return upperFirst(name);
  }

  personLastName() {
    return upperFirst(this.get(this.data.name.lastName));
  }

  personName(
    { gender }: Record<'gender', 'male' | 'female' | undefined> = {
      gender: undefined,
    }
  ) {
    return `${this.personFirstName({ gender })} ${this.personLastName()}`;
  }

  companyCatchPhrase() {
    return `${this.get(this.data.company.adjective)} ${this.get(
      this.data.company.descriptor
    )} ${this.get(this.data.company.noun)}`;
  }
}

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
