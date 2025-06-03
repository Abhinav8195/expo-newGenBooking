import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Header from '../../components/Header'; // Make sure this has white background or wrap it
import { staysData } from '../../data';

const { width } = Dimensions.get('window');

const Stays = () => {
  const { type } = useLocalSearchParams();
  const filteredData = staysData.filter((item) => item.type === type);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header title={type} />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <StayCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const StayCard = ({ item }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const handleHeartPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLiked(!liked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <FlatList
          data={item.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(img, index) => index.toString()}
          renderItem={({ item: img }) => (
            <Image source={{ uri: img }} style={styles.image} />
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleHeartPress} style={styles.iconButton}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? '#FF5A5F' : 'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.paginationDots}>
          {item.images.map((_, i) => (
            <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Ionicons name="star" size={14} color="#FFD700" style={{ marginLeft: 4 }} />
          </View>
        </View>

        <Text style={styles.subTitle}>{item.location}</Text>
        <Text style={styles.stayInfo}>Sleeps {item.guests} guests • {item.type}</Text>

        <Text style={styles.breakfast}>
          {item.breakfastIncluded ? 'Breakfast included' : 'Breakfast available at extra charge'}
        </Text>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.features}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featurePill}>
              <Ionicons name="checkmark-circle" size={14} color="#00755E" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
            <Text style={styles.newPrice}>₹{item.newPrice} <Text style={styles.perNight}>/night</Text></Text>
            <Text style={styles.taxInfo}>+ ₹{item.tax} taxes & fees</Text>
          </View>
          <View style={styles.dealBadge}>
            <Text style={styles.dealText}>Last Minute Deal</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stays;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
  },
  headerWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: width - 32,
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  iconRow: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: '#ddd',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    flex: 1,
    marginRight: 10,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4CC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  ratingText: {
    color: '#B45309',
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  stayInfo: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  breakfast: {
    fontSize: 13,
    color: '#0071c2',
    marginTop: 6,
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginTop: 6,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FFF0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#00755E',
    marginLeft: 4,
  },
  priceRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  oldPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  perNight: {
    fontSize: 13,
    color: '#777',
  },
  taxInfo: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  dealBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dealText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '600',
  },
});
