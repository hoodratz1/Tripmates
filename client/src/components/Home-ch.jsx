import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import HeaderCh from './Header-ch';
import YelpSearchCh from './YelpSearch-ch';
import YelpGalleryCh from './YelpGallery-ch';


class HomeCh extends React.Component {
  constructor(props) {
    super(props);
    axios.post('/login', null)
      .then((response) => {

          if(response.data && typeof response.data !== 'boolean') {
            this.props.checkUser(response.data);
            this.props.history.push('/profile');
          }

      })
      .catch(err => {
        console.error("Error logging in", err);
      })
  }

  render() {
    return (
      <div id="main">
        <HeaderCh loggedInUser = {this.props.loggedInUser} />
        <div id="banner">
          <div id="tagline">
            和你的隊友一起探索世界
          </div>
          <Link to="/createTrip"><button id="mainCTA">開創一個行程</button></Link>
        </div>
        <div id="galleryHeader">
          <h2>熱門的目的地</h2>
        </div>
        <YelpGalleryCh />
      </div>
    )
  }
}

export default HomeCh;
