import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { updateOrder } from '../firebase'
import { APP_CONSTANT, screen } from '../global'
import { useNavigation } from '@react-navigation/native'

export default function ConfirmModal({ order, modalVisible, setModalVisible }) {
  const [deliveryTime, setDeliveryTime] = useState()
  const [cookingTime, setCookingTime] = useState()
  const navigation = useNavigation()
  return (
    <Modal
      animationType='slide'
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.container1}>
      </View>
      <View style={styles.container2}>
        <View style={styles.container}>
          <View style={styles.label_input}>
            <Text style={styles.label}>Delivery Time : </Text>
            <TextInput style={styles.TextInput} placeholder="30 min"
              onChangeText={(text) => setCookingTime(text)} />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {
            setModalVisible(false)
            updateOrder(order.id, APP_CONSTANT.IN_PROGRESS, cookingTime)
            .then(()=> navigation.navigate(screen.ORDERS_IN_PROGRESS))

          }}>
            <Text style={styles.textButton}>Accept & Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginTop: 50
  },
  label_input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  TextInput: {
    borderWidth: 0.5,
    padding: 10,
    marginLeft: 20,
    width: "40%",
    borderRadius: 5,
    borderColor: "grey",
    textAlign: "center"
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey"
  },
  button: {
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 40,
    marginHorizontal: 20
  },
  textButton: {
    fontSize: 20,
    padding: 19,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }
})