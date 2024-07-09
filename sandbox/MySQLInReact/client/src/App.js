import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";

function App() {
  const [username, setUsername] = useState("Test1")
  const [password, setPassword] = useState("123")
  const [mail, setMail] = useState("test@gmail.com")

  const createUser = () => {
    Axios.post('http://localhost:3001/users/insert/user/', {
      username: username, 
      password: password, 
      mail: mail, 
      firstname: null, 
      lastname: null, 
      favclubid: null, 
      favstadiumid:null}).then(() => {
        alert("successful insert");
      })

  };

  const [userList, setUserList] = useState([]) 

  const getAllUsers = () => {
    Axios.get('http://localhost:3001/users/select/user/').then((response) => {
      setUserList(response.data)
    });
  }

  const getUser = () => {
    Axios.get(`http://localhost:3001/users/select/user/${username}`).then((response) => {
      setUserList(response.data)
    });
  }

  const deleteUser = (username) => {
    Axios.delete(`http://localhost:3001/users/delete/user/${username}`)
  }


  const updateUser = () => {
    Axios.put('http://localhost:3001/users/update/password/', {
      username: username, 
      password: password
    });

  };

  return (
    <div className="App">
      
      <button onClick={() => {getUser(username)}}>Create</button>

      <button onClick={() => {deleteUser(username)}}>Delete</button>

      <button onClick={updateUser}>Update</button>

      {userList.map((val)=> {
        return <h1>Username: {val.username}</h1>
      })}
      {/*{userList.map((val)=> {
        return <h1>Username: {val.username}</h1>
      })}*/}
    </div>
  );
}

export default App;
