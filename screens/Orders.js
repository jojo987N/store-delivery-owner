import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, onSnapshot, query, where} from 'firebase/firestore'
import { db, ordersCol} from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APP_CONSTANT } from '../global'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'
import { language, currency } from '../global';
import { FlatList } from 'react-native-gesture-handler'
import OrderCountDown from '../components/OrderCountDown'
import { Feather } from '@expo/vector-icons'
import Loading from '../components/Loading'

export default function Orders({route}) {
  const navigation = useNavigation() 
 const [orders, setOrders] = useState()
  useEffect(()=>{
    AsyncStorage.getItem("managerId").
    then((value)=>{
        onSnapshot(ordersCol, (snapshot)=>{
            setOrders(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id })))
            
        })
    })
  }, [])
  return (
      <>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
                 <Feather name="menu" size={24} color="white" style={{marginLeft: 10}}/>
            </TouchableOpacity>
              <Text style={styles.headerTitle}>Online</Text>
          </View>
          <View style={styles.container}>
         {orders?<> 
         {(route.params && route.params.orderStatus === "new") || route.params.orderStatus === "all" ?<DisplayOrders orders={orders} status="new" navigation={navigation}/>:<></>}
         {(route.params && route.params.orderStatus === "ordersInProgress") || route.params.orderStatus === "all" ?<DisplayOrders orders={orders} status="InProgress" navigation={navigation} />:<></>}
         {(route.params && route.params.orderStatus === "readyForPickup") || route.params.orderStatus === "all" ?<DisplayOrders orders={orders} status="ready" navigation={navigation}/>:<></>}
         </>:<Loading />}
      </View>
     </>
  )
}
const DisplayOrders = ({orders, status, navigation}) => {
    const render = {
        "new": "New",
        "InProgress": "In Progress",
        "ready": "Ready"
    }
    return (
        <View>
            <View>
                <Text style={styles.title}>
                    {`${render[status]} (${orders.filter(order => {
                        if(order.status === "STARTED" && status === "ready")
                        return true
                        return order.status === status
                    }).length})`}
                </Text>
            </View>
            <FlatList
            data={orders.filter(order =>{
                if(order.status === "STARTED" && status === "ready")
                return true
                return order.status === status
                })}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
                return (
                 <RenderingOrder order={item} navigation={navigation} />
                )
            }}
                />
        </View>
    )
}
const RenderingOrder = ({order, navigation})=>{
    const [remainingTimeForPickup, setRemainingTimeForPickup] = useState(order.remainingTime)
    return (
        <TouchableOpacity style={{ ...styles.row, 
            backgroundColor: "black"
             }}
                onPress={() => routeOrder(order, navigation)}
            >
                {order.status === "new" && <Image style={{position: "absolute", width: "100%"}} source={require("../assets/images/pending.jpg")} />}
                <Text style={styles.col}>{order.orderId.toUpperCase()}</Text>
                {order.status === "new" && <Text style={styles.col}>{order.User.items.reduce((a,v)=> a + v.price, 0).toLocaleString(language, {
                            style: "currency",
                            currency: currency
                        })}</Text> }
                {order.status === "InProgress" && <Text style={styles.col}>{order.User.name}</Text>}
               {order.status === "ready" && 
                <View style={styles.quantity}>
                    <Text style={styles.quantityText}>
                    {Object.entries(order.User.items.map(item => item.name).reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {}))
                    .reduce((a,v)=> a + v[1], 0) }  
                    </Text> 
                    <Text style={{color:"white", textAlign: "center"}}>items</Text>
                </View>
               }
                <View style={styles.status}>
                    {renderStatus(order.status)}
                    {order.status === "new" &&    <LottieView style={styles.animation}
                    source={require("../assets/animations/ripple-effect.json")}
                    autoPlay
                    speed={1}
                    loop
                />}
                  {order.status === "STARTED" && <OrderCountDown order={order} remainingTime={order.remainingTime} setRemainingTimeForPickup={setRemainingTimeForPickup}/> }
                {order.status === "InProgress" && 
                    <Image style={styles.avatarImage} source={{uri: order.User.image}} />
                }
                </View>
            </TouchableOpacity>
    )
}
const routeOrder = (order, navigation) => {
    if(order.status === "new")
    navigation.navigate("OrderDetails", { order: order })
    if(order.status === "InProgress")
    navigation.navigate("OrderDetails", { order: order, orderStatus: "inProgress"})
    if(order.status === "STARTED")
    navigation.navigate("OrderReadyDetails", { order: order , remainingTime: order.remainingTime})

     
}
const pendingBackground = ()=>{
    return (
        <ImageBackground
                    style={{width: "100%"}}
                    source={require("../assets/images/pending.jpg")}
                  >
                  </ImageBackground>
    )
}
const renderStatus = (status)=>{
   if (status === "new")
   return (
       <View style={{height: 40, width: 100, alignSelf: "center", borderRadius: 20, backgroundColor: "#00cc00", justifyContent: "center"}}>
           <Text style={{color:"white", textAlign: "center", fontSize: 15, fontWeight: "bold", }}>Accept</Text>
       </View>
   )
   if(status === APP_CONSTANT.CONFIRMED)
   return (
       <View style={styles.status_text_container}>
           <Text style={styles.status_text}>Accepted</Text>
       </View>
   )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
       backgroundColor: "#000033",
       paddingHorizontal: 10
    },
    header: {
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black"
    },
    headerTitle: {
     marginLeft: 20,
     fontSize: 23,
     fontWeight: "bold",
     padding: 20,
     color: "white"
    },
    title: {
      fontWeight: "bold",
      paddingTop: 10,
      color: "white"
    },
    col_head: {
       color: "black"
    },
    col: {
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 2,
        paddingVertical: 15,
        fontWeight: "bold",
        textAlign: "center",
       paddingVertical: 30,
       color: "#f2f2f2"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderWidth: 0.5,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "grey",
        overflow: "hidden",
        shadowColor: "grey",
        shadowOpacity: 1
    },
    quantity: {
        flex: 1
    },
    quantityText: {color: "white", textAlign: "center", fontWeight: "bold", fontSize: 18},
    animation: {
       position: "absolute",
        height: 400,
        width: 400,
       top: -90,
       left: -70
    },
    status:{
        flex: 1,
        alignItems: "center"
    },
    status_text: {
     fontWeight: "bold",
     textAlign: "center",
     padding: 5,
     color: "white"
    },
    status_text_container:{
       borderWidth: 1,
       borderRadius: 20,
       marginHorizontal: 20,
       backgroundColor: "green"
    },
    avatarImage: {
        height: 50, 
        width: 50,
    }
})