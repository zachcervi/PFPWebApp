import axios from "axios";

function signUpForVisit(data) {
  if (data.firstName && data.roomNumber) {
    const { firstName, roomNumber } = data;
    return axios
      .post(
        "https://us-central1-pawsforpatients-16f0a.cloudfunctions.net/app/visit",
        {
          firstName,
          roomNumber,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
}

export default signUpForVisit;
