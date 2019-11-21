import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Commits.scss'
export default function Commits() {
  const [commits, setCommits] = useState([]);

  async function getCommits() {
    const comm = await axios.get('https://api.github.com/repos/kevenleone/graphscript/commits?sha=master');
    setCommits(comm.data)
  }

  useEffect(() => {
    getCommits()
  }, []);

  return (
    <div className="commits">
      {
        commits.map((commit, index) => {
          const { commit: { message } } = commit;
          return (
          <div key={index} className="commit">
            <div className="left">
              <img
                src="https://avatars2.githubusercontent.com/u/22279592?v=4"
                alt="author"
                className="authorImg"/>
            </div>
            <div className="right">
              <span className="commit-name">{message}</span>
              <span className="author">Keven</span>
            </div>
          </div>
          )
        })
      }
    </div>
  )
}
