import React, { useState } from 'react';

function ToDoList() {
    const [item, setItem] = useState([]);
    const [newItem, setNewItem] = useState(""); 
  

    function addChore() {
        if (newItem.trim() !== "") {
            setItem([...item, newItem]);
            setNewItem("");
        }
    }

    function removeChore(index) {
       
        setItem(item.filter((_, i) => i !== index));
    }

    return (
        <div>
            <div> . n .      
                <h1>Date</h1>
            </div>
            <div>
                {/* Render list of chores/items */}
                {item.map((chore, index) => (
                    <div key={index}>
                        <p>{chore}</p>
                        <button onClick={() => removeChore(index)}>Remove Chore</button>
                    </div>
                ))}
                {/* Input for adding new chore */}
                <input 
                    type="text" 
                    value={newItem} 
                    onChange={(e) => setNewItem(e.target.value)} 
                    placeholder="Enter new chore"
                />
                <button onClick={addChore}>Add Chore</button>
            </div>
        </div>
    );
}

export default ToDoList;
