import { useState, useEffect } from "react";
import { postsService } from "@/services/api/postsService";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await postsService.getAll();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    setError("");
    try {
      const newPost = await postsService.create(postData);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError("Failed to create post. Please try again.");
      throw err;
    }
  };

  const updatePost = async (id, updateData) => {
    setError("");
    try {
      const updatedPost = await postsService.update(id, updateData);
      setPosts(prev => prev.map(post => 
        post.Id === parseInt(id) ? updatedPost : post
      ));
      return updatedPost;
    } catch (err) {
      setError("Failed to update post. Please try again.");
      throw err;
    }
  };

  const deletePost = async (id) => {
    setError("");
    try {
      await postsService.delete(id);
      setPosts(prev => prev.filter(post => post.Id !== parseInt(id)));
    } catch (err) {
      setError("Failed to delete post. Please try again.");
      throw err;
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: loadPosts
  };
};