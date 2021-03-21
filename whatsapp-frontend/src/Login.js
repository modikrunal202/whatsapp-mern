import React from 'react'
import { Button } from '@material-ui/core'
import "./Login.css"
// import { GoogleLogin } from 'react-google-login';

function Login({ responseGoogle, signIn }) {
    // const responseGoogle = (response) => {
    //     console.log(response);
    //     console.log('-------',response.profileObj);
    // }
    return (
        <div className="login">
            <div className="login__contaier">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt=""
                />
                <div className="login__next">
                    <h1>Sign in to whatsapp</h1>
                </div>

                {/* <GoogleLogin
                    clientId="501719925327-r0hdd6phtvajbamsqdvgtj4oig0r8lsm.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> */}
                <Button onClick={signIn}>
                    Sign in With Google
            </Button>
            </div>
        </div>
    )
}

export default Login;
