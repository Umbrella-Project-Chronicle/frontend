import axios from "axios";

export const GetUser = async () => {
  console.log("getuser ran");
  // needs to be set in each api call in order to assure the variable is set
  const token = JSON.parse(localStorage.getItem("userToken"));
  try {
    const res = await axios.get("https://localhost:7177/api/users/search/" + localStorage.getItem("email"), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("getuser", res.data);
    return res.data;
    // console.log("user profile fetched from api", res);
    // gets user jounrals only if user is successfully fetched from api
  } catch (error) {
    console.log("ERROR: failed fetching user profile from api", error);
  }
};
