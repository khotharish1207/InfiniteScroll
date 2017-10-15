import React from 'react';
import InfiniteScroll from './infiniteScroll';
import ListItem from './listItem';
import "../assets/style.css";

const initialList = [
  <ListItem
    keys={1}
    background={'#9bc95b'}
  />,
  <ListItem
    keys={2}
    background={'#ffd47b'}
  />,
  <ListItem
    keys={3}
    background={'#95a9d6'}
  />,
  <ListItem
    keys={4}
    background={'#ffa8e1'}
  />,
  <ListItem
    keys={5}
    background={'#9bc95b'}
  />,
  <ListItem
    keys={6}
    background={'#ffd47b'}
  />,
  <ListItem
    keys={7}
    background={'#95a9d6'}
  />,
  <ListItem
    keys={8}
    background={'#ffa8e1'}
  />
];

const colors = ['#9bc95b', '#ffd47b', '#95a9d6', '#ffa8e1'];

export default class App extends React.Component {
  constructor () {
    super();
    this.state = { divs: initialList };
    this.generateDivs = this.generateDivs.bind(this);
  }

  // Add 10 more objects
  generateDivs () {
    let moreDivs = [];
    let count = this.state.divs.length;
    for (let i = 0; i < 10; i++) {
      moreDivs.push(
        <ListItem
          keys={++count}
          background={colors[i % 4]}
        />
      );
    }
    setTimeout(() => {
      this.setState({divs: this.state.divs.concat(moreDivs)});
    }, 500);
  }

  render () {
    return (
    <div className={'main'}>
      <h1>{`Infinite Scroll`}</h1>

      <InfiniteScroll
        next={this.generateDivs}
        hasMore={true}
        height={500}
        loader={<h4>Loading...</h4>}>
        {this.state.divs}
      </InfiniteScroll>
    </div>
    );
  }
}
