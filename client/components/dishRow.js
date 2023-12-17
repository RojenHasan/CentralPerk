import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { themeColors } from '../theme';
import * as Icon from 'react-native-feather';
import { addToCart, removeFromCart, selectCartItemsById } from '../slices/cartSlice';
import { createSelector } from 'reselect';
import { urlForImage } from '../sanity';

function DishRow({ item }) {
  const dispatch = useDispatch();

  // Memoize the selector
  const selectTotalItems = createSelector(
    [state => selectCartItemsById(state, item._id)],
    cartItems => cartItems.length
  );

  const totalItems = useSelector(state => selectTotalItems(state, item._id));

  const handleDecrease = () => {
    dispatch(removeFromCart({ id: item._id }));
  };

  const handleIncrease = () => {
    dispatch(addToCart({ ...item }));
  };

  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image className="rounded-xl" style={{ height: 100, width: 100 }} source={{ uri: urlForImage(item.image).url() }} />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{item.name}</Text>
          <Text className="text-gray-700">{item.description}</Text>
        </View>
        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-gray-700 text-lg font-bold">€{item.price}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handleDecrease}
              className="p-1 rounded-full"
              disabled={totalItems <= 0}
              style={{ backgroundColor: themeColors.bgColor(1) }}>
              <Icon.Minus strokeWidth={2} stroke={'white'} height={20} width={20} />
            </TouchableOpacity>
            <Text className="px-3">{totalItems}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}>
              <Icon.Plus strokeWidth={2} stroke={'white'} height={20} width={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DishRow;
