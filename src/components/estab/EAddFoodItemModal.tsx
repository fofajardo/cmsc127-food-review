import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { FoodEstablishment } from "../../../models/FoodEstablishment";
import { apiUrls } from "../../apiHelper";

export function EAddFoodItemModal({
  establishment,
}: {
  establishment: FoodEstablishment;
}) {
  const [submitComplete, setSubmitComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    foodTypes: "",
    foodEstablishmentId: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    foodTypes: "",
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
      price: "",
      foodTypes: "",
    };
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (isNaN(Number(formData.price)))
      newErrors.price = "Price must be a number";
    if (!formData.foodTypes) newErrors.foodTypes = "Food types are required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      formData.foodEstablishmentId = establishment.id.toString();
      let response = await axios.post(apiUrls.foodItems(), formData);
      if (response.data.data) {
        response = await axios.post(apiUrls.foodTypesOfFoodItem(response.data.data), { names: formData.foodTypes });
        if (response.data.data) {
          setSubmitComplete(true);
        }
      }
    }
  };

  return (
    <dialog className="modal" id="addFoodItemModal">
      <div className="modal-box bg-base-100 p-0">
        <div className="sticky top-0 z-50 flex flex-row justify-between bg-base-100 px-6 pb-3 pt-6 shadow-lg">
          <h2 className="text-left text-2xl font-bold">Add Food Item</h2>
          <form method="dialog">
            <button
              className={
                "btn btn-neutral h-max min-h-0 p-3 text-white " +
                (submitComplete ? "hidden" : "")
              }
            >
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
              className="input input-bordered w-full"
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
              name="price"
              className="input input-bordered w-full"
              placeholder="Price"
              value={formData.price}
              type="number"
              min="0"
              onChange={handleChange}
            />
            {errors.price && (
              <span className="text-red-500 ml-2">{errors.price}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              name="foodTypes"
              className="input input-bordered w-full"
              placeholder="Food Types (comma separated)"
              value={formData.foodTypes}
              onChange={handleChange}
            />
            {errors.foodTypes && (
              <span className="text-red-500 ml-2">{errors.foodTypes}</span>
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
            <FaCheckCircle className="mb-4 text-6xl text-success" />
            <span className="text-xl font-bold text-success">
              Submission complete!
            </span>
            <span className="text-lg font-normal">
              Your food item has been added successfully.
            </span>
          </div>
          <form className="flex w-1/2" method="dialog">
            <button
              onClick={() => location.reload()}
              className="btn btn-success w-full text-white"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
