import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { } from 'firebase/auth/web-extension';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    // console.log(app)


    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            }
            )
            .catch(error => {
                console.log(error);
            }
            )
    }

    return (
        <div>
            {
                /* user? logOut : signIn */
            }
            {
                user ? <button onClick={handleSignOut}>Sign Out</button> :
                    <button onClick={handleGoogleSignIn}>Google Login</button>
            }

            {
                user && <div>
                    <h3>User:{user.displayName}</h3>
                    <p>Email:{user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }

        </div>
    );
};

export default Login;