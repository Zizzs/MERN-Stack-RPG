import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CharacterPanel.css";

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
      <div id="characterPanel" className={visibility}>
        <p>Name: {user.name}</p>
        <p>Health: {user.character.health}</p>
        <p>Max Health: {user.character.maxHealth}</p>
        <p>Mana: {user.character.mana}</p>
        <p>Max Mana: {user.character.maxMana}</p>
        <p>Strength: {user.character.strength}</p>
        <p>Dexterity: {user.character.dexterity}</p>
        <p>Intellect: {user.character.intellect}</p>
        <p>Luminosity: {user.character.luminosity}</p>
        <p>Spark: {user.character.spark}</p>
        <p>Enlightenment: {user.character.enlightenment}</p>
        <p>Current Energy: {user.character.currentEnergy}</p>
        <p>Max Energy: {user.character.maxEnergy}</p>
        <p>Bound Fragments: {user.character.boundFragments}</p>
        <p>Unbound Fragments: {user.character.unboundFragments}</p>
        <p>Item Count: {user.character.items.length}</p>
        <p>Equipped Items: {user.character.equippedItems.length}</p>
      </div>
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
