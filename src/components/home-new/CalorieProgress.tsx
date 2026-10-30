import { Text, View } from 'react-native'
import React from 'react'
import MacroRing from './MacroRing'

type Macros = {
  protein: { current: number; target: number }
  fat: { current: number; target: number }
  carbs: { current: number; target: number }
}

type Props = {
  currentCalories: number
  targetCalories: number
  macros: Macros
}

const CalorieProgress = ({ currentCalories, targetCalories, macros }: Props) => {
  const percentage = targetCalories > 0 ? Math.min((currentCalories / targetCalories) * 100, 100) : 0

  return (
    <View className="mb-6">
      <View className="h-3 bg-gray-100 rounded-full mb-5 relative overflow-visible">
        <View
          className="h-full bg-[#22C55E] rounded-full"
          style={{ width: `${percentage}%` }}
        />
        {percentage > 0 && (
          <View
            className="absolute w-5 h-5 rounded-full bg-gray-900 top-[-4px]"
            style={{ left: `${percentage}%`, marginLeft: -10 }}
          />
        )}
      </View>

      <View className="flex-row justify-between px-1">
        <MacroRing
          label="Đạm"
          current={macros.protein.current}
          target={macros.protein.target}
          color="#22C55E"
        />
        <MacroRing
          label="Béo"
          current={macros.fat.current}
          target={macros.fat.target}
          color="#F97316"
        />
        <MacroRing
          label="Tinh bột"
          current={macros.carbs.current}
          target={macros.carbs.target}
          color="#3B82F6"
        />
      </View>
    </View>
  )
}

export default CalorieProgress
