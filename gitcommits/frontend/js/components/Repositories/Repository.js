import React from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import Octicon, { RepoForked, Star } from '@primer/octicons-react';

import './Repository.scss';

export default function Repository() {
  function registerRepository(e) {
    e.preventDefault();
  }

  //   id
  // name
  // fullName
  // description
  // stars
  // forks

  return (
    <div className="repositories">
      <Form onSubmit={registerRepository}>
        <Row>
          <Col xs={9}>
            <FormGroup>
              <Label>User/Repository</Label>
              <Input placeholder="graphscript" />
            </FormGroup>
          </Col>
          <Col className="register">
            <Button color="primary">Register</Button>
          </Col>
        </Row>
        <Row>
          <div className="list">
            <div className="repository">
              <span className="title">React.JS</span>
              <p className="description">Lorem Ipsum...</p>
              <div className="icons">
                <div className="icon">
                  <Octicon icon={Star} size={25} verticalAlign="middle" /> 123456
                </div>
                <div className="icon">
                  <Octicon icon={RepoForked} size={26} verticalAlign="middle" /> 1234
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Form>
    </div>
  );
}
