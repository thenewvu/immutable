'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var on = function on(obj) {
  return function () {
    for (var _len = arguments.length, ops = Array(_len), _key = 0; _key < _len; _key++) {
      ops[_key] = arguments[_key];
    }

    return ops.reduce(function (_obj, op) {
      return op(_obj);
    }, obj);
  };
};

var fset = function fset(at, fn) {
  return function (obj) {
    if (!obj || !at) return obj;

    var firstDot = at.indexOf('.');
    if (firstDot === -1) return _extends({}, obj, _defineProperty({}, at, fn(obj[at])));

    var firstKey = at.slice(0, firstDot);
    var restPath = at.slice(firstDot + 1);
    return _extends({}, obj, _defineProperty({}, firstKey, fset(restPath, fn)(obj[firstKey])));
  };
};

var vset = function vset(at, val) {
  return function (obj) {
    return fset(at, function () {
      return val;
    })(obj);
  };
};

exports.default = { on: on, fset: fset, vset: vset };
