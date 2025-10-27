import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { fetchGroupsByUser, fetchUserBalanceByGroup, Group } from '../services/api';
import {CustomText} from '../config/FontConfig';
export default function GroupsScreen({ navigation }: { navigation: any }) {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState<Group[]>([]);
  const [balances, setBalances] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserGroups(user.id);
    }
  }, [user]);

  const fetchUserGroups = async (userId: number) => {
    try {
      const data = await fetchGroupsByUser(userId);
      setGroups(data);

      // Fetch balances for all groups
      const balanceMap: Record<number, number> = {};
      for (const group of data) {
        try {
          const result = await fetchUserBalanceByGroup(group.id, userId);
          balanceMap[group.id] = parseFloat(result);
        } catch (err) {
          console.error(`Error fetching balance for group ${group.id}`, err);
          balanceMap[group.id] = 0;
        }
      }

      setBalances(balanceMap);
    } catch (error: any) {
      console.error('Error fetching groups:', error.response?.data || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A66DFF" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CustomText style={styles.pageTitle}>Your Groups</CustomText>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#A66DFF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {groups.map((group) => {
            const balance = balances[group.id] ?? 0;
            const isPositive = balance >= 0;

            return (
              <TouchableOpacity
                key={group.id}
                style={styles.cardContainer}
                onPress={() => navigation.navigate('GroupDetails', { group })}
              >
                <LinearGradient colors={['#201A47','#40407A', '#19A1BD']} style={styles.card}>
                  <Text style={styles.groupTitle}>{group.name}</Text>
                  <Text style={styles.groupSubtitle}>{group.description}</Text>

                  <View style={styles.amountBox}>
                    <Text
                      style={[
                        styles.amountText,
                        isPositive ? styles.getAmount : styles.oweAmount,
                      ]}
                    >
                      {isPositive
                        ? `You will get: $${balance.toFixed(2)}`
                        : `You owe: $${Math.abs(balance).toFixed(2)}`}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#090933'
  },
  container: {
    padding: 16,
    paddingBottom: 100
  },
  pageTitle:{
    fontSize: 24,
    fontWeight: '900',
    color: '#19A1BD',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(28,187,243,0.8)', // teal glow
    textShadowOffset: { width: 2, height: 2 },  // small offset
    textShadowRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B594F3',
    marginBottom: 5,
  },
  groupSubtitle: {
    fontSize: 14,
    color: '#BEBEBE',
    marginBottom: 15,
  },
  amountBox: {
    borderWidth: 1,
    borderColor: '#2C9C4A',
    backgroundColor: 'rgba(44,156,74,0.15)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '600',
  },
  getAmount: {
    color: '#3DDC84',
  },
  oweAmount: {
    color: '#E85959',
  },
});
