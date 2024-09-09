import React from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExerciseLevel from "../../Data/ExerciseLevel";
import { FieldValues, useForm } from "react-hook-form";
import UserData from "../../Data/User";
import styled from "styled-components";

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters." }),
  sex: z.enum(["Male", "Female"]),
  age: z
    .number({ invalid_type_error: "Age is required." })
    .min(18, { message: "Must be older than 18 years old" }),
  weight: z.number({ invalid_type_error: "Weight is required." }),
  height: z.string().regex(/^\d'\d{1,2}(''||")$/, {
    message: "Height is required in ft'in''.",
  }),
  exercise: z.nativeEnum(ExerciseLevel),
});

type userData = z.infer<typeof userSchema>;

interface FormProps {
  children: string;
  showUserForm: boolean;
  switchShowUserForm: () => void;
  updateUser: (user: UserData) => void;
  user?: UserData;
  showSuccessfulProfileAlert: () => void;
}

// Styles
const UserFormLabel = styled.label.attrs(() => ({ className: "ms-2" }))`
  background: #33b4ff;
  border: #4a3bcc solid 2px;
  border-radius: 20px 0px 0px 20px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 0px;
  flex: 0 0 120px;
`;

const UserFormInput = styled.input.attrs(() => ({ className: "form-control" }))`
  border: #e2e5e9 solid 1px;
  border-radius: 0px 20px 20px 0px;
  flex: 1;
  padding: 5px;
`;

const UserFormSelect = styled(UserFormInput).attrs(() => ({
  as: "select",
  className: "form-select",
}))``;

const Form = ({
  children,
  showUserForm,
  switchShowUserForm,
  updateUser,
  user,
  showSuccessfulProfileAlert,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<userData>({
    defaultValues: { ...user, sex: user?.sex as "Male" | "Female" | undefined },
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FieldValues) => {
    updateUser(data as UserData);
    localStorage.setItem("userProfile", JSON.stringify(data as UserData));
    reset(data);
    switchShowUserForm();
    showSuccessfulProfileAlert();
  };

  const nameJSXElement = (
    <>
      <div className="d-flex">
        <UserFormLabel htmlFor="name">Name:</UserFormLabel>
        <UserFormInput {...register("name")} id="name" type="text" />
      </div>
      <div className="mx-2">
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
    </>
  );

  const sexJSXElement = (
    <>
      <div className="d-flex">
        <UserFormLabel htmlFor="sex">Sex:</UserFormLabel>
        <UserFormSelect {...register("sex")} id="sex">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </UserFormSelect>
      </div>
      <div className="mx-2">
        {errors.sex && <p className="text-danger">{errors.sex.message}</p>}
      </div>
    </>
  );

  const ageJSXElement = (
    <>
      <div className="d-flex">
        <UserFormLabel htmlFor="age">Age:</UserFormLabel>
        <UserFormInput
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
        />
      </div>
      <div className="mx-2">
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
    </>
  );

  const weightJSXElement = (
    <>
      <div className="d-flex">
        <UserFormLabel htmlFor="weight">Weight:</UserFormLabel>
        <UserFormInput
          {...register("weight", { valueAsNumber: true })}
          id="weight"
          type="number"
        />
      </div>
      <div className="mx-2">
        {errors.weight && (
          <p className="text-danger">{errors.weight.message}</p>
        )}
      </div>
    </>
  );

  const heightJSXElement = (
    <>
      <div className="d-flex">
        <UserFormLabel htmlFor="height">Height:</UserFormLabel>
        <UserFormInput {...register("height")} id="height" type="text" />
      </div>
      <div className="mx-2">
        {errors.height && (
          <p className="text-danger">{errors.height.message}</p>
        )}
      </div>
    </>
  );

  const exerciseJSXElement = (
    <>
      <div className="d-flex mb-2">
        <UserFormLabel htmlFor="exercise" style={{ whiteSpace: "nowrap" }}>
          Exercise Level:
        </UserFormLabel>
        <UserFormSelect
          {...register("exercise", { valueAsNumber: true })}
          id="exercise"
        >
          {Object.keys(ExerciseLevel)
            .filter((value) => isNaN(Number(value)))
            .map((key) => (
              <option
                key={ExerciseLevel[key as keyof typeof ExerciseLevel]}
                value={ExerciseLevel[key as keyof typeof ExerciseLevel]}
              >
                {key}
              </option>
            ))}
        </UserFormSelect>
      </div>
      <div className="mx-2">
        {errors.exercise && (
          <p className="text-danger">{errors.exercise.message}</p>
        )}
      </div>
    </>
  );

  return (
    <>
      {showUserForm ? (
        <div style={{ width: "97%", minWidth: "325px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {nameJSXElement}
            {sexJSXElement}
            {ageJSXElement}
            {weightJSXElement}
            {heightJSXElement}
            {exerciseJSXElement}
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary mx-2"
                disabled={!isValid}
              >
                Save User
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => reset()}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: "table", margin: "0 auto" }}>
          <button className="btn btn-primary" onClick={switchShowUserForm}>
            {children}
          </button>
        </div>
      )}
    </>
  );
};

export default Form;
