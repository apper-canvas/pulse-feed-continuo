import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const PostCard = ({ post, onLike, onCreateComment, onUpdateComment, onDeleteComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const commentCount = post.comments?.length || 0;

  const handleLike = () => {
    if (onLike) {
      onLike(post.Id);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateComment(post.Id, {
        content: newComment.trim(),
        author: "Current User" // In a real app, this would come from auth
      });
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await onDeleteComment(post.Id, commentId);
        toast.success("Comment deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete comment");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="animate-slide-in"
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {post.author.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">{post.author}</h3>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{timeAgo}</span>
            </div>
            <p className="text-gray-800 leading-relaxed mb-3">
              {post.content}
            </p>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex items-center space-x-2 hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <ApperIcon name="Heart" size={16} />
                <span className="text-sm">{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleComments}
                className="flex items-center space-x-2 hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <ApperIcon name="MessageCircle" size={16} />
                <span className="text-sm">{commentCount > 0 ? commentCount : "Reply"}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:text-secondary hover:bg-secondary/10 transition-colors"
              >
                <ApperIcon name="Share" size={16} />
                <span className="text-sm">Share</span>
              </Button>
            </div>
          </div>
        </div>
        
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="space-y-3 mb-4">
              {post.comments?.map((comment) => (
                <div key={comment.Id} className="comment-item">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{comment.author}</h4>
                        <span className="text-gray-400 text-xs">·</span>
                        <span className="text-gray-400 text-xs">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.Id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmitComment} className="comment-form">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  U
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full text-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-4 py-2 text-sm"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default PostCard;