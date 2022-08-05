import Tweet from "./components/Tweet";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addFavouriteTweets,
  removeFavouriteTweets,
} from "./feautures/favouriteTweets/favouriteTweetsSlice";

let lastId = 7;

function App() {
  const dispatch = useDispatch();

  //functions start
  useEffect(() => {
    fetchTweets();
  }, []);

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

  //functions end

  //This is how the current date is gotten
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  //this use state is used ti set the state of the tweet fields
  const [fields, setFields] = useState(true);

  const [favouriteTweets, setFavouriteTweets] = useState([]);

  //I used the useState hook to store the state of a of when a user attemts to tweet something (true or false)
  const [tweetAttempt, setTweetAttempt] = useState(false);

  //Tweets is the array that stores the tweets that are looped over to display on the tweets page
  const [tweets, setTweets] = useState([]);

  //The tweetRefState and the authorName are the states of the form value to add tweets
  const [tweetRefState, setTweetRefState] = useState("");
  const [authorName, setAuthorName] = useState("");

  //These are the references of the inputs for adding tweets
  const tweetRef = useRef(null);
  const authorRef = useRef(null);

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

        //This sets the favourite status of a tweet
        return (
          <div>
            <Tweet
              key={tweet.id}
              id={tweet.id}
              {...tweet}
              deleteTweet={() => {
                deleteTweet(key);
                console.log(key);
              }}
              datas={favouriteTweets}
              addToFavourtites={() => {
                if (!favouriteTweets.includes(tweet.id)) {
                  setFavouriteTweets([...favouriteTweets, tweet.id]);
                  dispatch(addFavouriteTweets(tweet));
                  // if (favTweets.includes(tweet)) {
                  //   setFavouriteStatus(true);
                  //   setDatas([...datas, tweet.id]);
                  //   dispatch(addFavouriteTweets(tweet));
                  // } else {
                  //   setFavouriteStatus(false);
                  //   dispatch(addFavouriteTweets(tweet));
                  // }
                } else {
                  const removeIds = favouriteTweets.filter(
                    (id) => id !== tweet.id
                  );
                  setFavouriteTweets(removeIds);
                  dispatch(removeFavouriteTweets(tweet.id));
                }
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
