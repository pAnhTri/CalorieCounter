import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import DiaryForm from "./components/Diary/Form";
import ProfileForm from "./components/Profile/Form";
import UserData from "./Data/User";
import List from "./components/Profile/List";
import ActivePage from "./Data/ActivePage";
import ProfileAlert from "./components/Profile/Alert";
import DoughnutChart from "./components/CalorieCounter/DoughnutChart";
import Progress from "./components/CalorieCounter/Progress";
import { calculateTDEE } from "./Data/CalculateTDEE";
import CalorieControlButtons from "./components/CalorieCounter/CalorieControlButtons";
import CalorieControlForm from "./components/CalorieCounter/CalorieControlForm";
import axios from "axios";
import AddFoodForm from "./components/CalorieCounter/AddFoodForm";

function App() {
  // Set the state for the page
  const [activePage, setActivePage] = useState(ActivePage[0]);

  const switchActivePage = (page: string) => {
    setActivePage(page);
  };

  // User configurations
  const [user, setUser] = useState<UserData>(() => {
    const userProfileStorage = localStorage.getItem("userProfile");
    let userProfile: UserData;
    userProfile = userProfileStorage
      ? JSON.parse(userProfileStorage)
      : undefined;
    return userProfile;
  });

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
  };

  const userTDDE = calculateTDEE(user);

  //Initial ratio
  /*
   * Protein: 20% -> 1g = 4kcal
   * Fat: 20% -> 1g = 9kcal
   * Carbs: 60% -> 1g = 4kcal
   */
  const userMacro = {
    protein: 0.2,
    fat: 0.2,
    carbs: 0.6,
    tdde: userTDDE,
    goal: userTDDE,
  };

  const [userDefinedMacros, setUserDefinedMacros] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    let macros: typeof userMacro = savedMacros
      ? JSON.parse(savedMacros)
      : userMacro;
    return macros;
  });
  const [userDefinedProtein, setUserDefinedProtein] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    if (savedMacros) {
      return JSON.parse(savedMacros).protein;
    } else {
      return 0.2;
    }
  });
  const [userDefinedFat, setUserDefinedFat] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    if (savedMacros) {
      return JSON.parse(savedMacros).fat;
    } else {
      return 0.2;
    }
  });
  const [userDefinedCarbs, setUserDefinedCarbs] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    if (savedMacros) {
      return JSON.parse(savedMacros).carbs;
    } else {
      return 0.6;
    }
  });

  const [isWeightInKg, setIsWeightInKg] = useState(false);
  const [isHeightInCm, setIsHeightInCm] = useState(false);

  // Profile User Form
  const [showUserForm, setShowUserForm] = useState(false);

  // Alert
  const [showSuccessfulUpdateAlert, setShowSuccessfulUpdateAlert] =
    useState(false);

  // Doughnut Chart
  const [chartOptions, setChartOptions] = useState();
  const [showMacroControl, setShowMacroControl] = useState(false);

  // Add Food
  const options = ["Aaa", "Bbb", "CCC", "Dda", "Ddb", "Abc", "asd", "Awq"];
  const [showAutoCompleteForm, setShowAutoCompleteForm] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<string[]>(options);

  // Deafult to profile page if there is no user yet
  useEffect(() => {
    if (!user) {
      setActivePage(ActivePage[1]);
    }
  }, []);

  return (
    <>
      <NavBar
        activePage={activePage}
        switchActivePage={switchActivePage}
      ></NavBar>

      {showSuccessfulUpdateAlert && (
        <ProfileAlert
          timeOutAlert={showSuccessfulUpdateAlert}
          dismissAlert={() => setShowSuccessfulUpdateAlert(false)}
        ></ProfileAlert>
      )}

      {user && activePage === ActivePage[0] && (
        <div>
          <DoughnutChart
            doughnutOptions={chartOptions}
            setDoughnutOptions={(options: any) => {
              setChartOptions(options);
            }}
            userMacros={userDefinedMacros}
          ></DoughnutChart>
          <Progress userGoals={userDefinedMacros}></Progress>
          <CalorieControlButtons
            userMacros={userDefinedMacros}
            updateUserDefinedGoals={(deltaMacro: number) => {
              setUserDefinedMacros({
                ...userDefinedMacros,
                goal: userDefinedMacros.tdde + deltaMacro,
              });
            }}
            switchShowMacroControls={() =>
              setShowMacroControl(!showMacroControl)
            }
          ></CalorieControlButtons>
          {showMacroControl && (
            <CalorieControlForm
              userMacros={userDefinedMacros}
              updateUserTDDE={(macroGoal: typeof userMacro) => {
                setUserDefinedMacros(macroGoal);
              }}
              userProtein={userDefinedProtein}
              updateUserProtein={(protein: number) =>
                setUserDefinedProtein(protein)
              }
              userCarbs={userDefinedCarbs}
              updateUserCarbs={(carbs: number) => setUserDefinedCarbs(carbs)}
              userFat={userDefinedFat}
              updateUserFat={(fat: number) => setUserDefinedFat(fat)}
              showMacroControl={showMacroControl}
            ></CalorieControlForm>
          )}
          <AddFoodForm
            showAutoCompleteForm={showAutoCompleteForm}
            setShowAutoCompleteForm={(show: boolean) =>
              setShowAutoCompleteForm(show)
            }
            availableOptions={availableOptions}
            setAvailableOptions={() => {}}
          ></AddFoodForm>
        </div>
      )}

      {activePage === ActivePage[2] && <DiaryForm></DiaryForm>}

      {activePage === ActivePage[1] && (
        <>
          {user && !showUserForm && (
            <>
              <List
                user={user}
                weightUnitInKg={isWeightInKg}
                switchWeightUnit={(useKg) => setIsWeightInKg(useKg)}
                heightUnitInCm={isHeightInCm}
                switchHeighUnit={(useCm) => setIsHeightInCm(useCm)}
              ></List>
            </>
          )}
          <ProfileForm
            showUserForm={showUserForm}
            switchShowUserForm={() => setShowUserForm(!showUserForm)}
            updateUser={updateUser}
            user={user}
            showSuccessfulProfileAlert={() => {
              setShowSuccessfulUpdateAlert(true);
            }}
          >
            {user ? "Update User" : "Add User"}
          </ProfileForm>
        </>
      )}
    </>
  );
}

export default App;
