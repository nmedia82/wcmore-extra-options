function PriceDisplay({ CartData, Hello }) {
  {
    console.log(CartData);
  }
  return (
    <div className="wcforce-price-display">
      <header>Price</header>
      {CartData.map((cart) => {})}
    </div>
  );
}

export default PriceDisplay;
