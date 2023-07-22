import './card.css';
import Button from '../button/button'
import { useState } from 'react';

const card = props => {
    const [count, setCount] = useState(0)
    const {courses, onAddItem, onRemoveItem} = props


    const handleIncrement = () => {
        setCount(prev => prev +1)
        onAddItem(courses)
    }
    const handleDecrement = () => {
        setCount(prev => prev - 1)
        onRemoveItem(courses)
    }
  return (
    <div className='card'>
        <span className={`${count != 0 ? 'card__badge': "card__badge-hidden"}`}>{count}</span>

        <div className="image__container">
            <img src={courses.Image} alt={courses.title}  />
        </div>

        <div className="card__body">
            <h2 className='card__title'>{courses.title}</h2>
            <div className="card__price">
                {courses.price.toLocaleString('en-US',{
                style:'currency',
                currency:'USD',})}
            </div>
        </div>
                    
        <div className="hr"></div>

        <div className="btn__container">
            <Button title={'+'} onClick={handleIncrement} type={'add'} />
            {count !== 0 && (
                <Button title={'-'} type={'remove'} onClick={handleDecrement} />

            )}
        </div>
    </div>
  );
}

export default card;
