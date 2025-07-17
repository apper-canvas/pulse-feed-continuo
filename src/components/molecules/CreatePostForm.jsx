import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import Label from "@/components/atoms/Label";
import Card from "@/components/atoms/Card";

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_LENGTH = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    if (content.length > MAX_LENGTH) {
      toast.error(`Post must be ${MAX_LENGTH} characters or less`);
      return;
    }

    setIsSubmitting(true);

    try {
      await onPostCreated({
        content: content.trim(),
        author: "Anonymous User" // In a real app, this would come from auth
      });

      setContent("");
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Anonymous User</h3>
              <p className="text-gray-500 text-sm">What's on your mind?</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              error={isOverLimit}
              className="resize-none"
            />
            <div className="flex justify-between items-center text-sm">
              <span className={`${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </span>
              {isOverLimit && (
                <span className="text-red-500 font-medium">
                  Post is too long
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim() || isOverLimit}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <ApperIcon name="Send" size={16} />
              )}
              <span>{isSubmitting ? "Posting..." : "Post"}</span>
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreatePostForm;