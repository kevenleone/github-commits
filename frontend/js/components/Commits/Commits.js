import React, { useEffect } from 'react';
import { Alert } from 'reactstrap';
import { If, Then, Else } from 'react-if';
import { useSelector, useDispatch } from 'react-redux';
import Octicon, { GitCommit } from '@primer/octicons-react';

import pusher from '../../services/pusher';

import './Commits.scss';

export default function Commits() {
  const dispatch = useDispatch();
  const {
    base: { avatarDefault },
    commits: { data: commits },
  } = useSelector((state) => state);

  function getCommits() {
    dispatch({ type: 'GET_ALL_COMMITS_SAGA', payload: { showLoad: true } });

    const channel = pusher.subscribe('github');
    channel.bind('refresh-commit', (data) => {
      dispatch({ type: 'GET_ALL_COMMITS_SAGA', payload: { showLoad: false } });
      console.log(`Receiving refresh-commit, payload: ${data}`);
    });
  }

  useEffect(() => {
    getCommits();
  }, []);

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
                                {message.length >= 80 ? `${message.substring(0, 120)}...` : message}
                              </span>
                              <span className="author">
                                {author} at <small>[{repository}]</small>
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
        </Then>
        <Else>
          <Alert color="info">No Commits tracked until now</Alert>
        </Else>
      </If>
    </div>
  );
}
