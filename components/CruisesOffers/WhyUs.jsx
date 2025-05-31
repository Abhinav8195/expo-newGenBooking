import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {cruiseDestinations } from '../../data'

const WhyUs = () => {

      const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.labelWrapper}>
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Icon name="chevron-forward" size={22} color="#000" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={{padding:20,backgroundColor:'white'}}>
      <Image source={require('../../assets/images/i1.webp')}/>
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#4aabf1',marginVertical:10}}>Benefits of Choosing NextGen for Your Cruise</Text>
      <Text style={{color:'gray',textAlign:'center',fontWeight:'600'}}>Experience seamless planning, exclusive deals, and personalized service with NextGen . We ensure your cruise vacation is unforgettable, offering expert advice, flexible options, and unparalleled support every step of the way.</Text>
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginTop:40}}>Start Your Next Cruise Exploration Heree</Text>
      <Text style={{marginVertical:10,textAlign:'center',color:'gray',fontWeight:'600'}}>Plan your next cruise with our expert guide to affordable trips across Europe, Asia, the Mediterranean, and the Caribbean, providing the best options for an unforgettable cruise adventure.</Text>

       <FlatList
      data={cruiseDestinations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />

    <View style={{ borderWidth:1,borderColor:'#ccc',marginTop:15}}/>
        <Text style={{color:'gray',textAlign:'center',fontSize:15,fontWeight:'600',marginVertical:20}}>At Next Gen, we’re dedicated to turning your travel dreams into reality. Whether you're seeking affordable flights, luxurious hotels, reliable bus services, or exciting holiday packages, we’ve got you covered. Our flight search tool allows you to compare numerous airlines to find the best deal, ensuring a seamless booking experience. When it comes to accommodations, we offer a vast selection of hotels ranging from opulent suites to budget-friendly options, complete with guest reviews and exclusive deals.</Text>
    <View style={{ borderWidth:1,borderColor:'#ccc',marginVertical:5}}/>
    </View>
  )
}

export default WhyUs

const styles = StyleSheet.create({
     list: {
    padding: 16,
    gap: 15,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  imageBackground: {
    height: 200,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
})