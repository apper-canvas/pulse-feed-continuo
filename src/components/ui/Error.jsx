import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center"
    >
      <Card className="text-center max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Something went wrong
            </h3>
            <p className="text-gray-600">
              {message || "We encountered an error while loading the posts."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onRetry}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" size={16} />
              <span>Try Again</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RotateCcw" size={16} />
              <span>Refresh Page</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;