import { useState } from "react";
import "./style.css";
import { useGetUserQuery, useGetUserReposQuery } from "./gitHubApiSlice";
import { useDebounce } from "use-debounce";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const perPage = 4;
const token = `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`;

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounce(username, 500);
  const [page, setPage] = useState(1);
  const [hasInput, setHasInput] = useState(false);

  const { data, error, isLoading } = useGetUserQuery(debouncedUsername);

  const {
    data: reposData,
    error: reposError,
    isLoading: isReposLoading,
  } = useGetUserReposQuery({ username: debouncedUsername, page, perPage }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as any);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setPage(1);
    setHasInput(true);
  };
  if (hasInput && !debouncedUsername) {
    console.error("Invalid debouncedUsername");
    // Можно также вывести сообщение пользователю или принять другие меры
    return (
      <div>
        <p>Please enter a valid GitHub username.</p>
      </div>
    );
  }
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  function formatNumber(num: number): string {
    if (num >= 1000) {
      return `${(num / 100).toFixed(1)}k`;
    }
    return num.toString();
  }

  const paginationFunc = () => {
    handlePageChange(page + 1);
  };
  let countPage = data?.public_repos
    ? Math.ceil(data.public_repos / perPage)
    : 0;

  const apiUrl =
    "https://api.github.com/users/${debouncedUsername}/repos?per_page=4&page=1";
  console.log(apiUrl);

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
              <p>
                Error: {"message" in error ? error.message : "Unknown error"}
              </p>
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
                    <img
                      src="../public/followers.png"
                      className="followers-img"
                    />
                    {formatNumber(data.followers)} followers
                  </div>
                  <div className="user-following">
                    <img
                      src="../public/following.png"
                      className="following-img"
                    />
                    {data.following} following
                  </div>
                </div>
              </div>
            )}

            {isReposLoading && <p>Loading repositories...</p>}
            {reposError && (
              <p>
                Error loading repositories:{" "}
                {"message" in reposError ? reposError.message : "Unknown error"}
              </p>
            )}

            {reposData && reposData.length > 0 ? (
              <div className="repos-container">
                <h1 className="title">Repositories ({data.public_repos})</h1>
                <ul className="repos">
                  {reposData.map(
                    (repo: {
                      id: number;
                      name: string;
                      description?: string;
                    }) => (
                      <li key={repo.id} className="repos-element">
                        <div className="repo-name">{repo.name}</div>
                        <div className="repo.description">
                          {repo.description || "No description available"}
                        </div>
                      </li>
                    )
                  )}
                </ul>
                <div className="pagination">
                  <div>1-4 of {data.public_repos} items</div>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="btn-arrow"
                  >
                    <img src="../public/left-arrow.png" alt="" />
                  </button>
                  <span> Page {page} </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={reposData.length < perPage}
                    className="btn-arrow"
                  >
                    <img src="../public/right-arrow.png" alt="" />
                  </button>
                  {/* <Stack spacing={2}>
                    <Stack spacing={2}>
                      <Pagination count={countPage} onClick={paginationFunc} />
                    </Stack>
                  </Stack> */}
                </div>
              </div>
            ) : (
              <p>No repositories found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserSearch;
