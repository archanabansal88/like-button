import { useState } from "react";
import { SpinnerIcon, HeartIcon } from "./utils/icons";
import "./likeButton.css";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsfetching] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsfetching(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );
      if (response.status === 200) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
        return;
      }
    } finally {
      setIsfetching(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`likeBtn ${liked ? "liked" : ""}`}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? "Liked" : "Like"}
      </button>

      {error && <div>{error}</div>}
    </div>
  );
};

export default LikeButton;
