import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CreateTrip from './CreateTrip';


class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment(),
      dateString: moment()._d.toString().slice(4, 15)
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.changeCalString = this.changeCalString.bind(this);
  }

  render() {
    return (
        <div>
        <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            monthsShown={2}
            minDate={moment()}
        />
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            monthsShown={2}
            minDate={this.state.startDate}
        />
        {console.log('this is the current dateString', this.state.dateString)}
        </div>
    );
  }

  handleChangeStart(date) {
    console.log(String(date._d).slice(4, 15));
    console.log(date._d.toString().slice(4, 15));
    this.setState({
      startDate: date,
      dateString: date._d.toString().slice(4, 15),
      endDate: date
    });
    console.log('this is the startDate state', this.state.startDate);
  }

  handleChangeEnd(date) {
    console.log('this is the dateString from handleChangeEnd', this.state.dateString);
    var start = this.state.dateString;
    this.setState({
      endDate: date,
      dateString: start + "-" + date._d.toString().slice(4, 15)
    });
    setTimeout(()=>{
      //your code to be executed after 1 second
      this.changeCalString();
    }, 1);

    console.log("IN CALENDAR IN CHANGECALSTR",this.state);
  }

  changeCalString() {
    const newState = this.state.dateString;
    this.props.callbackParent(newState);
    this.setState({
      dateString: this.state.startDate.toString().slice(4, 15)
    })
  }
}

export default Calendar;
