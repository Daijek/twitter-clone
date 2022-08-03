import logo from "./logo.svg";
import "./App.css";
import Tweet from "./components/Tweet";

function App() {
  return (
    <div className="App">
      <Tweet text="Text passed down" author="Ijezie Daniel" Date="2020-20-15" />
    </div>
  );
}

export default App;
