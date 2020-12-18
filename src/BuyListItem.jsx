import { useEffect, useState } from 'react';

const BuyListItem = (props) => {
    
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(props.item.price);

    useEffect(() => {
        props.sendPriceData(totalPrice, props.item.itemNumber);
    }, [totalPrice])

    return (
    <div className="grid border border-gray-200 gap-x-4 rounded shadow p-4" style={{ gridTemplateColumns: "1fr 10fr 1fr 0fr 1fr 0fr 1fr 0fr"}}>
        <img src={props.item.image} alt={props.item.name} className="p-2 rounded border border-gray-200" />
        <div className="flex flex-col flex-grow justify-center">
          <h3 className="font-semibold text-lg">{props.item.name}</h3>
          <p>
            {props.item.description}
          </p>
        </div>

        <div className="font-semibold text-lg text-red-500 flex items-center justify-end">
          {props.item.price}
        </div>

        <span className="flex items-center font-semibold">x</span>

        <div className="flex items-center justify-center">
          <input type="number" className="border border-gray-300 rounded w-24 text-lg px-2" value={quantity}
                onChange={(event) => {
                    setQuantity(event.target.value)
                    setTotalPrice(event.target.value * props.item.price)
                }} 
                min="1"/>
        </div>

        <span className="flex items-center">=</span>

        <span className="flex items-center font-semibold text-green-500 text-xl">
          {Math.round(totalPrice * 100) / 100}
        </span>

        <div className="flex items-center justify-end">
          <button type="button" className="bg-red-100 hover:bg-red-200 p-1 rounded ml-2"
                  onClick={() => props.handleDelete(props.item.itemNumber)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
)};

export default BuyListItem;