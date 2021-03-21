import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axios';
import Login from "./Login";
import { contactAddEvent, initiateSocket } from "./Socket";

function App() {
  // const [messages, setMessages] = useState([])
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
    token: ""
  })
  
  useEffect(() => {
    const authHeader = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).token ? JSON.parse(localStorage.getItem("user")).token : null
    axios.get("/contacts", {
      headers: {
        authorization: authHeader
      }
    }).then(response => {
      setContacts(response.data.data)
    })
  }, [])
  useEffect(() => {
    initiateSocket()
  })
  useEffect(() => { 
    console.log('addd contact hook');
    contactAddEvent((err, newContact) => {
      setContacts([...contacts, newContact])
    })
  })
  /*  useEffect(() => {
     const pusher = new Pusher('0d02b3d3f3602a770d27', {
       cluster: 'ap2'
     });
     const channel = pusher.subscribe('contacts');
     channel.bind('inserted', (newContact) => {
       setContacts([...contacts, newContact])
     });
     return () => {
       channel.disconnect()
       channel.unbind_all();
       channel.unsubscribe();
     }
   }, [contacts]) */
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log('loggedInUser', loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  }, []);
  const signIn = async () => {
    // const name = prompt("Enter name")
    const email = prompt("Enter Email")
    if (email) {
      // console.log('got it', name, email);
      await axios.post("/auth/sign-in", {
        // name,
        email
      }).then(res => {
        if (res.status === 201 || res.status === 200) {
          // console.log('res.data.data', res.data.data);
          setCurrentUser(res.data.data)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          // console.log("setCurrentUser---", currentUser)
        } else {
          console.log('failed-------');
        }
      }).catch(err => {
        console.log('failed err-------', err);
      })
    }
  }
  const responseGoogle = async (response) => {
    await axios.post("/auth/google-signin", {
      name: response.profileObj.name,
      email: response.profileObj.email
    }).then(res => {
      if (res.status === 201 || res.status === 200) {
        // console.log('res.data.data', res.data.data);
        setCurrentUser(res.data.data)
        localStorage.setItem('user', JSON.stringify(res.data.data))
        // console.log("setCurrentUser---", currentUser)
      } else {
        console.log('failed-------');
      }
    }).catch(err => {
      console.log('failed err-------', err);
    })
  }

  return (
    <div className="app">
      {!currentUser.name ? (
        <Login responseGoogle={responseGoogle} signIn={signIn} />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar users={contacts} currnetUser={currentUser} />
            <Switch>
              <Route path="/rooms/:id">
                <Chat />
                {/* <Chat messages={messages} /> */}
              </Route>
              <Route path="/" >
                <Chat />
                {/* <Chat messages={messages} /> */}
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
