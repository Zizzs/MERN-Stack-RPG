import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./../Combat.css";

class Combat extends Component {

  redirectLocation = (location) => {
    const { user } = this.props.auth;
    console.log(`Sending ${user.name} to ${location}.`);
    this.props.history.push(location);
  };

  render() {
    console.log(this.props.controllerState.abilities);
    return (
      <div id="combat">
        <div id="leftImage">
          <img alt="left combat" id="combatLeft" src={this.props.controllerState.imageLeft} />
        </div>
        <div id="mainCombatDiv">
          <div id="combatWrapper">
            <img id="combatImage" alt="monster" src={this.props.controllerState.enemy.image} />
            <div>
              <h3>{this.props.controllerState.enemy.name}</h3>
            </div>
              <div id="healthBarCombat">
                  <div id="healthBarOutlineCombat">
                    <div
                      style={{
                        backgroundColor: "#8B0000",
                        height: "100%",
                        width: `${this.props.controllerState.monsterHealthPercent}%`,
                      }}
                    ></div>
                  </div>
                </div>
            <div id="combatInteractibles">
              <div id="abilityPanel">
                <div
                  className="skillPanel"
                  onClick={() => this.props.clickedAbility(1)}
                >
                  {this.props.controllerState.abilities.one.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.props.clickedAbility(2)}
                >
                  {this.props.controllerState.abilities.two.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.props.clickedAbility(3)}
                >
                  {this.props.controllerState.abilities.three.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.props.clickedAbility(4)}
                >
                  {this.props.controllerState.abilities.four.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.props.clickedAbility(5)}
                >
                  {this.props.controllerState.abilities.five.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.props.clickedAbility(6)}
                >
                  {this.props.controllerState.abilities.six.info.name}
                </div>
              </div>
              
            </div>
            <button
            style={{
              width: "250px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            to="/HUB"
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={(e) => {
              e.preventDefault();
              this.redirectLocation(this.props.auth.user.character.location);
            }}
          >
            Flee
          </button>
          {/* Debug button to win combat
          <button
            style={{
              width: "250px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            to="/HUB"
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={(e) => {
              e.preventDefault();
              this.props.winCombat();
            }}
          >
            Win
          </button>
          */}
          </div>
          
        </div>
        <div id="rightImage">
          <img
            alt="right combat"
            id="combatRight"
            src={this.props.controllerState.imageRight}
          />
        </div>
      </div>
    );
  }
}

Combat.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  withRouter(Combat)
);
