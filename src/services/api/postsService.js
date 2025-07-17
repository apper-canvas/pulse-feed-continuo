import postsData from "@/services/mockData/posts.json";

let posts = [...postsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const postsService = {
  async getAll() {
    await delay(300);
    return [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await delay(200);
    const post = posts.find(p => p.Id === parseInt(id));
    return post ? { ...post } : null;
  },

async create(postData) {
    await delay(400);
    const newPost = {
      Id: Math.max(...posts.map(p => p.Id)) + 1,
      ...postData,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    posts.unshift(newPost);
    return { ...newPost };
  },

  async update(id, updateData) {
    await delay(300);
    const index = posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) return null;
    
    posts[index] = { ...posts[index], ...updateData };
    return { ...posts[index] };
  },

  async delete(id) {
    await delay(250);
    const index = posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) return false;
    
    posts.splice(index, 1);
    return true;
  }
};