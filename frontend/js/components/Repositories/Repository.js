import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { If, Then, Else } from 'react-if';
import { Form, Alert, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import Octicon, { RepoForked, Star } from '@primer/octicons-react';

import './Repository.scss';

export default function Repository() {
  const dispatch = useDispatch();
  const [repositoryName, setRepositoryName] = useState('');

  const { data: repositories } = useSelector((state) => state.repositories);

  function getAllRepositories() {
    dispatch({
      type: 'GET_ALL_REPOSITORY_SAGA',
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
          <Col xs={9}>
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
            <Button color="primary">Register</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <If condition={Boolean(repositories.length)}>
          <Then>
            <div className="list">
              {repositories.map((repository, index) => {
                const { description, forks, name, stars } = repository;
                const i = index;
                return (
                  <div key={i} className="repository">
                    <span className="title">{name}</span>
                    <p className="description">{description}</p>
                    <div className="icons">
                      <div className="icon">
                        <Octicon icon={Star} size={25} verticalAlign="middle" />
                        {` ${stars}`}
                      </div>
                      <div className="icon">
                        <Octicon icon={RepoForked} size={25} verticalAlign="middle" />
                        {` ${forks}`}
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
