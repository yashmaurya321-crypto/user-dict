import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  TextInput,
  Image
} from 'react-native';
import UserApi from '../Component/UserApi';
import placeholderImage from '../assets/user.png';
import debounce from 'lodash.debounce';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);  

  const fetchUsers = async () => {
    if (loading) return;  

    setLoading(true);
    try {
      const newUsers = await UserApi.fetchUsers(page); 
      setUsers((prevUsers) => {
        const allUsers = [...prevUsers, ...newUsers];
        return Array.from(new Set(allUsers.map(user => user.id))).map(
          id => allUsers.find(user => user.id === id)
        );
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce(async (query) => {
    if (query.length > 2) {
      try {
        const searchResults = await UserApi.searchUsers(query);
        setUsers(searchResults);
        setPage(1); 
      } catch (error) {
        console.error('Search error:', error);
      }
    } else if (query.length === 0) {
      fetchUsers();
    }
  }, 100);

  const toggleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedUsers = [...users].sort((a, b) => {
      return newSortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setUsers(sortedUsers);
  };

  const loadMoreUsers = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1; 
      fetchUsers(nextPage);
      return nextPage;
    });
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);  

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('UserDetails', { user: item })}
    >
      <View style={styles.userItemContent}>
        <Image
          source={placeholderImage}
          style={styles.userImage}
        />
        <View style={styles.userTextContent}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <Text style={styles.userCompany}>{item.company.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
        />
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={toggleSort}
        >
          <Text style={styles.sortButtonText}>
            {sortOrder === 'asc' ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}  
        onEndReached={loadMoreUsers}  
        onEndReachedThreshold={0.5} 
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  sortButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    width: 40,
    marginLeft: 10,
    borderRadius: 8
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16
  },
  userTextContent: {
    flex: 1,
  },
  userItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  userItemContent: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  userEmail: {
    color: '#666',
    marginBottom: 5
  },
  userCompany: {
    color: '#888',
    fontStyle: 'italic'
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default UserListScreen;
