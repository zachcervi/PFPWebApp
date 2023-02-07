import axios from "axios";

function signUpForVisit(data) {
  if (data.firstName && data.roomNumber) {
    const { firstName, roomNumber } = data;
    return axios
      .post("http://localhost:8080/visit", {
        firstName,
        roomNumber,
      })
      .then((response) => response)
      .catch((error) => error);
  }
}

export default signUpForVisit;
