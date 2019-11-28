import React from 'react';
import PropTypes from 'prop-types';
import Octicon, { RepoForked, Star } from '@primer/octicons-react';

import './RepositoryCard.scss';

function RepositoryCard(props) {
  const {
    repository: { name, description, star, fork },
  } = props;
  return (
    <div className="repository">
      <span className="title">{name}</span>
      <p className="description">{description}</p>
      <div className="icons">
        <div className="icon">
          <Octicon icon={Star} size={25} verticalAlign="middle" />
          {` ${star}`}
        </div>
        <div className="icon">
          <Octicon icon={RepoForked} size={25} verticalAlign="middle" />
          {` ${fork}`}
        </div>
      </div>
    </div>
  );
}

RepositoryCard.propTypes = {
  repository: PropTypes.any.isRequired,
};

export default RepositoryCard;
