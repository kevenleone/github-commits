import React from 'react';
import { Row, Col } from 'reactstrap';
import Octicon, { MarkGithub } from '@primer/octicons-react';

import Commits from '../../components/Commits';
import { Repositories } from '../../components/Repositories';

import './HomePage.scss';

export default function Home() {
  return (
    <div className="HomePage">
      <div className="mainContainer">
        <Row>
          <Col lg={6} sm={12} xl={8}>
            <h1 className="welcome first">Commits List</h1>
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
