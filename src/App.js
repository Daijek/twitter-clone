import Tweet from "./components/Tweet";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  });

  const fetchTweets = () => {
    axios
      .get(`https://coursera-twitter-api.herokuapp.com/tweets`)
      .then((data) => {
        console.log(data);
        console.log(data.data);
        setTweets(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ background: "#1DA1F2" }} className="App">
      {tweets.map((tweet, key) => {
        key = tweet.id;

        return <Tweet key={key} {...tweet} />;
      })}
      <Card
        style={{
          border: "2px solid white",
          margin: "0 auto 0 auto",
          width: "30rem",
          padding: "5px",
          color: "black",
          background: "white",
        }}
      >
        <Card.Body>
          <Card.Title>I am the react king</Card.Title>
          <Card.Text>by Ijezie Daniel on 2022-08-03</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
