import React from "react";

const Tweet = ({ text, author, date }) => {
  return (
    <div>
      <h3>{text.toUpperCase()}</h3>
      <h6>
        by {author} on {date}
      </h6>
    </div>
  );
};

export default Tweet;
