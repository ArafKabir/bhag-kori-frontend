import React, { useEffect, useState, useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { Expense, fetchAllExpensesByGroupId, Group } from '../services/api';
import GroupBottomPopUp from '../components/GroupBottomUp';
import ExpensePopUp from '../components/ExpensePopUp';

export default function GroupDetails({
                                       route,
                                       navigation,
                                     }: {
  route: any;
  navigation: any;
}) {
  const { group } = route.params as { group: Group };
  const { user } = useContext(AuthContext);

  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [bottomUpVisible, setBottomUpVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧹 Fetch expenses
  const fetchAllExpenses = async (groupId: number) => {
    try {
      const data = await fetchAllExpensesByGroupId(groupId);
      console.log('Expenses:', data);

      // Normalize response in case backend uses snake_case
      const normalized = (data || []).map((e: any) => ({
        id: e.id,
        name: e.name,
        createTime: e.createTime || e.create_time,
        payerId: e.payerId || e.payer_id,
        roomId: e.roomId || e.room_id,
        amount: Number(e.amount),
        splitType: e.splitType || e.split_type,
      }));

      setExpenseList(normalized);
    } catch (error: any) {
      console.error(
        'Error fetching expenses:',
        error.response?.data || error.message || error
      );
      setExpenseList([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Run once on load
  useEffect(() => {
    if (group?.id && user?.id) {
      fetchAllExpenses(group.id);
    }
  }, [group, user?.id]);

  const handleDelete = async () => {
    console.log('Deleting group:', group.name);
  };

  // 💬 When user taps an expense
  const openExpenseDetails = (expense: Expense) => {
    setSelectedExpense(expense);
    setPopupVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#19A1BD" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* 🟣 Header */}
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
          <TouchableOpacity onPress={() => setBottomUpVisible(true)}>
            <Image
              source={require('../assets/HomeIcons/menu.png')}
              style={styles.iconSmall}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* 🟢 Activity Section */}
      <LinearGradient
        colors={['#201A47', '#40407A', '#19A1BD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.activityBox}
      >
        <Text style={styles.activityTitle}>Activity</Text>

        <ScrollView contentContainerStyle={styles.activityScroll}>
          {Array.isArray(expenseList) && expenseList.length > 0 ? (
            expenseList.map((expense) => (
              <TouchableOpacity
                key={expense.id}
                style={styles.expenseCard}
                onPress={() => openExpenseDetails(expense)}
              >
                <View style={styles.expenseInfo}>
                  <Text style={styles.expenseTitle}>{expense.name}</Text>
                  <Text style={styles.expenseDate}>
                    {new Date(expense.createTime).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.amountBadge}>
                  <Text style={styles.amountText}>
                    Amount: ${expense.amount.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noExpense}>No expenses yet.</Text>
          )}
        </ScrollView>
      </LinearGradient>

      {/* ⚫ Bottom Navigation */}
      <LinearGradient
        colors={['#201A47', '#40407A', '#19A1BD']}
        style={styles.bottomNav}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.navItem}
        >
          <Image
            source={require('../assets/HomeIcons/home.png')}
            style={styles.icon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddExpense', { group })}
          style={styles.navItem}
        >
          <Image
            source={require('../assets/HomeIcons/wallet.png')}
            style={styles.icon}
          />
          <Text style={styles.navText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Inbox')}
          style={styles.navItem}
        >
          <Image
            source={require('../assets/Group/AddMember.png')}
            style={styles.icon}
          />
          <Text style={styles.navText}>Add Member</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* 🟡 Bottom PopUps */}
      <GroupBottomPopUp
        visible={bottomUpVisible}
        onClose={() => setBottomUpVisible(false)}
        group={group}
        onDelete={handleDelete}
      />

      <ExpensePopUp
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        expense={selectedExpense}
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
  activityBox: {
    width: '100%',
    borderRadius: 16,
    padding: 15,
    marginTop: 15,
    elevation: 8,
  },
  activityTitle: {
    color: '#cfc5ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityScroll: {
    paddingBottom: 20,
  },
  expenseCard: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  expenseInfo: {
    marginBottom: 6,
  },
  expenseTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  expenseDate: {
    color: '#bbb',
    fontSize: 12,
  },
  amountBadge: {
    backgroundColor: 'rgba(0,255,100,0.2)',
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },
  amountText: {
    color: '#00FF88',
    fontWeight: 'bold',
    fontSize: 13,
  },
  noExpense: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 15,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
