import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { handleSucces} from "../utils";


function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSucces('User LoggedOut')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome, {loggedInUser || "User"}!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          You are successfully logged in.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
