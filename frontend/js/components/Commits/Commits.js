import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Commits.scss';

export default function Commits() {
  const [commits, setCommits] = useState([]);

  async function getCommits() {
    try {
      const comm = await axios.get(
        'https://api.github.com/repos/kevenleone/graphscript/commits?sha=master'
      );
      setCommits(comm.data);
    } catch (e) {
      toast.error(e);
    }
  }

  useEffect(() => {
    getCommits();
  }, []);

  return (
    <div className="commits">
      {commits.map((commit, index) => {
        const {
          commit: { message },
        } = commit;
        const i = index;
        return (
          <div key={i} className="commit">
            <div className="left">
              <img
                alt="author"
                className="authorImg"
                src="https://avatars2.githubusercontent.com/u/22279592?v=4"
              />
            </div>
            <div className="right">
              <span className="commit-name">{message}</span>
              <span className="author">Keven</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
