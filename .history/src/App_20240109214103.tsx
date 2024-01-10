import "./style.css";

function App() {
  return (
    <>
      <header className="header">
        <div>
          <img src="../public/github.png" alt="" className="logo" />
        </div>
        <div>
          <input placeholder="Enter GitHub username" className="input_search" />
        </div>
      </header>
    </>
  );
}

export default App;
