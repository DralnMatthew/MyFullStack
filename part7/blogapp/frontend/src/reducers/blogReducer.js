import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.likes - a.likes);
    },
    setBlog(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { appendBlog, setBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(title, author, url);
    dispatch(appendBlog(newBlog));
  };
};

export const addLike = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      title: toLike.title,
      author: toLike.author,
      url: toLike.url,
      likes: toLike.likes + 1,
      id: toLike.id,
    };
    console.log(3, liked);

    blogService.update(liked.id, liked).then((updatedBlog) => {
      const updatedBlogs = blogs
        .map((b) => (b.id === id ? updatedBlog : b))
        .sort((a, b) => b.likes - a.likes);
      dispatch(setBlog(updatedBlogs));
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const toRemove = blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs
        .filter((b) => b.id !== id)
        .sort((a, b) => b.likes - a.likes);
      setBlog(updatedBlogs);
    });
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const toAddComment = blogs.find((b) => b.id === id);

    console.log(4, toAddComment);

    const commented = {
      title: toAddComment.title,
      author: toAddComment.author,
      url: toAddComment.url,
      likes: toAddComment.likes,
      id: toAddComment.id,
      comments: toAddComment.comments.concat(comment),
    };

    console.log(1, commented);

    blogService.update(id, commented).then((commented) => {
      const updatedBlogs = blogs
        .map((b) => (b.id === id ? commented : b))
        .sort((a, b) => b.likes - a.likes);
      console.log(2, updatedBlogs);
      dispatch(setBlog(updatedBlogs));
    });
  };
};

export default blogSlice.reducer;
