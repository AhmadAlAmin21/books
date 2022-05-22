import { GoogleLogin } from 'react-google-login';

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function login(){

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESSFUL. Current user: ", res.profileObj);
    }

    const onFaliure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
             clientId = {clientId}
             buttonText="Login"
             onSuccess={onSuccess}
             onFaliure={onFaliure}
             cookiePolicy={'single_host_origin'}
             isSignedIn={true}
            />
        </div>
    )
}

export default login;