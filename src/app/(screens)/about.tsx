import React from 'react'
import { Text, View } from 'react-native'
import UserSubScreenLayout from '@/modules/user-profile/components/UserSubScreenLayout'

const AboutScreen = () => {
  return (
    <UserSubScreenLayout title="Giới thiệu">
      <View
        className="bg-white rounded-3xl px-5 py-5"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Chúng tôi tin rằng một cuộc sống hạnh phúc bắt đầu từ một cơ thể khỏe mạnh.
          Ứng dụng của chúng tôi ra đời không chỉ để đếm calo, mà để trở thành người
          bạn đồng hành giúp bạn xây dựng lối sống lành mạnh một cách đơn giản, tự nhiên
          và bền vững nhất.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          1. Tại sao chúng tôi thực hiện dự án này?
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-2">
          Chứng kiến những người trẻ và nhân viên văn phòng luôn bận rộn đến mức quên
          chăm sóc bản thân, chúng tôi quyết định xây dựng một công cụ đơn giản, dễ dùng để giúp bạn:
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Theo dõi ăn uống và vận động mỗi ngày.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Hiểu rõ hơn về cơ thể thông qua các chỉ số như BMI, TDEE.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          • Xây dựng thói quen tốt từng bước nhỏ, nhưng bền vững.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          2. Giá trị mà ứng dụng mang lại
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Đơn giản: Mọi chỉ số đều được trình bày rõ ràng, dễ hiểu.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Thực tế: Gợi ý phù hợp với thói quen ăn uống và sinh hoạt của người Việt.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          • Kiên trì: Tập trung vào những thay đổi nhỏ nhưng mang lại kết quả lớn về lâu dài.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          3. Tầm nhìn của chúng tôi
        </Text>
        <Text className="text-base text-[#4B5563] leading-6">
          Chúng tôi mong muốn xây dựng một ứng dụng sức khỏe gần gũi, đáng tin cậy và
          hữu ích cho cộng đồng. Mọi góp ý của bạn đều rất quý giá — hãy liên hệ qua màn
          Liên hệ & Hỗ trợ.
        </Text>
      </View>
    </UserSubScreenLayout>
  )
}

export default AboutScreen
