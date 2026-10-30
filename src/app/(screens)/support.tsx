import React from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { Call, Sms, Message } from 'iconsax-react-native'
import UserSubScreenLayout from '@/modules/user-profile/components/UserSubScreenLayout'

const SUPPORT_EMAIL = 'mystiqcaly@gmail.com'

const SupportScreen = () => {
  const handleEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Hỗ trợ NutriGrow`)
  }

  return (
    <UserSubScreenLayout title="Liên hệ & Hỗ trợ">
      <View
        className="bg-white rounded-3xl px-5 py-5 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong hành trình xây dựng lối
          sống lành mạnh. Nếu bạn gặp khó khăn khi sử dụng ứng dụng, hãy liên hệ qua các
          kênh dưới đây:
        </Text>

        <TouchableOpacity
          onPress={handleEmail}
          activeOpacity={0.7}
          className="flex-row items-center py-3 border-b border-gray-100"
        >
          <View className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center">
            <Sms size={20} color="#34A853" variant="Linear" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-sm text-[#7D7D7D]">Email hỗ trợ</Text>
            <Text className="text-base font-medium text-[#1A1A1A]">{SUPPORT_EMAIL}</Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center py-3 border-b border-gray-100">
          <View className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center">
            <Call size={20} color="#34A853" variant="Linear" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-sm text-[#7D7D7D]">Điện thoại (giờ hành chính)</Text>
            <Text className="text-base font-medium text-[#1A1A1A]">0349241770</Text>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-3xl px-5 py-4">
        <Text className="text-sm text-[#7D7D7D] leading-5">
          Khi liên hệ, vui lòng mô tả rõ vấn đề (thiết bị, hệ điều hành, bước thao tác) để
          chúng tôi hỗ trợ bạn nhanh chóng và chính xác hơn.
        </Text>
      </View>
    </UserSubScreenLayout>
  )
}

export default SupportScreen
