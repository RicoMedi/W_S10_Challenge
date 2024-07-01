import React, { useReducer } from "react";
import { useCreatePizzaMutation } from "../state/pizzaApi";

const initialFormState = {
  fullName: "",
  size: "",
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "formChange": {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [form, dispatch] = useReducer(reducer, initialFormState);
  const [createPizza, { isLoading, error }] = useCreatePizzaMutation();

  const onChange = (evt) => {
    let { name, value, type, checked } = evt.target;
    let newValues = type === "checkbox" ? checked : value;
    dispatch({ type: "formChange", payload: { name, value: newValues} });
  };

  const onSubmit = evt => {
    evt.preventDefault()
    let { fullName, size, ...toppingsSelection } = form
    let toppings = []
    for (let key in toppingsSelection) {
      if (toppingsSelection[key]) toppings.push(key)
    }
    let requestBody = { fullName, size, toppings }
   createPizza(requestBody)
      .unwrap()
      .then(() => { dispatch({ type: 'RESET_FORM' }) })
      .catch(() => { })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && (
        <div className="failure">Order failed: {error.data.message}</div>
      )}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={form.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            onChange={onChange}
            value={form.size}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            onChange={onChange}
            checked={form['1']}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            onChange={onChange}
            checked={form['2']}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            onChange={onChange}
            checked={form['3']}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            onChange={onChange}
            checked={form['4']}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            onChange={onChange}
            checked={form['5']}
          />
          Ham
          <br />
        </label>
      </div>

      <input data-testid="submit" type="submit" value="Submit" />
    </form>
  );
}
