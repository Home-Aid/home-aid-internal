import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  email: string;
  password: string;
  role: 'provider' | 'manager' | 'admin';
  name: string;
}

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user database - in real app, this would be in a secure backend
  const mockUsers: User[] = [
    { email: 'admin@homeaid.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { email: 'manager@homeaid.com', password: 'manager123', role: 'manager', name: 'Manager User' },
    { email: 'provider@homeaid.com', password: 'provider123', role: 'provider', name: 'Provider User' },
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Store user info in global state or secure storage
        // For now, we'll pass it through router params
        router.replace({
          pathname: `/${user.role}` as any,
          params: { user: JSON.stringify(user) }
        });
      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: 'admin' | 'manager' | 'provider') => {
    const demoUser = mockUsers.find(u => u.role === role);
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword(demoUser.password);
      handleLogin();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo and Title */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.tint }]}>
              <IconSymbol name="heart.fill" size={40} color="#fff" />
            </View>
            <ThemedText style={[styles.title, { color: colors.text }]}>Home Aid</ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.text }]}>Internal Management System</ThemedText>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
              <IconSymbol name="envelope.fill" size={20} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
              <IconSymbol name="lock.fill" size={20} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: colors.tint },
                isLoading && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <ThemedText style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Demo Login Options */}
          <View style={styles.demoContainer}>
            <ThemedText style={[styles.demoTitle, { color: colors.text }]}>Demo Accounts</ThemedText>
            <View style={styles.demoButtons}>
              <TouchableOpacity
                style={[styles.demoButton, { backgroundColor: '#4CAF50' }]}
                onPress={() => handleDemoLogin('admin')}
              >
                <ThemedText style={styles.demoButtonText}>Admin</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.demoButton, { backgroundColor: '#2196F3' }]}
                onPress={() => handleDemoLogin('manager')}
              >
                <ThemedText style={styles.demoButtonText}>Manager</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.demoButton, { backgroundColor: '#FF9800' }]}
                onPress={() => handleDemoLogin('provider')}
              >
                <ThemedText style={styles.demoButtonText}>Provider</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={[styles.footerText, { color: colors.text }]}>
              Secure access to Home Aid internal systems
            </ThemedText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  formContainer: {
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoContainer: {
    marginBottom: 32,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  demoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
}); 