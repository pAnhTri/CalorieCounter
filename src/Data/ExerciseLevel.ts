/**
 * ExerciseLevel Enum
 * 
 * This enum defines the different activity levels a user can have based on their exercise frequency.
 * It is used to categorize a user's physical activity level, which plays a role in calculating their
 * Total Daily Energy Expenditure (TDEE).
 * 
 * Enum values represent:
 * - `Sedentary`: No exercise or very minimal physical activity (just daily living).
 * - `Light activity`: Light exercise or physical activity 1-3 days a week.
 * - `Moderate activity`: Moderate exercise 3-5 days a week.
 * - `Very active`: Intense exercise or physical activity 5+ days a week.
 * 
 * Purpose:
 * - This enum is used in conjunction with user profile data to calculate energy expenditure
 * based on physical activity.
 */

/**
 * Enum for categorizing a user's activity level.
 * 
 * Values:
 * - `Sedentary`: {number} 0 - Represents no exercise or very minimal physical activity.
 * - `Light activity`: {number} 1 - Represents 1 to 3 days of light physical activity or exercise per week.
 * - `Moderate activity`: {number} 2 - Represents 3 to 5 days of moderate physical activity or exercise per week.
 * - `Very active`: {number} 3 - Represents 5 or more days of intense physical activity or exercise per week.
 * 
 * The activity level is typically used in calculating TDEE (Total Daily Energy Expenditure) to adjust
 * calorie goals based on a user's lifestyle.
 */
enum ExerciseLevel {
    "Sedentary" = 0,          // No exercise, minimal activity
    "Light activity",          // 1-3 exercises per week
    "Moderate activity",       // 3-5 exercises per week
    "Very active"              // 5+ exercises per week
}

export default ExerciseLevel;