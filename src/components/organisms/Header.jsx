import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Input } from "@/components/atoms/Input";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, navigate]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

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
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <ApperIcon name="Zap" size={24} className="text-white" />
            </motion.div>
            <div>
              <h1 
                className="text-xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
                onClick={() => navigate('/')}
              >
                Pulse Feed
              </h1>
              <p className="text-sm text-gray-500">Share your thoughts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ width: 200 }}
              animate={{ width: isSearchFocused ? 240 : 200 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <ApperIcon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <Input
                  placeholder="Search posts, hashtags, or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-10 pr-4 py-2 text-sm border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>
            </motion.div>
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