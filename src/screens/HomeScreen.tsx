import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import {AuthContext} from '../context/AuthContext.tsx';
import LinearGradient from 'react-native-linear-gradient';


const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;
// const useNavigation = useNavigation();
export default function HomeScreen({navigation}: {navigation: any} ) {
    const {user, logout} = React.useContext(AuthContext);
    return (
        <View style={styles.container}>

            {/* Header Row */}
          <View>
            <LinearGradient
              colors={['#201A47', '#40407A', '#19A1BD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}
            >
              <View style={styles.headerRow}>
                {/* Notification Icon - Left */}
                <TouchableOpacity onPress={() => console.log('Menu')}>
                  <Image
                    source={require('../assets/HomeIcons/menu.png')}
                    style={styles.headerIcon}
                  />
                </TouchableOpacity>

                {/* Center - Username */}
                <Text style={styles.headerName}>{user?.name || 'User'}</Text>

                {/* Profile Icon - Right */}
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                  <Image
                    source={require('../assets/HomeIcons/profile.png')}
                    style={styles.headerProfile}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

            {/* Action Panel */}
            <View style={styles.bluePanel}>
              <LinearGradient
                colors={['#201A47','#40407A', '#19A1BD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bluePanel}
              >
                <View style={styles.topActionRow}>
                    <TouchableOpacity style={styles.viewBalanceBtn}>
                        <Text style={styles.viewBalanceText}>Receivables</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.payablesBtn}>
                        <Text style={styles.payablesText}>Payables</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconActionRow}>

                    <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                        <Image source={require('../assets/HomeIcons/createGroup.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddFriend')}>
                        <Image source={require('../assets/HomeIcons/addFriend.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>Add Friend</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Request')}>
                        <Image source={require('../assets/HomeIcons/request.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>Request</Text></TouchableOpacity>
                </View>
                </LinearGradient>
            </View>

            {/* Dynamic Cards */}
            <View style={styles.cardGrid}>
                <TouchableOpacity  onPress={() => navigation.navigate('Groups')}>
                  <LinearGradient colors={['#201A47','#40407A', '#19A1BD']} style={styles.GroupsCard}>
                    <Text style={styles.cardTitle}>Groups</Text>
                    <Text style={styles.cardDesc}>Create a group and split with multiple people!</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity >
                  <LinearGradient colors={['#201A47','#40407A', '#19A1BD']} style={styles.FriendsCard}>
                    <Text style={styles.cardTitle}>Friends</Text>
                    <Text style={styles.cardDesc}>Split with your friends!</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity >
                  <LinearGradient colors={['#201A47','#40407A', '#19A1BD']} style={styles.card3}>
                    <Text style={styles.cardTitle}>Activity Log</Text>
                    <Text style={styles.cardDesc}>Check all your recent activities</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity >
                  <LinearGradient colors={['#201A47','#40407A', '#19A1BD']} style={styles.card4}>
                    <Text style={styles.cardTitle}>Pay Up</Text>
                    <Text style={styles.cardDesc}>Pay all your debts with one click!</Text>
                  </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Bottom Nav */}

              <LinearGradient
                colors={['#201A47', '#40407A', '#19A1BD']} style = {styles.bottomNav}>
                <TouchableOpacity>
                    <Image source={require('../assets/HomeIcons/home.png')} style={styles.icon} />
                    <Text style={styles.navIcon}> Home</Text></TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/HomeIcons/wallet.png')} style={styles.icon} />
                    <Text style={styles.navIcon}>Add Expense</Text></TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/HomeIcons/inbox.png')} style={styles.icon} />
                    <Text style={styles.navIcon}>  Inbox</Text></TouchableOpacity>
              </LinearGradient>
          </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#090933',
        padding: 12,
    },
    header: {
      width: '100%',
      borderRadius: 20,
      paddingVertical: 15,
      marginTop: 30,
      paddingHorizontal: 20,
      elevation: 10,

    },

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    headerIcon: {
      width: 28,
      height: 28,
      resizeMode: 'contain',
    },

    headerProfile: {
      width: 28,
      height: 28,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: '#fff',
    },

    headerName: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      marginHorizontal: 10,
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
      width: 350,
      borderRadius: 30,
      padding: 20,
      elevation: 50,
      alignSelf: 'center'
    },
    topActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    viewBalanceBtn: {
        backgroundColor: '#0D0D4A',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
    },
    payablesBtn: {
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
    payablesText: {
        color: '#fff',
        fontWeight: 'bold',

    },
    iconActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconLabel: {
        color: 'white',
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
        backgroundColor: 'rgba(167, 23, 189,0.6)',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        elevation: 5,
    },
    FriendsCard: {
        width: CARD_WIDTH,
        height: 160,
        backgroundColor: 'rgba(167, 23, 189,0.6)',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        elevation: 5,
    },
    card3: {
        width: CARD_WIDTH,
        height: 100,
        backgroundColor: 'rgba(167, 23, 189,0.6)',
        borderRadius: 12,
        padding: 12,
        marginTop: -40,
        elevation: 5,
    },
    card4: {
        width: CARD_WIDTH,
        height: 180,
        backgroundColor: 'rgba(167, 23, 189,0.6)',
        borderRadius: 12,
        padding: 12,
        alignSelf: 'center',
        elevation: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
        marginBottom: 4,
    },
    cardDesc: {
        color: '#f2f0f0',
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
        padding: 15,
        backgroundColor: '#fff',
    },
    navIcon: {
      fontSize: 12,
      color: '#f2f0f0',
      fontWeight: 'bold',
    },
});
