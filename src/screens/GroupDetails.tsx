import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Group } from '../services/api.ts';
import GroupBottomPopUp from '../components/GroupBottomUp'; // ✅ default import

export default function GroupDetails({ route, navigation }: { route: any; navigation: any }) {
  const { group } = route.params as { group: Group };
  const [popupVisible, setPopupVisible] = useState(false);

  const handleDelete = async () => {
    console.log('Deleting group:', group.name);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient
        colors={['#201A47', '#40407A', '#19A1BD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/Navigation/back.png')}
              style={styles.iconSmall}
            />
          </TouchableOpacity>

          {/* Group Name */}
          <Text style={styles.headerTitle}>{group?.name || 'Group'}</Text>

          {/* Menu Button */}
          <TouchableOpacity onPress={() => setPopupVisible(true)}>
            <Image
              source={require('../assets/HomeIcons/menu.png')}
              style={styles.iconSmall}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Scroll Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.groupText}>Description: {group?.description}</Text>
        <Text style={styles.groupText}>Members: {group?.memberIds?.length}</Text>
      </ScrollView>

      {/* Bottom Nav */}
      <LinearGradient
        colors={['#201A47', '#40407A', '#19A1BD']}
        style={styles.bottomNav}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <Image source={require('../assets/HomeIcons/home.png')} style={styles.icon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddExpense')} style={styles.navItem}>
          <Image source={require('../assets/HomeIcons/wallet.png')} style={styles.icon} />
          <Text style={styles.navText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Inbox')} style={styles.navItem}>
          <Image source={require('../assets/Group/AddMember.png')} style={styles.icon} />
          <Text style={styles.navText}>Add Member</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Popup Component */}
      <GroupBottomPopUp
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        group={group}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#090933',
  },
  header: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 5,
    paddingHorizontal: 20,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconSmall: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  groupText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
  },
  navItem: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
