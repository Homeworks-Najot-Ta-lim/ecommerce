import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import { Plus, Minus, X } from "lucide-react";




const CartItem = ({ item }) => {
  const {dispatch} = useCart()
  const { id, title, image, price, count } = item;

  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>

        <Link to={`/product/${id}`}>
          <img className='max-w-[80px]' src={image} alt='' />
        </Link>
        <div className='w-full flex flex-col'>
      
          <div className='flex justify-between mb-2'>
        
            <Link
              to={`/product/${id}`}
              className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            >
              {title}
            </Link>
            <div
  
              className='text-xl cursor-pointer'
            >
              <X className='text-gray-500 hover:text-red-500 transition' />
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px] text-sm'>
            {/* quantity */}
            <div className='flex flex-1 max-w-[100px] px-1 items-center h-full border text-primary font-medium'>
              <div
                // onClick={()=>decreaseAmount(id)}
                className='h-full flex-1 flex justify-center items-center cursor-pointer'
              >
                <Plus className='w-4' onClick={()=>dispatch({type: "INCREASE_ITEM_COUNT", id})}/>
              </div>
              <div className='h-full flex justify-center items-center px-2'>
                {count}
              </div>
              <div
                // onClick={()=>increaseAmount(id)}
                className='h-full flex flex-1 justify-center items-center cursor-pointer'
              >
                <Minus className="w-4 disabled:opacity-1" onClick={()=>dispatch({type: "DECREASE_ITEM_COUNT", id})} disabled={count===1}/>
              </div>
            </div>
            {/* item price */}
            <div className='flex flex-1 justify-around items-center'>
              $ {price}
            </div>
            {/* final price */}
            <div className='flex flex-1 justify-end items-center text-primary font-medium'>{`$ ${parseFloat(
              price * count
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;