import React, { useState, useEffect } from 'react';
import projet1Api from '../axios/config';
import NavBar from '../utils/NavBar';
import UsersTable from '../utils/UsersTable';
import { useNavigate } from 'react-router';

function Users() {
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [page, setPage] = useState(0); // página inicial
  const [rowsPerPage, setRowsPerPage] = useState(5); // quantidade inicial por página
  const [count, setCount] = useState(0); // número total de itens

  // Função para buscar usuários da API com paginação e busca
  const getUsers = async (token, page, pageSize, search) => {
    try {
      console.log("Token used for API call:", token);
      const response = await projet1Api.get("/users/", {
        params: {
          page: page + 1, // página base 1 para Django
          page_size: pageSize,
          search: search // passa o termo de busca como parâmetro para a API
        },
        headers: {
          "Authorization": "Token " + token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  useEffect(() => {
    const storedItems = localStorage.getItem('jwt');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      console.log("Items from localStorage:", parsedItems);
      setItems(parsedItems);

      async function fetchUsers() {
        try {
          const usersResponse = await getUsers(parsedItems.token, page, rowsPerPage, searchTerm);
          setPosts(usersResponse.results);
          setCount(usersResponse.count);
        } catch (error) {
          console.error("Error fetching users:", error);
          document.getElementById("div-main-user").innerHTML = "Você não tem acesso a essa página!";
        }
      }

      fetchUsers();
    } else {
      document.getElementById("div-main-user").innerHTML = "<h1>Você não tem acesso a essa página!</h1>";
      console.warn("No items found in localStorage");
    }
  }, [page, rowsPerPage, searchTerm]); // Adicione searchTerm como dependência do useEffect para refetch quando mudar

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div style={{ width: '1200px' }}>
      <NavBar />
      <div className='div-main-user' id='div-main-user'>
        <div style={{
          display: 'flex', flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between', padding: '0 10px 0 10px',
        }}>
          <h1>Colaboradores</h1>
          <div className='search-bar-div'>
            <input
              type="text"
              name="search-bar"
              id="search-bar"
              placeholder='Pesquisar..'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <i className="fi fi-br-search"></i>
          </div>
          <div onClick={() => navigate("/collaborator/register/")}
            id='create-user-icon'
            className='create-user-icon'>
            <i className="fi fi-br-plus"></i>
          </div>
        </div>
        {posts.length === 0 ? <h1 id='message'>Carregando...</h1> : (
          <UsersTable
            lsUser={posts}
            page={page}
            setPage={setPage}
            count={count}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </div>
    </div>
  )
}

export default Users;
