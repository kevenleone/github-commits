import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { If, Then, Else } from 'react-if';
import Octicon, { RepoForked, Star } from '@primer/octicons-react';
import { Form, Alert, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';

import './Repository.scss';

export default function Repository() {
  const dispatch = useDispatch();
  const [repositoryName, setRepositoryName] = useState('');

  const {
    base: { user },
    repositories: { data: repositories },
  } = useSelector((state) => state);

  function getAllRepositories() {
    dispatch({
      type: 'GET_ALL_REPOSITORY_SAGA',
      payload: { user_id: user.login },
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const { login } = window.user;
    dispatch({
      type: 'ADD_REPOSITORY_SAGA',
      payload: { name: repositoryName, user_id: login },
    });
    setRepositoryName('');
  }

  useEffect(() => {
    getAllRepositories();
  }, []);

  return (
    <div className="repositories">
      <Form onSubmit={onSubmit}>
        <Row>
          <Col lg={8} sm={4} xl={8}>
            <FormGroup>
              <Label>User/Repository</Label>
              <Input
                placeholder="kevenleone/graphscript"
                value={repositoryName}
                onChange={({ target: { value } }) => setRepositoryName(value)}
              />
            </FormGroup>
          </Col>
          <Col className="register">
            <Button color="primary" disabled={!repositoryName}>
              Register
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <If condition={Boolean(repositories.length)}>
          <Then>
            <div className="list">
              {repositories.map((repository, index) => {
                const { description, fork, name, star } = repository;
                const i = index;
                return (
                  <div key={i} className="repository">
                    <span className="title">{name}</span>
                    <p className="description">{description}</p>
                    <div className="icons">
                      <div className="icon">
                        <Octicon icon={Star} size={25} verticalAlign="middle" />
                        {` ${star}`}
                      </div>
                      <div className="icon">
                        <Octicon icon={RepoForked} size={25} verticalAlign="middle" />
                        {` ${fork}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Then>
          <Else>
            <Col>
              <Alert color="info">Repositories not found, create a new one.</Alert>
            </Col>
          </Else>
        </If>
      </Row>
    </div>
  );
}
