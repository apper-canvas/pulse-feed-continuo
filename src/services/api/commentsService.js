import postsData from "@/services/mockData/posts.json";

let posts = [...postsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const commentsService = {
  async getByPostId(postId) {
    await delay(200);
    const post = posts.find(p => p.Id === parseInt(postId));
    return post ? [...(post.comments || [])] : [];
  },

  async create(postId, commentData) {
    await delay(300);
    const postIndex = posts.findIndex(p => p.Id === parseInt(postId));
    if (postIndex === -1) return null;

    const post = posts[postIndex];
    if (!post.comments) post.comments = [];

    const newComment = {
      Id: Math.max(...posts.flatMap(p => p.comments || []).map(c => c.Id), 0) + 1,
      ...commentData,
      timestamp: new Date().toISOString()
    };

    post.comments.push(newComment);
    return { ...newComment };
  },

  async update(postId, commentId, updateData) {
    await delay(250);
    const postIndex = posts.findIndex(p => p.Id === parseInt(postId));
    if (postIndex === -1) return null;

    const post = posts[postIndex];
    if (!post.comments) return null;

    const commentIndex = post.comments.findIndex(c => c.Id === parseInt(commentId));
    if (commentIndex === -1) return null;

    post.comments[commentIndex] = { ...post.comments[commentIndex], ...updateData };
    return { ...post.comments[commentIndex] };
  },

  async delete(postId, commentId) {
    await delay(200);
    const postIndex = posts.findIndex(p => p.Id === parseInt(postId));
    if (postIndex === -1) return false;

    const post = posts[postIndex];
    if (!post.comments) return false;

    const commentIndex = post.comments.findIndex(c => c.Id === parseInt(commentId));
    if (commentIndex === -1) return false;

    post.comments.splice(commentIndex, 1);
    return true;
  }
};