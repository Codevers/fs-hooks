"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useEditableTree;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function randomID() {
  var d = new Date().getTime();

  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }

  var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}

var treeStyles = {
  nodeLayout: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  nodeMaxWidth: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  addFormLayout: {
    display: 'flex',
    alignItems: 'flex-start',
    lineHeight: 1
  }
};
/*********************************
 ** Module : 可编辑树形结构
 ** Desc : 基于Antd Tree组件
 ** Date : 2020-09-24
 *********************************/

function useEditableTree(_ref) {
  var addConfirm = _ref.addConfirm,
      deleteConfirm = _ref.deleteConfirm,
      moveChange = _ref.moveChange,
      renameConfirm = _ref.renameConfirm,
      _ref$nodeIcons = _ref.nodeIcons,
      nodeIcons = _ref$nodeIcons === void 0 ? {} : _ref$nodeIcons;

  var _Form$useForm = _antd.Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var expandedKeysRef = (0, _react.useRef)([]);
  var parentKey = (0, _react.useRef)();
  var currentKey = (0, _react.useRef)();
  var treeDataRef = (0, _react.useRef)();
  var oldTitleRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      expandedKeys = _useState2[0],
      setExpandedKeys = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedKeys = _useState4[0],
      setSelectedKeys = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      treeData = _useState6[0],
      setTreeData = _useState6[1];

  var treeProps = {
    expandedKeys: expandedKeys,
    selectedKeys: selectedKeys,
    treeData: treeData,
    showLine: {
      showLeafIcon: false
    },
    className: 'treeEditMode',
    blockNode: true,
    showIcon: true,
    onExpand: function onExpand(value) {
      setExpandedKeys(value);
    },
    onSelect: function onSelect(value, e) {
      var _e$selectedNodes$;

      if (((_e$selectedNodes$ = e.selectedNodes[0]) === null || _e$selectedNodes$ === void 0 ? void 0 : _e$selectedNodes$.isComfrim) === '0000') return;
      (value === null || value === void 0 ? void 0 : value.length) && setSelectedKeys(value);
    }
  };
  /***************************************
   ** Module: 添加节点内容 | Date: 2020-09-17
   ***************************************/

  var newNodeContent = function newNodeContent(parentItem) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: treeStyles.addFormLayout
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: '85%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Form, {
      size: "small",
      form: form
    }, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
      style: {
        marginBottom: 0
      },
      validateFirst: true
    }, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
      name: "name",
      noStyle: true,
      validateFirst: true,
      rules: [{
        required: true,
        message: '请输入'
      }]
    }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
      placeholder: "\u8BF7\u8F93\u5165",
      style: {
        fontSize: '13px',
        width: '100%'
      }
    }))))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "confirm_btns"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick() {
        return addIsConfirm(parentItem);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.confirm),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.confirm && '确认'), /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick() {
        return onDelete(currentKey.current);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.cancel),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.cancel && '取消')));
  };
  /***************************************
   ** Module: 重命名节点 | Date: 2020-09-17
   ***************************************/


  var newRenameNode = function newRenameNode(currentItem, parentItem) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: treeStyles.addFormLayout
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: '85%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
      size: "small",
      value: currentItem.titleText,
      onChange: function onChange(e) {
        return onChangeName(e, currentItem.key);
      },
      placeholder: "\u8BF7\u8F93\u5165",
      style: {
        fontSize: '13px',
        width: '100%'
      }
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "confirm_btns"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick() {
        return renameIsConfirm(currentItem, parentItem);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.confirm),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.confirm && '确认'), /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return onRecovery(e, currentItem.key, oldTitleRef.current);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.cancel),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.cancel && '取消')));
  };
  /***************************************
   ** Module: 节点标题内容 | Date: 2020-09-17
   ***************************************/


  var nodeTitleContent = function nodeTitleContent(currentItem, parentItem) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: treeStyles.nodeLayout
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "node_title",
      style: treeStyles.nodeMaxWidth
    }, currentItem.titleText), currentItem.key ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "operation_btns"
    }, addConfirm && /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      placement: "top",
      title: "\u65B0\u589E"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return onAdd(e, currentItem.key);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.add),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.add && '添加')), deleteConfirm && /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      placement: "top",
      title: "\u5220\u9664"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return deleteIsConfirm(e, currentItem, parentItem);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons["delete"]),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons["delete"] && '删除')), moveChange && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      placement: "top",
      title: "\u4E0A\u79FB"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return onMove(e, currentItem, 'up', parentItem);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.moveUp),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.moveUp && '上移')), /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      placement: "top",
      title: "\u4E0B\u79FB"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return onMove(e, currentItem, 'down', parentItem);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.moveDown),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.moveDown && '下移'))), renameConfirm && /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      placement: "top",
      title: "\u91CD\u547D\u540D"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return onRename(e, currentItem);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.rename),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.rename && '重命名'))) : /*#__PURE__*/_react["default"].createElement("div", {
      className: "operation_btns"
    }, addConfirm && /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      placement: "top",
      title: "\u65B0\u589E"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick(e) {
        return onAdd(e, currentItem.key);
      },
      className: "".concat(nodeIcons.fontFamily, " ").concat(nodeIcons.add),
      style: {
        fontSize: !nodeIcons.fontFamily ? '12px' : ''
      }
    }, !nodeIcons.add && '添加'))));
  };
  /***************************************
   ** Module: 重置未确认的节点输入框 | Date: 2020-09-17
   ***************************************/


  var resetNode = function resetNode(data) {
    return data.map(function (item, index) {
      if (item.isComfrim === '0000') {
        return data.splice(index, 1);
      } else {
        var _item$children;

        ((_item$children = item.children) === null || _item$children === void 0 ? void 0 : _item$children.length) && resetNode(item.children);
      }
    });
  };
  /***************************************
   ** Module: 删除节点 | Date: 2020-09-17
   ***************************************/


  var onDelete = function onDelete(key) {
    var Data = _toConsumableArray(treeDataRef.current);

    var fn = function fn(data, parent, parentKey) {
      return data.map(function (item, index) {
        if (item.key === key) {
          // let parentId = parentKey ? parentKey : data[index].key
          // let parentItem = parent ? parent : []
          // console.log(parentId, parentItem)
          return data.splice(index, 1); // parent.children=[]
        } else {
          var _item$children2;

          ((_item$children2 = item.children) === null || _item$children2 === void 0 ? void 0 : _item$children2.length) && fn(item.children, item, item.key);
        }
      });
    };

    fn(Data);
    setTimeout(function () {
      setTreeData(Data);
    }, 100);
  };
  /***************************************
   ** Module: 重命名节点设置 | Date: 2020-09-17
   ***************************************/


  var onRename = function onRename(e, _ref2) {
    var key = _ref2.key,
        titleText = _ref2.titleText;
    e && e.stopPropagation();

    var Data = _toConsumableArray(treeDataRef.current);

    oldTitleRef.current = titleText;

    var fn = function fn(data, parent) {
      return data.map(function (item) {
        if (item.key === key) {
          return item.title = newRenameNode(item, parent);
        } else {
          var _item$children3;

          ((_item$children3 = item.children) === null || _item$children3 === void 0 ? void 0 : _item$children3.length) && fn(item.children, item);
        }
      });
    };

    fn(Data);
    setTreeData(Data);
  };
  /***************************************
   ** Module: 节点恢复 | Date: 2020-09-17
   ***************************************/


  var onRecovery = function onRecovery(e, key, titleValue, responseKey) {
    e && e.stopPropagation();

    var Data = _toConsumableArray(treeDataRef.current);

    var fn = function fn(data) {
      return data.map(function (item, parent) {
        if (item.key === key) {
          item.titleText = titleValue;
          item.title = nodeTitleContent(item, parent); // 新增时，获取接口返回的新id

          if (responseKey) {
            item.key = responseKey; // 恢复后，消除flag，实现继续添加

            if (item.isComfrim === '0000') {
              item.isComfrim = '1111';
            }
          } else if (responseKey === false) {
            console.warn('缺失新节点key');
          }

          return;
        } else {
          var _item$children4;

          ((_item$children4 = item.children) === null || _item$children4 === void 0 ? void 0 : _item$children4.length) && fn(item.children, item);
        }
      });
    };

    fn(Data);
    setTreeData(Data);
  };
  /***************************************
   ** Module: 重命名输入赋值操作 | Date: 2020-09-17
   ***************************************/


  var onChangeName = function onChangeName(e, key) {
    var value = e.target.value;

    var Data = _toConsumableArray(treeDataRef.current);

    var fn = function fn(key, value, data, parent) {
      return data.map(function (item) {
        if (item.key === key) {
          item.titleText = value;
          item.title = newRenameNode(item, parent);
          return;
        } else {
          var _item$children5;

          ((_item$children5 = item.children) === null || _item$children5 === void 0 ? void 0 : _item$children5.length) && fn(key, value, item.children, item);
        }
      });
    };

    fn(key, value, Data);
    setTreeData(Data);
  };
  /***************************************
   ** Module: 移动节点 | Date: 2020-09-17
   ***************************************/


  var onMove = function onMove(e, currentItem, movePosition, parentItem) {
    e && e.stopPropagation();

    var Data = _toConsumableArray(treeDataRef.current);

    var isStop = false;

    var fn = function fn(data) {
      (data === null || data === void 0 ? void 0 : data.length) && data.map( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item, index) {
          var total, i, beforeList, afterList, result, _item$children6;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(item.key === currentItem.key && !isStop)) {
                    _context.next = 21;
                    break;
                  }

                  total = data.length;
                  i = movePosition === 'up' ? index - 1 : index + 1;
                  beforeList = _toConsumableArray(data);
                  afterList = _toConsumableArray(data);

                  if (!(i < 0)) {
                    _context.next = 7;
                    break;
                  }

                  return _context.abrupt("return");

                case 7:
                  if (!(i >= total)) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return");

                case 9:
                  if (moveChange) {
                    _context.next = 11;
                    break;
                  }

                  return _context.abrupt("return", console.warn('缺少处理方法'));

                case 11:
                  afterList.splice(index, 1);
                  afterList.splice(i, 0, item);
                  isStop = true;
                  _context.next = 16;
                  return moveChange({
                    beforeList: beforeList,
                    afterList: afterList,
                    currentItem: currentItem,
                    parentItem: parentItem,
                    movePosition: movePosition
                  });

                case 16:
                  result = _context.sent;

                  if (result) {
                    // 移动成功
                    data.splice(index, 1);
                    data.splice(i, 0, item);
                    setTreeData(Data);
                  } else {
                    console.error('移动节点失败！');
                  }

                  return _context.abrupt("return");

                case 21:
                  ((_item$children6 = item.children) === null || _item$children6 === void 0 ? void 0 : _item$children6.length) && fn(item.children);

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref3.apply(this, arguments);
        };
      }());
    };

    fn(Data);
  };
  /***************************************
   ** Module: 添加新节点（输入框） | Date: 2020-09-17
   ***************************************/


  var onAdd = function onAdd(e, key) {
    e && e.stopPropagation();
    setSelectedKeys([key]);
    form.setFieldsValue({
      name: ''
    });

    var Data = _toConsumableArray(treeDataRef.current);

    var treeId = randomID();

    var setTreeNode = function setTreeNode(data) {
      return data.map(function (item, index) {
        var _item$children8;

        if (item.key === key) {
          var _item$children7;

          if (!((_item$children7 = item.children) !== null && _item$children7 !== void 0 && _item$children7.length)) item.children = [];
          item.children.push({
            title: function title() {
              return newNodeContent(item);
            },
            key: treeId,
            isComfrim: '0000'
          }); // 加入定时有效改善闪烁问题（缺点：牺牲了展开动画）

          setTimeout(function () {
            setExpandedKeys([].concat(_toConsumableArray(expandedKeysRef.current), [key]));
          }, 50);
        }

        ((_item$children8 = item.children) === null || _item$children8 === void 0 ? void 0 : _item$children8.length) && setTreeNode(item.children);
      });
    };

    currentKey.current = treeId;
    parentKey.current = key;
    resetNode(Data);
    setTreeNode(Data); // 加入定时有效改善闪烁问题（缺点：牺牲了展开动画）

    setTimeout(function () {
      setTreeData(Data);
    }, 50);
  };

  var addIsConfirm = function addIsConfirm(parentItem) {
    if (!addConfirm) return console.warn('缺少处理方法');
    form.validateFields().then( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return addConfirm(_objectSpread({
                  parentItem: parentItem
                }, value));

              case 2:
                result = _context2.sent;

                if (result) {
                  // 新增成功
                  onRecovery(null, currentKey.current, value.name, result);
                } else {
                  console.error('新增失败！');
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  var deleteIsConfirm = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e, currentItem, parentItem) {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e && e.stopPropagation();

              if (deleteConfirm) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", console.warn('缺少处理方法'));

            case 3:
              _context3.next = 5;
              return deleteConfirm({
                currentItem: currentItem,
                parentItem: parentItem
              });

            case 5:
              result = _context3.sent;

              if (result) {
                // 删除成功
                onDelete(currentItem.key);
              } else {
                console.error('删除失败！');
              }

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function deleteIsConfirm(_x4, _x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }();

  var renameIsConfirm = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(currentItem, parentItem) {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (renameConfirm) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", console.warn('缺少处理方法'));

            case 2:
              _context4.next = 4;
              return renameConfirm(currentItem, parentItem);

            case 4:
              result = _context4.sent;
              console.log(result);

              if (result) {
                // 重命名成功
                onRecovery(null, currentItem.key, currentItem.titleText);
              } else {
                console.error('重命名失败！');
              }

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function renameIsConfirm(_x7, _x8) {
      return _ref6.apply(this, arguments);
    };
  }();
  /*********************************
   ** Module : 初始化数据结构
   ** Date : 2020-09-23
   *********************************/


  var initTreeData = function initTreeData(data) {
    var tree = _toConsumableArray(data);

    var fn = function fn(data, parent) {
      data.map(function (item, index) {
        var _item$children9;

        item.titleText = item.title;
        item.title = nodeTitleContent(item, parent);
        ((_item$children9 = item.children) === null || _item$children9 === void 0 ? void 0 : _item$children9.length) && fn(item.children, item);
      });
    };

    fn(tree);
    setTreeData(tree);
    setTimeout(function () {
      setExpandedKeys([tree[0].key]);
    }, 100);
  };

  (0, _react.useEffect)(function () {
    treeDataRef.current = treeData;
  }, [treeData]);
  (0, _react.useEffect)(function () {
    expandedKeysRef.current = expandedKeys;
  }, [expandedKeys]);
  return [treeProps, initTreeData];
}