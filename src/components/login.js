import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function Login(){

    let navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESSFUL. Current user: ", res.profileObj);
        navigate("/AuthorSearch")
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

export default Login;