import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { createGroup, createGroupWithMembers } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupScreen({ navigation }: any) {
  const { user } = React.useContext(AuthContext);

  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [addedAnim] = useState(new Animated.Value(0)); // animation for feedback

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      response => {
        if (response.didCancel || response.errorCode) return;
        const uri = response.assets?.[0]?.uri;
        if (uri) setGroupImage(uri);
      }
    );
  };

  const showAddedAnimation = () => {
    Animated.sequence([
      Animated.timing(addedAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(addedAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddMember = () => {
    const email = memberEmail.trim();
    if (!email) {
      Alert.alert('Please enter an email before adding.');
      return;
    }
    if (members.includes(email)) {
      Alert.alert('This member is already added.');
      return;
    }

    setMembers(prev => [...prev, email]);
    setMemberEmail('');
    showAddedAnimation();
  };

  const handleCreateGroup = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    try {
      if (members.length === 0) {
        await createGroup(groupName, description, user.id);
      } else {
        await createGroupWithMembers(groupName, description, user.id, members);
      }

      Alert.alert('Success', 'Group created successfully!');
      navigation.goBack();
    } catch (err) {
      console.error('Error creating group:', err);
      Alert.alert('Error', 'Failed to create group.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Create a group</Text>
        <TouchableOpacity onPress={handleCreateGroup}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Image + Group Name */}
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.imageBox} onPress={handleImagePick}>
          {groupImage ? (
            <Image source={{ uri: groupImage }} style={styles.groupImage} />
          ) : (
            <Icon name="plus" size={24} color="#aaa" />
          )}
        </TouchableOpacity>

        <View style={styles.textInputWrapper}>
          <Text style={styles.label}>Group name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            placeholderTextColor="#888"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>
      </View>

      {/* Group Description */}
      <Text style={styles.label}>Description</Text>
      <LinearGradient
        colors={['#19A1BD', '#40407A', '#201A47']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBox}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputMultiline}
            placeholder="Enter a description"
            placeholderTextColor="#ccc"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
      </LinearGradient>

      {/* Add a member */}
      <Text style={styles.label}>Add a member</Text>
      <LinearGradient
        colors={['#201A47', '#40407A', '#19A1BD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBox2}
      >
        <View style={styles.inputWrapper2}>
          <Feather name="search" size={22} color="#fff" style={styles.iconLeft} />
          <TextInput
            style={styles.input2}
            placeholder="Search by Email"
            placeholderTextColor="#ccc"
            value={memberEmail}
            onChangeText={setMemberEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity onPress={handleAddMember}>
            <Feather name="plus-circle" size={26} color="#19A1BD" style={styles.iconRight} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Animated.Text
        style={[
          styles.addedText,
          {
            opacity: addedAnim,
            transform: [
              {
                translateY: addedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          },
        ]}
      >
        Member added!
      </Animated.Text>

      {/* Member List */}
      {members.length > 0 && (
        <View style={styles.memberList}>
          {members.map((email, index) => (
            <View key={index} style={styles.memberItem}>
              <Text style={styles.memberText}>{email}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#090933',
    flex: 1,
    padding: 20,
  },
  topBar: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  doneText: {
    color: '#00c29e',
    fontSize: 16,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0E0E33',
    backgroundColor: '#165666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  groupImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  textInputWrapper: {
    flex: 1,
  },
  label: {
    color: '#f2f0f0',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#00c29e',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 4,
  },
  gradientBox: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 25,
  },
  inputWrapper: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 10,
  },
  inputMultiline: {
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  gradientBox2: {
    width: '100%',
    borderRadius: 14,
    padding: 2,
    marginVertical: 10,
  },
  inputWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 55,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  input2: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  addedText: {
    color: '#3DDC84',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  memberList: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  memberItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  memberText: {
    color: '#fff',
    fontSize: 15,
  },
});
