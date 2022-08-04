import Tweet from "./components/Tweet";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { Alert } from "react-bootstrap";

let lastId = 7;

function App() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const [fields, setFields] = useState(true);
  const [tweetAttempt, setTweetAttempt] = useState(false);
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
    setTweetAttempt(true);
    if (authorName && tweetRefState) {
      lastId = lastId + 1;
      setTweets([
        { id: lastId, text: tweetRefState, author: authorName, date: today },
        ...tweets,
      ]);
      setAuthorName("");
      setTweetRefState("");
    } else {
      setFields(false);
    }
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

  const deleteTweet = (id) => {
    const filterTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(filterTweets);
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
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Tweet here</label>
          <input
            type="authorName"
            name="authorName"
            value={authorName}
            className="form-control"
            placeholder="hey what's your name (because there is no backend here)"
            ref={authorRef}
            onChange={() => {
              setAuthorName(authorRef.current.value);
              setFields(true);
              setTweetAttempt(false);
            }}
          />
          <input
            type="tweet"
            name="tweet"
            value={tweetRefState}
            className="form-control"
            placeholder="Whats happening?"
            ref={tweetRef}
            onChange={() => {
              setTweetRefState(tweetRef.current.value);
              setFields(true);
              setTweetAttempt(false);
            }}
          />
          {!fields && (
            <Alert variant="danger">Fields cannot be empty to tweet</Alert>
          )}
          {fields && tweetAttempt && (
            <Alert variant="success">Tweet has been added successfully</Alert>
          )}
          <small id="emailHelp" className="form-text text-muted">
            Twitter is definately the app for you
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          Tweet
        </button>
      </form>
      {tweets.map((tweet, key) => {
        key = tweet.id;
        console.log(key);
        return (
          <div>
            <Tweet
              key={tweet.id}
              {...tweet}
              deleteTweet={() => {
                deleteTweet(key);
                console.log(key);
              }}
            />
          </div>
        );
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
