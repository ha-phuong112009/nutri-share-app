import React from 'react'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft } from 'iconsax-react-native'
import { router } from 'expo-router'
import { images } from '@/constants'

interface UserSubScreenLayoutProps {
  title: string
  children: React.ReactNode
  loading?: boolean
}

const UserSubScreenLayout: React.FC<UserSubScreenLayoutProps> = ({
  title,
  children,
  loading,
}) => {
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F2F9F1]">
        <ActivityIndicator size="large" color="#34A853" />
      </View>
    )
  }

  return (
    <View className="flex-1">
      <View className="flex-1 bg-white">
        <SafeAreaView className="flex-1" edges={['top']}>
          <View className="flex-row items-center justify-between px-4 py-3">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-11 h-11 rounded-full bg-white items-center justify-center"
            >
              <ArrowLeft size={22} color="#1A1A1A" variant="Linear" />
            </TouchableOpacity>
            <Text className="text-center text-lg font-bold text-[#1A1A1A]">
              {title}
            </Text>
            <Text></Text>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-4 pb-8">{children}</View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  )
}

export default UserSubScreenLayout
