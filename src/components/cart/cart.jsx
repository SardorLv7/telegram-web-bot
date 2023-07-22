import './cart.css';
import Button from '../button/button'
import { totalPrice } from '../units/total-price';

const cart = ({cartItem, onCheckout}) => {
  return (
    <div>
        <div className="cart__container">
            <p>Umumiy narx {' '}{
              totalPrice(cartItem).toLocaleString('en-US',{
                style:'currency',
                currency:'USD',})
            }</p>

            <Button title={`${cartItem.length === 0 ? 'Buyurtma berish' : 'Tolov'}`} type={'checkout'} 
            
            disable ={cartItem.length === 0 ? true : false}
            onClick={onCheckout}
            />
        </div>
    </div>
  );
}

export default cart;
