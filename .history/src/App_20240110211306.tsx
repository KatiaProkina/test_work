import { useState } from "react";

import "./style.css";
import { useDebounce } from "usehooks-ts";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const debouncedValue = useDebounce(username, 500);
};

function App() {
  return (
    <>
      <header className="header">
        <div>
          <img src="../public/github.png" alt="" className="logo" />
        </div>
        <div className="search-div">
          <img src="../public/search_icon.png" alt="" className="search_icon" />
          <input placeholder="Enter GitHub username" className="input_search" />
        </div>
      </header>
    </>
  );
}

export default App;
