import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserDetailsScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const openWebsite = () => {
    Linking.openURL(`https://${user.website}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>👤 User Profile</Text>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>
              {user.address.street}, {user.address.suite}
              {'\n'}{user.address.city}, {user.address.zipcode}
            </Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Geo Location</Text>
            <Text style={styles.value}>
              Latitude: {user.address.geo.lat}
              {'\n'}Longitude: {user.address.geo.lng}
            </Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{user.company.name}</Text>
            <Text style={styles.subValue}>
              "{user.company.catchPhrase}"
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.websiteButton}
            onPress={openWebsite}
          >
            <Text style={styles.websiteButtonText}>🌐 Visit Website</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>⬅ Back to User List</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  subValue: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 5,
  },
  websiteButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#0275d8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserDetailsScreen;
