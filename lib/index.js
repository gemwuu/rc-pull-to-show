"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rcGesture = _interopRequireDefault(require("rc-gesture"));

require("index.less");

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
        className: "pull-to-show-indicator-wrapper"
      }, indicator), children));
    }
  }]);

  return PullToShow;
}(_react.default.Component);

exports.default = PullToShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyb290Rm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsImZvbnRTaXplIiwiUHVsbFRvU2hvdyIsInByb3BzIiwiZXYiLCJyZWN0T2JqZWN0IiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWFsSGVpZ2h0IiwidG9wIiwibW92ZVN0YXR1cyIsInkiLCJzZXRTdGF0ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJpbWdXaWR0aCIsImltZ0hlaWdodCIsIndpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJkZXZpY2VQaXhlbFJhdGlvIiwic3RhdGUiLCJjaGlsZHJlbiIsImluZGljYXRvciIsIm5ld1N0eWxlIiwibWFyZ2luVG9wIiwib25TdGFydFN0eWxlIiwib25Nb3ZlU3R5bGUiLCJvbkVuZFN0eWxlIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxHQUFHQyxVQUFVLENBQUNDLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkMsS0FBekIsQ0FBK0JDLFFBQS9CLElBQTJDLEdBQTVDLENBQS9CO0FBRUE7Ozs7OztJQU9xQkMsVTs7Ozs7QUFDbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsb0ZBQU1BLEtBQU47O0FBRGlCLDBGQWFMLFVBQUFDLEVBQUUsRUFBSTtBQUNsQixVQUFNQyxVQUFVLEdBQUcsTUFBS0MsRUFBTCxDQUFRQyxxQkFBUixFQUFuQixDQURrQixDQUVsQjtBQUNBO0FBQ0E7OztBQUNBLFVBQUksTUFBS0MsVUFBTCxHQUFrQixDQUFDSCxVQUFVLENBQUNJLEdBQTlCLElBQXFDTCxFQUFFLENBQUNNLFVBQUgsQ0FBY0MsQ0FBZCxHQUFrQixDQUF2RCxJQUE0RE4sVUFBVSxDQUFDSSxHQUFYLEdBQWlCLENBQWpGLEVBQW9GO0FBQ2xGO0FBQ0Q7O0FBQ0QsWUFBS0csUUFBTCxDQUFjO0FBQ1pDLFFBQUFBLFNBQVMsdUJBQWdCVCxFQUFFLENBQUNNLFVBQUgsQ0FBY0MsQ0FBZCxHQUFrQmYsWUFBbEM7QUFERyxPQUFkO0FBR0QsS0F4QmtCOztBQUFBLHlGQTBCTixZQUFNO0FBQ2pCLFlBQUtnQixRQUFMLENBQWM7QUFDWkMsUUFBQUEsU0FBUyxFQUFFLGVBREM7QUFFWkMsUUFBQUEsVUFBVSxFQUFFO0FBRkEsT0FBZDtBQUlELEtBL0JrQjs7QUFBQSwyRkFpQ0osWUFBTTtBQUNuQixZQUFLRixRQUFMLENBQWM7QUFDWkMsUUFBQUEsU0FBUyxFQUFFLGVBREM7QUFFWkMsUUFBQUEsVUFBVSxFQUFFO0FBRkEsT0FBZDtBQUlELEtBdENrQjs7QUFFakIsVUFBS1IsRUFBTCxHQUFVLElBQVY7QUFGaUIsc0JBRzJCLE1BQUtILEtBSGhDO0FBQUEsMkNBR1RZLFFBSFM7QUFBQSxRQUdUQSxRQUhTLHFDQUdFLEdBSEY7QUFBQSw0Q0FHT0MsU0FIUDtBQUFBLFFBR09BLFNBSFAsc0NBR21CLEdBSG5CLDBCQUtqQjs7QUFDQSxVQUFLUixVQUFMLEdBQWtCUyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsVUFBZCxHQUEyQkYsTUFBTSxDQUFDRyxnQkFBbEMsR0FBcURMLFFBQXJELEdBQWdFQyxTQUFsRjtBQUNBLFVBQUtLLEtBQUwsR0FBYTtBQUNYUixNQUFBQSxTQUFTLEVBQUUsZUFEQTtBQUVYQyxNQUFBQSxVQUFVLEVBQUU7QUFGRCxLQUFiO0FBUGlCO0FBV2xCOzs7OzZCQTZCUTtBQUFBOztBQUFBLHlCQUN5QixLQUFLWCxLQUQ5QjtBQUFBLFVBQ0NtQixRQURELGdCQUNDQSxRQUREO0FBQUEsVUFDV0MsU0FEWCxnQkFDV0EsU0FEWCxFQUdQOztBQUNBLFVBQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUNkLGVBQU8sMENBQU9ELFFBQVAsQ0FBUDtBQUNEOztBQU5NLHdCQU8yQixLQUFLRCxLQVBoQztBQUFBLFVBT0NSLFNBUEQsZUFPQ0EsU0FQRDtBQUFBLFVBT1lDLFVBUFosZUFPWUEsVUFQWjtBQVFQLFVBQU1VLFFBQVEsR0FBRztBQUNmQyxRQUFBQSxTQUFTLGFBQU0sS0FBS2pCLFVBQUwsR0FBa0JaLFlBQXhCLFFBRE07QUFFZmlCLFFBQUFBLFNBQVMsRUFBVEEsU0FGZTtBQUdmQyxRQUFBQSxVQUFVLEVBQUVBLFVBQVUsSUFBSTtBQUhYLE9BQWpCLENBUk8sQ0FhUDtBQUNBOztBQUNBLGFBQ0UsNkJBQUMsa0JBQUQ7QUFBUyxRQUFBLFVBQVUsRUFBRSxLQUFLWSxZQUExQjtBQUF3QyxRQUFBLFNBQVMsRUFBRSxLQUFLQyxXQUF4RDtBQUFxRSxRQUFBLFVBQVUsRUFBRSxLQUFLQztBQUF0RixTQUNFO0FBQUssUUFBQSxTQUFTLEVBQUMsc0JBQWY7QUFBc0MsUUFBQSxHQUFHLEVBQUUsYUFBQXRCLEVBQUU7QUFBQSxpQkFBSyxNQUFJLENBQUNBLEVBQUwsR0FBVUEsRUFBZjtBQUFBLFNBQTdDO0FBQWlFLFFBQUEsS0FBSyxFQUFFa0I7QUFBeEUsU0FDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsU0FBaURELFNBQWpELENBREYsRUFFR0QsUUFGSCxDQURGLENBREY7QUFRRDs7OztFQWhFcUNPLGVBQU1DLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdlc3R1cmUgZnJvbSAncmMtZ2VzdHVyZSc7XG5pbXBvcnQgJ2luZGV4Lmxlc3MnO1xuXG5jb25zdCByb290Rm9udFNpemUgPSBwYXJzZUZsb2F0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSB8fCAxMDApO1xuXG4vKlxuICogMS4g5aaC5p6c5rKh5pyJIGluZGljYXRvciDlsLHpu5jorqTkuI3mmL7npLrlhoXlrrlcbiAqIDIuIOaJi+advuW8gOeahOaXtuWAmeiHquWKqOW8ueWbnuWOu1xuICogMy4g5pyA5aW956aB5q2i6aG16Z2i55qEIGJvdW5jZSDmlYjmnpxcbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1bGxUb1Nob3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmVsID0gbnVsbDtcbiAgICBjb25zdCB7IGltZ1dpZHRoID0gNzUwLCBpbWdIZWlnaHQgPSAyMDAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyDpnIDopoHpgILphY3kuI3lkIzliIbovqjnjofkuIvlm77niYfkv53mjIHlkIzmoLfnmoTlrr3pq5jmr5RcbiAgICB0aGlzLnJlYWxIZWlnaHQgPSB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAvIGltZ1dpZHRoICogaW1nSGVpZ2h0O1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgIHRyYW5zaXRpb246ICdub25lJyxcbiAgICB9O1xuICB9XG5cbiAgb25Nb3ZlU3R5bGUgPSBldiA9PiB7XG4gICAgY29uc3QgcmVjdE9iamVjdCA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8g5paH5qGj5Zyo6aG26YOo77yM5ZCR5LiK5ruR77yM5bCx5LiN5aSE55CGXG4gICAgLy8g5oiW6ICF77ya5YWI5ZCR5LiL5ruR77yM5YaN5ZCR5LiK5ruR77yM6L+Y5pyq5Yiw5paH5qGj6aG26YOo55qE5pe25YCZ77yM5Lmf5LiN5aSE55CGXG4gICAgLy8g5oiW6ICF77ya5a6M5pW05pi+56S65LqG5Zu+54mH77yM5Lmf5LiN5aSE55CG5LqGXG4gICAgaWYgKHRoaXMucmVhbEhlaWdodCA8IC1yZWN0T2JqZWN0LnRvcCB8fCBldi5tb3ZlU3RhdHVzLnkgPCAwIHx8IHJlY3RPYmplY3QudG9wID4gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtldi5tb3ZlU3RhdHVzLnkgLyByb290Rm9udFNpemV9cmVtKWAsXG4gICAgfSk7XG4gIH1cblxuICBvbkVuZFN0eWxlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuNXMnLFxuICAgIH0pO1xuICB9XG5cbiAgb25TdGFydFN0eWxlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICB0cmFuc2l0aW9uOiAnbm9uZScsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgaW5kaWNhdG9yIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8g5aaC5p6c5rKh5pyJ5b+F6YCJ55qE5bGe5oCn77yM5LiL5ouJ5pi+56S65pu05aSa5bCx5LiN55Sf5pWIXG4gICAgaWYgKCFpbmRpY2F0b3IpIHtcbiAgICAgIHJldHVybiA8ZGl2PnsgY2hpbGRyZW4gfTwvZGl2PjtcbiAgICB9XG4gICAgY29uc3QgeyB0cmFuc2Zvcm0sIHRyYW5zaXRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U3R5bGUgPSB7XG4gICAgICBtYXJnaW5Ub3A6IGAtJHt0aGlzLnJlYWxIZWlnaHQgLyByb290Rm9udFNpemV9cmVtYCxcbiAgICAgIHRyYW5zZm9ybSxcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24gfHwgJ25vbmUnLFxuICAgIH07XG4gICAgLy8g5aaC5p6c5YWI55So5LiA5Liq5omL5oyH5ruR77yM5YaN5Yqg5YWl5LiA5Liq5omL5oyH5ruR5Yqo77yM5bCx5LiN5Lya6KKr5Yik5a6a5Li6IHBhblxuICAgIC8vIOi/meaXtuWAmeWwseayoeWKnuazleinpuWPkSBvblBhbkVuZCDkuovku7bvvIzmiYDku6XmnIDlpb3osIPnlKggb25Ub3VjaEVuZCDkuovku7bmnaXmgaLlpI3liJ3lp4vnirbmgIFcbiAgICByZXR1cm4gKFxuICAgICAgPEdlc3R1cmUgb25QYW5TdGFydD17dGhpcy5vblN0YXJ0U3R5bGV9IG9uUGFuTW92ZT17dGhpcy5vbk1vdmVTdHlsZX0gb25Ub3VjaEVuZD17dGhpcy5vbkVuZFN0eWxlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdWxsLXRvLXNob3ctd3JhcHBlclwiIHJlZj17ZWwgPT4gKHRoaXMuZWwgPSBlbCl9IHN0eWxlPXtuZXdTdHlsZX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdWxsLXRvLXNob3ctaW5kaWNhdG9yLXdyYXBwZXJcIj57aW5kaWNhdG9yfTwvZGl2PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0dlc3R1cmU+XG4gICAgKTtcbiAgfVxufVxuXG4iXX0=