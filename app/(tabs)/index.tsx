import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    // Ensure theme is properly loaded
    if (colorScheme) {
      setIsThemeReady(true);
    }
  }, [colorScheme]);

  const handleGetStarted = () => {
    router.push('/login');
  };

  // Don't render until theme is ready
  if (!isThemeReady) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, { backgroundColor: colors.tint }]}>
            <IconSymbol name="heart.fill" size={60} color="#fff" />
          </View>
          <ThemedText style={[styles.title, { color: colors.text }]}>Home Aid</ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.text }]}>Caring for your loved ones</ThemedText>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: colors.tint }]}
            onPress={handleGetStarted}
          >
            <ThemedText style={styles.getStartedText}>Let's Start</ThemedText>
            <IconSymbol name="arrow.right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.text }]}>
            Professional home care services
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7,
    textAlign: 'center',
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});
