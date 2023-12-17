import { Text, TouchableOpacity, View } from "react-native";
//import { featured } from "../constants"
import { themeColors } from '../theme';
import * as Icon from "react-native-feather"
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { selectRestaurant } from "../slices/restaurantSlice"
import { removeFromCart, selectCartItems, selectCartTotal } from "../slices/cartSlice"
import { useEffect, useState } from "react";
import { urlForImage } from "../sanity";

function CartScreen() {
  // const restaurant = featured.restaurants[0]
  const restaurant = useSelector(selectRestaurant)
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const deliverFee = 2
  const [groupedItems, setGroupedItems] = useState({})

  useEffect(() => {

    const items = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id].push(item)

      } else {
        group[item._id] = [item]
      }
      return group
    }, {})
    const totalItemsInCart = Object.values(items).reduce(
      (total, group) => total + group.length,
      0
    );
    if (totalItemsInCart == 0) {
      navigation.navigate("Home")
    }
    setGroupedItems(items)
  }, [cartItems])
  return (
    <View className=" bg-white flex-1">
      <View className="relative py-4 shadow-sm bg-white">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
        {/* delivery time */}
        <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
          <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full" />
          <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
          <TouchableOpacity>
            <Text style={{ color: themeColors.text }} className="font-bold">Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={
        {
          paddingBottom: 50
        }
      } className="bg-white pt-5">
        {
          Object.entries(groupedItems).map(([key, items]) => {
            let dish = items[0]
            return (
              <View key={key} className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                <Text className="font-bold" style={{ color: themeColors.text }}>{items.length} x</Text>
                <Image className="w-14 h-14 rounded-full" source={{ uri: urlForImage(dish.image).url() }} />
                <Text className="flex-1 font-bold text-gray-700">{dish.name}</Text>
                <Text className="font-semibold text-base">€{dish.price}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: dish._id }))}
                  className="p-1 rounded-full" style={{ backgroundColor: themeColors.bgColor(1) }}>
                  <Icon.Minus stroke="white" height={20} width={20} strokeWidth={2} />
                </TouchableOpacity>

              </View>
            )
          })}

      </ScrollView>
      {/* totals */}
      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">€{cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">€{deliverFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold">Order Total</Text>
          <Text className="font-extrabold">€{deliverFee + cartTotal}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgColor(1) }}
            onPress={() => navigation.navigate('PreparingOrder')}
            className="p-3 rounded-full">
            <Text className="text-white text-center font-bold text-lg">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CartScreen