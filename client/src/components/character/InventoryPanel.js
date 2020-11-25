import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { fragmentItem, equipWeapon } from "../../actions/itemActions";
import "./InventoryPanel.css";

class InventoryPanel extends Component {
  state = {
    previousAction: "",
  }

  componentDidUpdate = () => {
    if(this.state.previousAction !== this.props.previousAction){
      this.setState({previousAction: this.props.previousAction,});
    }
  }

  equipInventoryItem = (e, item) => {
    e.preventDefault();
    // This will contain a weapon swap string at some point. It will just be "WeaponOne" for the time being.
    const { user } = this.props.auth;
    equipWeapon(user, item, "WeaponOne");
    this.props.updateNavbarState("Equipped Item");
  };

  fragmentInventoryItem = (e, item) => {
    e.preventDefault();
    const { user } = this.props.auth;
    fragmentItem(user, item);
    this.props.updateNavbarState("Fragmented Item");
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

    let equippedWeaponOne = user.character.equipment.weaponOne;
    //console.log(equippedWeaponOne);
    return (
      <Draggable>
        <div id="inventoryPanel" className={visibility}>
          <p id="inventoryHeader">Inventory</p>
          <button onClick={this.props.togglePanel} className="closePanelButton">
            X
          </button>
          <div>
            <p>Equipped Weapon</p>
            <p>
              {equippedWeaponOne.name} - {equippedWeaponOne.type} -
              {equippedWeaponOne.rarity} - {equippedWeaponOne.damage}
            </p>
          </div>
          <div id="inventoryItems">
            <p>Total Items: {user.character.items.length}</p>
            {user.character.items.map((item) => (
              <p className="inventoryItem" key={uuidv4()}>
                {item.name} - {item.type} - {item.rarity} - {item.damage}{" "}
                <button
                  onClick={(e) => {
                    this.equipInventoryItem(e, item);
                  }}
                >
                  Equip
                </button>
                <button
                  onClick={(e) => {
                    this.fragmentInventoryItem(e, item);
                  }}
                >
                  Fragment [{item.fragment}]
                </button>
              </p>
            ))}
          </div>
        </div>
      </Draggable>
    );
  }
}

InventoryPanel.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(InventoryPanel);
