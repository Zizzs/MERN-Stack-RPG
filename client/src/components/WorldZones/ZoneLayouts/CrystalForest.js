import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ZoneLayout.css";

class CrystalForest extends Component {

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  componentDidUpdate = () => {
    //console.log(this.props.zoneData);
  }

  render() {
    //console.log(this.props.zoneData.exitOne)
    return(
      <div id="zoneMain">
        <div id="zoneImgLeft">
          <p>img</p>
        </div>
        <div id="mainZoneDiv">
          <h2>{this.props.zoneData.name}</h2>
          <div>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitOne)}
            >
              {this.props.zoneData.exitOne}
            </button>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitTwo)}
            >
              {this.props.zoneData.exitTwo}
            </button>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitThree)}
            >
              {this.props.zoneData.exitThree}
            </button>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitFour)}
            >
              {this.props.zoneData.exitFour}
            </button>
          </div>
        </div>
        <div id="zoneImgRight">
          <p>img</p>
        </div>
      </div>
    );
  }

}
    


CrystalForest.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  CrystalForest
);
