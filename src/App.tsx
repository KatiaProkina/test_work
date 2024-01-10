import { useState } from "react";
import "./style.css";
import { useGetUserQuery, useGetUserReposQuery } from "./gitHubApiSlice";
import { useDebounce } from "use-debounce";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounce(username, 500);
  // const [page, setPage] = useState(1);
  // const perPage = 4;

  const { data, error, isLoading } = useGetUserQuery(debouncedUsername);
  const {
    data: reposData,
    error: reposError,
    isLoading: isReposLoading,
  } = useGetUserReposQuery(debouncedUsername);
  // const {
  //   data: reposData,
  //   error: reposError,
  //   isLoading: isReposLoading,
  // } = useGetUserReposQuery(
  //   { username: debouncedUsername, page, perPage },
  //   {
  //     headers: {
  //       Authorization: ` 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`,
  //     },
  //   }
  // );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // setPage(1);
  };

  // const handlePageChange = (newPage: number) => {
  //   setPage(newPage);
  // };

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

      <div>
        {debouncedUsername && debouncedUsername.length > 0 && (
          <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {data && (
              <div>
                <h2>{data.login}</h2>
                <img
                  src={data.avatar_url}
                  alt="User Avatar"
                  style={{ width: "100px", height: "100px" }}
                />
                <p>Name: {data.name || "N/A"}</p>
                <p>Public Repositories: {data.public_repos}</p>
                <p>Followers: {data.followers}</p>
                <p>Following: {data.following}</p>
              </div>
            )}

            {isReposLoading && <p>Loading repositories...</p>}
            {reposError && (
              <p>Error loading repositories: {reposError.message}</p>
            )}

            {reposData && (
              <div>
                <h3>Repositories:</h3>
                <ul>
                  {reposData.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* 
            {isReposLoading && <p>Loading repositories...</p>}
            {reposError && (
              <p>Error loading repositories: {reposError.message}</p>
            )}

            {reposData && reposData.length > 0 ? (
              <div>
                <h3>Repositories:</h3>
                <ul>
                  {reposData.map((repo) => (
                    <li key={repo.id}>
                      <strong>{repo.name}</strong> -{" "}
                      {repo.description || "No description available"}
                    </li>
                  ))}
                </ul>
                <div>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous Page
                  </button>
                  <span> Page {page} </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={reposData.length < perPage}
                  >
                    Next Page
                  </button>
                </div>
              </div>
            ) : (
              <p>No repositories found.</p>
            )} */}
          </>
        )}
      </div>
    </>
  );
};

export default UserSearch;
