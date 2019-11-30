import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Octicon, { ChevronLeft } from '@primer/octicons-react';

import { RepositoryCard } from '../../components/RepositoryCard';
import Commits from '../../components/Commits/Commits';
import './RepositoryPage.scss';

function RepositoryPage(props) {
  const {
    repositories: { repository = {} },
    commits: { repository_commits },
  } = useSelector((state) => state);

  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();

  function onPageLoad() {
    const { user, repo } = params;
    const payload = `${user}*${repo}`;
    dispatch({ type: 'GET_REPOSITORY_SAGA', payload });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    onPageLoad();
  }, []);

  return (
    <Container className="RepositoryPage">
      <Link className="Back" to="/">
        <Octicon className="giticon" icon={ChevronLeft} size={28} verticalAlign="middle" />
        <span>Back to Home</span>
      </Link>
      <Row className="mt-3">
        <Col xs={12}>
          <RepositoryCard repository={repository} />
        </Col>
        <Col>
          <Commits commits={repository_commits} />
        </Col>
      </Row>
    </Container>
  );
}

RepositoryPage.propTypes = {
  match: PropTypes.any.isRequired,
};

export default RepositoryPage;
