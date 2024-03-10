import React, { useEffect, useState } from "react";

const RecentTweets = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(
          "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=YourTwitterScreenName&count=3",
          {
            headers: {
              Authorization: `Bearer YOUR_TWITTER_API_BEARER_TOKEN`,
            },
          }
        );
        const data = await response.json();
        setTweets(data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h2>Recent Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTweets;
