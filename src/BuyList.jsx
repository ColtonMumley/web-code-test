import { useEffect, useState } from 'react';
import BuyListItem from "./BuyListItem";

const BuyList = (props) => {

  const [itemList, setItemList] = useState([]);
  const [priceTable, setPriceTable] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Get price of item from BuyListItem when user changes quantity
  const getPriceData = (price, itemNumber) => {
    // Update priceTable with the new price
    setPriceTable(prevPriceTable => {
      let newPriceTable = prevPriceTable;
      newPriceTable[itemNumber] = price;

      return newPriceTable
    })

    // Calculate new totalPrice
    let newTotalPrice = 0;
    for (let itemNumber in priceTable) {
      newTotalPrice += priceTable[itemNumber];
    }
  
    setTotalPrice(newTotalPrice);
  }

  // Remove item from list and subtract corresponding price from total
  const removeItem = (itemNumber) => {
      const filteredList = itemList.filter(item => item.itemNumber !== itemNumber);
      setItemList(filteredList);

      setPriceTable(prevPriceTable => {
        let newPriceTable = prevPriceTable;
        delete newPriceTable[itemNumber];  
        return newPriceTable
      });
  }

  // Add item to buy list when the user clicks a new item
  useEffect(() => {
    // Prevent user from adding same item twice
    function isItemInList(potentialItem) {
      for (let itemNumber in priceTable) {
        if (itemNumber === potentialItem.itemNumber) {
          return true;
        }
      }
      
      return false;
    }
    
    // Add new item if it is not already in the list
    if (props.item && !isItemInList(props.item)) {
      setItemList(prevItemList => [...prevItemList, props.item]);
      
      setPriceTable(prevPriceTable => {
        let newPriceTable = prevPriceTable;
        newPriceTable[props.item.itemNumber] = props.item.price;
  
        return newPriceTable;
      });
    }

    
  }, [props.item])

  // Calculate total price when an item is added or removed
  useEffect(() => {
    let newTotal = 0;
    for (let itemNumber in priceTable) {
      newTotal += priceTable[itemNumber];
    }
    setTotalPrice(newTotal);
  }, [itemList])
  
  // Send total price to App.js
  useEffect(() => {
    props.sendTotalPrice(totalPrice);
  }, [totalPrice])

  return (
  <div className="mt-4">
    <h1 className="font-semibold text-2xl">Buy List</h1>

    <div className="border border-gray-200 p-4 rounded shadow mt-2 grid grid-cols-1 gap-y-4">
      {itemList.map(item => <BuyListItem item={item} key={item.itemNumber} handleDelete={removeItem} sendPriceData={getPriceData}/>)}
    </div>
  </div>
)};

export default BuyList;