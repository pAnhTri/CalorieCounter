import ExerciseLevel from "./ExerciseLevel";
import UserData from "./User";

const extractFeetAndInches = (user: UserData) => {
    const extractedHeight = user.height.match(/\d+/g);
    const feet = extractedHeight ? parseInt(extractedHeight[0]) : 0;
    const inches = extractedHeight ? parseInt(extractedHeight[1]) : 0;

    return { feet, inches };
  };

  const inchesToCm = (user: UserData) => {
    const heightInInches =
      12 * extractFeetAndInches(user).feet + extractFeetAndInches(user).inches;
    return heightInInches * 2.54;
  };

  const calculateREE = (user: UserData) => {
    const weightInKg = user.weight * 0.45359237;
    const heightInCm = inchesToCm(user);
    const REEFormula = 10 * weightInKg + 6.25 * heightInCm - 5 * user.age;
    return user.sex === "Male" ? REEFormula + 5 : REEFormula - 161;
  };

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