"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useInterval;

var _react = require("react");

function useInterval(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var intervalFn = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    intervalFn.current = callback;
  }, [callback]);
  (0, _react.useEffect)(function () {
    function tick() {
      intervalFn.current();
    }

    if (delay !== null) {
      var timer = setInterval(tick, delay);
      return function () {
        clearInterval(timer);
      };
    }
  }, [delay]);
}