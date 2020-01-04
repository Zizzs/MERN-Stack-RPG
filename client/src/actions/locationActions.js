import axios from "axios";

// Give the user an item
export const setLocation = (userData, location) => {
  //console.log(location);
  let data = {
    userData: userData,
    location: location
  };
  axios({
    method: "post",
    url: "/api/location/setLocation",
    headers: { "Content-Type": "application/json" },
    data: data
  })
    .then(function(response) {
      //console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
