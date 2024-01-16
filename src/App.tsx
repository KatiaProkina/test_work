import { useState } from "react";
import "./style.css";
import { useGetUserQuery, useGetUserReposQuery } from "./gitHubApiSlice";
import useDebounce from "./useDebounce";
import Pagination from "./Pagination";
import imgFollowers from "../public/followers.png";
import imgFollowing from "../public/following.png";

interface Repo {
  id: number;
  name: string;
  description?: string;
}

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 500);
  const [page, setPage] = useState(1);

  const perPage = 4;
  const token = `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`;

  const { data, error, isLoading } = useGetUserQuery(debouncedUsername);

  const {
    data: reposData,
    error: reposError,
    isLoading: isReposLoading,
  } = useGetUserReposQuery(
    { username: debouncedUsername, page, perPage },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  function roundedFormatFollowersNumber(num: number): string {
    if (num >= 1000) {
      return `${(num / 100).toFixed(1)}k`;
    }
    return num.toString();
  }

  return (
    <>
      <header className="header">
        <div>
          <img src="../public/github.png" alt="" className="logo" />
        </div>
        <div className="search-div">
          <img src="../public/search_icon.png" alt="" className="search_icon" />
          <input
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            className="input_search"
          />
        </div>
      </header>

      <div className="user-container">
        {debouncedUsername && debouncedUsername.length > 0 && (
          <>
            {isLoading && <p>Loading...</p>}
            {error && (
              <div>
                <p>Error:</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </div>
            )}

            {data && (
              <div className="user-information">
                <img
                  src={data.avatar_url}
                  alt="User Avatar"
                  className="avatar-img"
                />
                <div className="user-name"> {data.name || "N/A"}</div>
                <div className="user-login">{data.login}</div>
                <div className="follow-container">
                  <div className="user-followers">
                    <img src={imgFollowers} className="followers-img" />
                    {roundedFormatFollowersNumber(data.followers)} followers
                  </div>
                  <div className="user-following">
                    <img src={imgFollowing} className="following-img" />
                    {data.following} following
                  </div>
                </div>
              </div>
            )}

            {isReposLoading && <p>Loading repositories...</p>}
            {reposError && (
              <div>
                <p>Error:</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </div>
            )}

            {reposData && reposData.length > 0 ? (
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
            ) : (
              <p> No repositories.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserSearch;
