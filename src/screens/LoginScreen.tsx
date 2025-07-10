import React, { useContext, useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { login as loginRequest } from '../services/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from "react-native-linear-gradient";
import Feather from 'react-native-vector-icons/Feather';

export default function LoginScreen() {
   // const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginRequest(email, password);
            const token = response.data.token;
            await login(token);
        } catch (err) {
            setError('Invalid email or password');
            console.log('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../assets/backgorunds/login-bg.jpg')} style={styles.background}>
            <View style={styles.headerContainer}>
                <Text style ={styles.headerText}>Welcome Back!</Text>
                <Text style ={styles.signInText}>Sign in to your account</Text>
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={23} color="#9A9A9A" style={styles.icon} />
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
            {/*{error && <Text style={styles.error}>{error}</Text>}*/}
            <Text style={ styles.forgetPassText}>Forgot your Password?</Text>
            <View style={styles.signInBtnContainer}>
                <Text style={styles.signIn}>Sign In</Text>
                <TouchableOpacity>
                    <LinearGradient
                        colors={["#F97794", "#625AA2"]}
                        style={styles.linearGradient}
                    >
                        <Feather name="arrow-right" size={25} color="white" style={styles.loginIcon} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
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
    headerContainer:{
        justifyContent: 'center',
        marginBottom: 50,
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
        color: '#262626'
    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 12,
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
    error: {
        color: 'red',
        marginBottom: 8,
        textAlign: 'center',
    },
    forgetPassText:{
        color: '#BEBEBE',
        textAlign: 'right',
        width: "90%",
        fontSize: 15,
    },
    signInBtnContainer: {
        flexDirection: 'row',
        marginTop: 70,
        justifyContent: 'center',
    },
    signIn: {
        color: '#262626',
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light'
    },
    linearGradient: {
        height: 36,
        width: 56,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal: 10,
    },
    loginIcon:{
        size: 20,
    },


});
