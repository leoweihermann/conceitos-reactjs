import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {


  const [repositories, setRepository] = useState([]);

  useEffect(()=>{
    
    api.get('repositories').then(response => {
      setRepository(response.data)
    })

  },[])


  async function handleAddRepository() {
    
    const repository = {
      title: `Respositório ${Date.now()}`,
      url: "www.repo.com.br",
      techs: [
        "node",
        "javascript"
      ]
    }

    const response = await api.post('repositories', repository);
    setRepository([
      ...repositories,
      response.data
    ])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    repositories.splice(repositoryIndex,1)
    setRepository([
      ...repositories
    ])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))} 
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
