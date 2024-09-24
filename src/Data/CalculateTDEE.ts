/**
 * TDEE (Total Daily Energy Expenditure) Calculation Utilities
 * 
 * This module provides utility functions to calculate TDEE and REE (Resting Energy Expenditure) 
 * based on user data, including weight, height, age, sex, and exercise level.
 * 
 * Dependencies:
 * - ExerciseLevel: Enumeration for different levels of physical activity.
 * - UserData: Interface or type representing user attributes such as weight, height, age, and exercise level.
 */
import ExerciseLevel from "./ExerciseLevel";
import UserData from "./User";

/**
 * Extracts the feet and inches from the user's height string.
 * The user's height is expected in the format "Xft Yin" (e.g., "5ft 7in").
 * 
 * @param {UserData} user - The user's data object containing their height as a string.
 * @returns {Object} - An object containing the extracted `feet` and `inches`.
 * @property {number} feet - The extracted feet from the height string.
 * @property {number} inches - The extracted inches from the height string.
 */
const extractFeetAndInches = (user: UserData) => {
    const extractedHeight = user.height.match(/\d+/g);
    const feet = extractedHeight ? parseInt(extractedHeight[0]) : 0;
    const inches = extractedHeight ? parseInt(extractedHeight[1]) : 0;

    return { feet, inches };
  };

  /**
 * Converts the user's height from feet and inches to centimeters.
 * 
 * @param {UserData} user - The user's data object containing their height.
 * @returns {number} - The user's height in centimeters.
 */
  const inchesToCm = (user: UserData) => {
    const heightInInches =
      12 * extractFeetAndInches(user).feet + extractFeetAndInches(user).inches;
    return heightInInches * 2.54;
  };

  /**
 * Calculates the user's Resting Energy Expenditure (REE) based on the Mifflin-St Jeor formula.
 * The formula uses weight, height, age, and sex to estimate the user's energy expenditure at rest.
 * 
 * Formula:
 * - For males: REE = (10 * weight in kg) + (6.25 * height in cm) - (5 * age) + 5
 * - For females: REE = (10 * weight in kg) + (6.25 * height in cm) - (5 * age) - 161
 * 
 * @param {UserData} user - The user's data object containing weight, height, age, and sex.
 * @returns {number} - The calculated Resting Energy Expenditure (REE).
 */
  const calculateREE = (user: UserData) => {
    const weightInKg = user.weight * 0.45359237;
    const heightInCm = inchesToCm(user);
    const REEFormula = 10 * weightInKg + 6.25 * heightInCm - 5 * user.age;
    return user.sex === "Male" ? REEFormula + 5 : REEFormula - 161;
  };

  /**
 * Calculates the user's Total Daily Energy Expenditure (TDEE) by multiplying their REE 
 * (Resting Energy Expenditure) with an activity factor based on their exercise level.
 * 
 * TDEE = REE * Activity Level Multiplier
 * - Sedentary (little or no exercise): 1.2
 * - Light activity (light exercise/sports 1-3 days/week): 1.375
 * - Moderate activity (moderate exercise/sports 3-5 days/week): 1.55
 * - Very active (hard exercise/sports 6-7 days a week): 1.725
 * 
 * @param {UserData} user - The user's data object containing weight, height, age, sex, and exercise level.
 * @returns {number} - The calculated Total Daily Energy Expenditure (TDEE).
 */
  const calculateTDEE = (user: UserData) => {
    const REE = calculateREE(user);
    let REEMultiplier = 1.2;
    if (user.exercise === ExerciseLevel["Light activity"])
      REEMultiplier = 1.375;
    else if (user.exercise === ExerciseLevel["Moderate activity"])
      REEMultiplier = 1.55;
    else if (user.exercise === ExerciseLevel["Very active"])
      REEMultiplier = 1.725;
    return REE * REEMultiplier;
  };

  export {calculateTDEE}