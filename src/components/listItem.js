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
    console.log('readMore', readMore);
    return(

      <div
        key={keys}
        className={'list-item'}
        style={{ background }}
      >
        <div style={{height: 100}}>
          <h3>{`List Item ${keys}`}</h3>
          <button onClick={this.readMore}>{ readMore ? `Read Less` : `Read More`}</button>
        </div>
        {
          readMore &&
          (<div className={'read-more'}>
            {'Read More container' }
            <div
              className={'read-more-container'}
              style={{ height: keys%2 == 0 ? 600 : 300 }} // to keep dynamic height
            >
              {this.getDetails()}
            </div>
          </div>)
        }
      </div>
    )
  }
}
