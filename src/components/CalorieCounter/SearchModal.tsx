import { useEffect, useRef } from "react";
import searchIcon from "../../assets/search.svg";
import * as bootstrap from "bootstrap";
import { ShortFDCFoodData } from "../../Data/FDCData";
import { extractNutritionalValue } from "../../Data/ExtractMacroNutrients";

interface SearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: () => void;
  availableOptions: ShortFDCFoodData[];
  setAvailableOptions: () => void;
  lookedUpFoodList: ShortFDCFoodData[];
  setLookedUpList: (list: ShortFDCFoodData[]) => void;
  setFoodTracker: () => void;
}

const SearchModal = ({
  showSearchModal,
  setShowSearchModal,
  availableOptions,
  setAvailableOptions,
  lookedUpFoodList,
  setLookedUpList,
  setFoodTracker,
}: SearchModalProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchModalEventListener = document.getElementById("searchModal");
    searchModalEventListener?.addEventListener("shown.bs.modal", () => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    });
    searchModalEventListener?.addEventListener("hide.bs.modal", () => {
      setShowSearchModal();
    });
  }, []);

  useEffect(() => {
    const searchModal = new bootstrap.Modal("#searchModal");

    if (showSearchModal) searchModal.show();
  }, [showSearchModal]);

  const handleToggle = (foodItem: ShortFDCFoodData) => {
    if (lookedUpFoodList.includes(foodItem)) {
      setLookedUpList(lookedUpFoodList.filter((item) => item !== foodItem));
    } else {
      setLookedUpList([...lookedUpFoodList, foodItem]);
    }
  };

  const workableNutrients = extractNutritionalValue(availableOptions);

  return (
    <div>
      <div className="modal fade" id="searchModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <div style={{ display: "contents" }}>
                <form>
                  <input
                    ref={searchRef}
                    type="text"
                    className="form-control"
                    placeholder="Search Food"
                    style={{
                      borderRadius:
                        "var(--bs-border-radius) 0 0 var(--bs-border-radius)",
                    }}
                  />
                </form>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    backgroundImage: `url(${searchIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius:
                      "0 var(--bs-border-radius) var(--bs-border-radius) 0",
                    aspectRatio: "1/1",
                    alignSelf: "stretch",
                  }}
                ></button>
              </div>
            </div>
            <div className="modal-body">
              <div
                className="container overflow-auto"
                style={{ maxHeight: "250px" }}
              >
                {availableOptions.map((foodItem, index) => {
                  return (
                    <div
                      className="row border-bottom"
                      onClick={() => handleToggle(foodItem)}
                      key={foodItem.fdcId}
                      style={{
                        background: `${
                          lookedUpFoodList.includes(foodItem)
                            ? "aquamarine"
                            : "white"
                        }`,
                      }}
                    >
                      <div className="col">{foodItem.description}</div>
                      <div className="col">
                        {`Serving: ${workableNutrients[
                          index
                        ].servingSize.toFixed(2)} g`}
                      </div>
                      <div className="col">
                        {`Calories: ${workableNutrients[index].calories.toFixed(
                          2
                        )} kcal`}
                      </div>
                      <div className="col">
                        {`Protein: ${workableNutrients[index].protein.toFixed(
                          2
                        )} g`}
                      </div>
                      <div className="col">
                        {`Fat: ${workableNutrients[index].fat.toFixed(2)} g`}
                      </div>
                      <div className="col">
                        {`Carbs: ${workableNutrients[index].carbs.toFixed(
                          2
                        )} g`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              {" "}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setFoodTracker()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
