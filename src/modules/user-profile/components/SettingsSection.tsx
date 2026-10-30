import React from 'react'
import { View, Text } from 'react-native'

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <View
      className="bg-white rounded-3xl mx-4 mb-4 overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View className="px-4 pt-4 pb-1">
        <Text className="text-sm font-medium text-[#7D7D7D]">{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  )
}

export default SettingsSection
