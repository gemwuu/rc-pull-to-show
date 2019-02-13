"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireDefault(require("react"));

var _rcGesture = _interopRequireDefault(require("rc-gesture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rootFontSize = parseFloat(document.documentElement.style.fontSize || 100);
/*
 * 1. 如果没有 indicator 就默认不显示内容
 * 2. 手松开的时候自动弹回去
 * 3. 最好禁止页面的 bounce 效果
 */

var PullToShow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PullToShow, _React$Component);

  function PullToShow(props) {
    var _this;

    _classCallCheck(this, PullToShow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PullToShow).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMoveStyle", function (ev) {
      var rectObject = _this.el.getBoundingClientRect(); // 文档在顶部，向上滑，就不处理
      // 或者：先向下滑，再向上滑，还未到文档顶部的时候，也不处理
      // 或者：完整显示了图片，也不处理了


      if (_this.realHeight < -rectObject.top || ev.moveStatus.y < 0 || rectObject.top > 0) {
        return;
      }

      _this.setState({
        transform: "translateY(".concat(ev.moveStatus.y / rootFontSize, "rem)")
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onEndStyle", function () {
      _this.setState({
        transform: 'translateY(0)',
        transition: 'transform 0.5s'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onStartStyle", function () {
      _this.setState({
        transform: 'translateY(0)',
        transition: 'none'
      });
    });

    _this.el = null;
    var _this$props = _this.props,
        _this$props$imgWidth = _this$props.imgWidth,
        imgWidth = _this$props$imgWidth === void 0 ? 750 : _this$props$imgWidth,
        _this$props$imgHeight = _this$props.imgHeight,
        imgHeight = _this$props$imgHeight === void 0 ? 200 : _this$props$imgHeight; // 需要适配不同分辨率下图片保持同样的宽高比

    _this.realHeight = window.screen.availWidth * window.devicePixelRatio / imgWidth * imgHeight;
    _this.state = {
      transform: 'translateY(0)',
      transition: 'none'
    };
    return _this;
  }

  _createClass(PullToShow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          indicator = _this$props2.indicator; // 如果没有必选的属性，下拉显示更多就不生效

      if (!indicator) {
        return _react.default.createElement("div", null, children);
      }

      var _this$state = this.state,
          transform = _this$state.transform,
          transition = _this$state.transition;
      var newStyle = {
        marginTop: "-".concat(this.realHeight / rootFontSize, "rem"),
        transform: transform,
        transition: transition || 'none'
      }; // 如果先用一个手指滑，再加入一个手指滑动，就不会被判定为 pan
      // 这时候就没办法触发 onPanEnd 事件，所以最好调用 onTouchEnd 事件来恢复初始状态

      return _react.default.createElement(_rcGesture.default, {
        onPanStart: this.onStartStyle,
        onPanMove: this.onMoveStyle,
        onTouchEnd: this.onEndStyle
      }, _react.default.createElement("div", {
        className: "pull-to-show-wrapper",
        ref: function ref(el) {
          return _this2.el = el;
        },
        style: newStyle
      }, _react.default.createElement("div", {
        className: "jsx-3424189515" + " " + "pull-to-show-indicator-wrapper"
      }, _react.default.createElement(_style.default, {
        id: "3424189515"
      }, ".pull-to-show-indicator-wrapper.jsx-3424189515{font-size:0;line-height:0;}.pull-to-show-indicator-wrapper.jsx-3424189515>img.jsx-3424189515{display:block;width:100%;}"), indicator), children));
    }
  }]);

  return PullToShow;
}(_react.default.Component);

exports.default = PullToShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyb290Rm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsImZvbnRTaXplIiwiUHVsbFRvU2hvdyIsInByb3BzIiwiZXYiLCJyZWN0T2JqZWN0IiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWFsSGVpZ2h0IiwidG9wIiwibW92ZVN0YXR1cyIsInkiLCJzZXRTdGF0ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJpbWdXaWR0aCIsImltZ0hlaWdodCIsIndpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJkZXZpY2VQaXhlbFJhdGlvIiwic3RhdGUiLCJjaGlsZHJlbiIsImluZGljYXRvciIsIm5ld1N0eWxlIiwibWFyZ2luVG9wIiwib25TdGFydFN0eWxlIiwib25Nb3ZlU3R5bGUiLCJvbkVuZFN0eWxlIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZLEdBQUdDLFVBQVUsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFULENBQXlCQyxLQUF6QixDQUErQkMsUUFBL0IsSUFBMkMsR0FBNUMsQ0FBL0I7QUFFQTs7Ozs7O0lBT3FCQyxVOzs7OztBQUNuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQixvRkFBTUEsS0FBTjs7QUFEaUIsMEZBYUwsVUFBQUMsRUFBRSxFQUFJO0FBQ2xCLFVBQU1DLFVBQVUsR0FBRyxNQUFLQyxFQUFMLENBQVFDLHFCQUFSLEVBQW5CLENBRGtCLENBRWxCO0FBQ0E7QUFDQTs7O0FBQ0EsVUFBSSxNQUFLQyxVQUFMLEdBQWtCLENBQUNILFVBQVUsQ0FBQ0ksR0FBOUIsSUFBcUNMLEVBQUUsQ0FBQ00sVUFBSCxDQUFjQyxDQUFkLEdBQWtCLENBQXZELElBQTRETixVQUFVLENBQUNJLEdBQVgsR0FBaUIsQ0FBakYsRUFBb0Y7QUFDbEY7QUFDRDs7QUFDRCxZQUFLRyxRQUFMLENBQWM7QUFDWkMsUUFBQUEsU0FBUyx1QkFBZ0JULEVBQUUsQ0FBQ00sVUFBSCxDQUFjQyxDQUFkLEdBQWtCZixZQUFsQztBQURHLE9BQWQ7QUFHRCxLQXhCa0I7O0FBQUEseUZBMEJOLFlBQU07QUFDakIsWUFBS2dCLFFBQUwsQ0FBYztBQUNaQyxRQUFBQSxTQUFTLEVBQUUsZUFEQztBQUVaQyxRQUFBQSxVQUFVLEVBQUU7QUFGQSxPQUFkO0FBSUQsS0EvQmtCOztBQUFBLDJGQWlDSixZQUFNO0FBQ25CLFlBQUtGLFFBQUwsQ0FBYztBQUNaQyxRQUFBQSxTQUFTLEVBQUUsZUFEQztBQUVaQyxRQUFBQSxVQUFVLEVBQUU7QUFGQSxPQUFkO0FBSUQsS0F0Q2tCOztBQUVqQixVQUFLUixFQUFMLEdBQVUsSUFBVjtBQUZpQixzQkFHMkIsTUFBS0gsS0FIaEM7QUFBQSwyQ0FHVFksUUFIUztBQUFBLFFBR1RBLFFBSFMscUNBR0UsR0FIRjtBQUFBLDRDQUdPQyxTQUhQO0FBQUEsUUFHT0EsU0FIUCxzQ0FHbUIsR0FIbkIsMEJBS2pCOztBQUNBLFVBQUtSLFVBQUwsR0FBa0JTLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxVQUFkLEdBQTJCRixNQUFNLENBQUNHLGdCQUFsQyxHQUFxREwsUUFBckQsR0FBZ0VDLFNBQWxGO0FBQ0EsVUFBS0ssS0FBTCxHQUFhO0FBQ1hSLE1BQUFBLFNBQVMsRUFBRSxlQURBO0FBRVhDLE1BQUFBLFVBQVUsRUFBRTtBQUZELEtBQWI7QUFQaUI7QUFXbEI7Ozs7NkJBNkJRO0FBQUE7O0FBQUEseUJBQ3lCLEtBQUtYLEtBRDlCO0FBQUEsVUFDQ21CLFFBREQsZ0JBQ0NBLFFBREQ7QUFBQSxVQUNXQyxTQURYLGdCQUNXQSxTQURYLEVBR1A7O0FBQ0EsVUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsZUFBTywwQ0FBT0QsUUFBUCxDQUFQO0FBQ0Q7O0FBTk0sd0JBTzJCLEtBQUtELEtBUGhDO0FBQUEsVUFPQ1IsU0FQRCxlQU9DQSxTQVBEO0FBQUEsVUFPWUMsVUFQWixlQU9ZQSxVQVBaO0FBUVAsVUFBTVUsUUFBUSxHQUFHO0FBQ2ZDLFFBQUFBLFNBQVMsYUFBTSxLQUFLakIsVUFBTCxHQUFrQlosWUFBeEIsUUFETTtBQUVmaUIsUUFBQUEsU0FBUyxFQUFUQSxTQUZlO0FBR2ZDLFFBQUFBLFVBQVUsRUFBRUEsVUFBVSxJQUFJO0FBSFgsT0FBakIsQ0FSTyxDQWFQO0FBQ0E7O0FBQ0EsYUFDRSw2QkFBQyxrQkFBRDtBQUFTLFFBQUEsVUFBVSxFQUFFLEtBQUtZLFlBQTFCO0FBQXdDLFFBQUEsU0FBUyxFQUFFLEtBQUtDLFdBQXhEO0FBQXFFLFFBQUEsVUFBVSxFQUFFLEtBQUtDO0FBQXRGLFNBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQyxzQkFBZjtBQUFzQyxRQUFBLEdBQUcsRUFBRSxhQUFBdEIsRUFBRTtBQUFBLGlCQUFLLE1BQUksQ0FBQ0EsRUFBTCxHQUFVQSxFQUFmO0FBQUEsU0FBN0M7QUFBaUUsUUFBQSxLQUFLLEVBQUVrQjtBQUF4RSxTQUNFO0FBQUEsNENBQWU7QUFBZjtBQUFBO0FBQUEsb0xBYUdELFNBYkgsQ0FERixFQWdCR0QsUUFoQkgsQ0FERixDQURGO0FBc0JEOzs7O0VBOUVxQ08sZUFBTUMsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR2VzdHVyZSBmcm9tICdyYy1nZXN0dXJlJztcblxuY29uc3Qgcm9vdEZvbnRTaXplID0gcGFyc2VGbG9hdChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgfHwgMTAwKTtcblxuLypcbiAqIDEuIOWmguaenOayoeaciSBpbmRpY2F0b3Ig5bCx6buY6K6k5LiN5pi+56S65YaF5a65XG4gKiAyLiDmiYvmnb7lvIDnmoTml7blgJnoh6rliqjlvLnlm57ljrtcbiAqIDMuIOacgOWlveemgeatoumhtemdoueahCBib3VuY2Ug5pWI5p6cXG4gKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWxsVG9TaG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5lbCA9IG51bGw7XG4gICAgY29uc3QgeyBpbWdXaWR0aCA9IDc1MCwgaW1nSGVpZ2h0ID0gMjAwIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8g6ZyA6KaB6YCC6YWN5LiN5ZCM5YiG6L6o546H5LiL5Zu+54mH5L+d5oyB5ZCM5qC355qE5a696auY5q+UXG4gICAgdGhpcy5yZWFsSGVpZ2h0ID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoICogd2luZG93LmRldmljZVBpeGVsUmF0aW8gLyBpbWdXaWR0aCAqIGltZ0hlaWdodDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICB0cmFuc2l0aW9uOiAnbm9uZScsXG4gICAgfTtcbiAgfVxuXG4gIG9uTW92ZVN0eWxlID0gZXYgPT4ge1xuICAgIGNvbnN0IHJlY3RPYmplY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIOaWh+aho+WcqOmhtumDqO+8jOWQkeS4iua7ke+8jOWwseS4jeWkhOeQhlxuICAgIC8vIOaIluiAhe+8muWFiOWQkeS4i+a7ke+8jOWGjeWQkeS4iua7ke+8jOi/mOacquWIsOaWh+aho+mhtumDqOeahOaXtuWAme+8jOS5n+S4jeWkhOeQhlxuICAgIC8vIOaIluiAhe+8muWujOaVtOaYvuekuuS6huWbvueJh++8jOS5n+S4jeWkhOeQhuS6hlxuICAgIGlmICh0aGlzLnJlYWxIZWlnaHQgPCAtcmVjdE9iamVjdC50b3AgfHwgZXYubW92ZVN0YXR1cy55IDwgMCB8fCByZWN0T2JqZWN0LnRvcCA+IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7ZXYubW92ZVN0YXR1cy55IC8gcm9vdEZvbnRTaXplfXJlbSlgLFxuICAgIH0pO1xuICB9XG5cbiAgb25FbmRTdHlsZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjVzJyxcbiAgICB9KTtcbiAgfVxuXG4gIG9uU3RhcnRTdHlsZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgdHJhbnNpdGlvbjogJ25vbmUnLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGluZGljYXRvciB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIOWmguaenOayoeacieW/hemAieeahOWxnuaAp++8jOS4i+aLieaYvuekuuabtOWkmuWwseS4jeeUn+aViFxuICAgIGlmICghaW5kaWNhdG9yKSB7XG4gICAgICByZXR1cm4gPGRpdj57IGNoaWxkcmVuIH08L2Rpdj47XG4gICAgfVxuICAgIGNvbnN0IHsgdHJhbnNmb3JtLCB0cmFuc2l0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1N0eWxlID0ge1xuICAgICAgbWFyZ2luVG9wOiBgLSR7dGhpcy5yZWFsSGVpZ2h0IC8gcm9vdEZvbnRTaXplfXJlbWAsXG4gICAgICB0cmFuc2Zvcm0sXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uIHx8ICdub25lJyxcbiAgICB9O1xuICAgIC8vIOWmguaenOWFiOeUqOS4gOS4quaJi+aMh+a7ke+8jOWGjeWKoOWFpeS4gOS4quaJi+aMh+a7keWKqO+8jOWwseS4jeS8muiiq+WIpOWumuS4uiBwYW5cbiAgICAvLyDov5nml7blgJnlsLHmsqHlip7ms5Xop6blj5Egb25QYW5FbmQg5LqL5Lu277yM5omA5Lul5pyA5aW96LCD55SoIG9uVG91Y2hFbmQg5LqL5Lu25p2l5oGi5aSN5Yid5aeL54q25oCBXG4gICAgcmV0dXJuIChcbiAgICAgIDxHZXN0dXJlIG9uUGFuU3RhcnQ9e3RoaXMub25TdGFydFN0eWxlfSBvblBhbk1vdmU9e3RoaXMub25Nb3ZlU3R5bGV9IG9uVG91Y2hFbmQ9e3RoaXMub25FbmRTdHlsZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVsbC10by1zaG93LXdyYXBwZXJcIiByZWY9e2VsID0+ICh0aGlzLmVsID0gZWwpfSBzdHlsZT17bmV3U3R5bGV9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVsbC10by1zaG93LWluZGljYXRvci13cmFwcGVyXCI+XG4gICAgICAgICAgICA8c3R5bGUganN4PlxuICAgICAgICAgICAgICB7YFxuICAgICAgICAgICAgICAgIC5wdWxsLXRvLXNob3ctaW5kaWNhdG9yLXdyYXBwZXIge1xuICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAwO1xuICAgICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5wdWxsLXRvLXNob3ctaW5kaWNhdG9yLXdyYXBwZXIgPiBpbWcge1xuICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICAgICAge2luZGljYXRvcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9HZXN0dXJlPlxuICAgICk7XG4gIH1cbn1cblxuIl19