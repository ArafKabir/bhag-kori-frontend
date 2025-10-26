import React, { useContext, useState } from 'react';
import {View, TextInput,  StyleSheet, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from "react-native-linear-gradient";
import Feather from 'react-native-vector-icons/Feather';
import { loginRequest } from '../services/api.ts';

export default function LoginScreen({navigation}: {navigation: any}) {
   const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        loading;
        error;
        setLoading(true);
        setError(null);
        try {
            const response = await loginRequest(email, password);
            const token = response.data.token;

            await login(token);
            navigation.replace('Home');
        } catch (err) {
            setError('Invalid email or password');
            console.log('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../assets/backgorunds/login-bg.png')} style={styles.background}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/AppLogo/logo.png')} style={styles.logo}/>
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
            <TouchableOpacity>
                <Text style={styles.forgetPassText}>Forgot your Password?</Text>
            </TouchableOpacity>
                <View style={styles.signInBtnContainer}>
                <Text style={styles.signIn}>Sign In</Text>
                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                        colors={["#A3CEE3", "#4FB2D6", "#2169B0"]}
                        style={styles.linearGradient}
                    >
                        <Feather name="arrow-right" size={25} color="white"  />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>Don't have an account?{" "}
                <Text style={{textDecorationLine: "underline"}} onPress={() => {navigation.replace('SignUp')}}>
                    Create
                </Text>
            </Text>
            <Text style={styles.footerText}>or continue with</Text>

            <View style={styles.footerIconContainer}>
                <TouchableOpacity style={styles.circleWrapper}>
                    <Image source={require('../assets/LoginIcons/facebook.png')} style={styles.socialIcons} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleWrapper}>
                    <Image source={require('../assets/LoginIcons/google.png')} style={styles.socialIcons} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleWrapper}>
                    <Image source={require('../assets/LoginIcons/apple-logo.png')} style={styles.socialIcons} />
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
    logo: {
      width: 240,
      height: 240,
      alignSelf: 'center',
      marginTop: -80,
      resizeMode: 'contain'
    },
    headerContainer:{
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 60
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
        fontFamily: 'sans-serif-light',
        paddingLeft: 10,
    },
    linearGradient: {
        height: 36,
        width: 56,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal: 10,
    },
    footerText: {
        color: '#262626',
        textAlign: 'center',
        width: "100%",
        fontSize: 15,
        marginTop: 20
    },
    footerIconContainer: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: 'center',
        gap: 20,
    },

    circleWrapper: {
        backgroundColor: 'white',
        borderRadius: 40,
        padding: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    socialIcons: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

});
