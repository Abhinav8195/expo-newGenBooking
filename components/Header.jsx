import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Header = ({title}) => {
  return (
    <View>
     <View style={styles.header}>
               <TouchableOpacity onPress={() => router.back()}>
                 <Ionicons name="arrow-back" size={24} color="black" />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>{title}</Text>
               <Ionicons name="language" size={24} color="#007AFF" />
             </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
         header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
})