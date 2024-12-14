class UserService {
    baseURL = 'https://jsonplaceholder.typicode.com/users';
  
    async fetchUsers(page = 1, limit = 10) {
      try {
        const response = await fetch(`${this.baseURL}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        return await response.json();
      } catch (error) {
        console.error('User fetch error:', error);
        return [];
      }
    }
  
    async searchUsers(query) {
      try {
        const response = await fetch(`${this.baseURL}?q=${query}`);
        
        if (!response.ok) {
          throw new Error('Failed to search users');
        }
        
        return await response.json();
      } catch (error) {
        console.error('User search error:', error);
        return [];
      }
    }
  
    async getUserById(id) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user with id ${id}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error(`User fetch error for id ${id}:`, error);
        return null;
      }
    }
  }
  
  export default new UserService();