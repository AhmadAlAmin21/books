import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from "react";

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function Logout(){

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("LOGOUT SUCCESSFUL.");
        if (!user.loggedIn) return;
        setUser({ loggedIn: false });
        navigate("/books");
        }

    

    return(
        <div id="signOutButton">
            <GoogleLogout
             clientId = {clientId}
             buttonText={"Logout"}
             onLogoutSuccess={onSuccess}

            />
        </div>
    )
}

export default Logout;