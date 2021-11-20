"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePagination;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*********************************
 ** Module : 自定义antd分页hooks
 ** Desc : 一切都是为了让世界更加美好......
 ** Date : 2020-04-01
 *********************************/
function usePagination(Api) {
  var Pages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    current: 'current',
    pageSize: 'pageSize'
  };
  var isMounted = (0, _react.useRef)(false);
  var setValueFlag = (0, _react.useRef)(0);

  var _useState = (0, _react.useState)(function () {
    return {
      current: 1,
      pageSize: 20
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      newParams = _useState4[0],
      setNewParams = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      dataSource = _useState8[0],
      setDataSource = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      total = _useState10[0],
      setTotal = _useState10[1];

  var onChange = (0, _react.useCallback)(function (pagination) {
    setPage({
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  }, []);
  var fetchData = (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _objectSpread2;

    var searchParams,
        currentCount,
        current,
        pageSize,
        params,
        result,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchParams = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            setLoading(true);
            currentCount = setValueFlag.current;
            current = Pages.current, pageSize = Pages.pageSize; // const params = { startPage: page.current, pageSize: page.pageSize, ...searchParams }

            params = _objectSpread((_objectSpread2 = {}, _defineProperty(_objectSpread2, current, page.current), _defineProperty(_objectSpread2, pageSize, page.pageSize), _objectSpread2), searchParams);
            _context.next = 7;
            return Api(params);

          case 7:
            result = _context.sent;

            if (!(setValueFlag.current != currentCount)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            setLoading(false);
            setTotal(result.data.RowCount);
            setDataSource(result.data.Data);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [page]);
  var initTable = (0, _react.useCallback)(function (params) {
    setNewParams(params);
    setPage({
      current: 1,
      pageSize: page.pageSize
    });
  }, [page]);
  (0, _react.useEffect)(function () {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      fetchData(newParams);
      return function () {
        setValueFlag.current += 1;
      };
    }
  }, [page]);
  var pagingProps = {
    loading: loading,
    onChange: onChange,
    dataSource: dataSource,
    pagination: _objectSpread(_objectSpread({}, page), {}, {
      total: total,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: [20, 40, 80, 100],
      size: 'middle',
      showTotal: function showTotal(total) {
        return "\u603B\u5171 ".concat(total, "\u6761 \u8BB0\u5F55");
      }
    })
  };
  return [initTable, pagingProps, setDataSource];
}