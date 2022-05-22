import { GoogleLogin } from 'react-google-login';

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";
function logout(){

    const onSuccess = () => {
        console.log("LOGOUT SUCCESSFUL.");
    }

    return(
        <div id="signOutButton">
            <GoogleLogin
             clientId = {clientId}
             buttonText={"Logout"}
             onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default logout;