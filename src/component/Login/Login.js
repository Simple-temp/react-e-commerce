import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider , getAuth , signInWithPopup , signOut , createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile ,FacebookAuthProvider } from "firebase/auth";
import  firebaseConfig  from "./firebaseConfig";
import { useContext } from 'react';
import { userCOntext } from '../../App';


initializeApp( firebaseConfig );

/*This is login state with a function*/ 

function Login() {

  const [newuser, setNewuser] = useState(false);

  const [user, setUser] = useState({

    isIt : false,
    name : '',
    email : '',
    photo : '',
    password : '',
    error : '',
    success : ''
  })
 
/*This is Api context */   

  const [LoggedInUser, setLoggedInUser] = useContext(userCOntext)

/*This is google and facebook author provider*/ 

  const provider = new GoogleAuthProvider();
  const FbProvider = new FacebookAuthProvider();

/*This is sign in or click in function*/  

  const click = () =>
  {
    const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {

    const {displayName,photoURL,email} = result.user;
    const signIn = {
      isIt : true,
      name : displayName,
      email : email,
      photo : photoURL
    }
    setUser(signIn);
  })
  }

/*This is sign out or click out function*/  

  const clickOut = () =>
  {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      const SignOut = {
        isIt : false,
        name : '',
        email : '',
        photo : ''
      }
      setUser(SignOut);
    })
  }

/*This is Facebook athorization*/

  const fbAuth = () =>
  {
    const auth = getAuth();
signInWithPopup(auth, FbProvider)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = FacebookAuthProvider.credentialFromError(error);
  });
  }

/*This is submit button function*/  

  const haldleSubmit = (e) =>
  {
    if (newuser && user.email && user.password)
    {
      const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((createuser) => {
        const userInfo = {...user}
        userInfo.error = '';
        userInfo.success = true;
        setUser(userInfo);
        update(user.name)
      })
      .catch(error => {
        const userInfo = {...user}
        userInfo.error = error.message;
        userInfo.success = false ;
        setUser(userInfo)
      });
    }

    if (user.email && user.password)
    {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((createuser) => {
                const userInfo = {...user}
                userInfo.error = '';
                userInfo.success = true;
                setUser(userInfo);
                setLoggedInUser(userInfo)
            })
            .catch((error) => {
                const userInfo = {...user}
                userInfo.error = error.message;
                userInfo.success = false ;
                setUser(userInfo)
            });
    
        e.preventDefault();
    }
  }

/*input-feild haldleBlur event*/
  
  const haldleBlur = (e) =>
  {
    let isvalid = true;
    if( e.target.name === "email")
    {
      isvalid = /\S+@\S+.\S+/.test(e.target.value);
    }
    if( e.target.name === "password")
    {
      /*password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters */
      const passLength = e.target.value.length > 8 ;
      const validPass = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9])/.test(e.target.value);
      isvalid = passLength && validPass;
    }
    if(isvalid)
    {
      const copyInfo = {...user}
      copyInfo [e.target.name] = e.target.value;
      setUser(copyInfo)
    }
  }

/*Update user name*/

  const update = name =>
  {
        const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        console.log("User name update successfully");
    }).catch((error) => {
        console.log(error);
    });
  }

/*This is our output*/

  return (
    <div className="text-center">
        {user.isIt ? <button onClick={clickOut} >Sign out</button> :
        <button onClick={click} >Sign in</button>
        }
        <button onClick={fbAuth} >Sign in with facebook</button>
        {
          user.isIt && <div>

          <p>Welcome , {user.name}</p>

          <p>Email : {user.email}</p>

          <img src={user.photo} alt="" />

          </div>
        }

        <h1>Own Authentication</h1>

        <input type="checkbox" onChange={()=>setNewuser(!newuser)} name="newuser" id="" />
        <label htmlFor="newuser">Sign up </label>

        <form onSubmit={haldleSubmit} >
          { newuser && <input type="text" name="name" onChange={haldleBlur} placeholder='Name' />}
          <br/>
          <input type="text" name="email" onChange={haldleBlur} placeholder='Email' required />
          <br/>
          <p>password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters</p>
          <input type="password" name="password" onChange={haldleBlur} id="" placeholder='Password' required />
          <br/>
          <input type="submit" value={newuser ? "sign up" : "sign in"} />
        </form>
        {
          user.error &&  <p>This account has been already taken</p>
        }
        {
          user.success &&  <p>User { newuser ? "Created" : "Logged In"} SuccessFully</p>
        }
    </div>
  );
}

export default Login;
