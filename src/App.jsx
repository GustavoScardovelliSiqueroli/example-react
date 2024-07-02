import React, { useState, useEffect } from 'react';
import projet1Api from './axios/config';


function App() {
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);

  const fetchMyApi = () => {

  }
  const getUsers = (token) => {
    console.log(token)
    return projet1Api.get("/users/", {
      headers: {
        "Authorization": "Token " + token
      }
    })
  }
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('jwt'));
    if (items) {
      setItems(items);
    }
    // console.log(getUsers(items.data.token));

    async function awaitUsers() {
      let users = getUsers(items.data.token);
      let completeUsers = await users;
      setPosts(await completeUsers.data);
    }
    awaitUsers();

  }, []);
  // useEffect(() => {
  //   setPosts(getUsers())
  //     , []
  // });
  return (
    <div>
      {posts.length === 0 ? <p>Carregando...</p> : (

        posts.map((post) => {
          return (
            <div key={post.url}>
              <h2>nome: {post.username}</h2>
              <h2>email: {post.email}</h2>
              <hr />
            </div>
          );
        })
      )

      }
    </div>
  )
}

export default App
