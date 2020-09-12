import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const recourse = "repositories";

  useEffect(() => {
    api.get(recourse).then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/ricardocaiuba",
      title: `Novo Desafio ReactJS: ${Date.now()}`,
      techs: ["React", "Javascript", "jest"],
    };

    const res = await api.post(recourse, newRepository);
    const repository = res.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`${recourse}/${id}`);
    const repositoriesFiltered = repositories.filter((f) => f.id !== id);
    setRepositories(repositoriesFiltered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
