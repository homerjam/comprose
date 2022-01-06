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

/** Dataset type */
export type Dataset = 'compromise' | 'faker';

/** Locale type */
export type Locale = 'en' | 'fr';

/**
 * The params for {@link Comprose}.
 *
 * @public
 */
export interface ComproseParams {
  /**
   * The dataset to use
   * @defaultValue 'faker'
   */
  dataset?: Dataset;
  /**
   * The default locale to use
   * @defaultValue 'en'
   */
  locale?: Locale;
  /**
   * The fallback locale to use
   * @defaultValue 'en'
   */
  localeFallback?: Locale;
}

/**
 * This class creates a Comprose instance
 *
 * @param ComproseParams - optionally set the locale and a fallback
 *
 * @example
 * ```ts
 *  const comprose = new Comprose({
 *    dataset: 'faker',
 *    locale: 'en',
 *  });
 * ```
 *
 * @public
 */

export class Comprose {
  /**
   * @ignore
   */
  private _data: typeof data;

  dataset: Dataset;
  locale: Locale;
  localeFallback: Locale;

  /**
   * @param ComproseParams - optionally set the locale and a fallback
   */
  constructor({ dataset, locale, localeFallback }: ComproseParams = {}) {
    this._data = data;
    this.dataset = dataset || 'faker';
    this.locale = locale || 'en';
    this.localeFallback = localeFallback || 'en';
  }

  /**
   * @ignore
   */
  private get data(): typeof data.faker.en & typeof data.compromise {
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
