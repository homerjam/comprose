'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodashEs = require('lodash-es');
var _data = require('./data/data.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _data__default = /*#__PURE__*/_interopDefaultLegacy(_data);

const data = _data__default["default"];
const name = () => {
  return `${lodashEs.upperFirst(lodashEs.sample(data.compromise.people.femaleNames))}`;
};

exports.data = data;
exports.name = name;
//# sourceMappingURL=comprose.js.map
