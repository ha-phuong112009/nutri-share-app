import React from 'react'
import { View } from 'react-native'
import ProfileSetupLayout from '../components/ProfileSetupLayout'
import GoalOption from '../components/GoalOption'
import { GOAL_OPTIONS, GoalOptionId } from '../types/profile-setup.types'

interface GoalStepProps {
    value: GoalOptionId[]
    onChange: (value: GoalOptionId[]) => void
    onNext: () => void
    onBack: () => void
}

const GoalStep: React.FC<GoalStepProps> = ({ value, onChange, onNext, onBack }) => {
    const toggleOption = (id: GoalOptionId) => {
        if (value.includes(id)) {
            onChange(value.filter((item) => item !== id))
            return
        }
        onChange([...value, id])
    }

    return (
        <ProfileSetupLayout
            currentStep={3}
            totalSteps={8}
            title="Mục tiêu chính của bạn?"
            onBack={onBack}
            onNext={onNext}
            nextButtonDisabled={value.length === 0}
        >
            <View>
                {GOAL_OPTIONS.map((option) => (
                    <GoalOption
                        key={option.id}
                        label={option.label}
                        selected={value.includes(option.id)}
                        onPress={() => toggleOption(option.id)}
                    />
                ))}
            </View>
        </ProfileSetupLayout>
    )
}

export default GoalStep
