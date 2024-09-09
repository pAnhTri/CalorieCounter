import React from "react";

interface NavBarProps {
  activePage: string;
  switchActivePage: (page: string) => void;
}

const NavBar = ({ activePage, switchActivePage }: NavBarProps) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary mb-3"
        style={{ position: "sticky", top: "0" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            onClick={() => {
              switchActivePage("Calorie Counter");
            }}
          >
            CalorieCounter
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#calorieNav"
            aria-controls="calorieNav"
            aria-expanded="false"
            aria-label="Toogle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="calorieNav">
            <div className="navbar-nav">
              <a
                className={
                  activePage === "Profile" ? "nav-link active" : "nav-link"
                }
                href="#"
                onClick={(event) => {
                  switchActivePage(event.currentTarget.text);
                }}
              >
                Profile
              </a>
              <a
                className={
                  activePage === "Diary" ? "nav-link active" : "nav-link"
                }
                href="#"
                onClick={(event) => {
                  switchActivePage(event.currentTarget.text);
                }}
              >
                Diary
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
