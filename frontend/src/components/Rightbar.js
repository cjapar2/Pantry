import React from 'react';
import './Rightbar.css';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Sidebar() {
  return (
    <div className='rightbar'>
      <div className='rightbar-buttons'>
        <ul>
          <li className='boxLabel'>Name of Item</li>
          <li><input
            id="itemName"
            type="text"
            className='addItemName'
            placeholder='Item Name'/>
          </li>
          <li></li>
          <li className='boxLabel'>Item Quantity</li>
          <li><input
            id="itemCount"
            type="number"
            className='addItemCount'
            placeholder=''/></li>
          <li className='boxLabel'>Date Purchased</li>
          <li><input
            id="itemDate"
            type="date"
            className='addItemDate'
            placeholder='Input an item to add...'/></li>
          <li className='boxLabel'>Description of Item</li>
          <li><textarea
            id="itemDesc"
            type="text"
            className='addItemDesc'
            placeholder='Write a description for your item...'/></li>
          <li className='buttonLi'>
            <button onClick={addItemButton}
              className='addItemButton'>Add Item</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Adds an item to the list
 *
 * @return {object} True or False
*/
function addItemButton() {
  if (!document.getElementById('itemName').value) {
    console.log('Name empty');
  } else {
    console.log(document.getElementById('itemName').value);
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
