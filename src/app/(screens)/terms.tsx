import React from 'react'
import { Text, View } from 'react-native'
import UserSubScreenLayout from '@/modules/user-profile/components/UserSubScreenLayout'

const TermsScreen = () => {
  return (
    <UserSubScreenLayout title="Điều khoản & Điều kiện">
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
          1. Chấp nhận các điều khoản
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Bằng việc truy cập và sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản
          và điều kiện được nêu dưới đây. Nếu bạn không đồng ý với bất kỳ phần nào, vui
          lòng ngừng sử dụng ứng dụng.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          2. Tuyên bố từ chối trách nhiệm y tế
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Ứng dụng không thay thế cho tư vấn, chẩn đoán hoặc điều trị từ bác sĩ.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Các chỉ số như BMI, TDEE chỉ mang tính tham khảo.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          • Bạn nên tham khảo ý kiến bác sĩ trước khi thay đổi chế độ ăn uống hoặc tập luyện.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          3. Dữ liệu người dùng & Quyền riêng tư
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Chúng tôi chỉ thu thập thông tin cần thiết để tính toán chỉ số và cải thiện trải nghiệm.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-1">
          • Chúng tôi không bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba vì mục đích thương mại.
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          • Một số dữ liệu có thể được ẩn danh để phục vụ mục đích thống kê.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          4. Quyền sở hữu trí tuệ
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Toàn bộ nội dung, giao diện và mã nguồn thuộc quyền sở hữu của nhóm phát triển,
          trừ khi được ghi chú khác đi.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          5. Giới hạn trách nhiệm
        </Text>
        <Text className="text-base text-[#4B5563] leading-6 mb-4">
          Chúng tôi nỗ lực đảm bảo ứng dụng hoạt động ổn định, tuy nhiên không thể đảm bảo
          ứng dụng luôn không mắc lỗi hoặc gián đoạn.
        </Text>

        <Text className="text-base font-semibold text-[#1A1A1A] mb-2">
          6. Thay đổi điều khoản
        </Text>
        <Text className="text-base text-[#4B5563] leading-6">
          Chúng tôi có thể cập nhật các điều khoản này theo từng thời điểm. Việc bạn tiếp tục
          sử dụng ứng dụng đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
        </Text>
      </View>
    </UserSubScreenLayout>
  )
}

export default TermsScreen
