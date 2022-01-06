'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodashEs = require('lodash-es');
var _data = require('./data/data.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _data__default = /*#__PURE__*/_interopDefaultLegacy(_data);

const data = _data__default["default"];
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
    if (lodashEs.isString(collectionOrSelector)) {
      return lodashEs.sample(lodashEs.get(this.data, collectionOrSelector, [])) || "";
    }
    if (lodashEs.isArray(collectionOrSelector)) {
      return lodashEs.sample(collectionOrSelector.flat()) || "";
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
    return lodashEs.upperFirst(name);
  }
  personLastName() {
    return lodashEs.upperFirst(this.get(this.data.name.lastName));
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

exports.Comprose = Comprose;
exports.data = data;
//# sourceMappingURL=comprose.js.map
