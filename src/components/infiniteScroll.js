import React, { Component } from 'react';
import throttle from '../utils/throttle';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showLoader: false,
      lastScrollTop: 0,
      actionTriggered: false,
    };

    // this.onScrollListener = this.onScrollListener.bind(this);
    this.throttledOnScrollListener = throttle(this.onScrollListener, 150).bind(this);
  }

  propTypes = {
    next: PropTypes.func,
    hasMore: PropTypes.bool,
    children: PropTypes.node,
    loader: PropTypes.node.isRequired,
    scrollThreshold: PropTypes.number,
    loadMore: PropTypes.number,
    endMessage: PropTypes.node,
    style: PropTypes.object,
    height: PropTypes.number,
    hasChildren: PropTypes.bool,
  };

  defaultProps = {
    scrollThreshold: 0.8,
    loadMore: 10
  }

  componentDidMount () {
    this.el = this._infScroll;
    this.el.addEventListener('scroll', this.throttledOnScrollListener);
  }
  componentWillUnmount () {
    this.el.removeEventListener('scroll', this.throttledOnScrollListener);
  }

  componentWillReceiveProps (props) {
  // new data was sent in
    this.setState({
      showLoader: false,
      actionTriggered: false,
    });
  }

  isElementAtBottom = (target, scrollThreshold = 0.8) => {
    const clientHeight = (target === document.body || target === document.documentElement)
    ? window.screen.availHeight : target.clientHeight;
    const scrolled = scrollThreshold * (target.scrollHeight - target.scrollTop);
    return scrolled <= clientHeight;
  }

  onScrollListener = (event) => {
    const target = event.target;
    const { loadMore } = this.props;
    // if user scrolls up, remove action trigger lock
    if (target.scrollTop < this.state.lastScrollTop) {
      this.setState({
        actionTriggered: false,
        lastScrollTop: target.scrollTop
      });
      return; // user's going up
    }
    // return immediately if the action has already been triggered,
    // prevents multiple triggers.
    const atBottom = this.isElementAtBottom(target, this.props.scrollThreshold);
    if (this.state.actionTriggered) return;
    // call the `next` function in the props to trigger the next data fetch
    if (atBottom && this.props.hasMore) {
      this.props.next(loadMore);
      this.setState({
        actionTriggered: true,
        showLoader: true
      });
    }
    this.setState({ lastScrollTop: target.scrollTop });
  }

  render () {
    const style = {
      height: this.props.height || 'auto',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      ...this.props.style
    };
    const { children, hasMore, loader, endMessage } = this.props;
    const { showLoader } = this.state;
    const hasChildren = this.props.hasChildren || !!(this.props.children && this.props.children.length);
    const outerDivStyle = this.props.height ? { overflow: 'auto' } : {};

    return (
      <div style={outerDivStyle}>
        <div
          className='infinite-scroll-component'
          ref={infScroll => this._infScroll = infScroll}
          style={style}
        >
          {children}
          {!showLoader && !hasChildren && hasMore && loader}
          {showLoader && loader}
          {!hasMore && endMessage}
        </div>
      </div>
    );
  }
}
