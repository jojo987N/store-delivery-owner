import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { createElement } from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import { FlatList } from 'react-native-gesture-handler';
import { dashboardItems } from '../data';

export default function DashboardComponent({navigation}) {
  return (
    <View style={styles.container}>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
   width = {Dimensions.get("window").width-20}
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} 
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
    <View style={styles.container2}>
        <Total title={`TOTAL REVENUE`} value="$32,575"/>
        <Total title={`TOTAL PROFIT`} value="$20,590"/>
    </View>
    <View style={styles.container2}>
        <Total title={`TOTAL ORDERS`} value="200"/>
        <Total title={`TOTAL MENUS`} value="120"/>
    </View>
    <FlatList 
    data={dashboardItems}
    keyExtractor={(item, index)=>String(index)}
    renderItem={({item})=>{
      return (
        <TouchableOpacity onPress={()=>{
        }} 
        style={styles.iconContainer}>
        {createElement(item.icon.type, {
          name: item.icon.name,
          size: 34,
         color: "#8080ff"
        }, null)}
          <Text style={styles.textIcon}>{item.label}</Text>
      </TouchableOpacity>
      )
    }}
    numColumns={2}
    key={2}
    />
    </View>
  )
}
const Total = ({title, value})=>{
    return(
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{title}</Text>
          <Text style={styles.totalValue}>{value}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    alignItems: "center"
    },
    container2: {
      flexDirection: "row",
      marginHorizontal: 10,
      marginVertical: 10
    },
    totalContainer : {
      borderWidth: 1,
      borderColor: "#d9d9d9",
      flex: 1,
      marginHorizontal: 5,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 20
    },
    totalText: {
        fontWeight: "bold",
        color: "grey",
        marginBottom: 10
    },
    totalValue: {
        color: "#8080ff",
        fontWeight: "bold"
    },
    iconContainer: {
      borderWidth: 1,
      marginHorizontal: 5,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 15,
      width: 178,
      marginBottom: 10,
      borderColor: "#d9d9d9",
    },
    textIcon: {
      fontWeight: "bold",
      color: "grey"
    }
})
