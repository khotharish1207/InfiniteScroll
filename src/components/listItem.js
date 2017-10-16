import React, { Component } from 'react';

export default class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      readMore: false,
    }
  }

  readMore = () => {
    const { readMore } = this.state;
      this.setState({
        readMore: !readMore,
      })
  }

  getDetails = () => {
    // Ajax call to get data and data should inert in read more container
    const ajaxResponseData = {
      username: 'Harish Khot',
      address: 'Deshpande lane, kaij',
      taluka: 'Kaij',
      contact: '9766626859',
      district: 'Beed'
    };

    // Generate DOM structure from ajax response data
    return (<div>
        {Object.keys(ajaxResponseData).map((key) => <div><b>{`${key}`}</b>: {`${ajaxResponseData[key]}`}</div>)}
      </div>);
  }

  render() {
    const { keys = 0, background = '#00FF00' } = this.props;
    const { readMore } = this.state;
    const isEven = keys%2 == 0; // If even the height of list read more will be more that view port

    return(
      <div
        key={keys}
        className={'list-item'}
        style={{ background }}
      >
        <div className={ isEven ? 'list-item-header list-item-header-sticky' : 'list-item-header' }>
          <h3>{`List Item ${keys}`}</h3>
          <button onClick={this.readMore}>{ readMore ? `Read Less` : `Read More`}</button>
        </div>
        {
          readMore &&
          (<div className={'read-more'}>
            <p>{'Read More container' }</p>
            <div
              className={'read-more-container'}
              style={{ height: isEven ? 600 : 300 }} // to keep dynamic height
            >
              {this.getDetails()}
            </div>
          </div>)
        }
      </div>
    )
  }
}
