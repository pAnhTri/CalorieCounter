import React from "react";
import UserData from "../../Data/User";
import ExerciseLevel from "../../Data/ExerciseLevel";
import styled from "styled-components";

interface ListProps {
  user: UserData;
  weightUnitInKg: boolean;
  switchWeightUnit: (useKg: boolean) => void;
  heightUnitInCm: boolean;
  switchHeighUnit: (useCm: boolean) => void;
}

// Styles
const UserListItemLabel = styled.li`
  list-style-type: none;
  background: #33b4ff;
  padding: 5px;
  padding-left: 10px;
  padding-right: 0px;
  border-radius: 20px 0px 0px 20px;
  flex: 0 0 120px;
  border: #4a3bcc solid 2px;
`;

const UserListItemResults = styled.li`
  border: #e2e5e9 solid 1px;
  border-radius: 0px 20px 20px 0px;
  flex: 1;
  list-style-type: none;
  padding: 5px;
`;

const List = ({
  user,
  weightUnitInKg,
  switchWeightUnit,
  heightUnitInCm,
  switchHeighUnit,
}: ListProps) => {
  const extractFeetAndInches = () => {
    const extractedHeight = user.height.match(/\d+/g);
    const feet = extractedHeight ? parseInt(extractedHeight[0]) : 0;
    const inches = extractedHeight ? parseInt(extractedHeight[1]) : 0;

    return { feet, inches };
  };

  const inchesToCm = () => {
    const heightInInches =
      12 * extractFeetAndInches().feet + extractFeetAndInches().inches;
    return heightInInches * 2.54;
  };

  const calculateREE = (sex: string) => {
    const weightInKg = user.weight * 0.45359237;
    const heightInCm = inchesToCm();
    const REEFormula = 10 * weightInKg + 6.25 * heightInCm - 5 * user.age;
    return sex === "Male" ? REEFormula + 5 : REEFormula - 161;
  };

  const calculateTDEE = () => {
    const REE = calculateREE(user.sex);
    let REEMultiplier = 1.2;
    if (user.exercise === ExerciseLevel["Light activity"])
      REEMultiplier = 1.375;
    else if (user.exercise === ExerciseLevel["Moderate activity"])
      REEMultiplier = 1.55;
    else if (user.exercise === ExerciseLevel["Very active"])
      REEMultiplier = 1.725;
    return REE * REEMultiplier;
  };

  return (
    <div className="mb-3">
      <div className="container-fluid mb-3">
        <h1 className="text-center">{`${user.name}'s profile`}</h1>
      </div>
      <ul
        className="list-group ms-2"
        style={{ width: "97%", minWidth: "325px" }}
      >
        <div className="d-flex">
          <UserListItemLabel>Name:</UserListItemLabel>
          <UserListItemResults>{user.name}</UserListItemResults>
        </div>
        <div className="d-flex">
          <UserListItemLabel>Sex:</UserListItemLabel>
          <UserListItemResults>{user.sex}</UserListItemResults>
        </div>
        <div className="d-flex">
          <UserListItemLabel>Age:</UserListItemLabel>
          <UserListItemResults>{user.age}</UserListItemResults>
        </div>
        <div className="d-flex">
          <UserListItemLabel>Weight:</UserListItemLabel>
          <UserListItemResults style={{ display: "flex" }}>
            {weightUnitInKg
              ? `${(user.weight * 0.45359237).toFixed(2)} kg`
              : `${user.weight} lbs`}
            <div className="form-check mx-2">
              <input
                type="checkbox"
                className="form-check-input"
                value=""
                id="weightUnit"
                onClick={(event) =>
                  switchWeightUnit(event.currentTarget.checked)
                }
              />
              <label htmlFor="weightUnit" className="form-check-label">
                kg
              </label>
            </div>
          </UserListItemResults>
        </div>
        <div className="d-flex">
          <UserListItemLabel>Height:</UserListItemLabel>
          <UserListItemResults style={{ display: "flex" }}>
            {heightUnitInCm
              ? `${inchesToCm().toFixed(2)} cm`
              : `${extractFeetAndInches().feet}'${
                  extractFeetAndInches().inches
                }''`}
            <div className="form-check mx-2">
              <input
                type="checkbox"
                className="form-check-input"
                value=""
                id="heightUnit"
                onClick={(event) =>
                  switchHeighUnit(event.currentTarget.checked)
                }
              />
              <label htmlFor="heightUnit" className="form-check-label">
                cm
              </label>
            </div>
          </UserListItemResults>
        </div>
        <div className="d-flex">
          <UserListItemLabel>Exercise Level:</UserListItemLabel>
          <UserListItemResults>
            {ExerciseLevel[user.exercise]}
          </UserListItemResults>
        </div>
        <div className="d-flex">
          <UserListItemLabel>Calories:</UserListItemLabel>
          <UserListItemResults>
            {calculateTDEE().toFixed(2)} kcal/day
          </UserListItemResults>
        </div>
      </ul>
    </div>
  );
};

export default List;
