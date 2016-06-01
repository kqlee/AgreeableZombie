import React, { PropTypes, Component } from 'react';
import TextArea from './TextArea.js';
import PrevButton from './PrevButton.js';
import NextButton from './NextButton.js';
import Background from './Background.js';
import LeftPage from './LeftPage.js';
import RightPage from './RightPage.js';
import Video1 from './Video1.js';
import Video2 from './Video2.js';
import fakeBookData from './fakeBookData.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'This is the TextArea.',
      pageCounter: 0, 
      bookData: [
        {
          name: 'Page1',
          image: 'http://www.jb.man.ac.uk/aboutus/lovell/bluebook/bluebook051.jpg'
        },
        {
          name: 'Page2',
          image: 'http://www.jb.man.ac.uk/aboutus/lovell/bluebook/bluebook076.jpg'
        },
        {
          name: 'Page3',
          image: 'http://www.jb.man.ac.uk/aboutus/lovell/bluebook/bluebook076.jpg'
        },
        {
          name: 'Page4',
          image: 'http://www.jb.man.ac.uk/aboutus/lovell/bluebook/bluebook096.jpg'
        },
        {
          name: 'Page5',
          image: 'https://s-media-cache-ak0.pinimg.com/736x/9e/7b/d3/9e7bd39f635900028cd26596cbda365a.jpg'
        },
        {
          name: 'Page6',
          image: 'https://s-media-cache-ak0.pinimg.com/736x/2a/da/5e/2ada5e86d4a991b18e30e7d945d359aa.jpg'
        }

      ]
    };

    socket.on('prev page', (data) => {
      console.log ('data from server', data);
      this.setState({msg: data.msg});
    });

    socket.on('next page', (data) => {
      this.setState({msg: data.msg});
    });
  }
  onClickPrev() {
    console.log('Previous Clicked');
    socket.emit('PrevButtonClick', {msg: 'Previous button clicked'});
    if(this.state.pageCounter-1>=0) {
      this.setState({pageCounter: this.state.pageCounter-1});
    } else {
      socket.emit('PrevButtonClick', {msg: "BEGINNING OF BOOK!"});
    }
  }

  onClickNext() {
    console.log('Next clicked');
    if (this.state.pageCounter<this.state.bookData.length-1) {
      // socket.emit('NextButtonClick', {bookData: bookData[pageCounter].image});
      this.setState({pageCounter: this.state.pageCounter+1});
    } else {
      socket.emit('NextButtonClick', {msg: "END OF BOOK!"});
    }
    // socket.emit('NextButtonClick', {msg: 'Next button clicked'});

  }

  changeText(event) {
    this.setState ({msg: event.msg});
  }
 
  render() {
    {console.log("What's up brah")};
    return (
      <div>
        <h1> Hello I am App </h1>
        
        <PrevButton clickHandler={this.onClickPrev.bind(this)}/>
        {console.log("hello there")}
        <NextButton clickHandler={this.onClickNext.bind(this)}/>
        <LeftPage bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
        <RightPage />

        <Background />

        <Video1 />
        <Video2 />
      </div>
    );
  }
};

export default App;
