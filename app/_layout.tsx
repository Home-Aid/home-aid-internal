import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Ensure theme is properly initialized
    if (loaded && colorScheme !== undefined) {
      setIsReady(true);
    }
  }, [loaded, colorScheme]);

  if (!loaded || !isReady) {
    // Show loading state until everything is ready
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Authentication */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        
        {/* Role-based dashboards */}
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="manager" options={{ headerShown: false }} />
        <Stack.Screen name="provider" options={{ headerShown: false }} />
        
        {/* Tab navigation for general access */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
