import "./style.css";

function App() {
  return (
    <>
      <header className="header">
        <div>
          <img src="../public/github.png" alt="" className="logo" />
        </div>
        <div>
          <img src="../public/search_icon.png" alt="" />
          <input placeholder="Enter GitHub username" className="input_search" />
        </div>
      </header>
    </>
  );
}

export default App;
