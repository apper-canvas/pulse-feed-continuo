import { useState, useEffect } from "react";
import { postsService } from "@/services/api/postsService";
import { commentsService } from "@/services/api/commentsService";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

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

  const searchPosts = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    setSearchError("");
    try {
      const data = await postsService.search(searchTerm);
      setSearchResults(data);
    } catch (err) {
      setSearchError("Failed to search posts. Please try again.");
    } finally {
      setSearchLoading(false);
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
      
      // Update search results if they exist
      setSearchResults(prev => prev.map(post => 
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
      
      // Update search results if they exist
      setSearchResults(prev => prev.filter(post => post.Id !== parseInt(id)));
    } catch (err) {
      setError("Failed to delete post. Please try again.");
      throw err;
    }
  };

  const createComment = async (postId, commentData) => {
    setError("");
    try {
      const newComment = await commentsService.create(postId, commentData);
      
      const updatePostComments = (post) => 
        post.Id === parseInt(postId) 
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post;
      
      setPosts(prev => prev.map(updatePostComments));
      setSearchResults(prev => prev.map(updatePostComments));
      
      return newComment;
    } catch (err) {
      setError("Failed to create comment. Please try again.");
      throw err;
    }
  };

  const updateComment = async (postId, commentId, updateData) => {
    setError("");
    try {
      const updatedComment = await commentsService.update(postId, commentId, updateData);
      
      const updatePostComments = (post) => 
        post.Id === parseInt(postId) 
          ? { 
              ...post, 
              comments: post.comments?.map(comment => 
                comment.Id === parseInt(commentId) ? updatedComment : comment
              ) || []
            }
          : post;
      
      setPosts(prev => prev.map(updatePostComments));
      setSearchResults(prev => prev.map(updatePostComments));
      
      return updatedComment;
    } catch (err) {
      setError("Failed to update comment. Please try again.");
      throw err;
    }
  };

  const deleteComment = async (postId, commentId) => {
    setError("");
    try {
      await commentsService.delete(postId, commentId);
      
      const updatePostComments = (post) => 
        post.Id === parseInt(postId) 
          ? { 
              ...post, 
              comments: post.comments?.filter(comment => comment.Id !== parseInt(commentId)) || []
            }
          : post;
      
      setPosts(prev => prev.map(updatePostComments));
      setSearchResults(prev => prev.map(updatePostComments));
    } catch (err) {
      setError("Failed to delete comment. Please try again.");
      throw err;
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

const getPostsByHashtag = async (hashtag) => {
    if (!hashtag) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    setSearchError("");
    try {
      const data = await postsService.getPostsByHashtag(hashtag);
      setSearchResults(data);
    } catch (err) {
      setSearchError("Failed to load hashtag posts. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    searchResults,
    searchLoading,
    searchError,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    searchPosts,
    getPostsByHashtag,
    refetch: loadPosts
  };
};