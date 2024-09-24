/**
 * This interface defines the structure for a user's profile, which includes personal information 
 * (name, sex, age, weight, height) and their exercise activity level. The data will be used 
 * in various calculations such as TDEE (Total Daily Energy Expenditure) and REE (Resting Energy Expenditure).
 * 
 * Dependencies:
 * - `ExerciseLevel`: Enum that represents different exercise activity levels, which is used 
 * to define the `exercise` field of the user's profile.
 * 
 * Purpose:
 * This interface serves as a blueprint for user profile data, ensuring that any object representing 
 * a user contains the required fields in the correct format.
 */
import ExerciseLevel from "./ExerciseLevel"

/** 
 * Defines the structure of the user profile data. Store and process user information such as
 * name, sex, age, weight, height, and activity level. 
 * The `exercise` field uses the `ExerciseLevel` enum to represent the user's physical activity level.
 * 
 * Fields:
 * - `name`: {string} - The user's name.
 * - `sex`: {string} - The user's sex ("Male" or "Female").
 * - `age`: {number} - The user's age in years.
 * - `weight`: {number} - The user's weight in pounds.
 * - `height`: {string} - The user's height represented in feet and inches (e.g., "5ft 7in").
 * - `exercise`: {ExerciseLevel} - The user's activity level, represented as an enum from `ExerciseLevel`.
 * @see {ExerciseLevel} for the different activity levels.
 */
interface UserData{
    name: string; // User's name
    sex: string; // User's sex ("Male" or "Female")
    age: number; // User's age in years
    weight: number; // User's weight in pounds
    height: string; // User's height in feet and inches (e.g., "5ft 7in")
    exercise: ExerciseLevel; // User's exercise level, represented by an enum from ExerciseLevel
};

export default UserData;