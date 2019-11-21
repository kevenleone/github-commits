import React from 'react';
import { Row, Col } from 'reactstrap';
import Octicon, { MarkGithub } from '@primer/octicons-react';

import { Header } from '../../components/Header';
import { Commits } from '../../components/Commits';
import { Repositories } from '../../components/Repositories';

import './Home.scss';

export default function Home() {
  return (
    <div className="HomePage">
      <Header />
      <div className="mainContainer">
        <Row>
          <Col xs={8}>
            <h1 className="welcome">Commits List</h1>
            <Commits />
          </Col>
          <Col>
            <h1 className="welcome">
              <Octicon className="giticon" icon={MarkGithub} size={35} verticalAlign="middle" />
              Repositories
            </h1>
            <Repositories />
          </Col>
        </Row>
      </div>
    </div>
  );
}
