import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

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
      <Row>
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
