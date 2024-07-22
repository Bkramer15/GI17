import React from 'react';
import { useState } from 'react';


function Counter(){
    const[count, setCount] = useState(0);//set initial count to 0

    function handleIncrement(){
        setCount(count + 1)
    }

    function handdleDecrement(){
        setCount(count - 1)
    }

    return(
        <div>
            <p>{count}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handdleDecrement}>-</button>
        </div>
    )
}

export default Counter;