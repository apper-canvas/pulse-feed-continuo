import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ onCreatePost }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center"
    >
      <Card className="text-center max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
            <ApperIcon name="MessageSquare" size={40} className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              No posts yet
            </h3>
            <p className="text-gray-600">
              Be the first to share your thoughts! Start a conversation and connect with others.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleScrollToTop}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" size={16} />
              <span>Create First Post</span>
            </Button>
            <p className="text-sm text-gray-500">
              Share what's on your mind
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;