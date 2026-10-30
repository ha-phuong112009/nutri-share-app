import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  userName: string
  avatar: string
  notificationCount?: number
  onNotificationPress?: () => void
}

const HomeHeader = ({ userName, avatar, notificationCount = 0, onNotificationPress }: Props) => {
  return (
    <View className="flex-row items-center justify-between mb-5">
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
      </View>
      <View>
        <Text className="text-sm text-white/80">Xin chào!</Text>
        <Text className="text-lg font-bold text-white">
          {userName} 👋
        </Text>
      </View>

      <TouchableOpacity
        onPress={onNotificationPress}
        className="relative bg-white rounded-full p-3"
        activeOpacity={0.8}
      >
        <Ionicons name="notifications-outline" size={22} color="#212B36" />
        {notificationCount > 0 && (
          <View className="absolute -top-0.5 -right-0.5 bg-[#477AFF] rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
            <Text className="text-white text-[10px] font-bold">
              {notificationCount > 9 ? '9+' : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
