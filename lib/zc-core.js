(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("reselect"), require("xdate"), require("redux-saga"));
	else if(typeof define === 'function' && define.amd)
		define("zc-core", ["immutable", "reselect", "xdate", "redux-saga"], factory);
	else if(typeof exports === 'object')
		exports["zc-core"] = factory(require("immutable"), require("reselect"), require("xdate"), require("redux-saga"));
	else
		root["zc-core"] = factory(root["immutable"], root["reselect"], root["xdate"], root["redux-saga"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return sym; });
/* unused harmony export TASK */
/* unused harmony export HELPER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MATCH; });
/* unused harmony export CANCEL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SAGA_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SELF_CANCELLATION; });
/* unused harmony export konst */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return kTrue; });
/* unused harmony export kFalse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ident; });
/* harmony export (immutable) */ __webpack_exports__["d"] = check;
/* unused harmony export hasOwn */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return is; });
/* unused harmony export object */
/* harmony export (immutable) */ __webpack_exports__["n"] = remove;
/* unused harmony export array */
/* unused harmony export deferred */
/* unused harmony export arrayOfDeffered */
/* harmony export (immutable) */ __webpack_exports__["f"] = delay;
/* unused harmony export createMockTask */
/* unused harmony export autoInc */
/* unused harmony export uid */
/* harmony export (immutable) */ __webpack_exports__["l"] = makeIterator;
/* unused harmony export log */
/* harmony export (immutable) */ __webpack_exports__["g"] = deprecate;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return updateIncentive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return internalErr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return createSetContextWarning; });
/* unused harmony export wrapSagaDispatch */
/* unused harmony export cloneableGenerator */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sym = function sym(id) {
  return '@@redux-saga/' + id;
};

var TASK = sym('TASK');
var HELPER = sym('HELPER');
var MATCH = sym('MATCH');
var CANCEL = sym('CANCEL_PROMISE');
var SAGA_ACTION = sym('SAGA_ACTION');
var SELF_CANCELLATION = sym('SELF_CANCELLATION');
var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = konst(true);
var kFalse = konst(false);
var noop = function noop() {};
var ident = function ident(v) {
  return v;
};

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}

var is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  string: function string(s) {
    return typeof s === 'string';
  },
  array: Array.isArray,
  object: function object(obj) {
    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  iterable: function iterable(it) {
    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};

var object = {
  assign: function assign(target, source) {
    for (var i in source) {
      if (hasOwn(source, i)) {
        target[i] = source[i];
      }
    }
  }
};

function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

var array = {
  from: function from(obj) {
    var arr = Array(obj.length);
    for (var i in obj) {
      if (hasOwn(obj, i)) {
        arr[i] = obj[i];
      }
    }
    return arr;
  }
};

function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);
  var promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}

function arrayOfDeffered(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }
  return arr;
}

function delay(ms) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var timeoutId = void 0;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(function () {
      return resolve(val);
    }, ms);
  });

  promise[CANCEL] = function () {
    return clearTimeout(timeoutId);
  };

  return promise;
}

function createMockTask() {
  var _ref;

  var running = true;
  var _result = void 0,
      _error = void 0;

  return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
    return running;
  }, _ref.result = function result() {
    return _result;
  }, _ref.error = function error() {
    return _error;
  }, _ref.setRunning = function setRunning(b) {
    return running = b;
  }, _ref.setResult = function setResult(r) {
    return _result = r;
  }, _ref.setError = function setError(e) {
    return _error = e;
  }, _ref;
}

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = autoInc();

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

function deprecate(fn, deprecationWarning) {
  return function () {
    if (process.env.NODE_ENV === 'development') log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}

var updateIncentive = function updateIncentive(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};

var internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};

var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
};

var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    return dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }));
  };
};

var cloneableGenerator = function cloneableGenerator(generatorFunc) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var history = [];
    var gen = generatorFunc.apply(undefined, args);
    return {
      next: function next(arg) {
        history.push(arg);
        return gen.next(arg);
      },
      clone: function clone() {
        var clonedGen = cloneableGenerator(generatorFunc).apply(undefined, args);
        history.forEach(function (arg) {
          return clonedGen.next(arg);
        });
        return clonedGen;
      },
      return: function _return(value) {
        return gen.return(value);
      },
      throw: function _throw(exception) {
        return gen.throw(exception);
      }
    };
  };
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(14)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REQUEST = exports.REQUEST = 'app/api/REQUEST';
var REQUEST_FETCHING = exports.REQUEST_FETCHING = 'app/api/REQUEST_FETCHING';
var REQUEST_FAILED = exports.REQUEST_FAILED = 'app/api/REQUEST_FAILED';
var REQUEST_FETCHED = exports.REQUEST_FETCHED = 'app/api/REQUEST_FETCHED';
var REQUEST_CACHE_USED = exports.REQUEST_CACHE_USED = 'app/api/REQUEST_CACHE_USED';

var POLL_REQUEST = exports.POLL_REQUEST = 'app/api/POLL_REQUEST';
var STOP_POLL_REQUEST = exports.STOP_POLL_REQUEST = 'app/api/STOP_POLL_REQUEST';

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["q"] = take;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return takem; });
/* harmony export (immutable) */ __webpack_exports__["l"] = put;
/* harmony export (immutable) */ __webpack_exports__["b"] = all;
/* harmony export (immutable) */ __webpack_exports__["m"] = race;
/* harmony export (immutable) */ __webpack_exports__["d"] = call;
/* harmony export (immutable) */ __webpack_exports__["c"] = apply;
/* harmony export (immutable) */ __webpack_exports__["g"] = cps;
/* harmony export (immutable) */ __webpack_exports__["i"] = fork;
/* harmony export (immutable) */ __webpack_exports__["p"] = spawn;
/* harmony export (immutable) */ __webpack_exports__["k"] = join;
/* harmony export (immutable) */ __webpack_exports__["e"] = cancel;
/* harmony export (immutable) */ __webpack_exports__["n"] = select;
/* harmony export (immutable) */ __webpack_exports__["a"] = actionChannel;
/* harmony export (immutable) */ __webpack_exports__["f"] = cancelled;
/* harmony export (immutable) */ __webpack_exports__["h"] = flush;
/* harmony export (immutable) */ __webpack_exports__["j"] = getContext;
/* harmony export (immutable) */ __webpack_exports__["o"] = setContext;
/* harmony export (immutable) */ __webpack_exports__["r"] = takeEvery;
/* harmony export (immutable) */ __webpack_exports__["s"] = takeLatest;
/* harmony export (immutable) */ __webpack_exports__["u"] = throttle;
/* unused harmony export asEffect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sagaHelpers__ = __webpack_require__(22);



var IO = __WEBPACK_IMPORTED_MODULE_0__utils__["o" /* sym */]('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](arguments[0], __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

var takem = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* deprecate */](take.maybe, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* updateIncentive */]('takem', 'take.maybe'));

function put(channel, action) {
  if (arguments.length > 1) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](channel, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'put(channel, action): argument channel is undefined');
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](channel, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](action, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'put(channel, action): argument action is undefined');
  } else {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](channel, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* deprecate */](put.resolve, __WEBPACK_IMPORTED_MODULE_0__utils__["p" /* updateIncentive */]('put.sync', 'put.resolve'));

function all(effects) {
  return effect(ALL, effects);
}

function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](fn, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }
  if (context && __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].string(fn) && __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func(context[fn])) {
    fn = context[fn];
  }
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](fn, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var eff = fork.apply(undefined, [fn].concat(args));
  eff[FORK].detached = true;
  return eff;
}

function join() {
  for (var _len5 = arguments.length, tasks = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    tasks[_key5] = arguments[_key5];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return join(t);
    }));
  }
  var task = tasks[0];
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](task, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'join(task): argument task is undefined');
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](task, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].task, 'join(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  return effect(JOIN, task);
}

function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }
  var task = tasks[0];
  if (tasks.length === 1) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](task, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'cancel(task): argument task is undefined');
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](task, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }
  return effect(CANCEL, task || __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* SELF_CANCELLATION */]);
}

function select(selector) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  if (arguments.length === 0) {
    selector = __WEBPACK_IMPORTED_MODULE_0__utils__["h" /* ident */];
  } else {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](selector, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'select(selector,[...]): argument selector is undefined');
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](selector, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](pattern, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function flush(channel) {
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](channel, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

function getContext(prop) {
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](prop, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].string, 'getContext(prop): argument ' + prop + ' is not a string');
  return effect(GET_CONTEXT, prop);
}

function setContext(props) {
  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](props, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].object, __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* createSetContextWarning */](null, props));
  return effect(SET_CONTEXT, props);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len8 = arguments.length, args = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
    args[_key8 - 2] = arguments[_key8];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["a" /* takeEveryHelper */], patternOrChannel, worker].concat(args));
}

function takeLatest(patternOrChannel, worker) {
  for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
    args[_key9 - 2] = arguments[_key9];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["b" /* takeLatestHelper */], patternOrChannel, worker].concat(args));
}

function throttle(ms, pattern, worker) {
  for (var _len10 = arguments.length, args = Array(_len10 > 3 ? _len10 - 3 : 0), _key10 = 3; _key10 < _len10; _key10++) {
    args[_key10 - 3] = arguments[_key10];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["c" /* throttleHelper */], ms, pattern, worker].concat(args));
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = {
  take: createAsEffectType(TAKE),
  put: createAsEffectType(PUT),
  all: createAsEffectType(ALL),
  race: createAsEffectType(RACE),
  call: createAsEffectType(CALL),
  cps: createAsEffectType(CPS),
  fork: createAsEffectType(FORK),
  join: createAsEffectType(JOIN),
  cancel: createAsEffectType(CANCEL),
  select: createAsEffectType(SELECT),
  actionChannel: createAsEffectType(ACTION_CHANNEL),
  cancelled: createAsEffectType(CANCELLED),
  flush: createAsEffectType(FLUSH),
  getContext: createAsEffectType(GET_CONTEXT),
  setContext: createAsEffectType(SET_CONTEXT)
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN_REQUEST = exports.LOGIN_REQUEST = 'app/auth/LOGIN_REQUEST';
var LOGIN_FAILURE = exports.LOGIN_FAILURE = 'app/auth/LOGIN_FAILURE';
var LOGOUT = exports.LOGOUT = 'app/auth/LOGOUT';
var LOGIN_USER = exports.LOGIN_USER = 'app/auth/LOGIN_USER';

var SET_USER_GROUPS = exports.SET_USER_GROUPS = 'app/auth/SET_USER_GROUPS';

var REGISTER_USER = exports.REGISTER_USER = 'app/auth/REGISTER_USER';
var REGISTER_USER_SUCCESS = exports.REGISTER_USER_SUCCESS = 'app/auth/REGISTER_USER_SUCCESS';
var REGISTER_USER_ERROR = exports.REGISTER_USER_ERROR = 'app/auth/REGISTER_USER_ERROR';

var RESET_PASSWORD = exports.RESET_PASSWORD = 'app/auth/RESET_PASSWORD';
var RESET_PASSWORD_SUCCESS = exports.RESET_PASSWORD_SUCCESS = 'app/auth/RESET_PASSWORD_SUCCESS';
var RESET_PASSWORD_CLOSE = exports.RESET_PASSWORD_CLOSE = 'app/auth/RESET_PASSWORD_CLOSE';
var RESET_PASSWORD_ERROR = exports.RESET_PASSWORD_ERROR = 'app/auth/RESET_PASSWORD_ERROR';

var REFRESH_JWT = exports.REFRESH_JWT = 'app/auth/REFRESH_JWT';

var RESET_AUTH_API = exports.RESET_AUTH_API = 'app/auth/RESET_AUTH_API';

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return qEnd; });
/* harmony export (immutable) */ __webpack_exports__["c"] = safeName;
/* harmony export (immutable) */ __webpack_exports__["a"] = fsmIterator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


var done = { done: true, value: undefined };
var qEnd = {};

function safeName(patternOrChannel) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          q = _fsm$qNext[0],
          output = _fsm$qNext[1],
          _updateState = _fsm$qNext[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* makeIterator */](next, function (error) {
    return next(null, error);
  }, name, true);
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return END; });
/* unused harmony export isEnd */
/* unused harmony export emitter */
/* unused harmony export INVALID_BUFFER */
/* unused harmony export UNDEFINED_INPUT_ERROR */
/* unused harmony export channel */
/* unused harmony export eventChannel */
/* unused harmony export stdChannel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buffers__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler__ = __webpack_require__(24);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = { type: CHANNEL_END_TYPE };
var isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};

function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      return __WEBPACK_IMPORTED_MODULE_0__utils__["n" /* remove */](subscribers, sub);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
}

var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

if (process.env.NODE_ENV !== 'production') {
  UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
}

function channel() {
  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].fixed();

  var closed = false;
  var takers = [];

  __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].buffer, INVALID_BUFFER);

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw __WEBPACK_IMPORTED_MODULE_0__utils__["i" /* internalErr */]('Cannot have a closed channel with pending takers');
    }
    if (takers.length && !buffer.isEmpty()) {
      throw __WEBPACK_IMPORTED_MODULE_0__utils__["i" /* internalErr */]('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](input, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].notUndef, UNDEFINED_INPUT_ERROR);
    if (closed) {
      return;
    }
    if (!takers.length) {
      return buffer.put(input);
    }
    for (var i = 0; i < takers.length; i++) {
      var cb = takers[i];
      if (!cb[__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* MATCH */]] || cb[__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* MATCH */]](input)) {
        takers.splice(i, 1);
        return cb(input);
      }
    }
  }

  function take(cb) {
    checkForbiddenStates();
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](cb, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func, "channel.take's callback must be a function");

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);
      cb.cancel = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils__["n" /* remove */](takers, cb);
      };
    }
  }

  function flush(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](cb, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func, "channel.flush' callback must be a function");
    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer.flush());
  }

  function close() {
    checkForbiddenStates();
    if (!closed) {
      closed = true;
      if (takers.length) {
        var arr = takers;
        takers = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i](END);
        }
      }
    }
  }

  return {
    take: take,
    put: put,
    flush: flush,
    close: close,
    get __takers__() {
      return takers;
    },
    get __closed__() {
      return closed;
    }
  };
}

function eventChannel(subscribe) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].none();
  var matcher = arguments[2];

  /**
    should be if(typeof matcher !== undefined) instead?
    see PR #273 for a background discussion
  **/
  if (arguments.length > 2) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func, 'Invalid match function passed to eventChannel');
  }

  var chan = channel(buffer);
  var close = function close() {
    if (!chan.__closed__) {
      if (unsubscribe) {
        unsubscribe();
      }
      chan.close();
    }
  };
  var unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }
    if (matcher && !matcher(input)) {
      return;
    }
    chan.put(input);
  });
  if (chan.__closed__) {
    unsubscribe();
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}

function stdChannel(subscribe) {
  var chan = eventChannel(function (cb) {
    return subscribe(function (input) {
      if (input[__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* SAGA_ACTION */]]) {
        cb(input);
        return;
      }
      __WEBPACK_IMPORTED_MODULE_2__scheduler__["a" /* asap */](function () {
        return cb(input);
      });
    });
  });

  return _extends({}, chan, {
    take: function take(cb, matcher) {
      if (arguments.length > 1) {
        __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* check */](matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* is */].func, "channel.take's matcher argument must be a function");
        cb[__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* MATCH */]] = matcher;
      }
      chan.take(cb);
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(14)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordError = exports.resetPasswordClose = exports.resetPasswordSuccess = exports.resetPassword = exports.registerUserError = exports.registerUserSuccess = exports.registerUser = exports.setUserGroups = exports.loginFailure = exports.resetAuthApi = exports.logout = exports.loginUserState = exports.requestLogin = undefined;

var _constants = __webpack_require__(3);

/*
* LoginActions
*/
var requestLogin = exports.requestLogin = function requestLogin(email, password) {
  return { type: _constants.LOGIN_REQUEST, email: email, password: password };
};
var loginUserState = exports.loginUserState = function loginUserState(userId, email) {
  return { type: _constants.LOGIN_USER, userId: userId, email: email };
};
var logout = exports.logout = function logout() {
  return { type: _constants.LOGOUT };
};

var resetAuthApi = exports.resetAuthApi = function resetAuthApi() {
  return { type: _constants.RESET_AUTH_API };
};

var loginFailure = exports.loginFailure = function loginFailure(error) {
  return { type: _constants.LOGIN_FAILURE, error: error };
};

/*
* User groups, jwt related.  NB: Explicitly set user groups to lowercase.
*/
var setUserGroups = exports.setUserGroups = function setUserGroups(groups) {
  return { type: _constants.SET_USER_GROUPS, groups: groups.map(function (s) {
      return s.toLowerCase();
    }) };
};

/*
* User Registration
*/
var registerUser = exports.registerUser = function registerUser(payload) {
  return { type: _constants.REGISTER_USER, payload: payload };
};
var registerUserSuccess = exports.registerUserSuccess = function registerUserSuccess() {
  return { type: _constants.REGISTER_USER_SUCCESS };
};
var registerUserError = exports.registerUserError = function registerUserError(error) {
  return { type: _constants.REGISTER_USER_ERROR, error: error };
};

/*
* Reset Password
*/
var resetPassword = exports.resetPassword = function resetPassword(payload) {
  return { type: _constants.RESET_PASSWORD, payload: payload };
};
var resetPasswordSuccess = exports.resetPasswordSuccess = function resetPasswordSuccess() {
  return { type: _constants.RESET_PASSWORD_SUCCESS };
};
var resetPasswordClose = exports.resetPasswordClose = function resetPasswordClose() {
  return { type: _constants.RESET_PASSWORD_CLOSE };
};
var resetPasswordError = exports.resetPasswordError = function resetPasswordError(error) {
  return { type: _constants.RESET_PASSWORD_ERROR, error: error };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPollApiRequest = exports.pollApiRequest = exports.requestCacheUsed = exports.apiRequest = exports.requestFailed = exports.requestFetched = exports.requestFetching = undefined;

var _constants = __webpack_require__(1);

var requestFetching = exports.requestFetching = function requestFetching(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: _constants.REQUEST_FETCHING,
    meta: {
      endpoint: endpoint,
      params: params
    }
  };
};

var requestFetched = exports.requestFetched = function requestFetched(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = arguments[2];
  return {
    type: _constants.REQUEST_FETCHED,
    meta: {
      endpoint: endpoint,
      params: params
    },
    payload: payload
  };
};

var requestFailed = exports.requestFailed = function requestFailed(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var error = arguments[2];
  return {
    type: _constants.REQUEST_FAILED,
    meta: {
      endpoint: endpoint,
      params: params
    },
    payload: error,
    error: true
  };
};

var apiRequest = exports.apiRequest = function apiRequest(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    type: _constants.REQUEST,
    meta: {
      endpoint: endpoint,
      params: params
    },
    payload: payload
  };
};

var requestCacheUsed = exports.requestCacheUsed = function requestCacheUsed(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: _constants.REQUEST_CACHE_USED,
    meta: {
      endpoint: endpoint,
      params: params
    }
  };
};

var pollApiRequest = exports.pollApiRequest = function pollApiRequest(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var interval = arguments[3];
  return {
    type: _constants.POLL_REQUEST,
    meta: {
      endpoint: endpoint,
      params: params,
      interval: interval
    },
    payload: payload
  };
};

var stopPollApiRequest = exports.stopPollApiRequest = function stopPollApiRequest(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: _constants.STOP_POLL_REQUEST,
    meta: {
      endpoint: endpoint,
      params: params
    }
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRequestErrorStatus = exports.selectRequestError = exports.selectRequestResponse = exports.selectRequestAPIState = exports.selectTimeSinceLastFetch = exports.selectTimeNow = exports.selectLastFetchedTime = exports.selectRequestPollingInterval = exports.selectRequestPending = exports.selectRequestFailed = exports.selectRequestFetched = exports.selectAPIDomain = undefined;

var _reselect = __webpack_require__(10);

var _immutable = __webpack_require__(4);

var _xdate = __webpack_require__(11);

var _xdate2 = _interopRequireDefault(_xdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectAPIDomain = exports.selectAPIDomain = function selectAPIDomain(state) {
  return state.get('api');
};

var selectEndpointFromProps = function selectEndpointFromProps(_) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return props.endpoint;
};

var selectParamsFromProps = function selectParamsFromProps(_) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$params = _ref.params,
      params = _ref$params === undefined ? {} : _ref$params;

  return params;
};

var selectMetaFromProps = (0, _reselect.createSelector)(selectEndpointFromProps, selectParamsFromProps, function (endpoint, params) {
  return (0, _immutable.fromJS)({ endpoint: endpoint, params: params });
});

var selectRequestDomain = (0, _reselect.createSelector)(selectAPIDomain, selectMetaFromProps, function (requests, meta) {
  return requests.get(meta, (0, _immutable.Map)());
});

var selectRequestFetched = exports.selectRequestFetched = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('success');
});

var selectRequestFailed = exports.selectRequestFailed = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('error');
});

var selectRequestPending = exports.selectRequestPending = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('fetching');
});

var selectRequestPollingInterval = exports.selectRequestPollingInterval = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('polling');
});

var selectLastFetchedTime = exports.selectLastFetchedTime = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('updated');
});

var selectTimeNow = exports.selectTimeNow = function selectTimeNow() {
  return new _xdate2.default();
};

var selectTimeSinceLastFetch = exports.selectTimeSinceLastFetch = (0, _reselect.createSelector)(selectLastFetchedTime, selectTimeNow, function (lastFetch, now) {
  return lastFetch ? new _xdate2.default(lastFetch).diffMilliseconds(now) : null;
});

var selectRequestAPIState = exports.selectRequestAPIState = (0, _reselect.createSelector)(selectRequestFailed, selectRequestFetched, selectRequestPending, function (failed, success, fetching) {
  return { failed: failed, success: success, fetching: fetching };
});

var selectRequestResponse = exports.selectRequestResponse = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('response');
});

var selectRequestError = exports.selectRequestError = (0, _reselect.createSelector)(selectRequestDomain, function (request) {
  return request.get('errorResponse', (0, _immutable.Map)());
});

var selectRequestErrorStatus = exports.selectRequestErrorStatus = (0, _reselect.createSelector)(selectRequestError, function (error) {
  return error.getIn(['response', 'status']);
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_io__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takem", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cps", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fork", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "actionChannel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["u"]; });


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BUFFER_OVERFLOW */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buffers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


var BUFFER_OVERFLOW = "Channel's Buffer overflow!";

var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;

var zeroBuffer = { isEmpty: __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* kTrue */], put: __WEBPACK_IMPORTED_MODULE_0__utils__["m" /* noop */], take: __WEBPACK_IMPORTED_MODULE_0__utils__["m" /* noop */] };

function ringBuffer() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var overflowAction = arguments[1];

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];
    while (length) {
      items.push(take());
    }
    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit = void 0;
        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);
          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;
          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;

            arr = flush();

            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;

            arr.length = doubledLimit;
            limit = doubledLimit;

            push(it);
            break;
          default:
          // DROP
        }
      }
    },
    take: take,
    flush: flush
  };
}

var buffers = {
  none: function none() {
    return zeroBuffer;
  },
  fixed: function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  },
  dropping: function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  },
  sliding: function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  },
  expanding: function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeaders = getHeaders;
exports.apifetch = apifetch;
exports.formatUrl = formatUrl;

var _errors = __webpack_require__(27);

var _eJSON = __webpack_require__(17);

function getHeaders(token) {
  var headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  if (token) headers.append('Authorization', 'Bearer ' + token);
  return headers;
}

function apifetch(baseURL, url) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var token = arguments[4];

  var fullUrl = '' + baseURL + url;
  var headers = getHeaders(token);
  var details = {
    method: method,
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };
  if (method.toLowerCase() === 'post') {
    details.body = JSON.stringify((0, _eJSON.serializeEJSON)(body));
  }
  return fetch(fullUrl, details).then(function (response) {
    if (response.json) {
      return response.json().then(function (json) {
        return (0, _eJSON.deserializeEJSON)(json);
      }).then(function (json) {
        if (response.ok) return json;
        response.json = json;
        throw new _errors.APIError(response);
      });
    } else if (!response.ok) throw new _errors.APIError(response);
    return {};
  });
}

function formatUrl(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var used = {};
  var formattedUrl = url.replace(/\$\{([a-zA-Z0-9_]*)\}/g, function (match, param) {
    if (!params[param]) throw new Error('Required parameter, ' + param + ', has not been provided');
    used[param] = true;
    return params[param];
  });
  var queryString = Object.entries(params).filter(function (param) {
    return !used[param[0]];
  }).map(function (param) {
    return param[0] + '=' + param[1];
  }).join('&');
  return queryString ? formattedUrl + '?' + queryString : formattedUrl;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UUID = exports.ObjectId = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.displayDate = displayDate;
exports.deserializeEJSON = deserializeEJSON;
exports.serializeEJSON = serializeEJSON;

var _isFunction = __webpack_require__(28);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _xdate = __webpack_require__(11);

var _xdate2 = _interopRequireDefault(_xdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = exports.ObjectId = function () {
  function ObjectId(oid) {
    _classCallCheck(this, ObjectId);

    this.oid = oid;
  }

  _createClass(ObjectId, [{
    key: 'toString',
    value: function toString() {
      return this.oid;
    }
  }, {
    key: 'serializeToEJSON',
    value: function serializeToEJSON() {
      return {
        $oid: this.oid
      };
    }
  }, {
    key: 'is',
    value: function is(other) {
      return (typeof other === 'undefined' ? 'undefined' : _typeof(other)) === _typeof(this) && this.oid === other.oid;
    }
  }]);

  return ObjectId;
}();

var UUID = exports.UUID = function () {
  function UUID(uuid) {
    _classCallCheck(this, UUID);

    this.uuid = uuid;
  }

  _createClass(UUID, [{
    key: 'toString',
    value: function toString() {
      return this.uuid;
    }
  }, {
    key: 'serializeToEJSON',
    value: function serializeToEJSON() {
      return {
        $uuid: this.uuid
      };
    }
  }, {
    key: 'is',
    value: function is(other) {
      return (typeof other === 'undefined' ? 'undefined' : _typeof(other)) === _typeof(this) && this.uuid === other.uuid;
    }
  }]);

  return UUID;
}();

function displayDate(date) {
  if (date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '/');
  }
}

// Can be used for any object which don't have a serializeEJSON method on the
// prototype.
var typesToSerialize = {
  Date: function Date(data) {
    return {
      $date: new _xdate2.default(data).setUTCMode(true, true).getTime()
    };
  },
  XDate: function XDate(data) {
    return {
      $date: data.clone().setUTCMode(true, true).getTime()
    };
  }
};

var deserializeMap = {
  $oid: function $oid(data) {
    return new ObjectId(data.$oid);
  },

  // Comented out other bson transforms which may appear, but we cannot handle at present
  // $binary: function(val) {
  //   return bson.Binary(new Buffer(val.$binary, 'base64'), parseInt(val.$type, 16))
  // },
  // $ref: function(val) {
  //   let id = typeof val.$id === 'object'
  //   && deserialize[Object.keys(val.$id)[0]] ? deserialize[Object.keys(val.$id)[0]](val.$id)
  //     : val.$id
  //   return ObjectId(val.$ref, id)
  // },
  // $timestamp: function(val) {
  //   return bson.Timestamp(val.$timestamp.t, val.$timestamp.i)
  // },
  // $numberLong: function(val) {
  //   return bson.Long.fromString(val.$numberLong)
  // },
  // $maxKey: function() {
  //   return bson.MaxKey()
  // },
  // $minKey: function() {
  //   return bson.MinKey()
  // },
  $date: function $date(val) {
    var d = new _xdate2.default();
    // Kernel bug.  See #2 http://git.io/AEbmFg
    if (isNaN(d.setTime(val.$date))) {
      d = new _xdate2.default(val.$date);
    }

    return d;
  },
  $regex: function $regex(val) {
    return new RegExp(val.$regex, val.$options);
  },
  $undefined: function $undefined() {
    return undefined;
  },
  $uuid: function $uuid(data) {
    return new UUID(data.$uuid);
  }
};

function deserializeEJSON(data) {
  if (Array.isArray(data)) {
    return data.map(deserializeEJSON);
  }
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    return data;
  }

  if (data === null) {
    return data;
  }

  var keys = Object.keys(data);
  if (keys.length === 0) {
    return data;
  }

  var caster = deserializeMap[keys[0]];
  if (!caster) {
    return keys.reduce(function (schema, key) {
      schema[key] = deserializeEJSON(data[key]);
      return schema;
    }, {});
  }

  return caster(data);
}

function serializeEJSON(data) {
  if (data) {
    if (Array.isArray(data)) {
      return data.map(serializeEJSON);
    }
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
      return data;
    }
    if ((0, _isFunction2.default)(data.serializeToEJSON)) {
      return data.serializeToEJSON();
    }

    for (var key in typesToSerialize) {
      if (GetInstanceType(data) === key) {
        return typesToSerialize[key](data);
      }
    }

    return Object.keys(data).reduce(function (acc, key) {
      acc[key] = serializeEJSON(data[key]);
      return acc;
    }, {});
  }
  return data;
}

function GetInstanceType(obj) {
  var str = obj.constructor.toString();
  return str.substring(9, str.indexOf('('));
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(30);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authSelectors = exports.authConstants = exports.authActions = exports.authReducer = exports.authSagas = exports.apiSelectors = exports.apiActions = exports.apiReducer = exports.apiConstants = exports.apiSagas = undefined;
exports.configure = configure;

var _actions = __webpack_require__(8);

var apiActions = _interopRequireWildcard(_actions);

var _constants = __webpack_require__(1);

var apiConstants = _interopRequireWildcard(_constants);

var _selectors = __webpack_require__(9);

var apiSelectors = _interopRequireWildcard(_selectors);

var _reducer = __webpack_require__(20);

var _reducer2 = _interopRequireDefault(_reducer);

var _sagas = __webpack_require__(21);

var _sagas2 = _interopRequireDefault(_sagas);

var _actions2 = __webpack_require__(7);

var authActions = _interopRequireWildcard(_actions2);

var _constants2 = __webpack_require__(3);

var authConstants = _interopRequireWildcard(_constants2);

var _selectors2 = __webpack_require__(36);

var authSelectors = _interopRequireWildcard(_selectors2);

var _reducer3 = __webpack_require__(37);

var _reducer4 = _interopRequireDefault(_reducer3);

var _sagas3 = __webpack_require__(39);

var _sagas4 = _interopRequireDefault(_sagas3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var apiSagas = {};
var authSagas = {};

function configure(appDependencies) {
  exports.authSagas = authSagas = (0, _sagas4.default)(appDependencies);
  exports.apiSagas = apiSagas = (0, _sagas2.default)(appDependencies, authSagas.refreshJWT);
}

exports.apiSagas = apiSagas;
exports.apiConstants = apiConstants;
exports.apiReducer = _reducer2.default;
exports.apiActions = apiActions;
exports.apiSelectors = apiSelectors;
exports.authSagas = authSagas;
exports.authReducer = _reducer4.default;
exports.authActions = authActions;
exports.authConstants = authConstants;
exports.authSelectors = authSelectors;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requestReducer;

var _immutable = __webpack_require__(4);

var _constants = __webpack_require__(1);

function requestReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)({});
  var action = arguments[1];

  // The Map for using as the key under which to store the request state..
  // Should be just { endpoint, params } so other meta keys like interval are filtered out
  var request = (0, _immutable.fromJS)(action.meta || {}).filter(function (value, key) {
    return ['endpoint', 'params'].indexOf(key) !== -1;
  });

  switch (action.type) {
    case _constants.REQUEST_FETCHING:
      return state.setIn([request, 'fetching'], true).setIn([request, 'error'], false).setIn([request, 'success'], false);

    case _constants.REQUEST_FETCHED:
      return state.setIn([request, 'response'], (0, _immutable.fromJS)(action.payload)).setIn([request, 'fetching'], false).setIn([request, 'error'], false).setIn([request, 'success'], true).setIn([request, 'updated'], new Date().toISOString());

    case _constants.REQUEST_FAILED:
      return state.setIn([request, 'errorResponse'], (0, _immutable.fromJS)(action.payload)).setIn([request, 'fetching'], false).setIn([request, 'error'], true).setIn([request, 'success'], false).setIn([request, 'polling'], false);

    case _constants.POLL_REQUEST:
      return state.setIn([request, 'polling'], action.meta.interval);

    case _constants.STOP_POLL_REQUEST:
      return state.setIn([request, 'polling'], false);

    default:
      return state;
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = configureApiSagas;

var _reduxSaga = __webpack_require__(12);

var _effects = __webpack_require__(13);

var _actions = __webpack_require__(8);

var _constants = __webpack_require__(1);

var _selectors = __webpack_require__(9);

var _utils = __webpack_require__(16);

var _actions2 = __webpack_require__(7);

function configureApiSagas(_ref, refreshJWT) {
  var Sentry = _ref.Sentry,
      jwtStore = _ref.jwtStore,
      baseURL = _ref.baseURL,
      endpoints = _ref.endpoints;

  var _marked = [secureApiSagaNoLogout, secureApiSaga, insecureApiSaga, processParams, apiRequest, apiPoll, watcher].map(regeneratorRuntime.mark);

  function secureApiSagaNoLogout() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var token;
    return regeneratorRuntime.wrap(function secureApiSagaNoLogout$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.call)(jwtStore.get);

          case 2:
            token = _context.sent;
            _context.next = 5;
            return _effects.call.apply(undefined, [_utils.apifetch, baseURL].concat(args, [token.password]));

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function secureApiSaga() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var token, response, status;
    return regeneratorRuntime.wrap(function secureApiSaga$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = '';
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _effects.call)(jwtStore.get);

          case 4:
            token = _context2.sent;
            _context2.next = 7;
            return _effects.call.apply(undefined, [_utils.apifetch, baseURL].concat(args, [token.password]));

          case 7:
            response = _context2.sent;
            return _context2.abrupt('return', response);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](1);
            status = _context2.t0.response && _context2.t0.response.status;

            if (!(!token || status === 401 || status === 403)) {
              _context2.next = 27;
              break;
            }

            _context2.prev = 15;
            _context2.next = 18;
            return (0, _effects.call)(refreshJWT);

          case 18:
            return _context2.delegateYield(secureApiSagaNoLogout.apply(undefined, args), 't1', 19);

          case 19:
            return _context2.abrupt('return', _context2.t1);

          case 22:
            _context2.prev = 22;
            _context2.t2 = _context2['catch'](15);

            Sentry.captureMessage('Could not perform request after re-fetching JWT');
            _context2.next = 27;
            return (0, _effects.put)((0, _actions2.logout)());

          case 27:
            throw _context2.t0;

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this, [[1, 11], [15, 22]]);
  }

  function insecureApiSaga() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return regeneratorRuntime.wrap(function insecureApiSaga$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _effects.call.apply(undefined, [_utils.apifetch, baseURL].concat(args));

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  // If param is a selector yield select(it) otherwise return the supplied value
  function processParams() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var selectors, p, i;
    return regeneratorRuntime.wrap(function processParams$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            selectors = Object.entries(params).filter(function (param) {
              return typeof param[1] === 'function';
            });
            p = _extends({}, params);
            i = 0;

          case 3:
            if (!(i < selectors.length)) {
              _context4.next = 10;
              break;
            }

            _context4.next = 6;
            return (0, _effects.select)(selectors[i][1]);

          case 6:
            p[selectors[i][0]] = _context4.sent;

          case 7:
            i += 1;
            _context4.next = 3;
            break;

          case 10:
            return _context4.abrupt('return', p);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function apiRequest(action) {
    var meta, _action$payload, payload, type, endpoint, config, params, cacheAge, url, response;

    return regeneratorRuntime.wrap(function apiRequest$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            meta = action.meta, _action$payload = action.payload, payload = _action$payload === undefined ? {} : _action$payload, type = action.type;
            endpoint = meta.endpoint;
            config = endpoints[endpoint];
            _context5.next = 5;
            return (0, _effects.call)(processParams, meta.params);

          case 5:
            params = _context5.sent;

            if (!config.cache) {
              _context5.next = 16;
              break;
            }

            _context5.next = 9;
            return (0, _effects.select)(_selectors.selectTimeSinceLastFetch, { endpoint: endpoint, params: params });

          case 9:
            cacheAge = _context5.sent;

            if (!(cacheAge && cacheAge < config.cache)) {
              _context5.next = 16;
              break;
            }

            _context5.next = 13;
            return (0, _effects.put)((0, _actions.requestCacheUsed)(endpoint, params));

          case 13:
            _context5.next = 15;
            return (0, _effects.select)(_selectors.selectRequestResponse, { endpoint: endpoint, params: params });

          case 15:
            return _context5.abrupt('return', _context5.sent);

          case 16:
            _context5.next = 18;
            return (0, _effects.call)(_utils.formatUrl, config.url, params);

          case 18:
            url = _context5.sent;
            _context5.next = 21;
            return (0, _effects.put)((0, _actions.requestFetching)(endpoint, params));

          case 21:
            _context5.prev = 21;
            _context5.next = 24;
            return (0, _effects.call)(config.token ? secureApiSaga : insecureApiSaga, url, config.method, payload);

          case 24:
            response = _context5.sent;
            _context5.next = 27;
            return (0, _effects.put)((0, _actions.requestFetched)(endpoint, params, response));

          case 27:
            return _context5.abrupt('return', response);

          case 30:
            _context5.prev = 30;
            _context5.t0 = _context5['catch'](21);
            _context5.next = 34;
            return (0, _effects.put)((0, _actions.requestFailed)(endpoint, params, _context5.t0));

          case 34:
            if (!(!type || type === _constants.POLL_REQUEST)) {
              _context5.next = 36;
              break;
            }

            throw _context5.t0;

          case 36:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this, [[21, 30]]);
  }

  function apiPoll(action) {
    var _action$meta, endpoint, params, interval;

    return regeneratorRuntime.wrap(function apiPoll$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _action$meta = action.meta, endpoint = _action$meta.endpoint, params = _action$meta.params;
            interval = action.meta.interval;

          case 2:
            if (!interval) {
              _context6.next = 21;
              break;
            }

            _context6.prev = 3;
            _context6.next = 6;
            return (0, _effects.call)(apiRequest, action);

          case 6:
            _context6.next = 8;
            return (0, _effects.call)(_reduxSaga.delay, interval);

          case 8:
            _context6.next = 10;
            return (0, _effects.select)(_selectors.selectRequestPollingInterval, { endpoint: endpoint, params: params });

          case 10:
            interval = _context6.sent;
            _context6.next = 19;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6['catch'](3);
            _context6.next = 17;
            return (0, _effects.put)((0, _actions.stopPollApiRequest)(endpoint, params));

          case 17:
            interval = false;
            Sentry.captureMessage('Polling endpoint, ' + action.meta.endpoint + ', returned an error. Polling will be stopped.');

          case 19:
            _context6.next = 2;
            break;

          case 21:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this, [[3, 13]]);
  }

  function watcher() {
    return regeneratorRuntime.wrap(function watcher$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return [(0, _reduxSaga.takeEvery)(_constants.POLL_REQUEST, apiPoll), (0, _reduxSaga.takeEvery)(_constants.REQUEST, apiRequest)];

          case 2:
          case 'end':
            return _context7.stop();
        }
      }
    }, _marked[6], this);
  }

  return {
    secureApiSaga: secureApiSaga,
    secureApiSagaNoLogout: secureApiSagaNoLogout,
    insecureApiSaga: insecureApiSaga,
    processParams: processParams, // Only exposed for testing
    apiRequest: apiRequest,
    apiPoll: apiPoll,
    watcher: watcher
  };
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export takeEvery */
/* unused harmony export takeLatest */
/* unused harmony export throttle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__takeEvery__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__takeLatest__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__throttle__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__takeEvery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__takeLatest__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__throttle__["a"]; });






var deprecationWarning = function deprecationWarning(helperName) {
  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};

var takeEvery = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* deprecate */](__WEBPACK_IMPORTED_MODULE_0__takeEvery__["a" /* default */], /*#__PURE__*/deprecationWarning('takeEvery'));
var takeLatest = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* deprecate */](__WEBPACK_IMPORTED_MODULE_1__takeLatest__["a" /* default */], /*#__PURE__*/deprecationWarning('takeLatest'));
var throttle = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* deprecate */](__WEBPACK_IMPORTED_MODULE_2__throttle__["a" /* default */], /*#__PURE__*/deprecationWarning('throttle'));



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeEvery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(6);




function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["q" /* take */](patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["i" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return __WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */]({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + __WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */](patternOrChannel) + ', ' + worker.name + ')');
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asap;
/* unused harmony export suspend */
/* unused harmony export flush */
var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    flush();
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Puts the scheduler in a `released` state.
**/
function release() {
  semaphore--;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  release();

  var task = void 0;
  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeLatest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(6);




function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["q" /* take */](patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["i" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["e" /* cancel */](task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return __WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */]({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + __WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */](patternOrChannel) + ', ' + worker.name + ')');
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buffers__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);






function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["a" /* actionChannel */](pattern, __WEBPACK_IMPORTED_MODULE_3__buffers__["a" /* buffers */].sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["q" /* take */](channel) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["i" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["d" /* call */](__WEBPACK_IMPORTED_MODULE_4__utils__["f" /* delay */], delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return __WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */]({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + __WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */](pattern) + ', ' + worker.name + ')');
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var APIError = exports.APIError = function (_Error) {
  _inherits(APIError, _Error);

  /* Extends the Error object in order to correctly format an error message for Sentry */
  function APIError(fetchErrResp) {
    _classCallCheck(this, APIError);

    var _this = _possibleConstructorReturn(this, (APIError.__proto__ || Object.getPrototypeOf(APIError)).call(this, 'Request to ' + fetchErrResp.url + ' returned ' + fetchErrResp.status + '.'));

    _this.response = fetchErrResp;
    _this.name = 'APIError';
    return _this;
  }

  return APIError;
}(Error);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(29),
    isObject = __webpack_require__(35);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18),
    getRawTag = __webpack_require__(33),
    objectToString = __webpack_require__(34);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(31);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUserSettings = exports.selectUserLoggedIn = exports.selectErrorDetails = exports.selectErrorStatus = exports.selectErrorJsonDescription = exports.selectErrorJsonTitle = exports.selectError = exports.selectResetPasswordAPIState = exports.selectRegistrationAPIState = exports.selectAuthAPIState = exports.selectUserIsPremium = exports.selectUserGroups = exports.selectEmail = exports.selectUserId = exports.selectAuthDomain = undefined;

var _reselect = __webpack_require__(10);

var PREMIUM_USER_GROUP = 'premium_user';

var selectAuthDomain = exports.selectAuthDomain = function selectAuthDomain(state) {
  return state.get('auth');
};

/*
* User ID
*/
var selectUserId = exports.selectUserId = function selectUserId(state) {
  return state.getIn(['auth', 'userId']);
};
var selectEmail = exports.selectEmail = function selectEmail(state) {
  return state.getIn(['auth', 'email']);
};
var selectUserGroups = exports.selectUserGroups = function selectUserGroups(state) {
  return state.getIn(['auth', 'groups']).toJS();
};

var selectUserIsPremium = exports.selectUserIsPremium = (0, _reselect.createSelector)(selectUserGroups, function (groups) {
  return !!groups && groups.indexOf(PREMIUM_USER_GROUP) > -1;
});

/*
* API STATE
*/
var selectAuthAPIState = exports.selectAuthAPIState = (0, _reselect.createSelector)(selectAuthDomain, function (substate) {
  return substate.get('authAPIState').toJS();
});

var selectRegistrationAPIState = exports.selectRegistrationAPIState = (0, _reselect.createSelector)(selectAuthDomain, function (substate) {
  return substate.get('registrationAPIState').toJS();
});

var selectResetPasswordAPIState = exports.selectResetPasswordAPIState = (0, _reselect.createSelector)(selectAuthDomain, function (substate) {
  return substate.get('resetPasswordAPIState').toJS();
});

var selectError = exports.selectError = (0, _reselect.createSelector)(selectAuthDomain, function (substate) {
  return substate.get('error');
});

var selectErrorJsonTitle = exports.selectErrorJsonTitle = (0, _reselect.createSelector)(selectError, function (error) {
  return error.getIn(['response', 'json', 'title']);
});

var selectErrorJsonDescription = exports.selectErrorJsonDescription = (0, _reselect.createSelector)(selectError, function (error) {
  return error.getIn(['response', 'json', 'description']);
});

var selectErrorStatus = exports.selectErrorStatus = (0, _reselect.createSelector)(selectError, function (error) {
  return error.getIn(['response', 'status']);
});

var selectErrorDetails = exports.selectErrorDetails = (0, _reselect.createSelector)(selectErrorStatus, selectErrorJsonTitle, selectErrorJsonDescription, function (status, title, description) {
  if (status && (status === 404 || status === 403)) return 'LoginForm.invalid';
  if (description && description === 'User has not confirmed their email') return 'LoginForm.emailconfirm';
  return 'Error.tryagain';
});

var selectUserLoggedIn = exports.selectUserLoggedIn = (0, _reselect.createSelector)(selectAuthDomain, function (substate) {
  return !!substate.get('userId');
});

var selectUserSettings = exports.selectUserSettings = (0, _reselect.createSelector)(selectAuthDomain, function (substate) {
  return substate.getIn(['user', 'user_settings']) ? substate.getIn(['user', 'user_settings']).toJS() : {};
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _immutable = __webpack_require__(4);

var _constants = __webpack_require__(3);

var _utils = __webpack_require__(38);

var apiState = {
  initial: {
    fetching: false,
    error: false,
    success: false,
    status: 'initial'
  },
  fetching: {
    fetching: true,
    error: false,
    success: false,
    status: 'fetching'
  },
  error: {
    fetching: false,
    error: true,
    success: false,
    status: 'error'
  },
  success: {
    fetching: false,
    error: false,
    success: true,
    status: 'success'
  }
};

var initialState = exports.initialState = {
  authAPIState: (0, _immutable.fromJS)(apiState.initial),
  registrationAPIState: (0, _immutable.fromJS)(apiState.initial),
  resetPasswordAPIState: (0, _immutable.fromJS)(apiState.initial),
  userInviteAPIState: (0, _immutable.fromJS)(apiState.initial),
  authenticated: false,
  userId: null,
  email: null,
  groups: [],
  user: {},
  error: {}
};

var _initialState = (0, _immutable.fromJS)(initialState);

function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.LOGIN_REQUEST:
      return state.set('authAPIState', (0, _immutable.fromJS)(apiState.fetching)).set('resetPasswordAPIState', (0, _immutable.fromJS)(apiState.initial));

    case _constants.LOGIN_USER:
      return state.set('authAPIState', (0, _immutable.fromJS)(apiState.success)).set('authenticated', true).set('userId', action.userId).set('email', action.email);

    case _constants.LOGOUT:
      return state.set('authAPIState', (0, _immutable.fromJS)(apiState.initial)).set('registrationAPIState', (0, _immutable.fromJS)(apiState.initial)).set('authenticated', false).set('userId', null).set('groups', (0, _immutable.fromJS)([]));

    case _constants.RESET_AUTH_API:
      return state.set('authAPIState', (0, _immutable.fromJS)(apiState.initial)).set('registrationAPIState', (0, _immutable.fromJS)(apiState.initial)).set('resetPasswordAPIState', (0, _immutable.fromJS)(apiState.initial)).set('authenticated', false).set('userId', null).set('groups', (0, _immutable.fromJS)([]));

    case _constants.LOGIN_FAILURE:
      return state.set('authAPIState', (0, _immutable.fromJS)(apiState.error)).set('error', (0, _immutable.fromJS)((0, _utils.transformError)(action.error)));

    case _constants.SET_USER_GROUPS:
      return state.set('groups', (0, _immutable.fromJS)(action.groups));

    case _constants.REGISTER_USER:
      return state.set('registrationAPIState', (0, _immutable.fromJS)(apiState.fetching));

    case _constants.REGISTER_USER_SUCCESS:
      return state.set('registrationAPIState', (0, _immutable.fromJS)(apiState.success));

    case _constants.REGISTER_USER_ERROR:
      return state.set('registrationAPIState', (0, _immutable.fromJS)(apiState.error)).set('error', (0, _immutable.fromJS)((0, _utils.transformError)(action.error)));

    case _constants.RESET_PASSWORD:
      return state.set('resetPasswordAPIState', (0, _immutable.fromJS)(apiState.fetching));

    case _constants.RESET_PASSWORD_SUCCESS:
      return state.set('resetPasswordAPIState', (0, _immutable.fromJS)(apiState.success));

    case _constants.RESET_PASSWORD_CLOSE:
      return state.set('resetPasswordAPIState', (0, _immutable.fromJS)(apiState.initial));

    case _constants.RESET_PASSWORD_ERROR:
      return state.set('resetPasswordAPIState', (0, _immutable.fromJS)(apiState.error)).set('error', (0, _immutable.fromJS)((0, _utils.transformError)(action.error)));

    default:
      return state;
  }
}

exports.default = authReducer;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.transformError = transformError;
exports.flattenObject = flattenObject;
function transformError(error) {
  // Strips non JSON values like functions and returns simple object for passing to fromJS
  return JSON.parse(JSON.stringify(error));
}

function flattenObject(obj) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_';

  var flatObj = {};
  var loop = function loop(o) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;

    Object.entries(o).forEach(function (entry) {
      var key = '' + path + separator + entry[0];
      if (_typeof(entry[1]) !== 'object') {
        flatObj[key] = entry[1];
        return;
      }
      loop(entry[1], key);
    });
  };
  loop(obj);
  return flatObj;
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureAuthSagas;

var _effects = __webpack_require__(13);

var _reduxSaga = __webpack_require__(12);

var _jwtDecode = __webpack_require__(40);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _utils = __webpack_require__(16);

var _eJSON = __webpack_require__(17);

var _actions = __webpack_require__(7);

var actions = _interopRequireWildcard(_actions);

var _constants = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureAuthSagas(_ref) {
  var _marked = [logoutSaga, refreshJWT, loginSaga, registerUserSaga, resetPasswordSaga, watcher].map(regeneratorRuntime.mark);

  var Sentry = _ref.Sentry,
      jwtStore = _ref.jwtStore,
      baseURL = _ref.baseURL,
      loginTimeout = _ref.loginTimeout;

  function logoutSaga() {
    return regeneratorRuntime.wrap(function logoutSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _effects.call)(jwtStore.delete);

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            Sentry.captureException(_context.t0);

          case 8:
            // Remove user details from sentry
            Sentry.setUserContext({ email: '', userID: '', username: '', extra: {} });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[0, 5]]);
  }

  /*
  * refreshJWT
  * Allows a user to get a new JWT token to extend their logged in period.
  * The endpoint returns a JSON Web Token on success.
  */
  function refreshJWT() {
    var url, oldToken, _ref2, response, timeout, email, JWTokenDecoded, userGroups, userID;

    return regeneratorRuntime.wrap(function refreshJWT$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = 'api/v1/users/refresh_token';
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _effects.call)(jwtStore.get);

          case 4:
            oldToken = _context2.sent;
            _context2.next = 7;
            return (0, _effects.race)({
              response: (0, _effects.call)(_utils.apifetch, baseURL, url, 'GET', {}, oldToken.password),
              timeout: (0, _effects.call)(_reduxSaga.delay, loginTimeout)
            });

          case 7:
            _ref2 = _context2.sent;
            response = _ref2.response;
            timeout = _ref2.timeout;

            if (!timeout) {
              _context2.next = 12;
              break;
            }

            throw new Error('timeout');

          case 12:
            email = oldToken.username;

            // Securely store login token

            _context2.next = 15;
            return (0, _effects.call)(jwtStore.set, email, response.token);

          case 15:
            JWTokenDecoded = (0, _eJSON.deserializeEJSON)((0, _jwtDecode2.default)(response.token));
            userGroups = JWTokenDecoded.aud;
            userID = JWTokenDecoded.oid.oid;

            // Log the user in with Sentry too

            Sentry.setUserContext({ email: email, userID: userID, username: '', extra: {} });

            _context2.next = 21;
            return (0, _effects.put)(actions.setUserGroups(userGroups));

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2['catch'](1);
            _context2.next = 27;
            return (0, _effects.call)(Sentry.captureException, _context2.t0);

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this, [[1, 23]]);
  }

  function loginSaga(action) {
    var url, method, email, password, body, _ref3, response, timeout, JWTokenDecoded, userID, userGroups;

    return regeneratorRuntime.wrap(function loginSaga$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = 'api/v1/users/login';
            method = 'POST';
            // Ensure emails are case insensitive

            email = (action.email || '').toLowerCase();
            password = action.password || '';
            body = { email: email, password: password };
            _context3.prev = 5;
            _context3.next = 8;
            return (0, _effects.race)({
              response: (0, _effects.call)(_utils.apifetch, baseURL, url, method, body),
              timeout: (0, _effects.call)(_reduxSaga.delay, loginTimeout)
            });

          case 8:
            _ref3 = _context3.sent;
            response = _ref3.response;
            timeout = _ref3.timeout;

            if (!timeout) {
              _context3.next = 13;
              break;
            }

            throw new Error('timeout');

          case 13:
            _context3.next = 15;
            return (0, _effects.call)(jwtStore.set, action.email, response.token);

          case 15:
            JWTokenDecoded = (0, _eJSON.deserializeEJSON)((0, _jwtDecode2.default)(response.token));
            userID = JWTokenDecoded.oid.oid;

            // Log the user in with Sentry

            Sentry.setUserContext({ email: email, userID: userID, username: '', extra: {} });

            userGroups = JWTokenDecoded.aud;
            _context3.next = 21;
            return (0, _effects.put)(actions.setUserGroups(userGroups));

          case 21:
            _context3.next = 23;
            return (0, _effects.put)(actions.loginUserState(userID, email));

          case 23:
            _context3.next = 30;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3['catch'](5);

            Sentry.captureException(_context3.t0);
            _context3.next = 30;
            return (0, _effects.put)(actions.loginFailure(_context3.t0));

          case 30:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this, [[5, 25]]);
  }

  // Register User:
  function registerUserSaga(action) {
    var url, method, email, password, fname, lname, user_type, body;
    return regeneratorRuntime.wrap(function registerUserSaga$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            url = 'api/v1/users/signup';
            method = 'POST';
            // Ensure emails are case insensitive

            email = (action.payload.email || '').toLowerCase();
            password = action.payload.password || '';
            fname = action.payload.fname || '';
            lname = action.payload.lname || '';
            user_type = action.payload.user_type || 'home'; // user_type = ['home'|'business']

            body = { fname: fname, lname: lname, email: email, password: password, user_type: user_type };
            _context4.next = 11;
            return (0, _utils.apifetch)(baseURL, url, method, body);

          case 11:
            _context4.next = 13;
            return (0, _effects.put)(actions.registerUserSuccess());

          case 13:
            _context4.next = 20;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4['catch'](0);

            Sentry.captureException(_context4.t0);
            _context4.next = 20;
            return (0, _effects.put)(actions.registerUserError(_context4.t0));

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this, [[0, 15]]);
  }

  // Reset Password:
  function resetPasswordSaga(action) {
    var url, method, email, body;
    return regeneratorRuntime.wrap(function resetPasswordSaga$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            url = 'api/v1/users/reset_password';
            method = 'POST';
            // Ensure emails are case insensitive

            email = (action.payload.email || '').toLowerCase();
            body = { email: email };
            _context5.next = 7;
            return (0, _utils.apifetch)(url, method, body);

          case 7:
            _context5.next = 9;
            return (0, _effects.put)(actions.resetPasswordSuccess());

          case 9:
            _context5.next = 16;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5['catch'](0);

            Sentry.captureException(_context5.t0);
            _context5.next = 16;
            return (0, _effects.put)(actions.resetPasswordError(_context5.t0));

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this, [[0, 11]]);
  }

  function watcher() {
    return regeneratorRuntime.wrap(function watcher$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return [(0, _reduxSaga.takeLatest)(_constants.LOGIN_REQUEST, loginSaga), (0, _reduxSaga.takeLatest)(_constants.LOGOUT, logoutSaga), (0, _reduxSaga.takeLatest)(_constants.RESET_PASSWORD, resetPasswordSaga), (0, _reduxSaga.takeLatest)(_constants.REFRESH_JWT, refreshJWT), (0, _reduxSaga.takeLatest)(_constants.REGISTER_USER, registerUserSaga)];

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  return {
    logoutSaga: logoutSaga,
    loginSaga: loginSaga,
    registerUserSaga: registerUserSaga,
    resetPasswordSaga: resetPasswordSaga,
    refreshJWT: refreshJWT,
    watcher: watcher
  };
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(41);

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(42);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ })
/******/ ]);
});
//# sourceMappingURL=zc-core.js.map