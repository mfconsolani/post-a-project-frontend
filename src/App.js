import './App.css';

function App() {
  return (
    <div className="App">
      <div class="projects">
        <div class="project-container">
          <div class="project-header-container">
            <h4 class="project-heading">Project title</h4>
            <div class="interactions">
              ❤️
            </div>
          </div>
          <h6 class="project-subheading">Company</h6>
          <p>Some description goes here</p>
          <div class="project-footer">
            <small>Expiration date</small>
            <button>Apply here</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
