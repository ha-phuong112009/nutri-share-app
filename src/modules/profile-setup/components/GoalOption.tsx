import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface GoalOptionProps {
    label: string
    selected: boolean
    onPress: () => void
}

const GoalOption: React.FC<GoalOptionProps> = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between py-4 px-5 bg-gray-50 rounded-xl mb-3"
        >
            <Text className={`text-base ${selected ? 'font-semibold text-primary' : 'text-gray-700'}`}>
                {label}
            </Text>
            <View
                className={`w-6 h-6 rounded-md border-2 items-center justify-center ${selected ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}
            >
                {selected && <Text className="text-white text-sm font-bold">✓</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default GoalOption
