import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Expense } from '../services/api';

export default function ExpensePopUp({
                                       visible,
                                       onClose,
                                       expense,
                                     }: {
  visible: boolean;
  onClose: () => void;
  expense: Expense | null;
}) {
  if (!visible || !expense) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        <View style={styles.popupContainer}>
          <LinearGradient
            colors={['#201A47', '#40407A', '#19A1BD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.popup}
          >
            <Text style={styles.title}>{expense.name}</Text>
            <Text style={styles.detailText}>
              Amount: ${Number(expense.amount).toFixed(2)}
            </Text>
            <Text style={styles.detailText}>
              Created: {new Date(expense.createTime).toLocaleString()}
            </Text>
            <Text style={styles.detailText}>Split Type: {expense.splitType}</Text>
            <Text style={styles.detailText}>Payer ID: {expense.payerId}</Text>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  popupContainer: {
    width: '85%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  popup: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailText: {
    color: '#ddd',
    fontSize: 14,
    marginVertical: 3,
  },
  closeBtn: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff22',
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
