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
import AddFoodForm from "./components/CalorieCounter/AddFoodForm";
import { ShortFDCFoodData } from "./Data/FDCData";
import SearchModal from "./components/CalorieCounter/SearchModal";

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

  const userMacro = {
    protein: 0.2,
    fat: 0.2,
    carbs: 0.6,
    tdde: 0,
    goal: 0,
  };

  useEffect(() => {
    const userTDDE = user ? calculateTDEE(user) : 0;
    setUserDefinedMacros({
      ...userDefinedMacros,
      tdde: userTDDE,
      goal: userTDDE,
    });
  }, [user]);

  //Initial ratio
  /*
   * Protein: 20% -> 1g = 4kcal
   * Fat: 20% -> 1g = 9kcal
   * Carbs: 60% -> 1g = 4kcal
   */

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
  const foodTrackerTest: ShortFDCFoodData[] = [
    {
      description: "Salmon",
      fdcId: 0,
      foodNutrients: [
        {
          number: "203",
          name: "Protein",
          amount: 14.8,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "204",
          name: "Total lipid (fat)",
          amount: 12.1,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "205",
          name: "Carbohydrate, by difference",
          amount: 10.2,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "208",
          name: "Energy",
          amount: 209,
          unitName: "KCAL",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
      ],
    },
    {
      description: "Tofu",
      fdcId: 4,
      foodNutrients: [
        {
          number: "203",
          name: "Protein",
          amount: 14.8,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "204",
          name: "Total lipid (fat)",
          amount: 12.1,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "205",
          name: "Carbohydrate, by difference",
          amount: 10.2,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "208",
          name: "Energy",
          amount: 214,
          unitName: "KCAL",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
      ],
    },
    {
      description: "Kimchi",
      fdcId: 5,
      foodNutrients: [
        {
          number: "203",
          name: "Protein",
          amount: 14.8,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "204",
          name: "Total lipid (fat)",
          amount: 12.1,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "205",
          name: "Carbohydrate, by difference",
          amount: 10.2,
          unitName: "G",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
        {
          number: "208",
          name: "Energy",
          amount: 216,
          unitName: "KCAL",
          derivationCode: "LCGA",
          derivationDescription:
            "Given by information provider as an approximate value per 100 unit measure",
        },
      ],
    },
  ];

  const [availableOptions, setAvailableOptions] =
    useState<ShortFDCFoodData[]>(foodTrackerTest);

  // Search Modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [foodTracker, setFoodTracker] = useState<ShortFDCFoodData[]>([]);
  const [lookedUpFoodList, setLookedUpList] = useState<ShortFDCFoodData[]>([]);

  const addItemsToFoodTracker = () => {
    const mergedList = [...new Set([...foodTracker, ...lookedUpFoodList])];
    setFoodTracker(mergedList);
  };

  const initialProgress = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  };

  const [macroProgress, setMacroProgress] = useState(initialProgress);

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
          <Progress
            userGoals={userDefinedMacros}
            macroProgress={macroProgress}
          ></Progress>
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
            setShowSearchModal={() => {
              setShowSearchModal(true);
            }}
            foodTracker={foodTracker}
            setFoodTracker={setFoodTracker}
            setLookedUpList={setLookedUpList}
            setMacroProgress={(progress: typeof macroProgress) => {
              setMacroProgress(progress);
            }}
          ></AddFoodForm>
          <SearchModal
            showSearchModal={showSearchModal}
            setShowSearchModal={() => {
              setShowSearchModal(false);
            }}
            availableOptions={availableOptions}
            setAvailableOptions={() => {}} //WIP
            lookedUpFoodList={lookedUpFoodList}
            setLookedUpList={setLookedUpList}
            foodTracker={foodTracker}
            setFoodTracker={addItemsToFoodTracker}
          ></SearchModal>
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
