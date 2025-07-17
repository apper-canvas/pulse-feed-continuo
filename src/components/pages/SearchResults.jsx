import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import PostsFeed from "@/components/organisms/PostsFeed";
import { usePosts } from "@/hooks/usePosts";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get('q') || '';
  
  const {
    searchResults,
    searchLoading,
    searchError,
    searchPosts,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment
  } = usePosts();

  useEffect(() => {
    if (searchTerm) {
      searchPosts(searchTerm);
    }
  }, [searchTerm]);

  const handleLike = async (postId) => {
    try {
      const post = searchResults.find(p => p.Id === postId);
      if (post) {
        await updatePost(postId, { likes: post.likes + 1 });
        toast.success("Post liked!");
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const handleCreateComment = async (postId, commentData) => {
    await createComment(postId, commentData);
    return true;
  };

  const handleUpdateComment = async (postId, commentId, updateData) => {
    try {
      await updateComment(postId, commentId, updateData);
      toast.success("Comment updated!");
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(postId, commentId);
    return true;
  };

  const handleEditPost = async (postId, updateData) => {
    await updatePost(postId, updateData);
    return true;
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const handleRetry = () => {
    if (searchTerm) {
      searchPosts(searchTerm);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            <span>Back</span>
          </Button>
          
          <div className="text-sm text-gray-500">
            {searchTerm && (
              <span>
                Search results for "{searchTerm}"
              </span>
            )}
          </div>
        </motion.div>

        <div className="space-y-6">
          <PostsFeed
            posts={searchResults}
            loading={searchLoading}
            error={searchError}
            onRetry={handleRetry}
            onLike={handleLike}
            onCreateComment={handleCreateComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            searchTerm={searchTerm}
            isSearchResults={true}
          />
        </div>
      </main>
    </motion.div>
  );
};

export default SearchResults;