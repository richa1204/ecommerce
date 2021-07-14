import axios from "axios";

const Signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return axios({
      url: `${process.env.REACT_APP_API_URL}/api/user/Signout`,
      method: "get",
    })
      .then((response) => console.log("Signout Successfull"))
      .catch((err) => console.log(err));
  }
};

export default Signout;