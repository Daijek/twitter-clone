import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Tweet = ({ text, author, date, deleteTweet }) => {
  return (
    <div>
      <Card
        style={{
          border: "2px solid white",
          margin: "10px auto 30px auto",
          width: "30rem",
          padding: "5px",
          color: "black",
          background: "white",
        }}
      >
        <Card.Body>
          <Card.Title>{text.toUpperCase()}</Card.Title>
          <Card.Text>
            by {author} on {date}
          </Card.Text>
          <Button
            onClick={() => {
              deleteTweet();
            }}
            variant="danger"
          >
            Delete tweet
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Tweet;
