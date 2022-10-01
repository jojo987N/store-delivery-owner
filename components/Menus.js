import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { MaterialIcons} from '@expo/vector-icons';
import "intl"
import "intl/locale-data/jsonp/en"
import { language, currency } from '../global';

export default function Menus({order}) {
  return (
    <View style={styles.container}>
    <View style={styles.itemsContainer}>
      {Object.entries(order.User.items.map(item => item.name).reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {}))
         .map(([name, quantity], index)=>
         <View style={styles.items} key={index}>
       <View style={styles.items_name_quantity}>
       <Text style={styles.item_name}>{name}</Text>
       <MaterialIcons name="close" size={12} color="black" />
       <Text style={styles.item_quantity}>{quantity}</Text>
       </View>
       <Text style={styles.item_price}>{order.User.items.reduce((a, v) => v.name === name ? a + v.price : a, 0).toLocaleString(language, {
                                style: "currency",
                                currency: currency
                            })}</Text>
         </View>)}
    </View>
     <View style={styles.total}>
       <Text style={styles.totalText}>Total</Text>
       <Text style={styles.totalPrice}>{order.User.items.reduce((a,v)=> a + v.price, 0).toLocaleString(language, {
                                style: "currency",
                                currency: currency
                            })}</Text>
     </View>
 </View>
  )
}
const styles = StyleSheet.create({
  container: {
   
  
  marginHorizontal: 20,
  },
  itemsContainer:{
    marginBottom: 10
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    
    
    borderBottomWidth: 2,
    paddingVertical: 30,
    borderBottomColor: "#e6e6e6"
  },
  item_name: {
    
    
    marginRight: 10,
    fontWeight: "bold",
    color: "grey"
  },
  item_quantity: {
  },
  item_price: {
    fontWeight: "bold",
    color: "grey"
  },
  items_name_quantity: {
    flex: 1, 
    flexDirection: "row",
    alignItems: "center"
  },
  total: {
    
    flexDirection: "row"
  },
  totalText: {
    paddingTop: 10,
    flex: 1,
    fontWeight: "bold"
  },
  totalPrice: {
    paddingTop: 10,
    fontWeight: "bold"
  }
})