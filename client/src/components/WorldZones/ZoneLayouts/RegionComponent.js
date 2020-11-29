import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ZoneLayout.css";

class RegionComponent extends Component {

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    let buttonOneActive = true;
    let buttonTwoActive = true;
    let buttonThreeActive = true;
    let buttonFourActive = true;

    console.log(this.props.zoneData);

    if(this.props.zoneData.exitOne === "None"){
      buttonOneActive = false;
    }

    if(this.props.zoneData.exitTwo === "None"){
      buttonTwoActive = false;
    }

    if(this.props.zoneData.exitThree === "None"){
      buttonThreeActive = false;
    }

    if(this.props.zoneData.exitFour === "None"){
      buttonFourActive = false;
    }
    
    return(
      <div id="zoneMain">
        <div id="zoneImgLeft">
          <img alt="Photo of the Current Region Left" src={this.props.regionData.imgLeft}></img>
        </div>
        <div id="mainZoneDiv">
          <div className="zoneCellTop"></div>
            <div>
              <h4>{this.props.zoneData.name}</h4>
            </div>
          <div className="zoneCellTop"></div>
          <div className="zoneCellMidOuter">Combat Buttons</div>
          <div className="zoneCellMid"></div>
          <div className="zoneCellMidOuter">Explore Buttons?</div>
          <div className="zoneNavButtonDiv zoneCellBottom">
            {buttonOneActive && <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitOne)}
            >
              {this.props.zoneData.exitOne}
            </button>}
          </div>
          <div className="zoneCellBottom"></div>
          <div className="zoneNavButtonDiv zoneCellBottom">
            {buttonTwoActive && <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitTwo)}
            >
              {this.props.zoneData.exitTwo}
            </button>}
            {buttonThreeActive && <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitThree)}
            >
              {this.props.zoneData.exitThree}
            </button>}
            {buttonFourActive && <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.props.redirectToWorldZone(this.props.zoneData.location, this.props.zoneData.exitFour)}
            >
              {this.props.zoneData.exitFour}
            </button>}
          </div>
        </div>
        <div id="zoneImgRight">
          <img alt="Photo of the Current Region Left" src={this.props.regionData.imgRight} ></img>
        </div>
      </div>
    );
  }

}
    


RegionComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  RegionComponent
);
