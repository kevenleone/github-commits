import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import Octicon, { RepoForked, Star } from '@primer/octicons-react';

import api from '../../services';
import './Repository.scss';

export default function Repository() {
  const [repositoryName, setRepositoryName] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllRepositories() {
    try {
      const request = await api.get('repository/');
      setRepositories(request.data);
      setRepositoryName('');
    } catch (e) {
      toast.error(e);
    }
  }

  async function registerRepository(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('repository/', { name: repositoryName, user_id: 'kevenleone' });
      getAllRepositories();
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllRepositories();
  }, []);

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
                onChange={({ target: { value } }) => setRepositoryName(value)}
              />
            </FormGroup>
          </Col>
          <Col className="register">
            <Button color="primary" disabled={!repositoryName || loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </Col>
        </Row>
        <Row>
          <div className="list">
            {repositories.map((repository) => {
              const { description, forks, id, name, stars } = repository;
              return (
                <div key={id} className="repository">
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
        </Row>
      </Form>
    </div>
  );
}
