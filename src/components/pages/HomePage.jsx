import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import CreatePostForm from "@/components/molecules/CreatePostForm";
import PostsFeed from "@/components/organisms/PostsFeed";
import { usePosts } from "@/hooks/usePosts";

const HomePage = () => {
  const { posts, loading, error, createPost, updatePost, refetch } = usePosts();

const handlePostCreated = (postData) => {
    return createPost(postData);
  };

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p.Id === postId);
      if (post) {
        await updatePost(postId, { likes: post.likes + 1 });
        toast.success("Post liked!");
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        <CreatePostForm onPostCreated={handlePostCreated} />
        
        <div className="space-y-6">
          <PostsFeed
            posts={posts}
            loading={loading}
            error={error}
            onRetry={refetch}
            onLike={handleLike}
          />
        </div>
      </main>
    </motion.div>
  );
};

export default HomePage;