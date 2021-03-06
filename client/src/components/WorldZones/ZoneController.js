import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ZoneController.css";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import { setLocation, setSubLocation } from "../../actions/locationActions";
import { calculateCurrentZoneData, calculateCurrentRegionData } from "./CalculateZoneLocation";
import { giveUserItem, generateItem } from "../../actions/itemActions";


import RegionComponent from "./ZoneLayouts/RegionComponent";
import CombatController from "../Combat/CombatController";
import CelestialTower from "../WorldZones/Dungeons/CelestialTower";
import HUB from "./MajorLocations/HUB/HUB";
import NewUser from "../layout/NewUser";

class ZoneController extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentZoneData: {},
      currentRegionData: {},
      inCombat: false,
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
        this.setState({ currentZoneData: tempZoneData, currentRegionData: tempRegionData }); 

      } else if (Object.keys(this.state.currentRegionData).length === 0){
        let tempRegionData = calculateCurrentRegionData(user.character.location);

        // Sets the state to the currentRegionData
        this.setState({ currentRegionData: tempRegionData }); 

      } else if(Object.keys(this.state.currentZoneData).length === 0){
        let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);
      
        // Sets the state to the currentZoneData and currentRegionData
        this.setState({ currentZoneData: tempZoneData }); 
      }
    }
  };

  componentDidUpdate = () => {
    // Repeat of above, but with extra check for "/HUB" location data. 
    let user = this.props.auth.user;
    // Double check if user.character holds data (No character data = Something messed up in Wrapper)
    if (this.checkObj(user.character)) {
      // If the user's location is not the current zone's location, and their location is "/Zone/HUB" due to pathing/location issue, send them back.
       if(Object.keys(this.state.currentZoneData).length !== 0 && (this.state.currentZoneData.name !== user.character.sublocation || user.character.location === "/Zone/HUB")){
        // Grab zone data from WorldZoneData
        console.log("Loading Zone Data");
        let tempZoneData = calculateCurrentZoneData(user.character.location, user.character.subLocation);
        let tempRegionData = calculateCurrentRegionData(user.character.location);
        // If the current state's zone data is not the same as the retrieved data, set the state to the new zone's data
        if(this.state.currentZoneData.name !== tempZoneData.name){
          this.setState({ currentZoneData: tempZoneData, currentRegionData: tempRegionData }, () => {
            //console.log(`${user.character.location} data has been set.`);
          }); 
        }
      }
      //this.props.history.push(this.state.currentZoneData.location);
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

  beginZoneCombat = () => {
    this.setState({inCombat: true});
  }

  endZoneCombat = () => {
    this.setState({inCombat: false});
  }

  // Main Zone Redirect Function
  redirectToWorldZone = (location, subLocation) => {
    let user = this.props.auth.user;
    // If the user's location is set to the HUB, then we're sending them back and wiping their character subzone data.
    if(subLocation === "/Zone/HUB" || subLocation === "/Zone/CelestialTower"){
      setLocation(user, subLocation);
      setSubLocation(user, "");

      user = this.props.auth.user;
      saveLocalUser(user);
      if(subLocation === "/Zone/HUB"){
        saveUser(user);
      }
      this.props.history.push(subLocation);
    } else {
      // If the user's location is not the HUB, that means they've chosen a new subzone to go to. (Spire Path -> Vinefall)
      //console.log(`Sending ${user.name} to ${location}/${subLocation}.`);
      setLocation(user, location);
      setSubLocation(user, subLocation);

      user = this.props.auth.user;
      saveLocalUser(user);
      this.props.history.push(location);
      // -----------
      // Save user is commented out for now, and will use the saves from the combat controler or event controllers
      //saveUser(user);
      // ----------
      this.props.updateWrapperAction(`Moved Zone To ${location}/${subLocation}`);
    }
  };

  createItem = (e) => {
    e.preventDefault();
    let user = this.props.auth.user;
    generateItem(1, "Weapon", "Dagger", 2000, "", "", 1).then((response) => {
      giveUserItem(user, response.data.item);
      this.props.updateWrapperAction(`Gained Item`);
    });
    // generateItem(1, "Token", "Rusted", 1.0, "", "", 1).then((response) => {
    //   console.log(response);
    //   giveUserItem(user, response.data.item);
    //   this.props.updateWrapperAction(`Gained Item`);
    // });

  };

  render() {
    const { user } = this.props.auth;
    //console.log(this.state.currentZoneData, this.state.currentRegionData);
    console.log(user);
    if(this.checkObj(user.character)){
      if(user.character.newUser === true){
        return (
        <div id="zoneContainerForNewUser">
            <NewUser updateWrapperAction={this.props.updateWrapperAction}/>
        </div> 
        );
      } else if(user.character.location === "/Zone/HUB" && this.state.inCombat === false){
        return(
          <div id="zoneContainer">
            <HUB createItem={this.createItem} sendToCombat={this.beginZoneCombat} updateWrapperAction={this.props.updateWrapperAction} redirectToWorldZone={this.redirectToWorldZone}/>
          </div>
        );
      } else if(user.character.location === "/Zone/CelestialTower" && this.state.inCombat === false){
        return(
          <div id="zoneContainer">
            <CelestialTower redirectToWorldZone={this.redirectToWorldZone} sendToCombat={this.beginZoneCombat}/>
          </div>
        );
      } else if (this.state.inCombat === false){
          return(
            <div id="zoneContainer">
              <RegionComponent regionData={this.state.currentRegionData} redirectToWorldZone={this.redirectToWorldZone} zoneData={this.state.currentZoneData} sendToCombat={this.beginZoneCombat}/>
            </div>
          );
        
      } else if(this.state.inCombat === true){
        return(
          <div id="zoneContainer">
            <CombatController zoneData={this.state.currentZoneData} regionData={this.state.currentRegionData} updateWrapperAction={this.props.updateWrapperAction} endCombat={this.endZoneCombat}/>
          </div>
        );
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
