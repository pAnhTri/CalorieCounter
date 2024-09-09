import { useEffect, useRef } from "react";
import searchIcon from "../../assets/search.svg";

interface ShortFDCFoodData {
  fdcId: number;
  description: string;
}

interface FDCNutrients {
  number: number;
  name: string;
  amount: number;
  unitName: string;
  derivationCode?: string;
  derivationDescription?: string;
}

interface FDCFoodData {
  dataType: string;
  description: string;
  fdcId: number;
  foodNutrients: FDCNutrients[];
  publicationDate?: string;
  brandOwner?: string;
  gtinUpc?: string;
  ndbNumber?: number;
  foodCode?: string;
}

interface AddFoodFormProps {
  showAutoCompleteForm: boolean;
  setShowAutoCompleteForm: (show: boolean) => void;
  availableOptions: string[];
  setAvailableOptions: () => void;
}

const AddFoodForm = ({
  showAutoCompleteForm,
  setShowAutoCompleteForm,
  availableOptions,
  setAvailableOptions,
}: AddFoodFormProps) => {
  const searchRef = useRef(null);
  const autofillRef = useRef(null);
  const autocompleteBoxRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside the component
    if (searchRef.current) {
      const searchComponent: any = searchRef.current;

      if (!searchComponent.contains(event.target as Node)) {
        setShowAutoCompleteForm(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (autocompleteBoxRef.current) {
      const autocompleteBox: HTMLDivElement = autocompleteBoxRef.current;
      autocompleteBox.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAutoCompleteForm]);

  return (
    <div>
      <form>
        <label className="form-label" htmlFor="autoCompleteSearch"></label>
        <div
          ref={searchRef}
          style={{
            maxWidth: "236.7px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                maxWidth: "200px",
              }}
            >
              <input
                ref={autofillRef}
                onClick={() => {
                  setShowAutoCompleteForm(true);
                }}
                className="form-control"
                style={{
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
                id="autoCompleteSearch"
                type="text"
              />
            </div>
            <button
              onClick={() => {}}
              type="button"
              className="btn btn-primary"
              style={{
                backgroundImage: `url(${searchIcon})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                width: "37.6px",
                height: "37.6px",
              }}
            ></button>
          </div>
          {showAutoCompleteForm && (
            <div
              ref={autocompleteBoxRef}
              className="overflow-auto"
              style={{ maxHeight: "calc(25.6px * 3)", maxWidth: "200px" }}
            >
              {availableOptions.map((value) => {
                return (
                  <div
                    key={value}
                    onClick={(event) => {
                      event.currentTarget.style.background =
                        event.currentTarget.style.background === "blue"
                          ? "white"
                          : "blue";
                      if (autofillRef.current) {
                        const autoFillSearch: HTMLInputElement =
                          autofillRef.current;
                        autoFillSearch.value =
                          event.currentTarget.textContent ?? "";
                      }
                    }}
                    style={{ border: "1px solid" }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddFoodForm;
