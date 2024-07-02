import React, { useState, useEffect } from 'react';


function App() {
  const [posts, setPosts] = useState([]);
  const fetchMyApi = () => {

  }
  useEffect(() => {

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('admin' + ":" + '123'));
    headers.append('Content-Type', 'application/json');

    fetch('http://127.0.0.1:8000/users/', {
      headers: headers,
      // credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      {
        posts.map((post) => {
          return (
            <div>
              <h2>nome: {post.username}</h2>
              <h2>email: {post.email}</h2>
              <hr />
            </div>
          );
        })

      }
    </div>
  )
}

export default App
