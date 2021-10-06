import './App.css';
import initializeAuthetication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';

initializeAuthetication();
const googleProvider = new GoogleAuthProvider();
const gitHubprovider = new GithubAuthProvider();


function App() {

  const [user, setUser] = useState({})
  const auth = getAuth();
  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;

        console.log(user);
        const loggedInUser = {

          name: displayName,
          email: email,
          photo: photoURL

        };
        setUser(loggedInUser);

      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubprovider)
      .then(result => {

        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          photo: photoURL,
          email: email
        }
        setUser(loggedInUser);
      })


  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {

        setUser({});
      })


  }
  return (
    <div className="back">
      <h1>Google and GitHub Authentication</h1>
      {!user.name ?
        <div>
          <button className='button' onClick={handleGoogleSignIn}>Google sign in</button>
          <button className='button' onClick={handleGitHubSignIn}>GitHub Sign In</button>
        </div> :
        <button className='button' onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email Address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
