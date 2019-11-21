import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import Octicon, { RepoForked, Star } from '@primer/octicons-react';

import api from '../../services';
import './Repository.scss';

export default function Repository() {
  const [repositoryName, setRepositoryname] = useState("");
  const [repositories, setRepositories] = useState([]);

  async function getAllRepositories() {
    try {
      const request = await api.get('repository/');
      setRepositories(request.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function registerRepository(e) {
    e.preventDefault();
    try {
      await api.post('repository/', { name: repositoryName, user_id: "kevenleone" });
      getAllRepositories();
    } catch (e) {
      alert(e.message)
      console.log(e)
    }
  }

  useEffect(() => {
    getAllRepositories();
  }, [])

  return (
    <div className="repositories">
      <Form onSubmit={registerRepository}>
        <Row>
          <Col xs={9}>
            <FormGroup>
              <Label>User/Repository</Label>
              <Input
                placeholder="graphscript"
                value={repositoryName}
                onChange={({ target: { value } }) => setRepositoryname(value)}
              />
            </FormGroup>
          </Col>
          <Col className="register">
            <Button color="primary">Register</Button>
          </Col>
        </Row>
        <Row>
          <div className="list">
            {
              repositories.map(repository => {
                const { description, forks, id, language, name, stars } = repository;
                return (
                  <div key={id} className="repository">
                  <span className="title">{name}</span>
                  <p className="description">{description}</p>
                  <div className="icons">
                    <div className="icon">
                      <Octicon icon={Star} size={25} verticalAlign="middle" /> {stars}
                    </div>
                    <div className="icon">
                      <Octicon icon={RepoForked} size={26} verticalAlign="middle" /> {forks}
                    </div>
                  </div>
                </div>
                )
              })
            }
          </div>
        </Row>
      </Form>
    </div>
  );
}
