import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      readMore: false,
      isStickyHeader: false,
    }
  }

  componentDidUpdate() {
    const { listItem } = this.refs;
    const { height } = this.props; // parent view port height
    const { readMore, isStickyHeader } = this.state;
    if (listItem && readMore) {
      const listItemHeight =  ReactDOM.findDOMNode(listItem).clientHeight || 0;
      // if list item height is more than parent and header is not sticky
      if (!isStickyHeader && listItemHeight > height) {
        this.setState({ isStickyHeader: true })
      }
    }
  }

  readMore = () => {
    const { readMore, isStickyHeader } = this.state;
      this.setState({
        readMore: !readMore,
        isStickyHeader: false,
      })
  }

  getRandomNumber = () => Math.floor(Math.random() * 5) + 1;

  getDetails = () => {
    // Ajax call to get data and data should inert in read more container
    const ajaxResponseData = {
      username: 'Harish Khot',
      address: 'Deshpande lane, kaij',
      taluka: 'Kaij',
      contact: '9766626859',
      district: 'Beed'
    };
    let data = [];

    // Generate DOM structure from ajax response data with dynamic height
    for (let i = 0; i < this.getRandomNumber(); i++) {
      data = data.concat(Object.keys(ajaxResponseData).map((key) => <div><b>{`${key}`}</b>: {`${ajaxResponseData[key]}`}</div>))
    }

    return (<div>{data}</div>);
  }

  render() {
    const { keys = 0, background = '#00FF00' } = this.props;
    const { readMore, isStickyHeader } = this.state;

    return(
      <div
        key={keys}
        className={'list-item'}
        style={{ background }}
        ref={'listItem'}
      >
        <div className={ isStickyHeader ? 'list-item-header list-item-header-sticky' : 'list-item-header' }>
          <h3>{`List Item ${keys}`}</h3>
          <button onClick={this.readMore}>{ readMore ? `Read Less` : `Read More`}</button>
        </div>
        {
          readMore &&
          (<div className={'read-more'}>
            <p>{'Read More container' }</p>
            <div
              className={'read-more-container'} // to keep dynamic height
            >
              {this.getDetails()}
            </div>
          </div>)
        }
      </div>
    )
  }
}
