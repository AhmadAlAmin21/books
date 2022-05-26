import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function Logout(){

    let navigate = useNavigate();

    const onSuccess = () => {
        console.log("LOGOUT SUCCESSFUL.");
        navigate("/Books")
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