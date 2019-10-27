import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };
  // Carregar dados (Tem coisas no localStorge? então carrega aí)
  componentDidMount(){
    const repositories = localStorage.getItem('repositories')

    if (repositories){
      this.setState({repositories: JSON.parse(repositories)})
    }
  }
  // Salvar dados localStorage  (Tem dados novos? salva aí.)
  componentDidUpdate(_, prevState){
    const {repositories} = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handlerInput = e => {
    this.setState({ newRepo: e.target.value });
  };

  handlerSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      newRepo: '',
      repositories: [...repositories, data],
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositórios{' '}
        </h1>
        <Form onSubmit={this.handlerSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositórios"
            value={newRepo}
            onChange={this.handlerInput}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner size={14} color="#fff" />
            ) : (
              <FaPlus size={14} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span> {repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}> Detalhes </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
