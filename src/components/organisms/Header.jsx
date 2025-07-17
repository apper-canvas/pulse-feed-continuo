import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-effect sticky top-0 z-50 border-b border-gray-200/50"
    >
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Zap" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pulse Feed
              </h1>
              <p className="text-sm text-gray-500">Share your thoughts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="Search" size={20} className="text-gray-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="Bell" size={20} className="text-gray-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;