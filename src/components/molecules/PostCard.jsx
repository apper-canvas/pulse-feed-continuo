import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const PostCard = ({ post, onLike }) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  const handleLike = () => {
    if (onLike) {
      onLike(post.Id);
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
                className="flex items-center space-x-2 hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <ApperIcon name="MessageCircle" size={16} />
                <span className="text-sm">Reply</span>
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
      </Card>
    </motion.div>
  );
};

export default PostCard;