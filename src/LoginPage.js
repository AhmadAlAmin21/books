import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgvid2 from './videos/bgvid2.mp4';
import LoginButton from "./components/login";
import { gapi } from 'gapi-script';

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function LoginPage() {

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  const mainHeader = () => {
    return (
    <div>
      <div className='position-relative header d-flex justify-content-top align-items-center flex-column'>
        <h1 className='display-2 text-center text-white mb-3 mt-5'>
          Search For Authors
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <div className='position-relative d-flex justify-content-center align-items-center flex-column mb-3'>
          <LoginButton/>
          </div>
        </div>
      </div>
    </div>
    );
  };

    return (
      <div id='page'>
          {/* <video className='videoTag' autoPlay loop muted>
            <source src={bgvid2} type='video/mp4' />
          </video> */}
        <div id='header'> {mainHeader()} </div>
      </div>
    );
  
}

export default LoginPage;