import React from 'react';
import Gesture from 'rc-gesture';

const rootFontSize = parseFloat(document.documentElement.style.fontSize || 100);

/**
 * 1. 如果没有 indicator 就默认不显示内容
 * 2. 手松开的时候自动弹回去
 * 3. 最好禁止页面的 bounce 效果
 */
export default class PullToShow extends React.Component {
  constructor(props) {
    super(props);
    this.el = null;
    const { imgWidth = 750, imgHeight = 200 } = this.props;

    // 需要适配不同分辨率下图片保持同样的宽高比
    this.realHeight = window.screen.availWidth * window.devicePixelRatio / imgWidth * imgHeight;
    this.state = {
      transform: 'translateY(0)',
      transition: 'none',
    };
  }

  onMoveStyle = ev => {
    const rectObject = this.el.getBoundingClientRect();
    // 文档在顶部，向上滑，就不处理
    // 或者：先向下滑，再向上滑，还未到文档顶部的时候，也不处理
    // 或者：完整显示了图片，也不处理了
    if (this.realHeight < -rectObject.top || ev.moveStatus.y < 0 || rectObject.top > 0) {
      return;
    }
    this.setState({
      transform: `translateY(${ev.moveStatus.y / rootFontSize}rem)`,
    });
  }

  onEndStyle = () => {
    this.setState({
      transform: 'translateY(0)',
      transition: 'transform 0.5s',
    });
  }

  onStartStyle = () => {
    this.setState({
      transform: 'translateY(0)',
      transition: 'none',
    });
  }

  render() {
    const { children, indicator } = this.props;

    // 如果没有必选的属性，下拉显示更多就不生效
    if (!indicator) {
      return <div>{ children }</div>;
    }
    const { transform, transition } = this.state;
    const newStyle = {
      marginTop: `-${this.realHeight / rootFontSize}rem`,
      transform,
      transition: transition || 'none',
    };
    // 如果先用一个手指滑，再加入一个手指滑动，就不会被判定为 pan
    // 这时候就没办法触发 onPanEnd 事件，所以最好调用 onTouchEnd 事件来恢复初始状态
    return (
      <Gesture onPanStart={this.onStartStyle} onPanMove={this.onMoveStyle} onTouchEnd={this.onEndStyle}>
        <div className="pull-to-show-wrapper" ref={el => (this.el = el)} style={newStyle}>
          <div className="pull-to-show-indicator-wrapper">{indicator}</div>
          {children}
        </div>
      </Gesture>
    );
  }
}

