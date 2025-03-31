"use client";
import { use, useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import Notification from "../ui/Notification";
import NotificationContext from "@/store/notification";

function Comments(props) {
  const { eventId } = props;

  const context = use(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const activeNotification = context.notification;

  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true);
      context.showNotification({
        title: "Pending...",
        message: "Response is on it`s way",
        status: "pending",
      });
      try {
        const res = await fetch(`/api/events/${eventId}/comment`);
        if (res.ok) {
          context.showNotification({
            title: "Success...",
            message: "Successfully added your comment!",
            status: "success",
          });
          setIsLoading(false);
          const data = await res.json();
          setComments(data);
          return data;
        } else {
          setIsLoading(false);
          throw new Error(res.message || "Something went wrong");
        }
      } catch (e) {
        setIsLoading(false);
        context.showNotification({
          title: "Error...",
          message: e.message || "Something went wrong",
          status: "error",
        });
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
      {showComments && !isLoading && <CommentList items={comments} />}
      {showComments && isLoading && <p>Loading...</p>}
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </section>
  );
}

export default Comments;
