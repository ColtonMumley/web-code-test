import { useState } from 'react';
import './App.css';
import StockProducts from './StockProducts.jsx';
import BuyList from './BuyList';

function App() {

  const [selectedItem, setSelectedItem] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const getSelectedItem = (newItem) => {
    setSelectedItem(newItem);
  }

  const getTotalPrice = (totalPrice) => {
    setTotalPrice(totalPrice);
  }

  return (
    <div className="p-10 m-auto bg-blue-50 min-h-screen">
      <div className="border border-gray-300 rounded-lg w-full bg-white p-10 shadow-lg">
        <h1 className="m-0 p-0 text-2xl font-semibold">Restaurant Order System</h1>
        <hr className="my-3 border border-0 border-t-1 border-gray-200" />
        Select products below to add to the ordering guide

        <StockProducts sendSelectedItem={getSelectedItem} />

        <BuyList item={selectedItem} sendTotalPrice={getTotalPrice}/>

        <div className="text-right font-semibold text-lg mt-4">
          Total:
          <span className="text-xl ml-2">${Number(totalPrice).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
