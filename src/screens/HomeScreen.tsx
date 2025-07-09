import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;
// const useNavigation = useNavigation();
export default function HomeScreen() {

    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                    <Image source={require('../assets/notification.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image source={require('../assets/profile.png')} style={styles.profileImg} />
                </TouchableOpacity>
            </View>

            {/* Action Panel */}
            <View style={styles.bluePanel}>
                <View style={styles.topActionRow}>
                    <TouchableOpacity style={styles.viewBalanceBtn}>
                        <Text style={styles.viewBalanceText}>View Balance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addMoneyBtn}>
                        <Text style={styles.addMoneyText}>Add Money</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconActionRow}>

                    <TouchableOpacity>
                        <Image source={require('../assets/createGroup.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/addFriend.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>Add Friend</Text></TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/requestPayment.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>Request Payment</Text></TouchableOpacity>
                </View>
            </View>

            {/* Dynamic Cards */}
            <View style={styles.cardGrid}>
                <TouchableOpacity style={styles.GroupsCard} onPress={() => navigation.navigate('GroupsScreen')}>
                    <Text style={styles.cardTitle}>Groups</Text>
                    <Text style={styles.cardDesc}>Create a group and split with multiple people!</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.FriendsCard}>
                    <Text style={styles.cardTitle}>Friends</Text>
                    <Text style={styles.cardDesc}>Split with your friends!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card3}>
                    <Text style={styles.cardTitle}>Activity Log</Text>
                    <Text style={styles.cardDesc}>Check all your recent activities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card4}>
                    <Text style={styles.cardTitle}>Pay Up</Text>
                    <Text style={styles.cardDesc}>Pay all your debts with one click!</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Nav */}
            <View style={styles.bottomNav}>
                <TouchableOpacity>
                    <Image source={require('../assets/house.png')} style={styles.icon} />
                    <Text style={styles.navIcon}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.qrButton}><Text style={styles.qrIcon}>🔲</Text></TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/chat.png')} style={styles.icon} />
                    <Text style={styles.navIcon}>Inbox</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfafa',
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    profileImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    bluePanel: {
        backgroundColor: '#007bff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    topActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    viewBalanceBtn: {
        backgroundColor: '#004fc1',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
    },
    addMoneyBtn: {
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
    },
    viewBalanceText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addMoneyText: {
        color: '#fff',
        fontWeight: 'bold',

    },
    iconActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconLabel: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    cardGrid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    GroupsCard: {
        width: CARD_WIDTH,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
    },
    FriendsCard: {
        width: CARD_WIDTH,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
    },
    card3: {
        width: CARD_WIDTH,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginTop: -40,
    },
    card4: {
        width: CARD_WIDTH,
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        alignSelf: 'center',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    cardDesc: {
        color: '#666',
        fontSize: 12,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10,
    },
    navIcon: {
        fontSize: 15,
    },
    qrButton: {
        backgroundColor: '#e6f0ff',
        borderRadius: 32,
        padding: 10,
    },
    qrIcon: {
        fontSize: 26,
    },
});
