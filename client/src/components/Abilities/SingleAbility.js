import React, { Component } from "react";
import Draggable from "react-draggable";
import "./SingleAbility.css";

class SingleAbility extends Component {
  componentDidUpdate = () => {
    console.log(this.props);
  };
  render() {
    let { panelOpen } = this.props;
    let visibility = "hide";
    if (panelOpen) {
      visibility = "show";
    } else {
      visibility = "hide";
    }

    if (Object.keys(this.props.ability).length > 0) {
      return (
        <Draggable>
          <div id="singleAbility" className={visibility}>
            <div>
              <p>{this.props.ability.info.name}</p>
              <p>{this.props.ability.info.description}</p>
            </div>
            <button onClick={this.props.togglePanel}>Toggle</button>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable>
          <div id="singleAbility" className={visibility}>
            <button onClick={this.props.togglePanel}>Toggle</button>
          </div>
        </Draggable>
      );
    }
  }
}

export default SingleAbility;
