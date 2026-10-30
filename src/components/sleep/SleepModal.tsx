import { Modal, Text, TextInput, TouchableOpacity, View, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/context/auth-provider'
import { useDate } from '@/context/date-context'
import { SleepService } from '@/services/sleep.service'

type Props = {
  visible: boolean
  onClose: () => void
  onSave?: (hours: number) => void
}

const MIN_HOURS = 1
const MAX_HOURS = 12

const clampHours = (value: number) => {
  const bounded = Math.min(Math.max(value, MIN_HOURS), MAX_HOURS)
  return Math.round(bounded * 10) / 10
}

const formatHours = (value: number) => {
  const hours = clampHours(value)
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1).replace('.', ',')
}

const sanitizeHours = (raw: string) => {
  const cleaned = raw.replace('.', ',')
  let result = ''
  let hasSeparator = false
  let decimals = 0

  for (const char of cleaned) {
    if (char >= '0' && char <= '9') {
      if (hasSeparator) {
        if (decimals >= 1) continue
        decimals += 1
      }
      result += char
    } else if (char === ',' && !hasSeparator) {
      hasSeparator = true
      result += char
    }
  }

  return result.slice(0, 4)
}

const readHours = (raw: string) => {
  const normalized = raw.trim().replace(',', '.')
  if (!normalized || normalized === '.') return null
  const parsed = Number(normalized)
  if (Number.isNaN(parsed)) return null
  return parsed
}

const SleepModal = ({ visible, onClose, onSave }: Props) => {
  const { user } = useAuth()
  const { selectedDate, triggerRefresh } = useDate()
  const [sleepHours, setSleepHours] = useState(7.5)
  const [hoursText, setHoursText] = useState(formatHours(7.5))
  const [loading, setLoading] = useState(false)

  const applyHours = (value: number) => {
    const next = clampHours(value)
    setSleepHours(next)
    setHoursText(formatHours(next))
    return next
  }

  const handleIncrement = () => {
    applyHours((readHours(hoursText) ?? sleepHours) + 0.5)
  }

  const handleDecrement = () => {
    applyHours((readHours(hoursText) ?? sleepHours) - 0.5)
  }

  const handleChangeHours = (raw: string) => {
    const nextText = sanitizeHours(raw)
    setHoursText(nextText)

    const parsed = readHours(nextText)
    if (parsed === null || nextText.endsWith(',')) return
    if (parsed < MIN_HOURS || parsed > MAX_HOURS) return
    setSleepHours(Math.round(parsed * 10) / 10)
  }

  const commitHours = () => {
    const parsed = readHours(hoursText)
    return applyHours(parsed === null ? sleepHours : parsed)
  }

  const handleSave = async () => {
    if (!user?.id) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập')
      return
    }

    const hours = commitHours()

    setLoading(true)
    try {
      // Calculate sleep start and end times
      // Assume sleep ended at selected date's morning (7 AM)
      const sleepEndDate = new Date(selectedDate + 'T07:00:00Z')
      const sleepStartDate = new Date(sleepEndDate.getTime() - hours * 60 * 60 * 1000)

      const success = await SleepService.addSleepLog(
        user.id,
        sleepStartDate.toISOString(),
        sleepEndDate.toISOString(),
        undefined, // quality will be calculated by service
        undefined, // no notes
        selectedDate
      )

      if (success) {
        // Trigger refresh for home screen
        triggerRefresh()
        
        // Call onSave callback if provided
        if (onSave) {
          onSave(hours)
        }
        
        Alert.alert('Thành công', 'Đã lưu giờ ngủ', [
          {
            text: 'OK',
            onPress: onClose,
          },
        ])
      } else {
        Alert.alert('Lỗi', 'Không thể lưu giờ ngủ')
      }
    } catch (error) {
      console.error('Error saving sleep:', error)
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu giờ ngủ')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="w-full items-center"
        >
        <Pressable
          className="bg-white rounded-3xl p-6 mx-6 w-[85%]"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <Text className="text-xl font-bold text-gray-900 mb-8 text-center">
            Giờ ngủ
          </Text>

          {/* Sleep Hours Control */}
          <View className="items-center mb-8">
            <View className="flex-row items-center gap-6">
              <TouchableOpacity
                onPress={handleDecrement}
                className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-3xl font-bold text-gray-700">−</Text>
              </TouchableOpacity>

              <View className="items-center min-w-[120px]">
                <TextInput
                  value={hoursText}
                  onChangeText={handleChangeHours}
                  onBlur={commitHours}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  returnKeyType="done"
                  selectTextOnFocus
                  maxLength={4}
                  className="text-6xl font-bold text-gray-900 text-center min-w-[120px]"
                  style={{ padding: 0 }}
                />
                <Text className="text-sm text-gray-500 mt-1">(giờ)</Text>
              </View>

              <TouchableOpacity
                onPress={handleIncrement}
                className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-3xl font-bold text-gray-700">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 bg-white border border-gray-300 rounded-2xl py-4 items-center"
              activeOpacity={0.7}
            >
              <Text className="text-base font-semibold text-gray-900">
                Hủy bỏ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={loading}
              className="flex-1 bg-green-500 rounded-2xl py-4 items-center"
              activeOpacity={0.7}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text className="text-base font-semibold text-white">
                  Cập nhật
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  )
}

export default SleepModal
