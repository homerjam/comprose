import { isString, sample, get, isArray, upperFirst } from 'lodash-es';
import _data from './data/data.js';

const data = _data;
class Comprose {
  _data;
  dataset;
  locale;
  localeFallback;
  constructor({ dataset, locale }) {
    this._data = data;
    this.dataset = dataset || "faker";
    this.locale = locale || "en";
    this.localeFallback = locale || "en";
  }
  get data() {
    if (this.dataset === "faker") {
      return this._data.faker[this.locale] || this._data.faker[this.localeFallback];
    }
    if (this.dataset === "compromise") {
      return this._data.compromise;
    }
    return this._data.faker.en;
  }
  get(collectionOrSelector = []) {
    if (isString(collectionOrSelector)) {
      return sample(get(this.data, collectionOrSelector, [])) || "";
    }
    if (isArray(collectionOrSelector)) {
      return sample(collectionOrSelector.flat()) || "";
    }
    return "";
  }
  personFirstName({ gender } = {
    gender: void 0
  }) {
    const name = gender ? this.get(this.data.name[`${gender}FirstName`]) : this.get([
      this.data.name.firstName,
      this.data.name.femaleFirstName,
      this.data.name.maleFirstName
    ]);
    return upperFirst(name);
  }
  personLastName() {
    return upperFirst(this.get(this.data.name.lastName));
  }
  personName({ gender } = {
    gender: void 0
  }) {
    return `${this.personFirstName({ gender })} ${this.personLastName()}`;
  }
  companyCatchPhrase() {
    return `${this.get(this.data.company.adjective)} ${this.get(this.data.company.descriptor)} ${this.get(this.data.company.noun)}`;
  }
}

export { Comprose, data };
//# sourceMappingURL=comprose.mjs.map
