import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

export default function CreateGroupScreen({ navigation }: any) {
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("");
    const [memberEmail, setMemberEmail] = useState<string[]>([]);
    const handleImagePick = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.7 },
            (response) => {
                if (response.didCancel || response.errorCode) return;
                const uri = response.assets?.[0]?.uri;
                if (uri) setGroupImage(uri);
            }
        );
    };
    const handleCreateGroup = () => {}
    const handleCreateGroupWithMembers =() =>{

    }
    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="x" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Create a group</Text>
                <TouchableOpacity>
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
          <View>
            <LinearGradient
              colors={['#19A1BD', '#40407A', '#201A47']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBox}
            >
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a description"
                  placeholderTextColor="#ccc"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Add a member */}
          <Text style={styles.label}>Add a member</Text>
          <View>
          <LinearGradient
            colors={['#201A47', '#40407A', '#19A1BD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBox2}
          >
            <View style={styles.inputWrapper2}>
              {/* Search Icon */}
              <Feather name="search" size={22} color="#fff" style={styles.iconLeft} />

              {/* Text Input */}
              <TextInput
                style={styles.input2}
                placeholder="Search by Email"
                placeholderTextColor="#ccc"
                value={memberEmail}
                onChangeText={setMemberEmail}
              />

              {/* Plus Icon Button */}
              <TouchableOpacity onPress={handleAddMember}>
                <Feather name="plus-circle" size={26} color="#19A1BD" style={styles.iconRight} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          </View>
        </View>

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

    gradientBox: {
      width: '100%',
      borderRadius: 12,
      marginBottom:25
    },
    inputWrapper: {
      width: '100%',
      height: 100,
      backgroundColor: 'rgba(0,0,0,0.5)', // inner box background (transparent dark)
      borderRadius: 10,
      padding: 10,
    },

    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    doneText: {
        color: '#00c29e',
        fontSize: 16,
        fontWeight: '500',
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
    typesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    typeBox: {
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: 'center',
        width: '23%',
        backgroundColor: '#D2DCFC',
    },
    typeBoxSelected: {
        borderColor: '#00c29e',
    },
    typeIcon: {
        width: 24,
        height: 24,
        marginBottom: 6,
        resizeMode: 'contain',

    },
    typeLabel: {
        color: 'black',
        fontSize: 13,
    },
    gradientBox2: {
      width: '100%',
      borderRadius: 14,
      padding: 2, // gradient border thickness
      marginVertical: 10,
      marginTop: 2
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
});
