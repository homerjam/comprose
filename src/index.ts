// TODO: docs
// TODO: random data types
// TODO: random date in range (min/max date datatype?)
// TODO: one-of array of templates helper
// TODO: replace # with random number
// TODO: object helper - use values as getters
// TODO: use seed-able random

import { get, isArray, isString, sample, upperFirst } from 'lodash-es';
import _data from './data/data.js';

/**
 * @ignore
 */
export const data = _data;

/** Dataset type */
export type Dataset = 'compromise' | 'faker';

/** Locale type */
export type Locale =
  | 'az'
  | 'ar'
  | 'cz'
  | 'de'
  | 'de_AT'
  | 'de_CH'
  | 'en'
  | 'en_AU'
  | 'en_AU_ocker'
  | 'en_BORK'
  | 'en_CA'
  | 'en_GB'
  | 'en_IE'
  | 'en_IND'
  | 'en_US'
  | 'en_ZA'
  | 'es'
  | 'es_MX'
  | 'he'
  | 'fa'
  | 'fi'
  | 'fr'
  | 'fr_CA'
  | 'fr_CH'
  | 'ge'
  | 'hy'
  | 'hr'
  | 'id_ID'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nb_NO'
  | 'ne'
  | 'nl'
  | 'nl_BE'
  | 'pl'
  | 'pt_BR'
  | 'pt_PT'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh_CN'
  | 'zh_TW';

/**
 * The params for {@link Comprose}.
 */
export interface ComproseParams {
  /**
   * The dataset to use
   * @default 'faker'
   */
  dataset?: Dataset;
  /**
   * The locale to use
   * @default 'en'
   */
  locale?: Locale;
  /**
   * The fallback locale to use
   * @default 'en'
   */
  localeFallback?: Locale;
}

/**
 * The params for {@link Comprose.personName}, {@link Comprose.personFirstName}
 */
export interface PersonNameParams {
  /**
   * Optional gender
   * @defaultValue undefined
   */
  gender?: 'male' | 'female';
}

/**
 * This class creates a Comprose instance and defines the default dataset and
 * locale to be used by all methods.
 *
 *
 * @example
 *
 * ```ts
 * import { Comprose } from 'comprose';
 *
 * const comprose = new Comprose({
 *   dataset: 'faker',
 *   locale: 'en',
 * });
 *
 * comprose.personName();
 * // John Smith
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

  /**
   * @param collectionsOrPaths
   *
   * Pass a collection, or a series of collections and return a random sample.
   * Alternatively use path strings and the default dataset and locale will be used.
   *
   * @example
   * ```ts
   * import { data, Comprose } from 'comprose';
   *
   * const comprose = new Comprose();
   *
   * comprose.get(data.faker.en.animal.dog);
   * // Bulldog
   *
   * comprose.get(data.faker.en.address.cityName, data.faker.fr.address.cityName);
   * // London
   *
   * comprose.get('animal.dog', data.faker.fr.address.cityName);
   * // Paris
   * ```
   */
  get(...collectionsOrPaths: string[] | string[][]) {
    return (
      sample(
        collectionsOrPaths
          .map((collectionOrPath) => {
            if (isString(collectionOrPath)) {
              return get(
                this.data,
                collectionOrPath,
                get(this._data, collectionOrPath, [])
              );
            }
            if (isArray(collectionOrPath)) {
              return collectionOrPath;
            }
          })
          .flat()
      ) || ''
    );
  }

  /**
   * @param PersonNameParams
   */
  personFirstName({ gender }: PersonNameParams = {}) {
    const name: string = gender
      ? this.get(this.data.name[`${gender}FirstName`])
      : this.get(
          this.data.name.firstName,
          this.data.name.femaleFirstName,
          this.data.name.maleFirstName
        );

    return upperFirst(name);
  }

  personLastName() {
    return upperFirst(this.get(this.data.name.lastName));
  }

  /**
   * @param PersonNameParams
   *
   * @example
   * ```ts
   * comprose.personName({ gender: 'male' });
   * // John Smith
   * ```
   */
  personName({ gender }: PersonNameParams = {}) {
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
