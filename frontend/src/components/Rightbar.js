/* eslint-disable */


import React, {useState} from 'react';
import './Rightbar.css';
import './FoodInput.js';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Rightbar() {
  // Create a date object from a date string
  const currentDate = new Date();

  // Get year, month, and day part from the date
  const year = currentDate.toLocaleString('default', {year: 'numeric'});
  const month = currentDate.toLocaleString('default', {month: '2-digit'});
  const day = currentDate.toLocaleString('default', {day: '2-digit'});

  // Generate yyyy-mm-dd date string
  const formattedDate = year + '-' + month + '-' + day;

  // State elements of food item object
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(
    formattedDate.toString()); // convert date type to string type
  const [notes, setNotes] = useState('');
  const tags = {};
  const authentication = useAuth();

  // Context
  const context = React.useContext(dataBaseContext);
  const setData = context.setDataChanged;
  const data = context.dataChanged;
  const {listId} = context;

  const updateTags = (tag, bool) => {
    bool ? tags[tag] = true : delete tags[tag];
  };

  const nameSubmit = (event) => {
    event.preventDefault();

    if (listId) {
      const itemObject = {
        'item': item,
        'amount': parseInt(amount),
        'purchaseDate': purchaseDate,
        'notes': notes,
        'tags': tags,
      };
      console.log('itemObject');
      console.log(itemObject);
      fetch(`http://localhost:3010/v0/foodInList/${listId}`, {
        method: 'POST',
        body: JSON.stringify(itemObject),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authentication.getToken()}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setData(!data);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('Please select a list to add the item in');
    }
  };

  const tagNames = ['Shared', 'Dairy', 'Meat', 'Produce', 'Spice'];
  return (
    <Tabs className='rightbar'>
    <Tab label="Members" value="1" />
    <Tab label="Updates" value="2" />
    </Tabs>
  );
}
