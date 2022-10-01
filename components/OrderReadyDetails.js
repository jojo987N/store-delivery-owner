import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ProgressSteps from './ProgressSteps'
import MapView, { Callout, Marker } from 'react-native-maps'
import Divider from './Divider'
import { ArrowBack } from './ArrowBack'
import { AntDesign } from '@expo/vector-icons'
import { APP_CONSTANT } from '../global'

export default function OrderReadyDetails({ route, navigation }) {
  const { order, remainingTime} = route.params
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ ...styles.header1, flex: 3 }}>
          <ArrowBack navigation={navigation} />
          <Text style={styles.title}>Order {order.orderId.toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderDetails", { order: order, orderStatus: "inProgress" })}
          style={{ ...styles.header1, justifyContent: "space-evenly" }}>
          <Text style={{ color: "#A30000", fontWeight: "bold", fontSize: 13 }}>Details</Text>
          <AntDesign
            name="down"
            color="black"
            size={15}
          />
        </TouchableOpacity>
      </View>
      <ProgressSteps route={route} remainingTime={remainingTime}/>
      <View style={styles.mapContainer}>
      </View>
      <View style={styles.customer_courier_Infos}>
        <View>
          <Text style={styles.infosTitle}>CUSTOMER</Text>
          <Text style={styles.infosName}>{order.User.name}</Text>
          <Text style={styles.infosPhone}>{order.User.phone}</Text>
        </View>
        <View>
          <Text style={styles.infosTitle}>COURIER</Text>
          <Text style={styles.infosName}>--</Text>
        </View>
      </View>
      <Divider />
      <ButtonFoodDone />
    </View>
  )
}
export const ButtonFoodDone = () => <TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>{APP_CONSTANT.FOOD_IS_DONE}</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    marginBottom: 30,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
  },
  mapContainer: {
    marginHorizontal: 20,
    marginTop: 40
  },
  customer_courier_Infos: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10
  },
  infosTitle: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 10,
    marginTop: 10
  },
  infosName: {
    fontWeight: "bold",
    marginTop: 10
  },
  infosPhone: {
    color: "grey",
    marginTop: 5
  },
  button: {
    backgroundColor: "#A30000",
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    padding: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 2,
  }
})