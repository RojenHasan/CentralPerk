import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text } from 'react-native';
import * as Icon from "react-native-feather"
import { themeColors } from '../theme';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import { getFeaturedResturants } from '../api';
//import { featuredResturants } from "../constants"

function HomeScreen() {
  let [featuredResturants, setFeaturedResturants] = useState([])

  // Call all feature to filter from it , istead of making query with every litter that the user writes 
  let [allFeaturedResturants, setAllFeaturedResturants] = useState([])

  const handleSearch = text => {
    if (text.trim().length == 0) {
      setFeaturedResturants(allFeaturedResturants)
    } else {
      const filteredFeatures = allFeaturedResturants.filter(feature =>
        feature.name.toLowerCase().startsWith(text.toLowerCase())
      );
      setFeaturedResturants(filteredFeatures);
    }
  }
  useEffect(() => {
    getFeaturedResturants().then(data => {
      setFeaturedResturants(data)
      setAllFeaturedResturants(data)

    })
  }, [])
  return (
    //SafeAreaView is currently only applicable to iOS devices with iOS version 11 or later.
    <SafeAreaView className="bg-white" style={{ flex: 100 }}>
      {/* Search Bar */}
      <StatusBar barStyle={'dark-content'} />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurants" className="ml flex-1" onChangeText={handleSearch} />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">Leuven</Text>
          </View>
        </View>
        <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 rounded-full">
          <Icon.Sliders height="20" width={20} strokeWidth="2.5" stroke="white" />
        </View>
      </View>
      {/* Main */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom: 20
      }}>
        {/* Categories */}
        <Categories />
        {/* Featured */}
        <View className="mt-5">
          {
            featuredResturants?.map((item, index) => {
              return <FeaturedRow
                key={index}
                title={item.name}
                resturants={item.restaurants}
                description={item.description}
              />
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
