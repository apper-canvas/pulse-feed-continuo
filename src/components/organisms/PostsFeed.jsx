import { motion } from "framer-motion";
import PostCard from "@/components/molecules/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const PostsFeed = ({ posts, loading, error, onRetry, onLike, onCreateComment, onUpdateComment, onDeleteComment, onEdit, onDelete, searchTerm, isSearchResults }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!posts || posts.length === 0) {
    if (isSearchResults && searchTerm) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Search" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 mb-4">
              No posts found for "<span className="font-medium">{searchTerm}</span>"
            </p>
            <p className="text-sm text-gray-400">
              Try searching for different keywords, hashtags, or usernames
            </p>
          </div>
        </motion.div>
      );
    }
    return <Empty />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
{isSearchResults && searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-4 mb-6"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <ApperIcon name={searchTerm.startsWith('#') ? "Hash" : "Search"} size={16} />
            <span className="text-sm">
              Found {posts.length} result{posts.length !== 1 ? 's' : ''} 
              {searchTerm.startsWith('#') ? ' tagged with ' : ' for '}
              <span className="font-medium text-gray-900">{searchTerm}</span>
            </span>
          </div>
        </motion.div>
      )}
      
{posts.map((post, index) => (
        <motion.div
          key={`${post.Id || 'unknown'}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PostCard 
            post={post} 
            onLike={onLike}
            onCreateComment={onCreateComment}
            onUpdateComment={onUpdateComment}
            onDeleteComment={onDeleteComment}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostsFeed;