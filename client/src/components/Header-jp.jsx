import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class HeaderJp extends React.Component {
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
                <li><a href="/logout">ログアウト</a></li>
                <li><Link to="/profile">プロフィール</Link></li>
                <li>こんにちわ {this.props.loggedInUser}!</li>
              </nav>
              ) : (
                <nav>
                  <li><Link to="/login">ログイン</Link></li>
                  <li><Link to="/signup">会員登録</Link></li>
                </nav>
              )}

        </div>
      </div>
    )
  }
}

export default HeaderJp;
