import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import Header from '../../components/Header'

const Stays = () => {
    const { type } = useLocalSearchParams();
  return (
    <View style={{flex:1,backgroundColor:'white',padding:20}}>
        <Header title={type}/>
        

    </View>
  )
}

export default Stays

const styles = StyleSheet.create({

})