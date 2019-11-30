/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import pusher from '../../services/pusher';

import Commits from './Commits';

export default function RootCommits() {
  const dispatch = useDispatch();
  const {
    commits: { has_next, data: commits },
  } = useSelector((state) => state);

  function getCommits() {
    dispatch({ type: 'GET_ALL_COMMITS_SAGA', payload: { showLoad: true } });

    const channel = pusher.subscribe('github');
    channel.bind('refresh-commit', (data) => {
      dispatch({ type: 'GET_ALL_COMMITS_SAGA', payload: { showLoad: false } });
      console.log(`Receiving refresh-commit, payload: ${data}`);
    });
  }

  function fetchMore() {
    dispatch({ type: 'FETCH_MORE_COMMITS_SAGA' });
  }

  useEffect(() => {
    getCommits();
  }, []);

  return <Commits commits={commits} fetchMore={fetchMore} has_next={has_next} />;
}
