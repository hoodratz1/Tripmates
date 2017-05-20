import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class HeaderCh extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="header_container">
          <div id="header_wrapper">
          <div id="logo">
            <Link to="/"><h1>Tripmates</h1></Link>
          </div>

            {this.props.loggedInUser ? (
              <nav>
                <li><a href="/logout">登出</a></li>
                <li><Link to="/profile">檔案</Link></li>
                <li>你好 {this.props.loggedInUser}!</li>
              </nav>
              ) : (
                <nav>
                  <li><Link to="/login">登入</Link></li>
                  <li><Link to="/signup">註冊</Link></li>
                </nav>
              )}

        </div>
      </div>
    )
  }
}

export default HeaderCh;
