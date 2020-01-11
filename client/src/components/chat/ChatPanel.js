import React, { Component } from "react";
import Draggable from "react-draggable";
import "./ChatPanel.css";

class ChatPanel extends Component {
  render() {
    let { panelOpen } = this.props;
    let visibility = "hide";
    if (panelOpen) {
      visibility = "show";
    } else {
      visibility = "hide";
    }

    return (
      <Draggable>
        <div id="chatPanel" className={visibility}>
          Chat
          <button onClick={this.props.togglePanel}>Toggle</button>
        </div>
      </Draggable>
    );
  }
}

export default ChatPanel;
