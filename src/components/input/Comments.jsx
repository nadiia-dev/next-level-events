"use client";
import { useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/events/${eventId}/comment`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setComments(data);
      } catch (e) {
        console.error(e.message);
      }
    }
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/events/${eventId}/comment`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <NewComment onAddComment={addCommentHandler} />
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
