import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface NumericStepperProps {
    value: number
    onChange: (value: number) => void
    unit: string
    step?: number
    min?: number
    max?: number
    decimalPlaces?: number
}

const NumericStepper: React.FC<NumericStepperProps> = ({
    value,
    onChange,
    unit,
    step = 1,
    min = 0,
    max = 999,
    decimalPlaces = 0,
}) => {
    const formatValue = (n: number) =>
        decimalPlaces > 0 ? n.toFixed(decimalPlaces) : String(Math.round(n))

    const clamp = (n: number) => {
        const bounded = Math.min(Math.max(n, min), max)
        return Number(bounded.toFixed(decimalPlaces))
    }

    const [text, setText] = useState(formatValue(value))
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        if (!focused) {
            setText(formatValue(value))
        }
    }, [value, focused, decimalPlaces])

    const sanitize = (raw: string) => {
        const cleaned = raw.replace(',', '.')
        if (decimalPlaces === 0) {
            return cleaned.replace(/[^\d]/g, '').slice(0, 3)
        }

        let result = ''
        let hasDot = false
        let decimals = 0

        for (const ch of cleaned) {
            if (ch >= '0' && ch <= '9') {
                if (hasDot) {
                    if (decimals >= decimalPlaces) continue
                    decimals += 1
                }
                result += ch
            } else if (ch === '.' && !hasDot) {
                hasDot = true
                result += ch
            }
        }

        return result.slice(0, 6)
    }

    const readDraft = (raw: string) => {
        const normalized = raw.trim().replace(',', '.')
        if (!normalized || normalized === '.') return null
        const parsed = Number(normalized)
        if (Number.isNaN(parsed)) return null
        return parsed
    }

    const commit = (raw: string) => {
        const parsed = readDraft(raw)
        const next = parsed === null ? value : clamp(parsed)
        onChange(next)
        setText(formatValue(next))
    }

    const handleChangeText = (raw: string) => {
        const nextText = sanitize(raw)
        setText(nextText)

        const parsed = readDraft(nextText)
        if (parsed === null || nextText.endsWith('.')) return
        if (parsed < min || parsed > max) return
        onChange(Number(parsed.toFixed(decimalPlaces)))
    }

    const handleIncrement = () => {
        const base = readDraft(text) ?? value
        const next = clamp(base + step)
        onChange(next)
        setText(formatValue(next))
    }

    const handleDecrement = () => {
        const base = readDraft(text) ?? value
        const next = clamp(base - step)
        onChange(next)
        setText(formatValue(next))
    }

    const draft = readDraft(text)
    const canDecrement = (draft ?? value) > min
    const canIncrement = (draft ?? value) < max

    return (
        <View className="items-center justify-center py-12">
            <View className="flex-row items-center gap-8">
                <TouchableOpacity
                    onPress={handleDecrement}
                    className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                    disabled={!canDecrement}
                >
                    <Text className="text-2xl text-gray-600">−</Text>
                </TouchableOpacity>

                <View className="items-center">
                    <TextInput
                        value={text}
                        onChangeText={handleChangeText}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            setFocused(false)
                            commit(text)
                        }}
                        keyboardType={decimalPlaces > 0 ? 'decimal-pad' : 'number-pad'}
                        inputMode={decimalPlaces > 0 ? 'decimal' : 'numeric'}
                        returnKeyType="done"
                        selectTextOnFocus
                        maxLength={decimalPlaces > 0 ? 6 : 3}
                        className="text-6xl font-bold text-primary text-center min-w-[160px]"
                        style={{ padding: 0 }}
                    />
                    <Text className="text-sm text-gray-500 mt-2">({unit})</Text>
                </View>

                <TouchableOpacity
                    onPress={handleIncrement}
                    className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                    disabled={!canIncrement}
                >
                    <Text className="text-2xl text-gray-600">+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NumericStepper
