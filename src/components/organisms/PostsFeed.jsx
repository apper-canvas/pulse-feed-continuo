import { motion } from "framer-motion";
import PostCard from "@/components/molecules/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PostsFeed = ({ posts, loading, error, onRetry, onLike, onCreateComment, onUpdateComment, onDeleteComment }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!posts || posts.length === 0) {
    return <Empty />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.Id}
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
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostsFeed;