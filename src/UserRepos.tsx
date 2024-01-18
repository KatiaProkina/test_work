import React from "react";
import Pagination from "./Pagination";

interface Repo {
  id: number;
  name: string;
  description?: string;
}

const UserRepos = ({ reposData, data, page, handlePageChange, perPage }) => (
  <div className="repos-container">
    <h1 className="title">Repositories ({data.public_repos})</h1>
    <ul className="repos">
      {reposData.map((repo: Repo) => (
        <li key={repo.id} className="repos-element">
          <div className="repo-name">{repo.name}</div>
          <div className="repo.description">
            {repo.description || "No description available"}
          </div>
        </li>
      ))}
    </ul>
    <div className="pagination">
      <div>1-4 of {data.public_repos} items</div>
      <Pagination
        page={page}
        handlePageChange={handlePageChange}
        totalItems={data.public_repos}
        perPage={perPage}
      />
    </div>
  </div>
);

export default UserRepos;
