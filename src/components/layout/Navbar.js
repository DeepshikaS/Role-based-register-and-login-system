import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Router>
              {" "}
              <Link
                to="/"
                style={{
                  fontFamily: "monospace",
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">code</i>
                MERN
              </Link>
            </Router>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
