"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rcGesture = _interopRequireDefault(require("rc-gesture"));

var _style = _interopRequireDefault(require("./style"));

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
/**
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
        style: Object.assign({}, _style.default, newStyle)
      }, _react.default.createElement("div", {
        className: "pull-to-show-indicator-wrapper"
      }, indicator), children));
    }
  }]);

  return PullToShow;
}(_react.default.Component);

exports.default = PullToShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyb290Rm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsImZvbnRTaXplIiwiUHVsbFRvU2hvdyIsInByb3BzIiwiZXYiLCJyZWN0T2JqZWN0IiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWFsSGVpZ2h0IiwidG9wIiwibW92ZVN0YXR1cyIsInkiLCJzZXRTdGF0ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJpbWdXaWR0aCIsImltZ0hlaWdodCIsIndpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJkZXZpY2VQaXhlbFJhdGlvIiwic3RhdGUiLCJjaGlsZHJlbiIsImluZGljYXRvciIsIm5ld1N0eWxlIiwibWFyZ2luVG9wIiwib25TdGFydFN0eWxlIiwib25Nb3ZlU3R5bGUiLCJvbkVuZFN0eWxlIiwiT2JqZWN0IiwiYXNzaWduIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxHQUFHQyxVQUFVLENBQUNDLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkMsS0FBekIsQ0FBK0JDLFFBQS9CLElBQTJDLEdBQTVDLENBQS9CO0FBRUE7Ozs7OztJQUtxQkMsVTs7Ozs7QUFDbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsb0ZBQU1BLEtBQU47O0FBRGlCLDBGQWFMLFVBQUFDLEVBQUUsRUFBSTtBQUNsQixVQUFNQyxVQUFVLEdBQUcsTUFBS0MsRUFBTCxDQUFRQyxxQkFBUixFQUFuQixDQURrQixDQUVsQjtBQUNBO0FBQ0E7OztBQUNBLFVBQUksTUFBS0MsVUFBTCxHQUFrQixDQUFDSCxVQUFVLENBQUNJLEdBQTlCLElBQXFDTCxFQUFFLENBQUNNLFVBQUgsQ0FBY0MsQ0FBZCxHQUFrQixDQUF2RCxJQUE0RE4sVUFBVSxDQUFDSSxHQUFYLEdBQWlCLENBQWpGLEVBQW9GO0FBQ2xGO0FBQ0Q7O0FBQ0QsWUFBS0csUUFBTCxDQUFjO0FBQ1pDLFFBQUFBLFNBQVMsdUJBQWdCVCxFQUFFLENBQUNNLFVBQUgsQ0FBY0MsQ0FBZCxHQUFrQmYsWUFBbEM7QUFERyxPQUFkO0FBR0QsS0F4QmtCOztBQUFBLHlGQTBCTixZQUFNO0FBQ2pCLFlBQUtnQixRQUFMLENBQWM7QUFDWkMsUUFBQUEsU0FBUyxFQUFFLGVBREM7QUFFWkMsUUFBQUEsVUFBVSxFQUFFO0FBRkEsT0FBZDtBQUlELEtBL0JrQjs7QUFBQSwyRkFpQ0osWUFBTTtBQUNuQixZQUFLRixRQUFMLENBQWM7QUFDWkMsUUFBQUEsU0FBUyxFQUFFLGVBREM7QUFFWkMsUUFBQUEsVUFBVSxFQUFFO0FBRkEsT0FBZDtBQUlELEtBdENrQjs7QUFFakIsVUFBS1IsRUFBTCxHQUFVLElBQVY7QUFGaUIsc0JBRzJCLE1BQUtILEtBSGhDO0FBQUEsMkNBR1RZLFFBSFM7QUFBQSxRQUdUQSxRQUhTLHFDQUdFLEdBSEY7QUFBQSw0Q0FHT0MsU0FIUDtBQUFBLFFBR09BLFNBSFAsc0NBR21CLEdBSG5CLDBCQUtqQjs7QUFDQSxVQUFLUixVQUFMLEdBQWtCUyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsVUFBZCxHQUEyQkYsTUFBTSxDQUFDRyxnQkFBbEMsR0FBcURMLFFBQXJELEdBQWdFQyxTQUFsRjtBQUNBLFVBQUtLLEtBQUwsR0FBYTtBQUNYUixNQUFBQSxTQUFTLEVBQUUsZUFEQTtBQUVYQyxNQUFBQSxVQUFVLEVBQUU7QUFGRCxLQUFiO0FBUGlCO0FBV2xCOzs7OzZCQTZCUTtBQUFBOztBQUFBLHlCQUN5QixLQUFLWCxLQUQ5QjtBQUFBLFVBQ0NtQixRQURELGdCQUNDQSxRQUREO0FBQUEsVUFDV0MsU0FEWCxnQkFDV0EsU0FEWCxFQUdQOztBQUNBLFVBQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUNkLGVBQU8sMENBQU9ELFFBQVAsQ0FBUDtBQUNEOztBQU5NLHdCQU8yQixLQUFLRCxLQVBoQztBQUFBLFVBT0NSLFNBUEQsZUFPQ0EsU0FQRDtBQUFBLFVBT1lDLFVBUFosZUFPWUEsVUFQWjtBQVFQLFVBQU1VLFFBQVEsR0FBRztBQUNmQyxRQUFBQSxTQUFTLGFBQU0sS0FBS2pCLFVBQUwsR0FBa0JaLFlBQXhCLFFBRE07QUFFZmlCLFFBQUFBLFNBQVMsRUFBVEEsU0FGZTtBQUdmQyxRQUFBQSxVQUFVLEVBQUVBLFVBQVUsSUFBSTtBQUhYLE9BQWpCLENBUk8sQ0FhUDtBQUNBOztBQUNBLGFBQ0UsNkJBQUMsa0JBQUQ7QUFBUyxRQUFBLFVBQVUsRUFBRSxLQUFLWSxZQUExQjtBQUF3QyxRQUFBLFNBQVMsRUFBRSxLQUFLQyxXQUF4RDtBQUFxRSxRQUFBLFVBQVUsRUFBRSxLQUFLQztBQUF0RixTQUNFO0FBQUssUUFBQSxTQUFTLEVBQUMsc0JBQWY7QUFBc0MsUUFBQSxHQUFHLEVBQUUsYUFBQXRCLEVBQUU7QUFBQSxpQkFBSyxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBZjtBQUFBLFNBQTdDO0FBQWlFLFFBQUEsS0FBSyxFQUFFdUIsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQjlCLGNBQWxCLEVBQXlCd0IsUUFBekI7QUFBeEUsU0FDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsU0FBaURELFNBQWpELENBREYsRUFFR0QsUUFGSCxDQURGLENBREY7QUFRRDs7OztFQWhFcUNTLGVBQU1DLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdlc3R1cmUgZnJvbSAncmMtZ2VzdHVyZSc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSc7XG5cbmNvbnN0IHJvb3RGb250U2l6ZSA9IHBhcnNlRmxvYXQoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplIHx8IDEwMCk7XG5cbi8qKlxuICogMS4g5aaC5p6c5rKh5pyJIGluZGljYXRvciDlsLHpu5jorqTkuI3mmL7npLrlhoXlrrlcbiAqIDIuIOaJi+advuW8gOeahOaXtuWAmeiHquWKqOW8ueWbnuWOu1xuICogMy4g5pyA5aW956aB5q2i6aG16Z2i55qEIGJvdW5jZSDmlYjmnpxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVsbFRvU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZWwgPSBudWxsO1xuICAgIGNvbnN0IHsgaW1nV2lkdGggPSA3NTAsIGltZ0hlaWdodCA9IDIwMCB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIOmcgOimgemAgumFjeS4jeWQjOWIhui+qOeOh+S4i+WbvueJh+S/neaMgeWQjOagt+eahOWuvemrmOavlFxuICAgIHRoaXMucmVhbEhlaWdodCA9IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIC8gaW1nV2lkdGggKiBpbWdIZWlnaHQ7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgdHJhbnNpdGlvbjogJ25vbmUnLFxuICAgIH07XG4gIH1cblxuICBvbk1vdmVTdHlsZSA9IGV2ID0+IHtcbiAgICBjb25zdCByZWN0T2JqZWN0ID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyDmlofmoaPlnKjpobbpg6jvvIzlkJHkuIrmu5HvvIzlsLHkuI3lpITnkIZcbiAgICAvLyDmiJbogIXvvJrlhYjlkJHkuIvmu5HvvIzlho3lkJHkuIrmu5HvvIzov5jmnKrliLDmlofmoaPpobbpg6jnmoTml7blgJnvvIzkuZ/kuI3lpITnkIZcbiAgICAvLyDmiJbogIXvvJrlrozmlbTmmL7npLrkuoblm77niYfvvIzkuZ/kuI3lpITnkIbkuoZcbiAgICBpZiAodGhpcy5yZWFsSGVpZ2h0IDwgLXJlY3RPYmplY3QudG9wIHx8IGV2Lm1vdmVTdGF0dXMueSA8IDAgfHwgcmVjdE9iamVjdC50b3AgPiAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke2V2Lm1vdmVTdGF0dXMueSAvIHJvb3RGb250U2l6ZX1yZW0pYCxcbiAgICB9KTtcbiAgfVxuXG4gIG9uRW5kU3R5bGUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cycsXG4gICAgfSk7XG4gIH1cblxuICBvblN0YXJ0U3R5bGUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgIHRyYW5zaXRpb246ICdub25lJyxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBpbmRpY2F0b3IgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyDlpoLmnpzmsqHmnInlv4XpgInnmoTlsZ7mgKfvvIzkuIvmi4nmmL7npLrmm7TlpJrlsLHkuI3nlJ/mlYhcbiAgICBpZiAoIWluZGljYXRvcikge1xuICAgICAgcmV0dXJuIDxkaXY+eyBjaGlsZHJlbiB9PC9kaXY+O1xuICAgIH1cbiAgICBjb25zdCB7IHRyYW5zZm9ybSwgdHJhbnNpdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTdHlsZSA9IHtcbiAgICAgIG1hcmdpblRvcDogYC0ke3RoaXMucmVhbEhlaWdodCAvIHJvb3RGb250U2l6ZX1yZW1gLFxuICAgICAgdHJhbnNmb3JtLFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbiB8fCAnbm9uZScsXG4gICAgfTtcbiAgICAvLyDlpoLmnpzlhYjnlKjkuIDkuKrmiYvmjIfmu5HvvIzlho3liqDlhaXkuIDkuKrmiYvmjIfmu5HliqjvvIzlsLHkuI3kvJrooqvliKTlrprkuLogcGFuXG4gICAgLy8g6L+Z5pe25YCZ5bCx5rKh5Yqe5rOV6Kem5Y+RIG9uUGFuRW5kIOS6i+S7tu+8jOaJgOS7peacgOWlveiwg+eUqCBvblRvdWNoRW5kIOS6i+S7tuadpeaBouWkjeWIneWni+eKtuaAgVxuICAgIHJldHVybiAoXG4gICAgICA8R2VzdHVyZSBvblBhblN0YXJ0PXt0aGlzLm9uU3RhcnRTdHlsZX0gb25QYW5Nb3ZlPXt0aGlzLm9uTW92ZVN0eWxlfSBvblRvdWNoRW5kPXt0aGlzLm9uRW5kU3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB1bGwtdG8tc2hvdy13cmFwcGVyXCIgcmVmPXtlbCA9PiAodGhpcy5lbCA9IGVsKX0gc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHN0eWxlLCBuZXdTdHlsZSl9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVsbC10by1zaG93LWluZGljYXRvci13cmFwcGVyXCI+e2luZGljYXRvcn08L2Rpdj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9HZXN0dXJlPlxuICAgICk7XG4gIH1cbn1cblxuIl19