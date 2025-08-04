import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminDashboard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();
  const user = params.user ? JSON.parse(params.user as string) : null;

  const adminStats = [
    { title: 'Total Clients', value: '156', icon: 'person.2.fill', color: '#4CAF50', change: '+12%' },
    { title: 'Active Caregivers', value: '89', icon: 'heart.fill', color: '#2196F3', change: '+5%' },
    { title: 'Monthly Revenue', value: '$45,230', icon: 'dollarsign.circle.fill', color: '#FF9800', change: '+8%' },
    { title: 'Pending Tasks', value: '23', icon: 'exclamationmark.triangle.fill', color: '#F44336', change: '-3%' },
  ];

  const adminActions = [
    { title: 'Manage Users', icon: 'person.3.fill', route: '/admin/users', color: '#4CAF50' },
    { title: 'System Settings', icon: 'gearshape.fill', route: '/admin/settings', color: '#2196F3' },
    { title: 'Financial Reports', icon: 'chart.bar.fill', route: '/admin/finance', color: '#FF9800' },
    { title: 'Audit Logs', icon: 'doc.text.fill', route: '/admin/audit', color: '#9C27B0' },
    { title: 'Client Management', icon: 'person.2.circle.fill', route: '/admin/clients', color: '#607D8B' },
    { title: 'Caregiver Management', icon: 'heart.circle.fill', route: '/admin/caregivers', color: '#E91E63' },
  ];

  const recentActivities = [
    { id: 1, text: 'New client registration: John Smith', time: '2 min ago', type: 'info' },
    { id: 2, text: 'System backup completed', time: '15 min ago', type: 'success' },
    { id: 3, text: 'Caregiver performance review scheduled', time: '1 hour ago', type: 'warning' },
    { id: 4, text: 'Monthly financial report generated', time: '2 hours ago', type: 'success' },
    { id: 5, text: 'User access permissions updated', time: '3 hours ago', type: 'info' },
  ];

  const handleAction = (route: string) => {
    router.push(route as any);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => router.replace('/login') }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.title}>Admin Dashboard</ThemedText>
            <ThemedText style={styles.subtitle}>Welcome back, {user?.name || 'Admin'}</ThemedText>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {adminStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
              <View style={styles.statHeader}>
                <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
                <View style={[styles.changeBadge, { backgroundColor: stat.change.startsWith('+') ? '#4CAF50' : '#F44336' }]}>
                  <ThemedText style={styles.changeText}>{stat.change}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
            </View>
          ))}
        </View>

        {/* Admin Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Administrative Actions</ThemedText>
          <View style={styles.actionsGrid}>
            {adminActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: colors.card }]}
                onPress={() => handleAction(action.route)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <IconSymbol name={action.icon as any} size={24} color="#fff" />
                </View>
                <ThemedText style={styles.actionTitle}>{action.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Access</ThemedText>
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity 
              style={[styles.quickAccessCard, { backgroundColor: colors.card }]}
              onPress={() => handleAction('/admin/analytics')}
            >
              <IconSymbol name="chart.line.uptrend.xyaxis" size={32} color={colors.tint} />
              <ThemedText style={styles.quickAccessTitle}>Analytics</ThemedText>
              <ThemedText style={styles.quickAccessSubtitle}>View detailed insights</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickAccessCard, { backgroundColor: colors.card }]}
              onPress={() => handleAction('/admin/notifications')}
            >
              <IconSymbol name="bell.fill" size={32} color={colors.tint} />
              <ThemedText style={styles.quickAccessTitle}>Notifications</ThemedText>
              <ThemedText style={styles.quickAccessSubtitle}>System alerts & messages</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Activities</ThemedText>
          <View style={[styles.activitiesContainer, { backgroundColor: colors.card }]}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityContent}>
                  <ThemedText style={styles.activityText}>{activity.text}</ThemedText>
                  <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
                </View>
                <View style={[
                  styles.activityIndicator,
                  { backgroundColor: activity.type === 'success' ? '#4CAF50' : 
                                   activity.type === 'warning' ? '#FF9800' : '#2196F3' }
                ]} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAccessCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  activitiesContainer: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  activityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
}); 