import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
//import { categories } from "../constants"
import { useEffect } from "react"
import { getCategories } from "../api"
import { urlForImage } from "../sanity"
function Categories() {
  const [activeCategory, setActivecategory] = useState(null)
  let [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
  }, [])
  return (
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
            let isActive = category.id == activeCategory
            let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200'
            let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500'

            return (
              <View key={index} className="flex justify-center items-center mr-6">
                <TouchableOpacity className={"p-1 rounded-full shadow bg-gray-200 " + btnClass} onPress={() => setActivecategory(category.id)}>
                  <Image style={{ width: 45, height: 45 }} source={{ uri: urlForImage(category.image).url() }} />

                </TouchableOpacity>
                <Text className={"text-sm " + textClass}>{category.name}</Text>
              </View>
            )
          })
        }

      </ScrollView>
    </View>
  )
}

export default Categories