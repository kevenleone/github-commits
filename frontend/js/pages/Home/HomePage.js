import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { When } from 'react-if';
import Octicon, { MarkGithub, ArrowUp } from '@primer/octicons-react';

import Commits from '../../components/Commits';
import { Repositories } from '../../components/Repositories';

import './HomePage.scss';

function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  function scrollFunction() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }

  window.addEventListener('scroll', () => scrollFunction());
  return (
    <div className="HomePage">
      <div className="mainContainer">
        <Row>
          <Col className="CommitsSection" lg={6} sm={12} xl={8}>
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
        <When condition={showScrollButton}>
          <Button color="primary" id="scrollButton" outline onClick={topFunction}>
            <Octicon className="giticon" icon={ArrowUp} size={25} verticalAlign="middle" />
            <span>SCROLL TO TOP</span>
          </Button>
        </When>
      </div>
    </div>
  );
}
