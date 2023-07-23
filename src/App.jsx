import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getData } from './constants/db';
import Card from './components/card/card';
import Cart from './components/cart/cart';


const courses = getData();

const telegram = window.Telegram.WebApp

const App = () =>{
  const [cartItem, setCartItem] = useState([])

  useEffect(() =>{
    telegram.ready();
  })

  const onAddItem = item =>{
    const existItem = cartItem.find(c => c.id === item.id)
    console.log("exist", existItem);

    if(existItem) {
      const newData = cartItem.map(c => c.id === item.id ? {...existItem, quantity: existItem.quantity + 1} : c)
      setCartItem(newData)

    }else {
      const newData = [...cartItem, {...item, quantity: 1}]
      setCartItem(newData)

    }
  }
  const onRemoveItem = item =>{
    const existItem = cartItem.find(c => c.id === item.id)

    if(existItem.quantity === 1){
      const newData = cartItem.filter(c => c.id === existItem.id)
      setCartItem(newData)
    } else {
      const newData = cartItem.map(c => c.id === existItem.id ? {...existItem, quantity: existItem.quantity - 1} : c)
      setCartItem(newData)

    }

  }

  const onCheckout = () => {
    telegram.MainButton.text = 'Sotib Olish :)';
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
    const queryId = telegram.initDataUnsave?.query_id;
    if(queryId){
        fetch('https://localhost:8000/web-data',{
          method: 'POST',
          headers: {
            'Content-type': 'application/json', 
          },
          body: JSON.stringify(cartItem),
        })
      }else {
      telegram.sendData(JSON.stringify({products: cartItem, queryId: queryId}))
    }
  }, [cartItem])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData)

    return () => telegram.offEvent('mainButtonClicked', onSendData)
  }, [onSendData])

    return (
      <>
      <h1 className='heading'>Kurslar</h1>
      <Cart cartItem={cartItem} onCheckout={onCheckout} />
        {/* kurslar */}
        <div className="cards__container">
          {courses.map(courses => (
            <>
            <Card key={courses.id} courses={courses} 
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            />
            </>
          ))}
        </div>
      </>
    )
};

export default App;
