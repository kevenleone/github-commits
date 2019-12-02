import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { If, Then, Else } from 'react-if';
import { Form, Alert, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';

import { RepositoryCard } from '../RepositoryCard';
import pusher from '../../services/pusher';
import './Repository.scss';

export default function Repository() {
  const dispatch = useDispatch();
  const [repositoryName, setRepositoryName] = useState('');

  const {
    base: { user },
    repositories: { data: repositories },
  } = useSelector((state) => state);

  const user_id = user.login;

  function getAllRepositories() {
    dispatch({
      type: 'GET_ALL_REPOSITORY_SAGA',
      payload: { showLoad: true },
    });

    const channel = pusher.subscribe(user_id);
    channel.bind('refresh-repository', (data) => {
      dispatch({ type: 'GET_ALL_REPOSITORY_SAGA', payload: { showLoad: false } });
      console.log(`Receiving refresh-repository, payload: ${data}`);
    });
  }

  function onSubmit() {
    dispatch({
      type: 'ADD_REPOSITORY_SAGA',
      payload: { name: repositoryName, user_id },
    });
    setRepositoryName('');
  }

  useEffect(() => {
    getAllRepositories();
  }, []);

  return (
    <div className="repositories">
      <Form>
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
            <Button color="primary" disabled={!repositoryName} onClick={onSubmit}>
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
                const i = index;
                return <RepositoryCard key={i} repository={repository} />;
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
