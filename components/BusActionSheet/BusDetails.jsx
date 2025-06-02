import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TABS = ['Amenities', 'Bus Stops', 'Policies', 'Reviews', 'Photos'];

const TAB_ICONS = {
  Amenities: 'tools',
  'Bus Stops': 'map-marker-path',
  Policies: 'file-document-outline',
  Reviews: 'star-outline',
  Photos: 'image-outline',
};

const getAmenityIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'water bottle':
      return 'bottle-soda-outline';
    case 'charging port':
    case 'charging point':
      return 'power-plug-outline';
    case 'blanket':
      return 'bed';
    case 'pillow':
      return 'pillow';
    case 'cctv':
      return 'cctv';
    case 'reading light':
      return 'lightbulb-on-outline';
    case 'bed sheet':
      return 'bed-king-outline';
    default:
      return 'checkbox-marked-circle-outline';
  }
};

const BusDetails = ({ bus, onClose }) => {
  const scrollRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeTab, setActiveTab] = useState('Amenities');
  const isScrollingProgrammatically = useRef(false);


  const scrollToSection = (key) => {
  const y = sectionRefs.current[key];
  if (y !== undefined && scrollRef.current) {
    isScrollingProgrammatically.current = true;
    scrollRef.current.scrollTo({ y, animated: true });

    
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 350);
  }
};


  const handleScroll = (e) => {
  if (isScrollingProgrammatically.current) return; 

  const scrollY = e.nativeEvent.contentOffset.y;
  const entries = Object.entries(sectionRefs.current);
  for (let i = entries.length - 1; i >= 0; i--) {
    const [key, yPos] = entries[i];
    if (scrollY + 20 >= yPos) {
      setActiveTab(key);
      break;
    }
  }
};


  const onLayout = (event, key) => {
    sectionRefs.current[key] = event.nativeEvent.layout.y;
  };

  const cancellationTableData = [
    { time: 'Before 48 hours', refund: '70%' },
    { time: '24 to 48 hours', refund: '50%' },
    { time: 'Less than 24 hours', refund: 'No refund' },
  ];

  return (
    <View style={styles.container}>
      {/* Bus Route */}
      <View style={styles.routeContainer}>
        <Icon name="bus" size={20} color="#279695" />
        <Text style={styles.routeText}>
          {bus.from || 'Origin'} → {bus.to || 'Destination'}
        </Text>
      </View>

     
     <View>
         <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              scrollToSection(tab);
            }}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive,
            ]}
          >
            <Icon
              name={TAB_ICONS[tab]}
              size={16}
              color={activeTab === tab ? '#fff' : '#555'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
              numberOfLines={1}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
     </View>

      {/* Content */}
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.contentScroll}
      >
        {/* Amenities */}
        <View onLayout={(e) => onLayout(e, 'Amenities')} style={styles.section}>
          <Text style={styles.heading}>Amenities</Text>
          <View style={styles.amenityGrid}>
            {bus.amenities?.length ? (
              bus.amenities.map((item, index) => (
                <View key={index} style={styles.amenityCapsule}>
                  <Icon
                    name={getAmenityIcon(item)}
                    size={16}
                    color="#279695"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.amenityText}>{item}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No amenities listed.</Text>
            )}
          </View>
        </View>

        {/* Bus Stops */}
        <View onLayout={(e) => onLayout(e, 'Bus Stops')} style={styles.section}>
          <Text style={styles.heading}>Bus Stops</Text>
          {bus.routes?.length ? (
            <View style={styles.busStopsTable}>
              {bus.routes.map((route, i) => (
                <View key={i} style={styles.busStopRow}>
                  <Text style={styles.busStopName}>{route.stop}</Text>
                  <Text style={styles.busStopTime}>{route.time}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No stops available.</Text>
          )}
        </View>

        {/* Policies */}
        <View onLayout={(e) => onLayout(e, 'Policies')} style={styles.section}>
          <Text style={styles.heading}>Cancellation Policy</Text>

          <View style={styles.cancellationTableHeader}>
            <Text style={[styles.cancellationColTitle, { flex: 0.6 }]}>
              Cancellation Time
            </Text>
            <Text style={[styles.cancellationColTitle, { flex: 0.4 }]}>
              Refund Details
            </Text>
          </View>

          {cancellationTableData.map(({ time, refund }, i) => (
            <View key={i} style={styles.cancellationTableRow}>
              <Text style={[styles.cancellationTimeText, { flex: 0.6 }]}>{time}</Text>
              <Text
                style={[
                  styles.refundText,
                  refund.includes('%')
                    ? { color: '#279695', fontWeight: '700' }
                    : { color: '#d9534f' },
                  { flex: 0.4 },
                ]}
              >
                {refund}
              </Text>
            </View>
          ))}

          <Text style={[styles.heading, { marginTop: 24 }]}>Travel Policy</Text>

          {/* Liquor Info */}
          <View style={styles.liquorRow}>
            <Icon name="bottle-wine" size={18} color="#279695" style={{ marginRight: 8 }} />
            <Text style={styles.liquorTitle}>Liquor</Text>
          </View>
          <Text style={styles.policyText}>
            Carrying liquor is allowed but consuming liquor on the bus is strictly prohibited.
            Bus operator has the right to deboard you if violated.
          </Text>

          {/* Pickup Timing */}
          <View style={[styles.liquorRow, { marginTop: 16 }]}>
            <Icon name="clock-outline" size={18} color="#279695" style={{ marginRight: 8 }} />
            <Text style={styles.liquorTitle}>Pickup Timing</Text>
          </View>
          <Text style={styles.policyText}>
            The bus will run on time. Arriving late is not acceptable.
          </Text>

          {/* Additional Travel Policy */}
          <Text style={[styles.policyText, { marginTop: 12 }]}>
            {bus.travelPolicy || 'Standard travel policies apply. Please follow all instructions provided by the bus operator.'}
          </Text>
        </View>

        {/* Reviews */}
        <View onLayout={(e) => onLayout(e, 'Reviews')} style={styles.section}>
          <Text style={styles.heading}>Rating & Reviews</Text>

          {bus.reviews?.length ? (
            bus.reviews.map((review, i) => (
              <View key={i} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Icon name="account-circle-outline" size={24} color="#279695" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <View style={styles.starRow}>
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          name={index < review.rating ? 'star' : 'star-outline'}
                          size={16}
                          color="#f5b50a"
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
                {review.date && <Text style={styles.reviewDate}>{review.date}</Text>}
              </View>
            ))
          ) : (
            <>
              <Text style={styles.emptyText}>No reviews yet.</Text>
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Icon name="account-circle-outline" size={24} color="#279695" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.reviewerName}>ChatGPT</Text>
                    <View style={styles.starRow}>
                      {[...Array(5)].map((_, index) => (
                        <Icon key={index} name="star" size={16} color="#f5b50a" />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>
                  This bus service offers comfortable amenities and timely pickups. The travel policies are clear and ensure a safe journey.
                </Text>
                <Text style={styles.reviewDate}>Just now</Text>
              </View>
            </>
          )}
        </View>

        {/* Photos */}
        <View onLayout={(e) => onLayout(e, 'Photos')} style={styles.section}>
          <Text style={styles.heading}>Photos</Text>
          <Text style={styles.emptyText}>Bus photo gallery coming soon.</Text>
        </View>

        {/* Close Button */}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BusDetails;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height * 0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  routeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#279695',
    marginLeft: 8,
  },
  tabRow: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 8,
   
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 80,
  },
  tabButtonActive: {
    backgroundColor: '#279695',
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  contentScroll: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef6f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#279695',
  },
  emptyText: {
    color: '#777',
    fontStyle: 'italic',
  },
  busStopsTable: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  busStopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  busStopName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  busStopTime: {
    fontSize: 14,
    color: '#666',
    width: 70,
    textAlign: 'right',
  },
  cancellationTableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingBottom: 8,
    marginBottom: 8,
  },
  cancellationColTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#279695',
  },
  cancellationTableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cancellationTimeText: {
    fontSize: 14,
    color: '#444',
  },
  refundText: {
    fontSize: 14,
    fontWeight: '600',
  },
  liquorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  liquorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#279695',
  },
  policyText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: '#f9fdfd',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#279695',
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  closeButtonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: '#279695',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
