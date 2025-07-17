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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
        author: "Anonymous User", // In a real app, this would come from auth
        imageUrl: imagePreview
      });
setContent("");
      setImage(null);
      setImagePreview(null);
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
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
<div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </span>
            </div>
            <Button
              type="submit"
              disabled={!content.trim() || isOverLimit}
              className="gradient-button text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </Button>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-3">
          <Label htmlFor="image">Add Image (Optional)</Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image').click()}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Image" size={16} />
              <span>Choose Image</span>
            </Button>
            {image && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {image.name} ({(image.size / 1024 / 1024).toFixed(1)}MB)
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
            
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md rounded-lg border border-gray-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>
            )}
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