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
      comments: [],
      imageUrl: postData.imageUrl || null
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
  },

async search(searchTerm) {
    await delay(300);
    const query = searchTerm.toLowerCase().trim();
    
    if (!query) {
      return [];
    }
    
    const results = posts.filter(post => {
      // Search in content
      const contentMatch = post.content.toLowerCase().includes(query);
      
      // Enhanced hashtag matching
      const hashtagMatch = query.startsWith('#') 
        ? post.content.toLowerCase().includes(query)
        : post.content.toLowerCase().includes(`#${query}`);
      
      // Search in author/username
      const authorMatch = post.author.toLowerCase().includes(query);
      
      return contentMatch || hashtagMatch || authorMatch;
    });
    
    return [...results].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getPostsByHashtag(hashtag) {
    await delay(300);
    const query = hashtag.toLowerCase().trim();
    
    if (!query) {
      return [];
    }
    
    const results = posts.filter(post => {
      // Match hashtag with or without # prefix
      const hashtagPattern = new RegExp(`#${query}\\b`, 'i');
      return hashtagPattern.test(post.content);
    });
    
    return [...results].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
};