import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../App';
import { useContext } from "react";

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";


function Login(){

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESSFUL! Current user: ", res.profileObj);
        if (user.loggedIn) return;
        setUser({ loggedIn: true });
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
             />
        </div>
    )
}

export default Login;