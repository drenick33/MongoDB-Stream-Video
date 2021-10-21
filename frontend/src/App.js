import react from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Video from MongoDB</h1>
      <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
        <source src="http://localhost:5000/video" type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
