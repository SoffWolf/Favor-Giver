/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component } from 'react';
//import React in our project

import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
//import all the required components

import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
//importing library to use Stopwatch and Timer

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: true,
      isStopwatchStart: true,
      timerDuration: 90000,
      resetTimer: false,
      resetStopwatch: false,
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  startStopTimer() {
    this.setState({
      isTimerStart: !this.state.isTimerStart,
      resetTimer: false,
    });
  }

  resetTimer() {
    this.setState({ isTimerStart: false, resetTimer: true });
  }

  startStopStopWatch() {
    this.setState({
      isStopwatchStart: !this.state.isStopwatchStart,
      resetStopwatch: false,
    });
  }

  resetStopwatch() {
    this.setState({ isStopwatchStart: false, resetStopwatch: true });
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Stopwatch
            laps
            secs
            start={this.state.isStopwatchStart}
            //To start
            reset={this.state.resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={this.getFormattedTime}
          />
          
        </View>

        
      </View>
    );
  }
}


const options = {
  container: {
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};