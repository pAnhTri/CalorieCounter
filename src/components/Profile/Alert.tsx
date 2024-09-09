import { useEffect } from "react";
import styled from "styled-components";

interface ProfileAlertProps {
  timeOutAlert: boolean;
  dismissAlert: () => void;
}

// Styles
const UpperRightSuccessAlert = styled.div.attrs(() => ({
  className: "alert alert-success alert-dismissible fade show",
}))`
  display: inline-block;
  float: right;
  height: 50px;
  line-height: 16.4px;
  width: 290px;
`;

const Alert = ({ timeOutAlert, dismissAlert }: ProfileAlertProps) => {
  useEffect(() => {
    if (timeOutAlert) {
      const dismissTimeout = setTimeout(() => {
        dismissAlert();
      }, 5000);

      return () => {
        clearTimeout(dismissTimeout);
      };
    }
  }, [timeOutAlert]);

  return (
    <div>
      <UpperRightSuccessAlert role="alert">
        <p
          style={{
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Profile updated successfully.
        </p>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </UpperRightSuccessAlert>
    </div>
  );
};

export default Alert;
