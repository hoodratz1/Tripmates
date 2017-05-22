import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import HeaderJp from './Header-jp';
import YelpSearchJp from './YelpSearch-jp';


class ContributeTripJp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    　tripInfo: '',
      dates: [],
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: '',
      comment: '',
      comments: [],
      vote: 0
    };

    this.getTripInfo = this.getTripInfo.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.getComments = this.getComments.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onCommentSubmission = this.onCommentSubmission.bind(this);
    this.dateVoteClick = this.dateVoteClick.bind(this);
    this.activityOptionsClick = this.activityOptionsClick.bind(this);
  }

  componentDidMount() {
    this.getTripInfo();
    this.getDates();
    this.getActivities();
    this.getComments();
  }

  getTripInfo() {
    axios.get('/tripInfo', {
      params: {
        currentTrip: this.props.currentTrip
      }})
	   .then((result) => {
	      this.setState({tripInfo: result.data[0]})
	    })
	    .catch((error) => {
	      console.error(error);
	    })
  }

  getDates() {
    axios.get('/dates', {
      params: {
        currentTrip: this.props.currentTrip
      }})
     .then((result) => {
        this.setState({dates: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getActivities() {
    axios.get('/activities', {
      params: {
        currentTrip: this.props.currentTrip
      }})
     .then((result) => {
        this.setState({activities: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getComments() {
    axios.get('/comments', {
      params: {
        currentTrip: this.props.currentTrip
      }})
      .then((result) => {
        this.setState({comments: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  onActivityClick(e) {
    e.preventDefault();

    axios.post('/newactivity', {currentTrip: this.props.currentTrip, activityName: this.state.activityName, activityDescription: this.state.activityDescription, activityCost: this.state.activityCost})
      .then((result) => {
        this.getActivities();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onCommentSubmission(e) {
    e.preventDefault();
      axios.post('/comments', {comment: this.state.comment, commentOwner: this.props.loggedInUser, currentTrip: this.props.currentTrip})
      .then((result) => {
        this.getComments();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  dateVoteClick(date, e) {
    e.preventDefault();
    axios.post('/addDateVote', {date: date.dateOption, currentTrip: this.props.currentTrip})
      .then((result) => {
        this.getDates();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  activityOptionsClick(activity,e) {
    e.preventDefault();
     axios.post('/addActivityVote', {activityName: activity.activityName, currentTrip: this.props.currentTrip})
    .then((result) => {
      this.getActivities();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div id="contributeTrip">
        <HeaderJp loggedInUser = {this.props.loggedInUser} />
        <div className="container">
          <div className="content narrow">
            <h2 id="pageheader">{'  "' + this.props.currentTrip + '"'}に追加する </h2>

            <div className="column1">
              <div className="tripItem">
                <h3>目的地</h3><label>{this.state.tripInfo.destination}</label>
              </div>
              <div className="tripItem">
                <h3>値段</h3> <label>${this.state.tripInfo.est_cost}</label>
              </div>
              <div className="tripItem">
                <h3>期間</h3>
                {this.state.dates.map((date,index) => (<div key={index}><li className="dateItem">{date.dateOption + ' '}
                <button id="voteButton" onClick={this.dateVoteClick.bind(this, date)}>投票する</button>
                <span>投票: {date.votes}</span> </li></div> ))}
              </div>
              <div className="tripItem">
                <h3>コメント</h3>
                {this.state.comments.map((comment,index) => (<div key={index}><div className="commentItem">{comment.comment} - {comment.username}</div></div>))}

                <textarea onChange={(e) => this.setState({comment: e.target.value})} placeholder="Add a comment"></textarea>
                <button id="secondary" onClick={this.onCommentSubmission}>入力</button>
              </div>
            </div>

            <div className="column2">
              <div className="tripItem">
                <h3>アクティビティ</h3>
                {this.state.activities.map((activity,index) => (
                  <div key={index} id='activityList'>
                    <div className="activityGroup">
                      <li><span>アクティビティ:</span> {activity.activityName} </li>
                      <li><span>内容:</span> {activity.activityDescription} </li>
                      <li><span>値段:</span> ${activity.est_cost} </li>
                      <button id="activityVoteButton" onClick={this.activityOptionsClick.bind(this, activity)}>投票する</button>
                      <span>投票: </span> {activity.vote_count}
                    </div>
                  </div>))
                }

                <h4>アクティビティを入れる</h4>
                <input name="activity" type ="text" placeholder="アクティビティ" onChange={e => this.setState({activityName: e.target.value})}/>
                <input name="activity" type ="text" placeholder="内容" onChange={e => this.setState({activityDescription: e.target.value})}/>
                <input name="activity" type ="text" placeholder="値段" onChange={e => this.setState({activityCost: e.target.value})}/>

                <button id="activitybtn" onClick={this.onActivityClick}>+</button>
              </div>
            </div>
          </div>
        </div>
        <YelpSearchJp/>
      </div>
    )
  }
}

export default ContributeTripJp;
