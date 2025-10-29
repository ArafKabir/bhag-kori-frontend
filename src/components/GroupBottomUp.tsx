import React, {useEffect, useRef} from 'react';
import{
  View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

export default function GroupBottomUp({visible, onClose, group, onDelete}:{visible: boolean;
  onClose: () => void;
  group: any;
  onDelete: () => void;
}) {

  const slideAnimation = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [slideAnimation, visible]);


  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        {/* Close when pressing the dark background */}
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        {/* Bottom popup */}
        <Animated.View
          style={[
            styles.popupContainer,
            { transform: [{ translateY: slideAnimation }] },
          ]}
        >
          <LinearGradient
            colors={['#201A47', '#40407A', '#19A1BD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.popup}
          >
            <Text style={styles.title}>{group?.name}</Text>
            <Text style={styles.description}>{group?.description}</Text>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => {
                onDelete();
                onClose();
              }}
            >
              <Text style={[styles.optionText, {color: '#ff7070'}]}>
                Delete Group
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionBtn} onPress={onClose}>
              <Text style={styles.optionText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
  },
  popupContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,

  },
  popup: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#eee',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionBtn: {
    width: '100%',
    backgroundColor: '#ffffff22',
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});