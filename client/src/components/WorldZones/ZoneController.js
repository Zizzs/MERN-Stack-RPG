import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ZoneController.css";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import { setLocation, setSubLocation } from "../../actions/locationActions";
import { calculateCurrentZoneData } from "./CalculateZoneLocation";


import CrystalForest from "./ZoneLayouts/CrystalForest";

class ZoneController extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentZoneData: {},
    }
  }

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    console.log("Mounting Zone Controller");

    let user = this.props.auth.user;
    if(this.checkObj(user.character)){
      let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);

      if(Object.keys(this.state.currentZoneData).length === 0){
        console.log(tempZoneData);
        console.log("Setting Current Zone");
        this.setState({ currentZoneData: tempZoneData }, () => {
          console.log(this.state);
        }); 
      }
    }
  };

  componentDidUpdate = () => {
    let user = this.props.auth.user;
    console.log(user);
    if (this.checkObj(user.character)) {
      if (user.character.location !== this.state.location && user.character.location === "/HUB") {
        console.log("User in wrong place!");
        this.props.history.push(user.character.location);
      } else {
        let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);
        console.log("Setting Current Zone");
        console.log(tempZoneData);
        if(this.state.currentZoneData !== tempZoneData){
          this.setState({ currentZoneData: tempZoneData }, () => {
            console.log(this.state);
          }); 
        }
      }
    }
  }

  checkObj = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  fixLocation = () => {
    let user = this.props.auth.user;
    console.log(`Fixing ${user.name} location.`);
    this.props.history.push(user.character.location);
  };

  redirectLocation = (location) => {
    let user = this.props.auth.user;
    console.log(`Sending ${user.name} to ${location}.`);
    setLocation(user, location);
    user = this.props.auth.user;
    saveLocalUser(user);
    saveUser(user);
    this.props.history.push(location);
  };

  redirectToWorldZone = (location, subLocation) => {
    let user = this.props.auth.user;
    if(subLocation === "/HUB"){
      console.log("Going Back to HUB");
      setLocation(user, subLocation);
      setSubLocation(user, "");
      user = this.props.auth.user;
      console.log(user);
      saveLocalUser(user);
      saveUser(user);
      this.props.history.push(location);
    } else {
      console.log(`Sending ${user.name} to ${location}/${subLocation}.`);
      setLocation(user, location);
      setSubLocation(user, subLocation);
      user = this.props.auth.user;
      saveLocalUser(user);
      saveUser(user);
      this.props.updateWrapperAction(`Moved Zone To ${location}/${subLocation}`);
      //this.props.history.push(location);
    }
  };

  render() {
    const { user } = this.props.auth;
    //console.log(user);
    if(this.checkObj(user.character)){
      if(user.character.location === "/Zone/CrystalForest"){
        console.log("User is in Crystal Forest");
        return(
          <div id="zoneContainer">
            <CrystalForest redirectToWorldZone={this.redirectToWorldZone} zoneData={this.state.currentZoneData}/>
          </div>
        );
      } else {
        console.log("User is in Wrong Location");
        return(
        <div id="zoneContainer">
          Wrong Location
          <button
            style={{
              width: "200px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={(e) => {
              e.preventDefault();
              this.redirectLocation("/HUB");
            }}
          > Fix My Location
            </button>
          </div>);
      }
    } else {
      return(<div>Loading...</div>);
    }
  }

}
    


ZoneController.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  ZoneController
);
