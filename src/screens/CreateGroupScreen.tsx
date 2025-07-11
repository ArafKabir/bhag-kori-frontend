import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    ImageBackground,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

const groupTypes = [
    { label: 'Trip', icon: require('../assets/groupTypes/trip.png') },
    { label: 'Home', icon: require('../assets/groupTypes/home.png') },
    { label: 'Couple', icon: require('../assets/groupTypes/couple.png') },
    { label: 'Other', icon: require('../assets/groupTypes/other.png') },
];

export default function CreateGroupScreen({ navigation }: any) {
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

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

            {/* Group Types */}
            <Text style={styles.label}>Type</Text>
            <View style={styles.typesRow}>
                {groupTypes.map((type) => (
                    <TouchableOpacity
                        key={type.label}
                        style={[
                            styles.typeBox,
                            selectedType === type.label && styles.typeBoxSelected,
                        ]}
                        onPress={() => setSelectedType(type.label)}
                    >
                        <Image source={type.icon} style={styles.typeIcon} />
                        <Text style={styles.typeLabel}>{type.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecfafa',
        flex: 1,
        padding: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
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
        borderColor: '#333',
        backgroundColor: '#D2DCFC',
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
        color: '#aaa',
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
});
