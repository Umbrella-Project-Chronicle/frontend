import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  localStorage.removeItem("userProfile");
  localStorage.removeItem("userToken");

  navigate("/");
}

export default SignOut;
