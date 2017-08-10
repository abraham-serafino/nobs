'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SuperModel = function SuperModel(name, model, socket) {
  var _this = this;

  _classCallCheck(this, SuperModel);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var key = _step.value;

      if (typeof model.prototype[key] === 'function') {
        socket.on(name + '.' + key, model.prototype[key].bind(_this));

        _this[key] = function () {
          var _model$prototype$key;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_model$prototype$key = model.prototype[key]).call.apply(_model$prototype$key, [_this].concat(args));
          socket.emit.apply(socket, [name + '.' + key].concat(args));
        };
      }
    };

    for (var _iterator = Object.getOwnPropertyNames(model.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

module.exports = SuperModel;