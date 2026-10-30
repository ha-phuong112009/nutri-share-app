import React from 'react'
import { Text, View } from 'react-native'
import UserSubScreenLayout from '@/modules/user-profile/components/UserSubScreenLayout'

const PrivacyPolicyScreen = () => {
  return (
    <UserSubScreenLayout title="Chính sách bảo mật">
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
        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          1. Thu thập thông tin
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Chúng tôi thu thập thông tin cần thiết để vận hành ứng dụng, bao gồm tên, email,
          chỉ số cơ thể (chiều cao, cân nặng, tuổi) và dữ liệu dinh dưỡng/vận động bạn chủ
          động nhập.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          2. Mục đích sử dụng
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Dữ liệu được dùng để tính toán chỉ số sức khỏe, cá nhân hóa gợi ý dinh dưỡng, gửi
          thông báo nhắc nhở và cải thiện trải nghiệm sử dụng ứng dụng.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          3. Bảo mật & lưu trữ
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Dữ liệu được lưu trữ an toàn trên hạ tầng đám mây với mã hóa truyền tải. Chúng tôi
          không bán hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương
          mại.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          4. Quyền của người dùng
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Bạn có quyền xem, cập nhật hoặc yêu cầu xóa dữ liệu cá nhân bằng cách liên hệ qua
          màn Liên hệ & Hỗ trợ. Bạn cũng có thể tắt thông báo trong phần Cài đặt.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          5. Cập nhật chính sách
        </Text>
        <Text className="text-base text-[#4B5563] leading-6">
          Chính sách có thể được cập nhật theo thời gian. Phiên bản mới sẽ có hiệu lực ngay
          khi được đăng trong ứng dụng.
        </Text>
      </View>
    </UserSubScreenLayout>
  )
}

export default PrivacyPolicyScreen
