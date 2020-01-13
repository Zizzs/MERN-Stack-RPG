import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import "./AbilityPanel.css";

import { getAllAbilities } from "../../actions/abilitiesActions";

class AbilityPanel extends Component {
  componentDidUpdate() {
    let abilities = getAllAbilities();
  }
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
        <div id="abilityPanel" className={visibility}>
          <button onClick={this.props.togglePanel} className="closePanelButton">
            X
          </button>
        </div>
      </Draggable>
    );
  }
}

AbilityPanel.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AbilityPanel);
