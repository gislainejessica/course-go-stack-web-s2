/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';

import { Loading, Owner, IssueList, Footer, Button } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    filterIndex: 0,
    page: 1
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          state: filters.find(f => f.active).state,
          per_page: 5,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      loading: false,
      issues: issues.data,
    });
  }
  async componentDidUpdate(){
    const { match } = this.props;
    const { page } = this.state
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      loading: false,
      issues: issues.data,
    });
  }

  handleNextIssues = () => {
    const { page } = this.state
    {/** Botão apaga */}
    this.setState({page: page + 1})
  }
  handlePreviusIssues = () => {
    const { page } = this.state
    this.setState({page: page - 1})
  }

  render() {
    const { repository, loading, issues, page } = this.state;

    if (loading) {
      return <Loading> Carregando ... </Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/"> Voltar aos repositórios </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1> {repository.name} </h1>
          <p> {repository.description} </p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}> {issue.title} </a>
                  {/** LABLES */}
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Footer>
          <Button onClick={this.handlePreviusIssues} disabled={page}> Previus </Button>
          <Button onClick={this.handleNextIssues}> Next </Button>
        </Footer>
      </Container>
    );
  }
}
