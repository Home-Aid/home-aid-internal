import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScheduleItem {
  id: string;
  clientName: string;
  caregiverName: string;
  date: string;
  time: string;
  duration: string;
  service: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  location: string;
}

export default function ScheduleScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'scheduled' | 'completed'>('all');

  const mockSchedule: ScheduleItem[] = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      caregiverName: 'Maria Garcia',
      date: 'Today',
      time: '09:00 AM',
      duration: '2 hours',
      service: 'Medication Management',
      status: 'In Progress',
      location: '123 Oak Street, City',
    },
    {
      id: '2',
      clientName: 'Mike Davis',
      caregiverName: 'James Wilson',
      date: 'Today',
      time: '11:00 AM',
      duration: '3 hours',
      service: 'Physical Therapy',
      status: 'Scheduled',
      location: '456 Pine Avenue, Town',
    },
    {
      id: '3',
      clientName: 'Emma Wilson',
      caregiverName: 'Anna Rodriguez',
      date: 'Today',
      time: '02:00 PM',
      duration: '1.5 hours',
      service: 'Personal Care',
      status: 'Scheduled',
      location: '789 Elm Road, Village',
    },
    {
      id: '4',
      clientName: 'John Smith',
      caregiverName: 'David Chen',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '2 hours',
      service: 'Meal Preparation',
      status: 'Scheduled',
      location: '321 Maple Drive, Borough',
    },
    {
      id: '5',
      clientName: 'Sarah Johnson',
      caregiverName: 'Maria Garcia',
      date: 'Yesterday',
      time: '09:00 AM',
      duration: '2 hours',
      service: 'Medication Management',
      status: 'Completed',
      location: '123 Oak Street, City',
    },
  ];

  const filteredSchedule = mockSchedule.filter(item => {
    const matchesDate = selectedDate === 'All' || item.date === selectedDate;
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'scheduled' && ['Scheduled', 'In Progress'].includes(item.status)) ||
                         (selectedFilter === 'completed' && item.status === 'Completed');
    return matchesDate && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return '#2196F3';
      case 'In Progress': return '#FF9800';
      case 'Completed': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'Medication Management': return 'pills.fill';
      case 'Physical Therapy': return 'figure.walk';
      case 'Personal Care': return 'person.fill';
      case 'Meal Preparation': return 'fork.knife';
      default: return 'heart.fill';
    }
  };

  const handleSchedulePress = (item: ScheduleItem) => {
    router.push(`/schedule/${item.id}` as any);
  };

  const handleAddSchedule = () => {
    router.push('/schedule/new' as any);
  };

  const dateOptions = ['Today', 'Tomorrow', 'Yesterday', 'All'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Schedule</ThemedText>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.tint }]} onPress={handleAddSchedule}>
            <IconSymbol name="plus" size={20} color="#fff" />
            <ThemedText style={styles.addButtonText}>Add Visit</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Date Filter */}
        <View style={styles.dateFilterContainer}>
          <ThemedText style={styles.sectionTitle}>Date</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScrollView}>
            {dateOptions.map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateTab,
                  selectedDate === date && { backgroundColor: colors.tint }
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <ThemedText style={[
                  styles.dateText,
                  selectedDate === date && { color: '#fff' }
                ]}>
                  {date}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Status Filter */}
        <View style={styles.filterContainer}>
          <ThemedText style={styles.sectionTitle}>Status</ThemedText>
          <View style={styles.statusFilterRow}>
            {[
              { key: 'all', label: 'All' },
              { key: 'scheduled', label: 'Scheduled' },
              { key: 'completed', label: 'Completed' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.key && { backgroundColor: colors.tint }
                ]}
                onPress={() => setSelectedFilter(filter.key as any)}
              >
                <ThemedText style={[
                  styles.filterText,
                  selectedFilter === filter.key && { color: '#fff' }
                ]}>
                  {filter.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Schedule List */}
        <View style={styles.scheduleContainer}>
          {filteredSchedule.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.scheduleCard, { backgroundColor: colors.card }]}
              onPress={() => handleSchedulePress(item)}
            >
              <View style={styles.scheduleHeader}>
                <View style={styles.timeContainer}>
                  <ThemedText style={styles.timeText}>{item.time}</ThemedText>
                  <ThemedText style={styles.durationText}>{item.duration}</ThemedText>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <ThemedText style={styles.statusText}>{item.status}</ThemedText>
                  </View>
                </View>
              </View>

              <View style={styles.scheduleContent}>
                <View style={styles.serviceRow}>
                  <IconSymbol name={getServiceIcon(item.service) as any} size={20} color={colors.tint} />
                  <ThemedText style={styles.serviceText}>{item.service}</ThemedText>
                </View>
                
                <View style={styles.participantsContainer}>
                  <View style={styles.participantRow}>
                    <IconSymbol name="person.fill" size={16} color={colors.icon} />
                    <ThemedText style={styles.participantText}>{item.clientName}</ThemedText>
                  </View>
                  <View style={styles.participantRow}>
                    <IconSymbol name="heart.fill" size={16} color={colors.icon} />
                    <ThemedText style={styles.participantText}>{item.caregiverName}</ThemedText>
                  </View>
                </View>

                <View style={styles.locationRow}>
                  <IconSymbol name="location.fill" size={16} color={colors.icon} />
                  <ThemedText style={styles.locationText}>{item.location}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  dateFilterContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateScrollView: {
    flexDirection: 'row',
  },
  dateTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  dateText: {
    fontWeight: '600',
  },
  filterContainer: {
    marginBottom: 20,
  },
  statusFilterRow: {
    flexDirection: 'row',
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterText: {
    fontWeight: '600',
  },
  scheduleContainer: {
    gap: 12,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  durationText: {
    fontSize: 12,
    opacity: 0.7,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  scheduleContent: {
    gap: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  participantsContainer: {
    gap: 4,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantText: {
    marginLeft: 8,
    fontSize: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.8,
  },
}); 