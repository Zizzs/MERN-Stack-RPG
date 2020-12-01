import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ZoneController.css";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import { setLocation, setSubLocation } from "../../actions/locationActions";
import { calculateCurrentZoneData, calculateCurrentRegionData } from "./CalculateZoneLocation";


import RegionComponent from "./ZoneLayouts/RegionComponent";

class ZoneController extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentZoneData: {},
      currentRegionData: {},
    }
  }

  componentDidMount = () => {
    // Auth Check
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    console.log("Mounting Zone Controller");

    let user = this.props.auth.user;
    if(this.checkObj(user.character)){
      // Grabs the zone data from WorldZoneData --- example (/Zone/CrystalForest, Spire Path)

      // Chek if the zoneData state is empty
      if(Object.keys(this.state.currentZoneData).length === 0 && Object.keys(this.state.currentRegionData).length === 0){
        let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);
        let tempRegionData = calculateCurrentRegionData(user.character.location);
        // Sets the state to the currentZoneData and currentRegionData
        this.setState({ currentZoneData: tempZoneData, currentRegionData: tempRegionData }, () => {
          //console.log(`${user.character.location} data has been set.`);
        }); 
      } else if (Object.keys(this.state.currentRegionData).length === 0){
        let tempRegionData = calculateCurrentRegionData(user.character.location);
        // Sets the state to the currentRegionData
        this.setState({ currentRegionData: tempRegionData }, () => {
          //console.log(`${user.character.location} data has been set.`);
        }); 
      } else if(Object.keys(this.state.currentZoneData).length === 0){
        let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);
        //console.log("Setting Current Zone");
        // Sets the state to the currentZoneData and currentRegionData
        this.setState({ currentZoneData: tempZoneData }, () => {
          //console.log(`${user.character.location} data has been set.`);
        }); 
      }
    }
  };

  componentDidUpdate = () => {
    // Repeat of above, but with extra check for "/HUB" location data. 
    let user = this.props.auth.user;
    // Double check if user.character holds data (No character data = Something messed up in Wrapper)
    if (this.checkObj(user.character)) {
      // If the user's location is not the current zone's location, and their location is "/HUB" due to pathing/location issue, send them back.
      if (user.character.location !== this.state.location && user.character.location === "/HUB") {
        saveUser(user);
        

        this.props.history.push(user.character.location);
      } else if(Object.keys(this.state.currentZoneData).length !== 0 && this.state.currentZoneData.name !== user.character.sublocation){
        // Grab zone data from WorldZoneData
        let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);
        // If the current state's zone data is not the same as the retrieved data, set the state to the new zone's data
        if(this.state.currentZoneData.name !== tempZoneData.name){
          this.setState({ currentZoneData: tempZoneData }, () => {
            //console.log(`${user.character.location} data has been set.`);
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

  redirectLocation = (location) => {
    let user = this.props.auth.user;
    setLocation(user, location);
    user = this.props.auth.user;
    saveLocalUser(user);
    saveUser(user);
    this.props.history.push(location);
  };

  // Main Zone Redirect Function
  redirectToWorldZone = (location, subLocation) => {
    let user = this.props.auth.user;
    // If the user's location is set to the HUB, then we're sending them back and wiping their character subzone data.
    if(subLocation === "/HUB"){
      setLocation(user, subLocation);
      setSubLocation(user, "");

      user = this.props.auth.user;
      saveLocalUser(user);
      saveUser(user);
      this.props.history.push(location);
    } else {
      // If the user's location is not the HUB, that means they've chosen a new subzone to go to. (Spire Path -> Vinefall)
      //console.log(`Sending ${user.name} to ${location}/${subLocation}.`);
      setLocation(user, location);
      setSubLocation(user, subLocation);

      user = this.props.auth.user;
      saveLocalUser(user);
      // -----------
      // Save user is commented out for now, and will use the saves from the combat controler or event controllers
      //saveUser(user);
      // ----------
      this.props.updateWrapperAction(`Moved Zone To ${location}/${subLocation}`);
    }
  };

  render() {
    const { user } = this.props.auth;
    if(this.checkObj(user.character)){
        return(
          <div id="zoneContainer">
            <RegionComponent regionData={this.state.currentRegionData} redirectToWorldZone={this.redirectToWorldZone} zoneData={this.state.currentZoneData}/>
          </div>
        );
      
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
