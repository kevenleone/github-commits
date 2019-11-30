import React from 'react';
import { Alert, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { If, Then, Else, When } from 'react-if';
import { useSelector } from 'react-redux';
import Octicon, { GitCommit } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

import './Commits.scss';

function Commits(props) {
  const { commits, fetchMore, has_next } = props;
  const {
    base: { avatarDefault },
  } = useSelector((state) => state);
  const keys = Object.keys(commits);

  return (
    <div className="commits">
      <If condition={Boolean(keys.length)}>
        <Then>
          <div className="commits-listing">
            {keys.map((commitKey) => {
              return (
                <div key={commitKey}>
                  <div className="commit-group-title">
                    <Octicon
                      className="giticon"
                      icon={GitCommit}
                      size={17}
                      verticalAlign="middle"
                    />
                    <p className="commit_date">
                      Commits on
                      <span>{commitKey}</span>
                    </p>
                  </div>
                  <ol className="commit-group table-list table-list-bordered">
                    {commits[commitKey].map((commit, index) => {
                      const { message, author, author_avatar, repository } = commit;
                      const i = index;
                      return (
                        <li key={i}>
                          <div className="commit">
                            <div className="left">
                              <img
                                alt="author"
                                className="authorImg"
                                src={author_avatar || avatarDefault}
                              />
                            </div>
                            <div className="right">
                              <span className="commit_name">
                                {message && message.length >= 80
                                  ? `${message.substring(0, 120)}...`
                                  : message}
                              </span>
                              <span className="author">
                                {author} at{' '}
                                <Link to={`/repository/${repository}`}>[{repository}]</Link>
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
          <When condition={typeof fetchMore === 'function' && has_next}>
            <div className="loadmore">
              <Button block color="primary" onClick={fetchMore}>
                FETCH MORE
              </Button>
            </div>
          </When>
        </Then>
        <Else>
          <Alert color="info">No Commits tracked until now</Alert>
        </Else>
      </If>
    </div>
  );
}

Commits.propTypes = {
  commits: PropTypes.any,
  has_next: PropTypes.bool,
};

Commits.defaultProps = {
  commits: {},
  has_next: false,
};

export default Commits;
