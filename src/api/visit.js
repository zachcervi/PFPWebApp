import axios from "axios";

function signUpForVisit(data) {
  if (data.firstName && data.roomNumber) {
    const config = {
      headers: {
        Authorization:
          "Bearer " + process.env.REACT_APP_PFP_WEB_APP_ACCESS_TOKEN,
      },
    };
    const url =
      "https://us-central1-pawsforpatients-16f0a.cloudfunctions.net/app/visits";

    return axios
      .post(url, data, config)
      .then((response) => response)
      .catch((error) => error);
  }
}

export default signUpForVisit;
