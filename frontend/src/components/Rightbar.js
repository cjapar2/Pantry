/* eslint-disable */

import React, {useState} from 'react';
import './Rightbar.css';
import {useAuth} from './AuthProvider';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Sidebar() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const authentication = useAuth();
  console.log(name);

  const nameSubmit = (event) => {
    event.preventDefault();
    const nameObject = {'name': name, 'amount': amount, 'date': date, 'description': description};
    console.log(JSON.stringify(nameObject));
    fetch('http://localhost:3010/v0/foodlist', {
      method: 'POST',
      body: JSON.stringify(nameObject),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.getToken()}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        addItemButton(json);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <form onSubmit={nameSubmit}>
      <div className='rightbar'>
        <div className='rightbar-buttons'>
          <ul>
            <li className='boxLabel'>Name of Item</li>
            <li><input
              id="itemName"
              type="text"
              className='addItemName'
              placeholder='Item Name'
              onChange={(e) => setName(e.target.value)}
            />
            </li>
            <li></li>
            <li className='boxLabel'>Item Quantity</li>
            <li><input
              id="itemCount"
              type="number"
              className='addItemCount'
              placeholder=''
              onChange={(e) => setAmount(e.target.value)}/></li>
             
            <li className='boxLabel'>Date Purchased</li>
            <li><input
              id="itemDate"
              type="date"
              className='addItemDate'
              placeholder='Input an item to add...'
              onChange={(e) => setDate(e.target.value)}/></li>
               
            <li className='boxLabel'>Description of Item</li>
            <li><textarea
              id="itemDesc"
              type="text"
              className='addItemDesc'
              placeholder='Write a description for your item...'
              onChange={(e) => setDescription(e.target.value)}/></li>
             
            <li className='buttonLi'>
              <button onClick={addItemButton}
                className='addItemButton'>Add Item</button>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

/**
 * Adds an item to the list
 * @param {object} itemObj item object containing different characteristics
 * @return {object} True or False
*/
function addItemButton(itemObj) {
  if (!document.getElementById('itemName').value) {
    console.log('Name empty');
  } else {
    console.log(document.getElementById('itemName').value);
    console.log('obj', itemObj);
    const newListItem = document.createElement('li');
    newListItem.appendChild(document.createTextNode('test'));
    const mainItemList = document.getElementById('mainItemList');
    mainItemList.appendChild(newListItem);
    console.log('done');
  }
  if (!document.getElementById('itemCount').value) {
    console.log('Count empty');
  } else {
    console.log(document.getElementById('itemCount').value);
  }
  if (!document.getElementById('itemDate').value) {
    console.log('Date empty');
  } else {
    console.log(document.getElementById('itemDate').value);
  }
  if (!document.getElementById('itemDesc').value) {
    console.log('Desc empty');
  } else {
    console.log(document.getElementById('itemDesc').value);
  }
  return false;
}
