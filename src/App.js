import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase'; 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


/* Matarrial ui drop down Stylelinb*/
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}));


function App() {
  const classes = useStyles();
   
  const [modalStyle] = useState(getModalStyle);
  
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [state, useState] = useState({
  setPosts:[],
  setOpen:false,
  email:''
  })



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User loged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user loged out
        setUser(null);
      }
    })
    return () => {
      // perform some clean up action
      unsubscribe();
    }
  },[user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);

  const signUp = (event) => { 
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      console.log(authUser)
      return authUser.user.updateProfile({
        displayName : username
      })
    })

    .catch((error) => alert(error.message))

    setOpen(false);
  }


  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false);  
  }



  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >  
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app_headerImage"
                src="data:image/png;base64,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"
                alt=""     
              />
            </center>
            <Input
              placeholder="username"
              type = "text"
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type = "text"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder = "password"
              type = "password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >  
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app_headerImage"
                src="data:image/png;base64,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"
                alt=""     
              />
            </center>
            <Input
              placeholder="email"
              type = "text"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder = "password"
              type = "password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>      
      <div className="app_header">
        <img
          className="app_headerImage"
          src="data:image/png;base64,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"
          alt="XYZ"
        />
        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}  
      </div>
      <div className="app_posts">
        <div className="app_postLeft">
        {
        posts.map(({id, post}) => (
          <Post key={id} postId ={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
        </div>
        <div className="app_postRight">
        <InstagramEmbed
        url="https://www.instagram.com/p/CFhs7grHGci/?utm_source=ig_web_copy_link"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}

      />
        </div>
      </div>
    


      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h3>Soory you need to Login to Upload</h3>
      )}
    </div>
  );
}

export default App;
