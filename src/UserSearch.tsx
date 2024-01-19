import { useState } from "react";
import "./style.css";
import { useGetUserQuery, useGetUserReposQuery } from "./gitHubApiSlice";
import useDebounce from "./useDebounce";
import Header from "./Header";
import UserInfo from "./UserInfo";
import UserRepos from "./UserRepos";

const DELAY = 500;
const perPage = 4;
const TOKEN = `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`;

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, DELAY);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useGetUserQuery(debouncedUsername);

  const {
    data: reposData,
    error: reposError,
    isLoading: isReposLoading,
  } = useGetUserReposQuery(
    { username: debouncedUsername, page, perPage },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
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
      <Header handleInputChange={handleInputChange} username={username} />

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
              <UserInfo
                data={data}
                roundedFormatFollowersNumber={roundedFormatFollowersNumber}
              />
            )}

            {isReposLoading && <p>Loading repositories...</p>}
            {reposError && (
              <div>
                <p>Error:</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </div>
            )}

            {reposData && reposData.length > 0 ? (
              <UserRepos
                reposData={reposData}
                data={data}
                page={page}
                handlePageChange={handlePageChange}
                perPage={perPage}
              />
            ) : (
              reposError && (
                <div>
                  <p>Error:</p>
                  <pre>{JSON.stringify(reposError, null, 2)}</pre>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserSearch;
