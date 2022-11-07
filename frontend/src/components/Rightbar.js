/* eslint-disable */

import React, {useState} from 'react';
import './Rightbar.css';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Sidebar() {
  // Create a date object from a date string
  var currentDate = new Date();

  // Get year, month, and day part from the date
  var year = currentDate.toLocaleString("default", { year: "numeric" });
  var month = currentDate.toLocaleString("default", { month: "2-digit" });
  var day = currentDate.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = year + "-" + month + "-" + day;

  // State elements of food item object
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(formattedDate.toString()); // convert date type to string type
  const [notes, setNotes] = useState('');
  const authentication = useAuth();

  //Context
  const context = React.useContext(dataBaseContext);
  const setData = context.setDataChanged;
  const data = context.dataChanged;

  const nameSubmit = (event) => {
    event.preventDefault();
    // const itemObject = {item, amount, purchasedate, notes};
    const itemObject = {"item":item,"amount":parseInt(amount),"purchaseDate":purchaseDate,"notes":notes};
    fetch('http://localhost:3010/v0/foodlist', {
      method: 'POST',
      body: JSON.stringify(itemObject),
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
        setData(!data);
      })
      .catch((err) => {
        console.log('err', err);
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
              onChange={(e) => setItem(e.target.value)}
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
              onChange={(e) => setPurchaseDate(e.target.value)}/></li>
               
            <li className='boxLabel'>Description of Item</li>
            <li><textarea
              id="itemDesc"
              type="text"
              className='addItemDesc'
              placeholder='Write a description for your item...'
              onChange={(e) => setNotes(e.target.value)}/></li>
             
            <li className='buttonLi'>
              <button
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
  console.log("button pushed");

  
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
