/* eslint-disable */

import React from 'react';
import './Mainlist.css';

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
  return (
    <div className='mainList'>
      <p className='listName'>List Name</p>
      <ul id="mainItemList"></ul>
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
