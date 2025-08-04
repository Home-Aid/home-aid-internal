import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManagerDashboard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();
  const user = params.user ? JSON.parse(params.user as string) : null;

  const managerStats = [
    { title: 'Active Clients', value: '24', icon: 'person.2.fill', color: '#4CAF50' },
    { title: 'Caregivers', value: '18', icon: 'heart.fill', color: '#2196F3' },
    { title: 'Today\'s Visits', value: '12', icon: 'calendar', color: '#FF9800' },
    { title: 'Pending Tasks', value: '8', icon: 'exclamationmark.triangle.fill', color: '#F44336' },
  ];

  const managerActions = [
    { title: 'Client Management', icon: 'person.2.circle.fill', route: '/manager/clients', color: '#4CAF50' },
    { title: 'Caregiver Management', icon: 'heart.circle.fill', route: '/manager/caregivers', color: '#2196F3' },
    { title: 'Schedule Management', icon: 'calendar.badge.plus', route: '/manager/schedule', color: '#FF9800' },
    { title: 'Quality Assurance', icon: 'checkmark.shield.fill', route: '/manager/quality', color: '#9C27B0' },
    { title: 'Reports & Analytics', icon: 'chart.bar.fill', route: '/manager/reports', color: '#607D8B' },
    { title: 'Communication', icon: 'message.fill', route: '/manager/communication', color: '#E91E63' },
  ];

  const urgentTasks = [
    { id: 1, title: 'Review caregiver performance', priority: 'High', due: 'Today' },
    { id: 2, title: 'Client satisfaction survey', priority: 'Medium', due: 'Tomorrow' },
    { id: 3, title: 'Schedule conflict resolution', priority: 'High', due: 'Today' },
    { id: 4, title: 'Monthly report preparation', priority: 'Medium', due: 'This week' },
  ];

  const recentActivities = [
    { id: 1, text: 'New client assigned to Maria Garcia', time: '5 min ago', type: 'info' },
    { id: 2, text: 'Caregiver performance review completed', time: '1 hour ago', type: 'success' },
    { id: 3, text: 'Schedule updated for Sarah Johnson', time: '2 hours ago', type: 'info' },
    { id: 4, text: 'Quality check scheduled for tomorrow', time: '3 hours ago', type: 'warning' },
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.title}>Manager Dashboard</ThemedText>
            <ThemedText style={styles.subtitle}>Welcome back, {user?.name || 'Manager'}</ThemedText>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {managerStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
              <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
            </View>
          ))}
        </View>

        {/* Manager Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Management Actions</ThemedText>
          <View style={styles.actionsGrid}>
            {managerActions.map((action, index) => (
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

        {/* Urgent Tasks */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Urgent Tasks</ThemedText>
          <View style={[styles.tasksContainer, { backgroundColor: colors.card }]}>
            {urgentTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <View style={styles.taskContent}>
                  <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
                  <View style={styles.taskMeta}>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                      <ThemedText style={styles.priorityText}>{task.priority}</ThemedText>
                    </View>
                    <ThemedText style={styles.taskDue}>Due: {task.due}</ThemedText>
                  </View>
                </View>
                <TouchableOpacity style={styles.taskAction}>
                  <IconSymbol name="chevron.right" size={16} color={colors.icon} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: colors.card }]}
              onPress={() => handleAction('/manager/schedule/new')}
            >
              <IconSymbol name="plus.circle.fill" size={32} color={colors.tint} />
              <ThemedText style={styles.quickActionTitle}>Schedule Visit</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: colors.card }]}
              onPress={() => handleAction('/manager/assign')}
            >
              <IconSymbol name="person.2.circle.fill" size={32} color={colors.tint} />
              <ThemedText style={styles.quickActionTitle}>Assign Caregiver</ThemedText>
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
  tasksContainer: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  taskDue: {
    fontSize: 12,
    opacity: 0.6,
  },
  taskAction: {
    padding: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
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
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
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