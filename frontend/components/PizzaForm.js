import React from 'react';
import { useCreatePizzaMutation } from '../state/pizzaApi';
import { useReducer } from 'react';

const initialFormState = {
  fullName: '',
  size: '',
  toppings: [], // Array to store selected topping IDs
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FULL_NAME':
      return { ...state, fullName: action.payload };
    case 'SET_SIZE':
      return { ...state, size: action.payload };
    case 'SET_TOPPING': {
      const toppingId = action.payload;
      const toppingsSet = new Set(state.toppings);

      if (toppingsSet.has(toppingId)) {
        toppingsSet.delete(toppingId);
      } else {
        toppingsSet.add(toppingId);
      }

      return {
        ...state,
        toppings: Array.from(toppingsSet),
      };
    }
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};


export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [createPizza] = useCreatePizzaMutation();

  const onNameChange = ({ target: { value } }) => {
    dispatch({ type: 'SET_FULL_NAME', payload: value });
  };

  const onSizeChange = ({ target: { value } }) => {
    dispatch({ type: 'SET_SIZE', payload: value });
  };

  const onToppingChange = (e) => {
    const toppingId = parseInt(e.target.value, 10);
    dispatch({ type: 'SET_TOPPING', payload: toppingId });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, toppings } = state;
    createPizza({ fullName, size, toppings });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onNameChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            onChange={onSizeChange}
            value={state.size}
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
            name="Pepperoni"
            type="checkbox"
            value="1"
            onChange={onToppingChange}
            checked={state.toppings.includes(1)}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="Green Peppers"
            type="checkbox"
            value="2"
            onChange={onToppingChange}
            checked={state.toppings.includes(2)}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="Pineapple"
            type="checkbox"
            value="3"
            onChange={onToppingChange}
            checked={state.toppings.includes(3)}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="Mushrooms"
            type="checkbox"
            value="4"
            onChange={onToppingChange}
            checked={state.toppings.includes(4)}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="Ham"
            type="checkbox"
            value="5"
            onChange={onToppingChange}
            checked={state.toppings.includes(5)}
          />
          Ham<br />
        </label>
      </div>

      <input data-testid="submit" type="submit" value="Submit" />
    </form>
  );
}
