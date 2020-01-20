import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import "./CharacterPanel.css";
import faceImage from "../../images/blankFace.png";

class CharacterPanel extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    if (this.checkObj(user.character)) {
      this.state = {
        health: user.character.health,
        maxHealth: user.character.maxHealth,
        mana: user.character.mana,
        maxMana: user.character.maxMana,
        energy: user.character.currentEnergy,
        maxEnergy: user.character.maxEnergy,
        boundFragments: user.character.boundFragments,
        unboundFragments: user.character.unboundFragments,
        strength: user.character.strength,
        dexterity: user.character.dexterity,
        intellect: user.character.intellect,
        luminosity: user.character.luminosity,
        spark: user.character.spark,
        enlightenment: user.character.enlightenment
      };
    } else {
      this.state = {
        health: 25,
        maxHealth: 25,
        mana: 25,
        maxMana: 25,
        energy: 50,
        maxEnergy: 50,
        boundFragments: 0,
        unboundFragments: 0,
        strength: 0,
        dexterity: 0,
        intellect: 0,
        luminosity: 0,
        spark: 0,
        enlightenment: 0
      };
    }
  }

  checkObj = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  render() {
    const { user } = this.props.auth;
    let { panelOpen } = this.props;
    let visibility = "hide";
    if (panelOpen) {
      visibility = "show";
    } else {
      visibility = "hide";
    }

    return (
      <Draggable>
        <div id="characterPanel" className={visibility}>
          <div id="characterPanelHeader">
            <img alt="character" id="imagePic" src={faceImage} />
            <p id="characterName">{user.name}</p>
          </div>
          <div id="healthMana">
            <p>Health: {this.state.health}</p>
            <p>Max Health: {this.state.maxHealth}</p>
            <p>Mana: {this.state.mana}</p>
            <p>Max Mana: {this.state.maxMana}</p>
          </div>
          <div id="mainStats">
            <p>Strength: {this.state.strength}</p>
            <p>Dexterity: {this.state.dexterity}</p>
            <p>Intellect: {this.state.intellect}</p>
          </div>
          <div id="extraStats">
            <p>Luminosity: {this.state.luminosity}</p>
            <p>Spark: {this.state.spark}</p>
            <p>Enlightenment: {this.state.enlightenment}</p>
          </div>
          <div id="energyStats">
            <p>Current Energy: {this.state.currentEnergy}</p>
            <p>Max Energy: {this.state.maxEnergy}</p>
          </div>
          <div id="fragmentStats">
            <p>Bound Fragments: {this.state.boundFragments}</p>
            <p>Unbound Fragments: {this.state.unboundFragments}</p>
          </div>

          <button onClick={this.props.togglePanel} className="closePanelButton">
            X
          </button>
        </div>
      </Draggable>
    );
  }
}

CharacterPanel.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CharacterPanel);
