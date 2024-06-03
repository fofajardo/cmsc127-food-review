import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FoodEstablishment } from "../../../models/_models";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrls } from "../../apiHelper.ts"; 

export function EDeleteModal({
  establishment,
}: {
  establishment: FoodEstablishment;
}) {
  const [submitComplete, setSubmitComplete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    //@TODO: implement deletion of establishment
    const establishmentId = establishment.id.toString();
    axios.delete(apiUrls.foodEstablishments(establishmentId));
    setSubmitComplete(true); // simulate successful submission
  };

  return (
    <dialog className="modal" id="deleteEstablishmentModal">
      <div className="modal-box bg-base-100 p-0">
        <div className="sticky top-0 z-50 flex flex-row justify-between bg-base-100 px-6 pb-3 pt-6 shadow-lg">
          <h2 className="text-left text-2xl font-bold">Confirm Deletion</h2>
          <form method="dialog">
            <button
              className={
                "btn btn-neutral h-max min-h-0 p-3 text-white " +
                (submitComplete ? "hidden" : "")
              }
            >
              Cancel
            </button>
          </form>
        </div>
        <div
          className={"card-body gap-4 pt-6 " + (submitComplete ? "hidden" : "")}
        >
          <p>
            Are you sure you want to delete{" "}
            <span className="font-bold">{establishment.name}</span> ?
          </p>
          <button
            onClick={handleSubmit}
            className="btn btn-error w-full text-white"
          >
            Delete
          </button>
        </div>
        {/* Success Indicator */}
        <div
          className={
            "mt-1 flex flex-col items-center justify-center gap-8 rounded-full border-0 p-8 " +
            (submitComplete ? "" : " hidden")
          }
        >
          <div className="flex flex-col items-center">
            <FaCheckCircle className="mb-4 text-6xl text-error" />
            <span className="text-xl font-bold text-error">
              Deleted successfully!
            </span>
            <span className="text-lg font-normal">
              {establishment.name} removed permanently from the database.
            </span>
          </div>
          <form className="flex w-1/2" method="dialog">
            <button
              onClick={() => {
                navigate("/feed");
              }}
              className="btn btn-error w-full text-white"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
