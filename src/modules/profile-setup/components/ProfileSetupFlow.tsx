import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import { useAuth } from '@/context/auth-provider'
import { AuthService } from '@/services/auth.service'
import { ActivityLevelType, GenderType, GoalOptionId, NutritionPlan, ProfileSetupData, resolveCalorieGoal } from '../types/profile-setup.types'
import { calculateNutritionPlan } from '../services/calorie-calculator.service'
import { updateUserProfile } from '../services/profile-setup.service'

// Import step components
import NameStep from '../steps/NameStep'
import GenderStep from '../steps/GenderStep'
import GoalStep from '../steps/GoalStep'
import AgeStep from '../steps/AgeStep'
import HeightStep from '../steps/HeightStep'
import WeightStep from '../steps/WeightStep'
import ActivityLevelStep from '../steps/ActivityLevelStep'
import PlanSummaryStep from '../steps/PlanSummaryStep'

const ProfileSetupFlow: React.FC = () => {
    const router = useRouter()
    const { user, loading: authLoading, isAuthenticated } = useAuth()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (authLoading || isAuthenticated) return

        Alert.alert(
            'Cần đăng nhập',
            'Vui lòng xác thực email hoặc đăng nhập trước khi thiết lập hồ sơ.',
            [
                {
                    text: 'Đăng nhập',
                    onPress: () => router.replace(ERouteTable.SIGIN_IN),
                },
            ],
        )
    }, [authLoading, isAuthenticated, router])

    // Form data state
    const [formData, setFormData] = useState<ProfileSetupData>({
        full_name: '',
        gender: null,
        goals: [],
        age: 23,
        height_cm: 165.0,
        current_weight_kg: 60,
        activity_level: null,
    })

    // Nutrition plan state (calculated on step 8)
    const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan>({
        dailyCalories: 0,
        protein_g: 0,
        fat_g: 0,
        carbs_g: 0,
    })

    // Navigation handlers
    const handleNext = () => {
        if (currentStep < 8) {
            // Calculate nutrition plan when moving to step 8
            const calorieGoal = resolveCalorieGoal(formData.goals)
            if (currentStep === 7 && formData.gender && calorieGoal && formData.activity_level) {
                const plan = calculateNutritionPlan(
                    formData.current_weight_kg,
                    formData.height_cm,
                    formData.age,
                    formData.gender,
                    formData.activity_level,
                    calorieGoal
                )
                setNutritionPlan(plan)
            }
            setCurrentStep(currentStep + 1)
        } else {
            // Final step - save and navigate to home
            handleComplete()
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        } else {
            // Go back to sign-up or previous screen
            router.back()
        }
    }

    // Complete profile setup
    const handleComplete = async () => {
        setLoading(true)
        try {
            let currentUser = user

            if (!currentUser) {
                const session = await AuthService.getSession()
                currentUser = session?.user ?? null
            }

            if (!currentUser) {
                Alert.alert(
                    'Chưa đăng nhập',
                    'Phiên đăng nhập đã hết hạn hoặc email chưa được xác thực. Vui lòng xác thực email hoặc đăng nhập lại.',
                    [
                        {
                            text: 'Đăng nhập',
                            onPress: () => router.replace(ERouteTable.SIGIN_IN),
                        },
                    ],
                )
                return
            }

            console.log('=== SAVING PROFILE SETUP DATA ===')
            console.log('User ID:', currentUser.id)
            console.log('Name:', formData.full_name)
            console.log('Gender:', formData.gender)
            console.log('Goals:', formData.goals)
            console.log('Age:', formData.age)
            console.log('Height:', formData.height_cm, 'cm')
            console.log('Weight:', formData.current_weight_kg, 'kg')
            console.log('Activity Level:', formData.activity_level)
            console.log('Nutrition Plan:', nutritionPlan)
            console.log('==================================')
      
            // Update profile in Supabase
            const result = await updateUserProfile(currentUser.id, formData)
      
            if (result.success) {
              // Navigate to home screen
              Alert.alert('Thành công!', 'Thông tin của bạn đã được lưu.', [
                {
                    text: 'OK',
                    onPress: () => router.replace(ERouteTable.HOME),
                },
              ])
            } else {
              Alert.alert('Lỗi', result.error || 'Không thể lưu thông tin. Vui lòng thử lại.')
            }
        } catch (error) {
            console.error('Error completing profile setup:', error)
            Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.')
        } finally {
            setLoading(false)
        }
    }

    // Render current step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <NameStep
                        value={formData.full_name}
                        onChange={(value) => setFormData({ ...formData, full_name: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 2:
                return (
                    <GenderStep
                        value={formData.gender}
                        onChange={(value) => setFormData({ ...formData, gender: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 3:
                return (
                    <GoalStep
                        value={formData.goals}
                        onChange={(value: GoalOptionId[]) => setFormData({ ...formData, goals: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 4:
                return (
                    <AgeStep
                        value={formData.age}
                        onChange={(value) => setFormData({ ...formData, age: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 5:
                return (
                    <HeightStep
                        value={formData.height_cm}
                        onChange={(value) => setFormData({ ...formData, height_cm: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 6:
                return (
                    <WeightStep
                        value={formData.current_weight_kg}
                        onChange={(value) => setFormData({ ...formData, current_weight_kg: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 7:
                return (
                    <ActivityLevelStep
                        value={formData.activity_level}
                        onChange={(value) => setFormData({ ...formData, activity_level: value })}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )
            case 8:
                return (
                    <PlanSummaryStep
                        nutritionPlan={nutritionPlan}
                        onNext={handleNext}
                        onBack={handleBack}
                        loading={loading}
                    />
                )
            default:
                return null
        }
    }

    return <>{renderStep()}</>
}

export default ProfileSetupFlow
