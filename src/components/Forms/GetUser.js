import axios from "axios";

export const GetUser = async (props) => {
  const email = localStorage.getItem("email");
  const token = JSON.parse(localStorage.getItem("userToken"));
  try {
    const res = await axios.get(
      "https://localhost:7177/api/users/search/" + email,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res === 200) {
      console.log("get user response", res);
      return res.data;
    }
  } catch (error) {
    console.log("ERROR: failed fetching user profile from api", error);
  }
};
