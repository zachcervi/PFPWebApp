import axios from "axios";

function signUpForVisit(data) {
  if (data.firstName && data.roomNumber) {
    const { firstName, roomNumber } = data;
    return axios
      .post("https://pawsforpatients-16f0a.web.app/visit", {
        firstName,
        roomNumber,
      })
      .then((response) => response)
      .catch((error) => error);
  }
}

export default signUpForVisit;
