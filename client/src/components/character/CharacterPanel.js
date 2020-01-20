import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import "./CharacterPanel.css";
import faceImage from "../../images/blankFace.png";

class CharacterPanel extends Component {
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
            <p>Health: {user.character.health}</p>
            <p>Max Health: {user.character.maxHealth}</p>
            <p>Mana: {user.character.mana}</p>
            <p>Max Mana: {user.character.maxMana}</p>
          </div>
          <div id="mainStats">
            <p>Strength: {user.character.strength}</p>
            <p>Dexterity: {user.character.dexterity}</p>
            <p>Intellect: {user.character.intellect}</p>
          </div>
          <div id="extraStats">
            <p>Luminosity: {user.character.luminosity}</p>
            <p>Spark: {user.character.spark}</p>
            <p>Enlightenment: {user.character.enlightenment}</p>
          </div>
          <div id="energyStats">
            <p>Current Energy: {user.character.currentEnergy}</p>
            <p>Max Energy: {user.character.maxEnergy}</p>
          </div>
          <div id="fragmentStats">
            <p>Bound Fragments: {user.character.boundFragments}</p>
            <p>Unbound Fragments: {user.character.unboundFragments}</p>
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
