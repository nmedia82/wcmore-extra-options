import React from "react";
import { Table } from "react-bootstrap"; // Ensure you have react-bootstrap installed

function PriceDisplay({ CartPrices }) {
  // Helper function to calculate total price
  const getOptionTotal = () => {
    return Object.values(CartPrices)
      .flat()
      .reduce((total, item) => {
        return total + parseFloat(item.price);
      }, 0);
  };

  const getTotal = () => {
    return parseFloat(window.wcforce_product_price) + getOptionTotal();
  };

  return (
    <div className="wcforce-price-display">
      <header>Price Details</header>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Options</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(CartPrices).map(([fieldId, items]) =>
            items.map((item, index) => (
              <tr key={`${fieldId}-${index}`}>
                <td>{item.label}</td>
                <td>${item.price}</td>
              </tr>
            ))
          )}
          <tr>
            <th colSpan="1">Options Total</th>
            <th>${getOptionTotal().toFixed(2)}</th>
          </tr>
          <tr>
            <td>{window.wcforce_product_title}</td>
            <td>{parseFloat(window.wcforce_product_price)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="1">Total</td>
            <td>${getTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default PriceDisplay;
