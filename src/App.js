import Tweet from "./components/Tweet";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

function App() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const [tweets, setTweets] = useState([]);
  const [tweetRefState, setTweetRefState] = useState("");
  const [authorName, setAuthorName] = useState("");
  const tweetRef = useRef(null);
  const authorRef = useRef(null);
  useEffect(() => {
    fetchTweets();
  }, []);

  const addTweet = (e) => {
    e.preventDefault();

    setTweets([
      { text: tweetRefState, author: authorName, date: today },
      ...tweets,
    ]);
    setAuthorName("");
    setTweetRefState("");
  };

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
      <form
        onSubmit={addTweet}
        style={{
          width: "30rem",
          margin: "0 auto 70px auto",
          paddingTop: "40px",
        }}
      >
        <div class="form-group">
          <label for="exampleInputEmail1">Tweet here</label>
          <input
            type="authorName"
            name="authorName"
            value={authorName}
            class="form-control"
            placeholder="hey what's your name (because there is no backend here)"
            ref={authorRef}
            onChange={() => {
              setAuthorName(authorRef.current.value);
            }}
          />
          <input
            type="tweet"
            name="tweet"
            value={tweetRefState}
            class="form-control"
            placeholder="Whats happening?"
            ref={tweetRef}
            onChange={() => {
              setTweetRefState(tweetRef.current.value);
            }}
          />
          <small id="emailHelp" class="form-text text-muted">
            Twitter is definately the app for you
          </small>
        </div>

        <button type="submit" class="btn btn-primary">
          Tweet
        </button>
      </form>
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
