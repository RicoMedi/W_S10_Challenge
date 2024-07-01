import React from "react";
import { useGetPizzasQuery } from "../state/pizzaApi";
import { useSelector, useDispatch } from "react-redux";
import { selectSize, setSize} from "../state/filterSlice";

export default function OrderList() {
  const dispatch = useDispatch();
  const selectedSize = useSelector(selectSize);
  const { data: orders } = useGetPizzasQuery();

  const handleSizeClick = (size) => {
    dispatch(setSize(size));
  }
  const filteredOrders = orders?.filter((order) => {
    return selectedSize === "All" || order.size === selectedSize;
  });

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders?.map((order) => (
          <li key={order.id}>
            <div>
            {order.customer} ordered a size {order.size} with {order.toppings?.length || "no"} topping{order.toppings?.length !== 1 && 's'}

            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          
          const className = `button-filter${size === selectedSize ? " active" : ""}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
