import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { fragmentItem } from "../../actions/itemActions";
import "./InventoryPanel.css";

class InventoryPanel extends Component {
  constructor(props) {
    super(props);
  }

  fragmentInventoryItem = (e, item) => {
    e.preventDefault();
    const { user } = this.props.auth;
    fragmentItem(user, item);
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
        <div id="inventoryPanel" className={visibility}>
          <p id="inventoryHeader">Inventory</p>
          <button onClick={this.props.togglePanel} className="closePanelButton">
            X
          </button>
          <div id="inventoryItems">
            <p>Total Items: {user.character.items.length}</p>
            {user.character.items.map((item) => (
              <p className="inventoryItem" key={uuidv4()}>
                {item.name} - {item.rarity} - {item.damage}{" "}
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
