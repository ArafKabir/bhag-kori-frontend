import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSignUp = () => {
        if (!name || !email || !password || !confirmPass) {
            Alert.alert('Error', 'Please fill in all fields');
        } else if (password !== confirmPass) {
            Alert.alert('Error', 'Passwords do not match');
        } else {
            // Handle sign up logic here
            Alert.alert('Success', 'Account created!');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/backgorunds/login-bg.jpg')}
            style={styles.background}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Create Account</Text>
                <Text style={styles.signInText}>Sign up to get started</Text>
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={23} color="#9A9A9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={23} color="#9A9A9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={23} color="#9A9A9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={23} color="#9A9A9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                />
            </View>

            <View style={styles.signInBtnContainer}>
                <Text style={styles.signIn}>Sign Up</Text>
                <TouchableOpacity onPress={handleSignUp}>
                    <LinearGradient
                        colors={['#A3CEE3', '#4FB2D6', '#2169B0']}
                        style={styles.linearGradient}
                    >
                        <Feather name="arrow-right" size={25} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                    style={{ textDecorationLine: 'underline' }}
                    onPress={() => {
                        // navigate to Login
                    }}
                >
                    Login
                </Text>
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    headerContainer: {
        justifyContent: 'center',
        marginBottom: 40,
    },
    headerText: {
        fontSize: 35,
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#262626',
        position: 'relative',
    },
    signInText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#262626',
    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    input: {
        paddingLeft: 16,
        paddingVertical: 12,
        fontSize: 16,
        flex: 1,
    },
    icon: {
        marginLeft: 10,
        position: 'static',
        left: 16,
    },
    signInBtnContainer: {
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signIn: {
        color: '#262626',
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light',
        paddingLeft: 10,
    },
    linearGradient: {
        height: 36,
        width: 56,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    footerText: {
        color: '#262626',
        textAlign: 'center',
        width: '100%',
        fontSize: 15,
        marginTop: 25,
    },
});
