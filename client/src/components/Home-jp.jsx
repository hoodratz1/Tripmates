import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import HeaderJp from './Header-jp';
import YelpSearchJp from './YelpSearch-jp';
import YelpGalleryJp from './YelpGallery-jp';


class HomeJp extends React.Component {
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
        <HeaderJp loggedInUser = {this.props.loggedInUser} />
        <div id="banner">
          <div id="tagline">
            みんなと一緒に世界を回ろう。
          </div>
          <Link to="/createTrip"><button id="mainCTA">旅行を作ろう</button></Link>
        </div>
        <div id="galleryHeader">
          <h2>人気の目的地</h2>
        </div>
        <YelpGalleryJp />
      </div>
    )
  }
}

export default HomeJp;
