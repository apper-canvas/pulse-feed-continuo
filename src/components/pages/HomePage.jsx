import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import CreatePostForm from "@/components/molecules/CreatePostForm";
import PostsFeed from "@/components/organisms/PostsFeed";
import { usePosts } from "@/hooks/usePosts";

const HomePage = () => {
const { 
    posts, 
    loading, 
    error, 
    createPost, 
    updatePost, 
    deletePost,
    createComment, 
    updateComment, 
    deleteComment, 
    refetch 
  } = usePosts();

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

const handleCreateComment = async (postId, commentData) => {
    await createComment(postId, commentData);
    return true;
  };

  const handleUpdateComment = async (postId, commentId, updateData) => {
    try {
      await updateComment(postId, commentId, updateData);
      toast.success("Comment updated!");
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(postId, commentId);
    return true;
};

  const handleEditPost = async (postId, updateData) => {
    try {
      await updatePost(postId, updateData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post");
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
            onCreateComment={handleCreateComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        </div>
      </main>
    </motion.div>
  );
};

export default HomePage;