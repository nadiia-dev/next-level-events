"use client";
import classes from "./NewsletterRegistration.module.css";
import NotificationContext from "@/store/notification";
import Notification from "../ui/Notification";
import { use } from "react";

function NewsletterRegistration() {
  const context = use(NotificationContext);
  const activeNotification = context.notification;

  async function registrationHandler(e) {
    e.preventDefault();

    const enteredEmail = e.target.elements.email.value;
    context.showNotification({
      title: "Pending...",
      message: "Response is on it`s way",
      status: "pending",
    });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        context.showNotification({
          title: "Success...",
          message: "Successfully registered for a newsletter!",
          status: "success",
        });
        return res.json();
      } else {
        throw new Error(res.message || "Something went wrong");
      }
    } catch (e) {
      context.showNotification({
        title: "Error...",
        message: e.message || "Something went wrong",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            // suppressHydrationWarning
          />
          <button>Register</button>
        </div>
      </form>
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

export default NewsletterRegistration;
