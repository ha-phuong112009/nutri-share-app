import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useAuth } from '@/context/auth-provider'
import { useDate } from '@/context/date-context'
import { MealsService } from '@/services/meals.service'

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Bữa sáng',
  lunch: 'Bữa trưa',
  dinner: 'Bữa tối',
  snack: 'Ăn nhẹ',
}

const firstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

const MealDetailScreen = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams<{
    mealId?: string
    mealType?: string
    intent?: string
    name?: string
    image?: string
    calories?: string
    protein?: string
    fat?: string
    carbs?: string
  }>()
  const { user } = useAuth()
  const { selectedDate, triggerRefresh } = useDate()

  const mealId = firstParam(params.mealId)
  const mealType = (firstParam(params.mealType) as MealType) || 'breakfast'
  const isAddFlow = firstParam(params.intent) !== 'view'
  const [loading, setLoading] = useState(Boolean(mealId))
  const [saving, setSaving] = useState(false)
  const [mealData, setMealData] = useState({
    name: firstParam(params.name) || 'Món ăn',
    image: firstParam(params.image) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    calories: Number(firstParam(params.calories)) || 0,
    protein: Number(firstParam(params.protein)) || 0,
    fat: Number(firstParam(params.fat)) || 0,
    carbs: Number(firstParam(params.carbs)) || 0,
  })

  useEffect(() => {
    if (!mealId) {
      setLoading(false)
      return
    }

    let active = true

    const loadMeal = async () => {
      setLoading(true)
      const meal = await MealsService.getMealById(mealId)
      if (!active) return

      if (!meal) {
        setLoading(false)
        Alert.alert('Lỗi', 'Không tìm thấy món ăn', [
          { text: 'OK', onPress: () => router.back() },
        ])
        return
      }

      setMealData({
        name: meal.name,
        image: meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        calories: meal.calories || 0,
        protein: meal.protein_g || 0,
        fat: meal.fats_g || 0,
        carbs: meal.carbs_g || 0,
      })
      setLoading(false)
    }

    loadMeal()

    return () => {
      active = false
    }
  }, [mealId])

  const handleBack = () => {
    router.back()
  }

  const handleSave = async () => {
    if (!mealId) return

    if (!user?.id) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để thêm món ăn')
      return
    }

    setSaving(true)
    try {
      const success = await MealsService.addMealLog(user.id, mealId, selectedDate, mealType)

      if (!success) {
        Alert.alert('Lỗi', 'Không thể thêm món ăn vào nhật ký')
        return
      }

      triggerRefresh()
      Alert.alert('Thành công', 'Đã thêm món ăn vào nhật ký', [
        {
          text: 'OK',
          onPress: () => navigation.dispatch(StackActions.pop(2)),
        },
      ])
    } catch (error) {
      console.error('Error adding meal:', error)
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm món ăn')
    } finally {
      setSaving(false)
    }
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ImageBackground
        source={{ uri: mealData.image }}
        className="h-80"
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/30 justify-between">
          <TouchableOpacity
            onPress={handleBack}
            className="w-14 h-14 rounded-full bg-white items-center justify-center mt-14 ml-4"
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <View className="p-6">
            <Text className="text-3xl font-bold text-white">
              {mealData.name}
            </Text>
          </View>
        </View>
      </ImageBackground>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22C55E" />
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 py-6">
            {isAddFlow && (
              <View className="mb-6">
                <View className="bg-white rounded-2xl px-4 py-4 mb-3">
                  <Text className="text-base text-gray-900">
                    {MEAL_TYPE_LABELS[mealType] || 'Bữa ăn'}
                  </Text>
                </View>
                <View className="bg-white rounded-2xl px-4 py-4">
                  <Text className="text-base text-gray-900">1 phần</Text>
                </View>
              </View>
            )}

            <View>
              <Text className="text-xl font-bold text-gray-900 mb-6">
                Thành phần dinh dưỡng
              </Text>

              <View className="items-center mb-6">
                <View className="relative items-center justify-center mb-6">
                  <View className="w-48 h-48 items-center justify-center">
                    <View
                      className="absolute w-48 h-48 rounded-full border-[30px] border-cyan-500"
                      style={{
                        borderTopColor: '#06B6D4',
                        borderRightColor: '#EF4444',
                        borderBottomColor: '#10B981',
                        borderLeftColor: '#06B6D4',
                      }}
                    />
                    <View className="absolute bg-white rounded-full w-32 h-32 items-center justify-center">
                      <Text className="text-4xl font-bold text-gray-900">
                        {mealData.calories}
                      </Text>
                      <Text className="text-sm text-gray-500">kcal</Text>
                    </View>
                  </View>
                </View>

                <View className="w-full">
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <View className="w-4 h-4 rounded-full bg-cyan-500 mr-2" />
                      <Text className="text-base text-gray-900">Đạm</Text>
                    </View>
                    <Text className="text-base font-semibold text-gray-900">
                      {mealData.protein} g
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <View className="w-4 h-4 rounded-full bg-red-500 mr-2" />
                      <Text className="text-base text-gray-900">Béo</Text>
                    </View>
                    <Text className="text-base font-semibold text-gray-900">
                      {mealData.fat} g
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View className="w-4 h-4 rounded-full bg-green-500 mr-2" />
                      <Text className="text-base text-gray-900">Tinh bột</Text>
                    </View>
                    <Text className="text-base font-semibold text-gray-900">
                      {mealData.carbs} g
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {isAddFlow && !loading && (
        <View className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving || !mealId}
            className="bg-primary-main rounded-2xl py-4 items-center"
            activeOpacity={0.8}
          >
            {saving ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text className="text-white text-lg font-semibold">
                Thêm vào nhật ký
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default MealDetailScreen
