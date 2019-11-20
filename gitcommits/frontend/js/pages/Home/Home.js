import React from 'react';
import { Container } from 'reactstrap';

import { Header } from '../../components/Header';
import { Commits } from '../../components/Commits';
import './Home.scss';

export default function Home() {
  return (
    <div className="HomePage">
      <Header />
      <Container className="mainContainer">
        <h1 className="welcome">Commits List</h1>
        <Commits />
      </Container>
    </div>
  );
}
