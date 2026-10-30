import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { images } from '@/constants'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.58
const IMAGE_BORDER_RADIUS = 32

type OnboardSlide = {
  id: string
  image: ImageSourcePropType
  title: string
  description: string
}

const ONBOARD_SLIDES: OnboardSlide[] = [
  {
    id: '1',
    image: images.onboardSlide1,
    title: 'Sống khỏe từ những \nđiều nhỏ nhất',
    description: 'Giúp bạn xây dựng những thói quen tích\ncực mỗi ngày theo cách đơn giản.',
  },
  {
    id: '2',
    image: images.onboardSlide2,
    title: 'Ăn uống lành mạnh \ndễ hơn mỗi ngày',
    description:
      'Khám phá các thực đơn đơn giản, dễ áp \ndụng và phù hợp với cuộc sống bận rộn.',
  },
  {
    id: '3',
    image: images.onboardSlide3,
    title: 'Duy trì động lực \nmỗi ngày',
    description:
      'Theo dõi tiến trình, giữ chuỗi và từng bước \nxây dựng lối sống khỏe mạnh bền vững.',
  },
]

const OnboardScreen = () => {
  const router = useRouter()
  const flatListRef = useRef<FlatList<OnboardSlide>>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isLastSlide = currentIndex === ONBOARD_SLIDES.length - 1

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
    setCurrentIndex(index)
  }

  const handleContinue = () => {
    if (isLastSlide) {
      router.push(ERouteTable.SIGIN_IN)
      return
    }
    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true })
  }

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      <FlatList
        ref={flatListRef}
        data={ONBOARD_SLIDES}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH }} className="flex-1">
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                width: SCREEN_WIDTH,
                height: IMAGE_HEIGHT,
                borderBottomLeftRadius: IMAGE_BORDER_RADIUS,
                borderBottomRightRadius: IMAGE_BORDER_RADIUS,
              }}
            />
            <View className="flex-1 px-8 pt-6">
              <View className="flex-1">
                <Text className="text-4xl font-bold text-primary">{item.title}</Text>
                <Text className="text-lg text-secondary mt-4 leading-6">{item.description}</Text>
              </View>
              <SafeAreaView edges={['bottom']}>
                <View className="flex-row justify-between items-center pb-2">
                  <View className="flex-row items-center gap-2">
                    {ONBOARD_SLIDES.map((slide, index) => (
                      <View
                        key={slide.id}
                        className={`h-2 rounded-full ${
                          index === currentIndex ? 'w-2 bg-success-main' : 'w-2 bg-[#D9D9D9]'
                        }`}
                      />
                    ))}
                  </View>
                  <TouchableOpacity
                    onPress={handleContinue}
                    className="bg-success-main px-6 py-3 rounded-2xl"
                  >
                    <Text className="text-white font-semibold text-base">
                      {isLastSlide ? 'Bắt đầu' : 'Tiếp tục'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default OnboardScreen
