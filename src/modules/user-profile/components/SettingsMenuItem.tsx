import React from 'react'
import { TouchableOpacity, Text, View, Switch } from 'react-native'
import { ArrowRight2 } from 'iconsax-react-native'
import { MenuItem } from '../types/user-profile.types'

interface SettingsMenuItemProps {
  item: MenuItem
  isLast?: boolean
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({ item, isLast }) => {
  const isDanger = item.variant === 'danger'
  const Icon = item.icon
  const iconColor = isDanger ? '#FF5C39' : '#637381'
  const labelColor = isDanger ? '#FF5C39' : '#1A1A1A'
  const iconBg = isDanger ? '#FFF0EB' : '#F3F4F6'

  const content = (
    <View className="flex-row items-center py-3.5 px-6">
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} color={iconColor} variant="Linear" />
      </View>

      <Text className="flex-1 ml-3 text-base font-medium" style={{ color: labelColor }}>
        {item.label}
      </Text>

      {item.toggle ? (
        <Switch
          value={item.toggle.value}
          onValueChange={item.toggle.onValueChange}
          trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
          thumbColor={item.toggle.value ? '#34A853' : '#f4f3f4'}
        />
      ) : item.showChevron !== false && !isDanger ? (
        <ArrowRight2 size={18} color="#9CA3AF" variant="Linear" />
      ) : null}
    </View>
  )

  if (item.toggle) {
    return (
      <View>
        {content}
        {!isLast && <View className="h-px bg-gray-100 mx-4" />}
      </View>
    )
  }

  return (
    <View>
      <TouchableOpacity onPress={item.onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
      {!isLast && <View className="h-px bg-gray-100 mx-4" />}
    </View>
  )
}

export default SettingsMenuItem
