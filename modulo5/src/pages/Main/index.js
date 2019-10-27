import React, { Component } from 'react';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';
import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
  };

  handlerInput = e => {
    this.setState({ newRepo: e.target.value });
  };

  handlerSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      newRepo: '',
      repositories: [...repositories, data],
    });
  };

  render() {
    const { newRepo } = this.state;
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
          <SubmitButton>
            <FaPlus size={14} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default Main;
