import { useEffect } from "react";
import * as bootstrap from "bootstrap";

interface SearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: () => void;
}

const SearchModal = ({
  showSearchModal,
  setShowSearchModal,
}: SearchModalProps) => {
  useEffect(() => {
    const searchModalEventListener = document.getElementById("searchModal");
    searchModalEventListener?.addEventListener("hidden.bs.modal", () => {
      setShowSearchModal();
    });
  }, []);

  useEffect(() => {
    const searchModal = new bootstrap.Modal("#searchModal");

    if (showSearchModal) searchModal.show();
  }, [showSearchModal]);

  return (
    <div>
      <div className="modal fade" id="searchModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="searchModalLabel">
                Search Food
              </h1>
              <button
                className="btn btn-close"
                type="button"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">Body</div>
            <div className="modal-footer">
              {" "}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
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
