// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  let [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [currUser, setCurrUser] = useState({});
  const encodedToken = localStorage.getItem("token");
  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: "Soham",
        lastName: "Shah",
        username: "sohamshah456",
        password: "123",
      });
      localStorage.setItem("token", response.data.encodedToken);
      setToken(response.data.encodedToken);
      setCurrUser(response.data.createdUser);
    } catch (error) {
      console.log(error);
    }
  };

  // login API call
  const loginHandler = async () => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        username: "sohamshah456",
        password: "123",
      });
      localStorage.setItem("token", response.data.encodedToken);
      setToken(response.data.encodedToken);
      setCurrUser(response.data.foundUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchUsers = async () => {
    try {
      const response = await axios.get(`/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchPosts();
      await handleFetchUsers();
    })();
  }, []);

  const fetchPostDetails = async (postId) => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      setPost(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = async (content) => {
    try {
      const response = await axios.post(
        `/api/posts/`,
        { postData: { content: "hello World" } },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async (postId, postData) => {
    try {
      const response = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikePost = async (postId) => {
    try {
      const response = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkPost = async (postId) => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setCurrUser({ ...currUser, bookmarks: response.data.bookmarks });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBookmarkPost = async (postId) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setCurrUser({ ...currUser, bookmarks: response.data.bookmarks });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollowUser = async (followUserId) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setCurrUser({
        ...currUser,
        followers: response.data.followers,
        following: response.data.following,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFollowUser = async (followUserId) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${followUserId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setCurrUser({
        ...currUser,
        followers: response.data.followers,
        following: response.data.following,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (userData) => {
    try {
      const response = await axios.post(
        `/api/users/edit`,
        { userData },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setCurrUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserPosts = async (username) => {
    try {
      const response = await axios.get(
        `/api/posts/${username}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setUserPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={signupHandler}>Signup</button>
      <button onClick={loginHandler}>Login</button>
      <button onClick={() => handleCreatePost("hello world")}>
        Create new Post
      </button>
      <div>
        <ul>
          <li>username: {currUser.username}</li>
          <li>FirstName: {currUser.firstName}</li>
          <li>LastName: {currUser.lastName}</li>
        </ul>
        <button
          onClick={() =>
            handleEditUser({ firstName: "sodium", lastName: "lol" })
          }
        >
          Edit details
        </button>
        Bookmarks:{" "}
        <ul>
          {currUser.bookmarks &&
            currUser.bookmarks.map((item) => (
              <li>
                {item.content}{" "}
                <button onClick={() => handleRemoveBookmarkPost(item._id)}>
                  Remove Bookmark
                </button>
              </li>
            ))}
        </ul>
        <div>
          My posts
          <button onClick={() => handleUserPosts(currUser.username)}>
            See my posts
          </button>
          <ul></ul>
        </div>
      </div>
      {posts.map((item) => (
        <div>
          <h2>{item.username}</h2>
          <button onClick={() => fetchPostDetails(item._id)}>See Post</button>
          <button onClick={() => handleDeletePost(item._id)}>
            Delete Post
          </button>
          <p>{item.content}</p>
          <button
            onClick={() =>
              handleEditPost(item._id, { content: "Coding is Lub" })
            }
          >
            Edit
          </button>
          <button onClick={() => handleLikePost(item._id)}>Like</button>
          <button onClick={() => handleDislikePost(item._id)}>Disike</button>
          <button onClick={() => handleBookmarkPost(item._id)}>Bookmark</button>
          <span>{item.likes.likeCount}</span>
        </div>
      ))}
      <div>
        {post.username}
        {post.content}
      </div>

      <ul>
        {users.map((item) => (
          <li>
            {item.username}{" "}
            <button onClick={() => fetchUserDetails(item._id)}>See User</button>
            <button onClick={() => handleFollowUser(item._id)}>Follow</button>
            <button onClick={() => handleUnFollowUser(item._id)}>
              Unfollow
            </button>
          </li>
        ))}
      </ul>
      <div>
        {user.username}
        {user.firstName}
      </div>
    </div>
  );
}

export default App;
