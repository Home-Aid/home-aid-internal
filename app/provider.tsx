import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderDashboard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();
  const user = params.user ? JSON.parse(params.user as string) : null;

  const providerStats = [
    { title: 'Today\'s Visits', value: '4', icon: 'calendar', color: '#4CAF50' },
    { title: 'Active Clients', value: '3', icon: 'person.2.fill', color: '#2196F3' },
    { title: 'Hours This Week', value: '28', icon: 'clock.fill', color: '#FF9800' },
    { title: 'Rating', value: '4.8', icon: 'star.fill', color: '#FFD700' },
  ];

  const todaySchedule = [
    { id: 1, client: 'Sarah Johnson', time: '09:00 AM', duration: '2 hours', service: 'Medication Management', status: 'In Progress' },
    { id: 2, client: 'Mike Davis', time: '11:00 AM', duration: '3 hours', service: 'Physical Therapy', status: 'Scheduled' },
    { id: 3, client: 'Emma Wilson', time: '02:00 PM', duration: '1.5 hours', service: 'Personal Care', status: 'Scheduled' },
    { id: 4, client: 'John Smith', time: '04:00 PM', duration: '2 hours', service: 'Meal Preparation', status: 'Scheduled' },
  ];

  const quickActions = [
    { title: 'Start Visit', icon: 'play.circle.fill', route: '/provider/start-visit', color: '#4CAF50' },
    { title: 'End Visit', icon: 'stop.circle.fill', route: '/provider/end-visit', color: '#F44336' },
    { title: 'Report Issue', icon: 'exclamationmark.triangle.fill', route: '/provider/report', color: '#FF9800' },
    { title: 'Client Notes', icon: 'note.text', route: '/provider/notes', color: '#2196F3' },
  ];

  const recentActivities = [
    { id: 1, text: 'Completed medication management for Sarah Johnson', time: '30 min ago', type: 'success' },
    { id: 2, text: 'Started physical therapy session with Mike Davis', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'Updated client notes for Emma Wilson', time: '2 hours ago', type: 'info' },
    { id: 4, text: 'Reported minor issue with equipment', time: '3 hours ago', type: 'warning' },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return '#FF9800';
      case 'Scheduled': return '#2196F3';
      case 'Completed': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const handleStartVisit = (visit: any) => {
    Alert.alert(
      'Start Visit',
      `Start visit with ${visit.client}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => handleAction(`/provider/visit/${visit.id}`) }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.title}>Provider Dashboard</ThemedText>
            <ThemedText style={styles.subtitle}>Welcome back, {user?.name || 'Provider'}</ThemedText>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {providerStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
              <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
            </View>
          ))}
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Today's Schedule</ThemedText>
          <View style={styles.scheduleContainer}>
            {todaySchedule.map((visit) => (
              <View key={visit.id} style={[styles.visitCard, { backgroundColor: colors.card }]}>
                <View style={styles.visitHeader}>
                  <View style={styles.visitInfo}>
                    <ThemedText style={styles.visitTime}>{visit.time}</ThemedText>
                    <ThemedText style={styles.visitDuration}>{visit.duration}</ThemedText>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(visit.status) }]}>
                    <ThemedText style={styles.statusText}>{visit.status}</ThemedText>
                  </View>
                </View>
                
                <View style={styles.visitContent}>
                  <ThemedText style={styles.clientName}>{visit.client}</ThemedText>
                  <ThemedText style={styles.serviceType}>{visit.service}</ThemedText>
                </View>

                {visit.status === 'Scheduled' && (
                  <TouchableOpacity
                    style={[styles.startButton, { backgroundColor: colors.tint }]}
                    onPress={() => handleStartVisit(visit)}
                  >
                    <IconSymbol name="play.fill" size={16} color="#fff" />
                    <ThemedText style={styles.startButtonText}>Start Visit</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
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

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Emergency Contacts</ThemedText>
          <View style={[styles.emergencyContainer, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.emergencyItem}>
              <IconSymbol name="phone.fill" size={20} color="#F44336" />
              <ThemedText style={styles.emergencyText}>Emergency: 911</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem}>
              <IconSymbol name="phone.fill" size={20} color="#FF9800" />
              <ThemedText style={styles.emergencyText}>Supervisor: (555) 123-4567</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem}>
              <IconSymbol name="phone.fill" size={20} color="#2196F3" />
              <ThemedText style={styles.emergencyText}>Support: (555) 987-6543</ThemedText>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scheduleContainer: {
    gap: 12,
  },
  visitCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  visitInfo: {
    alignItems: 'flex-start',
  },
  visitTime: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  visitDuration: {
    fontSize: 12,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  visitContent: {
    marginBottom: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    opacity: 0.7,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
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
  emergencyContainer: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  emergencyText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
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