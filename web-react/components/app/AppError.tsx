import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../buttons/Button";
import AppImage from "./AppImage";
import meNoPostImage from "@/assets/img/add-post-illustration.jpg";
import userNoPostImage from "@/assets/img/add-post-illustration.jpg";

interface AppErrorProps {
  error: "me-no-post" | "user-no-post" | "account-disabled" | "no-user-found";
}

const ErrorMeNoPost = () => {
  const { user } = useAuthContext();

  return (
    <div className="error errors--no-post">
      <AppImage
        layout="fill"
        src={meNoPostImage}
        alt="create your own post "
        draggable="false"
        wrapperClass="image"
      />

      <h1 className="heading--primary">Create your first post 🥺👉👈</h1>
      <p>
        Welcome {user.username}! This is your time to post your first barter in
        this app
      </p>

      <Button href="/new" size="medium">
        Create Post
      </Button>
    </div>
  );
};

const ErrorUserNoPost = () => {
  return (
    <div className="error errors--no-post">
      <AppImage
        layout="fill"
        src={userNoPostImage}
        alt="create your own post "
        draggable="false"
        wrapperClass="image"
      />

      <h1 className="heading--primary">No post yet</h1>
      <p>Di pa ako nagpopost eh, Balik kanalang next time</p>
    </div>
  );
};

const ErrorAccountDisabled = () => {
  return (
    <div className="error errors--no-post">
      <h1 className="heading--primary">Account Disabled</h1>
      <p>Timeout muna kaka trade ng kahit ano hehe.</p>
    </div>
  );
};

const ErrorUserNotFound = () => {
  return (
    <div
      v-else-if="error === 'no-user-found'"
      className="error errors--no-post mt-5"
    >
      <AppImage
        layout="fill"
        src="@/assets/img/user-not-found.jpg"
        alt="create your own post "
        draggable="false"
        className="mb-4"
      />

      <h1 className="heading--primary mb-1">No human found</h1>
      <p>Maybe he/she is from another planet or universe</p>
      <p style={{ textAlign: "left" }}>
        <strong>Solution 1: </strong> try switching universe. <br />
        <strong>Solution 2: </strong> hmm maybe try changing planet server??..
        <br />
        <strong>Solution 3: </strong> create account using this username hehe
        <br />
      </p>
      <Button href="/register" size="medium">
        Create Account
      </Button>
    </div>
  );
};

const AppError: React.FC<AppErrorProps> = ({ error }) => {
  const renderErrors = () => {
    switch (error) {
      case "me-no-post":
        return <ErrorMeNoPost />;

      case "user-no-post":
        return <ErrorUserNoPost />;

      case "account-disabled":
        return <ErrorAccountDisabled />;

      case "no-user-found":
        return <ErrorUserNotFound />;

      default:
        return <>Please Select Error</>;
    }
  };

  return <span>{renderErrors()}</span>;
};

export default AppError;
