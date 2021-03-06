import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// [TO DO: Might be able to refactor with YelpGallery to reuse more code]
class YelpSearchCh extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yelpInfo: {},
      yelpResults: {}
    }
    this.updateInputs = this.updateInputs.bind(this);
    this.fetchYelpInfo = this.fetchYelpInfo.bind(this);
  }

  fetchYelpInfo(input, e) {
    e.preventDefault();
    axios.get('/yelp', {
      params: {
        term: input.term,
        location: input.location,
        sort_by: "best_match",
        numResults: 3
      }
    })
      .then((response) => {
        var yelpResults = this.state.yelpResults;
        yelpResults['entries'] = response.data.resultArray;
        this.setState({ yelpResults });
      })
      .catch(err => {
        console.error("Error", err);
      })
  }

  updateInputs(e) {
    var yelpInfo = this.state.yelpInfo;
    var name = e.target.name;
    var value = e.target.value;

    yelpInfo[name] = value;
    this.setState({ yelpInfo });
  }

  render() {
    var yelpResults = this.state.yelpResults.entries;

    return (
      <div className="yelpContainer">
        <div className="yelpContents">
          <h4>從Yelp 找尋活動的想法</h4>
          <form id="yelpForm" onSubmit={this.fetchYelpInfo.bind(this, this.state.yelpInfo)}>
            <div className="form_element">
              <input name="term" type="text" placeholder='活動' onChange={this.updateInputs} />
            </div>

            <div className="form_element">
              <input name="location" type="text" placeholder='地點' onChange={this.updateInputs} />
            </div>
            <button id="mainCTA">搜尋</button>
          </form>
          <div className="yelpResults">
            { yelpResults ? yelpResults.map((entry, index) => {
                return (<div key={index} id="yelpResultItem">
                  <div onClick={e=> this.props.insertYelpActivityToForm(entry.name, entry.url)} id="pic_container">
                    <img src={entry.image_url} />
                  </div>
                  <div>{entry.name}</div>
                  <div id="rating">評語: {entry.rating}/5</div>
                </div>)
              }) : null }
          </div>
        </div>
      </div>
    )
  }
}

export default YelpSearchCh;
