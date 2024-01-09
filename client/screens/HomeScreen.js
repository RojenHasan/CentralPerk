import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text } from 'react-native';
import * as Icon from "react-native-feather"
import { themeColors } from '../theme';
import { getCategories } from "../api"
import { urlForImage } from "../sanity"

import { getAllRestaurants } from '../api';
//import { featuredResturants } from "../constants"
import ResturantCard from '../components/resturantCard';

function HomeScreen() {
  let [featuredResturants, setFeaturedResturants] = useState([])
  let [activeCategory, setActivecategory] = useState("all")
  let [categories, setCategories] = useState([])

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

  const handleCategory = category => {
    const name = category.name.toLowerCase()
    if (name == "all") {
      setFeaturedResturants(allFeaturedResturants)
    } else {
      const filteredFeatures = allFeaturedResturants.filter(feature =>
        feature.type.name.toLowerCase().startsWith(name)
      );
      setFeaturedResturants(filteredFeatures);
    }

    setActivecategory(name)
  }
  useEffect(() => {
    getAllRestaurants().then(data => {
      setFeaturedResturants(data)
      setAllFeaturedResturants(data)
    })
  }, [])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
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

        <View className="mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="overflow-visible"
            contentContainerStyle={{
              paddingHorizontal: 15
            }}
          >
            {
              categories.map((category, index) => {
                let isActive = category.name.toLowerCase() == activeCategory
                let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200'
                let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500'

                return (
                  <View key={index} className="flex justify-center items-center mr-6">
                    <TouchableOpacity className={"p-1 rounded-full shadow bg-gray-200 " + btnClass} onPress={() => {
                      handleCategory(category)
                    }}>
                      <Image style={{ width: 45, height: 45 }} source={{ uri: urlForImage(category.image).url() }}
                      />

                    </TouchableOpacity>
                    <Text className={"text-sm " + textClass}>{category.name}</Text>
                  </View>
                )
              })
            }

          </ScrollView>
        </View>

        {/* Featured */}
        <View className="mt-5">
          {featuredResturants && featuredResturants.length !== 0 ? (
            featuredResturants.map((resturant, index) => (
              <View className="" style={{
                borderWidth: 0.5, // Add border width
                borderColor: "#f97316",// Set border color
                borderRadius: 15,
                margin: 10,
                padding: 10
              }}>
                < ResturantCard
                  key={index}
                  item={resturant}
                />
              </View>

            ))
          ) : (
            ""
          )}

        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default HomeScreen;
