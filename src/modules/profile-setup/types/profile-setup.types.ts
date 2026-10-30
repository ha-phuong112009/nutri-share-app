export interface ProfileSetupData {
    full_name: string
    gender: 'male' | 'female' | null
    goals: GoalOptionId[]
    age: number
    height_cm: number
    current_weight_kg: number
    activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null
}

export interface NutritionPlan {
    dailyCalories: number
    protein_g: number
    fat_g: number
    carbs_g: number
}

export type GoalType = 'lose_weight' | 'gain_muscle' | 'maintain'
export type GoalOptionId =
    | 'lose_weight'
    | 'maintain'
    | 'gain_muscle'
    | 'body_composition'
    | 'overall_health'
    | 'eat_better'
    | 'feel_better'
export type ActivityLevelType = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
export type GenderType = 'male' | 'female'

// Vietnamese goal options. calorieGoal drives the nutrition plan; id is unique so each row toggles on its own.
export const GOAL_OPTIONS: { id: GoalOptionId; label: string; calorieGoal: GoalType }[] = [
    { id: 'lose_weight', label: 'Giảm cân', calorieGoal: 'lose_weight' },
    { id: 'maintain', label: 'Duy trì cân nặng', calorieGoal: 'maintain' },
    { id: 'gain_muscle', label: 'Tăng cân', calorieGoal: 'gain_muscle' },
    { id: 'body_composition', label: 'Cải thiện thành phần cơ thể', calorieGoal: 'maintain' },
    { id: 'overall_health', label: 'Cải thiện sức khỏe tổng thể', calorieGoal: 'maintain' },
    { id: 'eat_better', label: 'Ăn ngon hơn', calorieGoal: 'maintain' },
    { id: 'feel_better', label: 'Cảm thấy tốt hơn', calorieGoal: 'maintain' },
]

export const resolveCalorieGoal = (selected: GoalOptionId[]): GoalType | null => {
    if (selected.length === 0) return null

    const calorieGoals = new Set(
        GOAL_OPTIONS.filter((option) => selected.includes(option.id)).map((option) => option.calorieGoal),
    )
    const hasLose = calorieGoals.has('lose_weight')
    const hasGain = calorieGoals.has('gain_muscle')

    if (hasLose && !hasGain) return 'lose_weight'
    if (hasGain && !hasLose) return 'gain_muscle'
    return 'maintain'
}

// Vietnamese activity level options
export const ACTIVITY_LEVEL_OPTIONS = [
    {
        title: 'Ít vận động',
        description: 'Ít đi lại, không tập thể dục.',
        value: 'sedentary' as ActivityLevelType,
    },
    {
        title: 'Vận động nhẹ',
        description: 'Đi bộ nhẹ nhàng hoặc tập thể dục.',
        value: 'light' as ActivityLevelType,
    },
    {
        title: 'Vận động vừa',
        description: 'Tập thể thao hoặc chạy bộ.',
        value: 'moderate' as ActivityLevelType,
    },
    {
        title: 'Vận động mạnh',
        description: 'Tập luyện cường độ cao.',
        value: 'active' as ActivityLevelType,
    },
    {
        title: 'Vận động cực độ',
        description: 'Vận động viên/làm công việc tay chân.',
        value: 'very_active' as ActivityLevelType,
    },
]
