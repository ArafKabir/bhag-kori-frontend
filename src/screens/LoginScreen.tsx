import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { login as loginRequest } from '../services/api';  // ← use your helper

export default function LoginScreen() {
    const { login } = useContext(AuthContext);

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
        <View style={styles.box}>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleSubmit} disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        borderRadius: 6,
        padding: 12,
    },
    error: {
        color: 'red',
        marginBottom: 8,
        textAlign: 'center',
    },
});
