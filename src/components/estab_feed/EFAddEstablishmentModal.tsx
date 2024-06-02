import React, { useState } from "react";

import { FaCheckCircle } from "react-icons/fa";

export function EFAddEstablishmentModal() {
  const [submitComplete, setSubmitComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {
      name: "",
      location: "",
      description: "",
    };
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      //@TODO: implement create establishment
      setSubmitComplete(true); // kunware lang na-submit na
    }
  };

  return (
    <dialog className="modal" id="addEstablishmentModal">
      <div className="modal-box bg-base-100 p-0">
        <div className="sticky top-0 z-50 flex flex-row justify-between bg-base-100 px-6 pb-3 pt-6 shadow-lg">
          <h2 className="text-left text-2xl font-bold">
            Add New Establishment
          </h2>
          <form method="dialog">
            <button className="btn btn-neutral h-max min-h-0 p-3 text-white">
              Close
            </button>
          </form>
        </div>
        {/* Form Inputs */}
        <div
          className={"card-body gap-4 pt-6 " + (submitComplete ? "hidden" : "")}
        >
          <div className="flex flex-col gap-1">
            <input
              name="name"
              className="input input-bordered w-full text-left"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-red-500 ml-2">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              name="location"
              className="input input-bordered w-full"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <span className="text-red-500 ml-2">{errors.location}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              name="description"
              className="input input-bordered w-full resize-y pt-2"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-500 ml-2">{errors.description}</span>
            )}
          </div>

          <button onClick={handleSubmit} className="btn btn-primary w-full">
            Submit
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
            <FaCheckCircle className="mb-4 text-6xl text-primary" />
            <span className="text-xl font-bold text-primary">
              Submission complete!
            </span>
            <span className="text-lg font-normal">
              Your establishment has been added successfully.
            </span>
          </div>
          <form className="flex w-1/2" method="dialog">
            <button
              onClick={() => {
                location.reload();
              }}
              className="btn btn-primary w-full text-white"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
