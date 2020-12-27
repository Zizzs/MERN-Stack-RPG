import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {giveUserDaggerSetup} from "../../actions/newUserActions";
import {getAllAbilities} from "../../actions/abilitiesActions";

import "./NewUser.css";

class NewUser extends Component {
  state = {
    abilities: [],
  }

  componentDidMount() {
    if(this.checkObj(this.state.abilities) === false){
      getAllAbilities().then(abilities => {
        this.setState({ abilities: abilities});
      });
    }
  }

  giveUserDaggers = () => {
    const {user} = this.props.auth;
    giveUserDaggerSetup(user, this.state.abilities.dagger, this.state.abilities.utility);
    this.props.updateWrapperAction("New User Initialized");
  }

  checkObj = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  render() {
      return (
        <div id="newUserContainer">
          <h5>Welcome travelling celestial. Please select your desired weapon.</h5>
          <div>This will unlock the weapon's initial abilities, give you a basic weapon, and set some basic combat preferences.</div>
          <div>
          <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1px",
                marginTop: "1rem",
              }}
              onClick={() => {this.giveUserDaggers()}}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            >
              Dagger
            </button>
          </div>
          <div></div>
          
        </div>

      );
  }
}

NewUser.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NewUser);