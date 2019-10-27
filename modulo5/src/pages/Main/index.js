import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

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
          {repositories.map(repositorie => (
            <li key={repositorie.name}>
              <span> {repositorie.name}</span>
              <a href=""> Detalhes </a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
