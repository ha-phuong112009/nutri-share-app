import {
  ImageBackground,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeHeader from '@/components/home-new/HomeHeader'
import HomeSearchBar from '@/components/home-new/HomeSearchBar'
import WeekCalendar from '@/components/home-new/WeekCalendar'
import CalorieCard from '@/components/home-new/CalorieCard'
import CalorieProgress from '@/components/home-new/CalorieProgress'
import HealthMetrics from '@/components/home-new/HealthMetrics'
import WaterTracker from '@/components/home-new/WaterTracker'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import { useAuth } from '@/context/auth-provider'
import { useDate } from '@/context/date-context'
import { useNotifications } from '@/context/notification-provider'
import { HomeService, HomeData } from '@/services/home.service'
import bannerHome from '~/assets/images/banner-home.jpg'

const Home = () => {
  const insets = useSafeAreaInsets()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { selectedDate, setSelectedDate, refreshTrigger } = useDate()
  const { unreadCount, onNewNotification, offNewNotification } = useNotifications()
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [dateLoading, setDateLoading] = useState(false)

  const loadHomeData = async (date?: string, isDateSwitch = false) => {
    const dateToLoad = date || selectedDate
    console.log('=== LOADING HOME DATA ===')
    console.log('User ID:', user?.id)
    console.log('Date:', dateToLoad)
    console.log('Is Date Switch:', isDateSwitch)
    console.log('Is Authenticated:', isAuthenticated)

    if (!user?.id) {
      console.log('No user ID, stopping load')
      setLoading(false)
      setDateLoading(false)
      return
    }

    try {
      console.log('Fetching home data for date:', dateToLoad)
      const data = await HomeService.getHomeData(user.id, dateToLoad)
      console.log('Home data received:', data)

      if (data) {
        setHomeData(data)
        console.log('Home data set successfully')
      } else {
        console.log('No data returned from service')
        Alert.alert('Lỗi', 'Không thể tải dữ liệu. Vui lòng kiểm tra profile của bạn.')
      }
    } catch (error: any) {
      console.error('=== ERROR LOADING HOME DATA ===')
      console.error('Error:', error)
      console.error('Error message:', error?.message)
      console.error('Error stack:', error?.stack)
      Alert.alert('Lỗi', `Đã xảy ra lỗi: ${error?.message || 'Không rõ nguyên nhân'}`)
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
      setRefreshing(false)
      setDateLoading(false)
    }
  }

  useEffect(() => {
    console.log('=== HOME USEEFFECT ===')
    console.log('authLoading:', authLoading)
    console.log('isAuthenticated:', isAuthenticated)
    console.log('user:', user)
    console.log('refreshTrigger:', refreshTrigger)

    if (authLoading) {
      console.log('Auth still loading, waiting...')
      return
    }

    if (!isAuthenticated || !user) {
      console.log('Not authenticated, redirecting to sign in...')
      setLoading(false)
      router.replace(ERouteTable.SIGIN_IN)
      return
    }

    console.log('User authenticated, calling loadHomeData...')
    loadHomeData()
  }, [user, isAuthenticated, authLoading, refreshTrigger])

  useEffect(() => {
    const handleNewNotification = (notification: any) => {
      console.log('New notification received in Home:', notification.type)

      const goalTypes = ['goal_completed', 'streak', 'water_reminder', 'meal_reminder', 'exercise_reminder']
      if (goalTypes.includes(notification.type)) {
        console.log('Refreshing home data due to notification...')
        const today = new Date().toISOString().split('T')[0]
        if (selectedDate === today) {
          loadHomeData(selectedDate, true)
        }
      }
    }

    onNewNotification(handleNewNotification)

    return () => {
      offNewNotification(handleNewNotification)
    }
  }, [selectedDate, onNewNotification, offNewNotification])

  const handleNotificationPress = () => {
    router.push(ERouteTable.NOTIFICATIONS)
  }

  const handleDateSelect = (date: string) => {
    console.log('Date selected:', date)
    setSelectedDate(date)
    setDateLoading(true)
    loadHomeData(date, true)
  }

  const handleWaterChange = async (delta: number) => {
    if (!user?.id) return

    try {
      console.log('Water change delta:', delta, 'ml for date:', selectedDate)

      if (delta > 0) {
        const success = await HomeService.updateWaterIntake(user.id, delta, selectedDate)
        if (success) {
          loadHomeData(selectedDate, true)
        } else {
          Alert.alert('Lỗi', 'Không thể cập nhật lượng nước.')
        }
      } else if (delta < 0) {
        const success = await HomeService.deleteLastWaterLog(user.id, selectedDate)
        if (success) {
          loadHomeData(selectedDate, true)
        } else {
          Alert.alert('Lỗi', 'Không thể giảm nước. Có thể chưa có dữ liệu uống nước.')
        }
      }
    } catch (error) {
      console.error('Error updating water:', error)
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật.')
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    loadHomeData(selectedDate)
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    )
  }

  if (!homeData) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header with green background */}
      <ImageBackground
        source={images.bannerHome}
        className="w-full"
        resizeMode="cover"
        style={{ paddingTop: insets.top + 8 }}
      >
        <View className="px-5 pb-8">
          <HomeHeader
            userName={homeData.profile.full_name || 'User'}
            avatar={
              homeData.profile.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                homeData.profile.full_name || 'User',
              )}&background=22C55E&color=fff`
            }
            notificationCount={unreadCount}
            onNotificationPress={handleNotificationPress}
          />

          <Text className="text-[30px] text-white">
            Bắt Đầu
          </Text>
          <Text className="text-[48px] text-white mb-2">Sống Khỏe</Text>

          <HomeSearchBar />

          <View className="bg-white rounded-3xl px-2 mb-2 mt-4">
            <WeekCalendar onDateSelect={handleDateSelect} />
          </View>
        </View>
      </ImageBackground>

      {/* Main content card */}
      <ScrollView
        className="flex-1 bg-white -mt-8 rounded-tl-[32px] rounded-tr-[32px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 28,
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#22C55E"
            colors={['#22C55E']}
          />
        }
      >
        <View style={{ opacity: dateLoading ? 0.5 : 1 }}>
          <CalorieCard
            calories={homeData.todayCalories}
            targetCalories={homeData.targetCalories}
          />

          <CalorieProgress
            currentCalories={homeData.todayCalories}
            targetCalories={homeData.targetCalories}
            macros={homeData.macros}
          />

          <WaterTracker
            initialAmount={homeData.waterIntake.current}
            targetAmount={homeData.waterIntake.target}
            selectedDate={selectedDate}
            onAmountChange={handleWaterChange}
          />

          <HealthMetrics
            bmi={homeData.bmi}
            tdee={homeData.tdee}
            exerciseMinutes={homeData.exerciseMinutes}
            sleepHours={homeData.sleepHours}
          />
        </View>

        {dateLoading && (
          <View className="absolute top-24 left-0 right-0 items-center">
            <View className="bg-white rounded-2xl px-6 py-5 shadow-md items-center">
              <ActivityIndicator size="large" color="#22C55E" />
              <Text className="mt-3 text-gray-500 text-sm">Đang tải dữ liệu...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/*{homeData && (*/}
      {/*  <TouchableOpacity*/}
      {/*    onPress={() => router.push(ERouteTable.CHAT_HEALTH)}*/}
      {/*    activeOpacity={0.8}*/}
      {/*    className="absolute bottom-24 right-5 h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]"*/}
      {/*    style={{*/}
      {/*      shadowColor: '#000',*/}
      {/*      shadowOffset: { width: 0, height: 4 },*/}
      {/*      shadowOpacity: 0.2,*/}
      {/*      shadowRadius: 8,*/}
      {/*      elevation: 6,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}
    </View>
  )
}

export default Home
