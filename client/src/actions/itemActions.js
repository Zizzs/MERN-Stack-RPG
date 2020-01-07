import axios from "axios";

// Give the user an item
export const giveUserItem = (userData, item) => {
  //console.log(item);
  let data = {
    userData: userData,
    item: item
  };
  axios({
    method: "post",
    url: "/api/items/giveItem",
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

export const fragmentItem = (user, item) => {};
