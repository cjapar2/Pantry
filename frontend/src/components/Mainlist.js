/* eslint-disable */

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import React from 'react';
import './Mainlist.css';
import { listItemIconClasses, PaginationItem } from '@mui/material';

/*
      <button onClick={addItemButton} className='addItemButton'>+</button>
      <input
        id="test"
        type="text"
        className='addItemTextbox'
        placeholder='Input an item to add...'/>
        */

/**
 * Simple component with no state.
 *
 * @return {object} maintest
 */
export default function Mainlist() {
  const authentication = useAuth();

  async function getList(){
    const response = await fetch('http://localhost:3010/v0/foodlist', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authentication.getToken()}`,
      },
    });
    return response.json()
  }

  //const [list, setList] = React.useState(initialList);

  function updateList(){
    getList().then((data) => {
      const itemList = updateList().map((row) =>
        <li>{row}</li>
      );
    });
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className='mainList'>
      <p className='listName'>List Name</p>
      <ul>
        <li className='itemInList' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <p className='leftListItem'>Left</p>
          <button className='rightListItem'>X</button>
        </li>
        
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>
    </div>
  );
}


/**
 * Adds an item to the list
 *
 * @return {object} True or False

function addItemButton() {
  if (document.getElementById('test').value) {
    const itemText = document.getElementById('test').value;
    const newListItem = document.createElement('li');
    newListItem.appendChild(document.createTextNode(itemText));
    const mainItemList = document.getElementById('mainItemList');
    mainItemList.appendChild(newListItem);
    document.getElementById('test').value = '';
    return true;
  }
  return false;
}
*/
