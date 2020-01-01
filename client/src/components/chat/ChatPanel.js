import React, { Component } from "react";
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
      <div id="chatPanel" className={visibility}>
        Chat
      </div>
    );
  }
}

export default ChatPanel;
