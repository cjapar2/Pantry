/* eslint-disable */

import React, {useState} from 'react';
import './Rightbar.css';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';
import {Typography, Stack, Button} from '@mui/material';
import Box from '@mui/material/Box';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function FoodInput() {
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
    <div>
			<Box sx={boxStyle}>
				<Typography id="modal-modal-title"
					variant="h4"
				>
					Add an item
					</Typography>
					<Typography/>
					<form onSubmit={nameSubmit}>
						<ul>
							<li className='listItem'>
								<Typography variant='h6'>
									Name of Item
								</Typography>
								<input
									id='itemName'
									type='text'
									className='addItemName'
									placeholder='Item Name'
									onChange={(e) => setItem(e.target.value)}
								/>
							</li>
							<li className='listItem'>
								<Stack direction='row' spacing={5}>
									<li ><Typography variant='h6'>
										Item Quantity</Typography>
									</li>
									<li ><Typography variant='h6'>
										Date Purchased</Typography>
									</li>
								</Stack>
								<Stack direction='row' spacing={10}>
									<input
										id='itemCount'
										type='number'
										min='0'
										className='addItemCount'
										onChange={(e) => setAmount(e.target.value)}
									/>

									<input
										id='itemDate'
										type='date'
										className='addItemDate'
										onChange={(e) => setPurchaseDate(e.target.value)}
									/>
								</Stack>
								<li className='boxLabel'>
									<Typography variant='h6'>Description of Item</Typography>
								</li>
								<li><textarea
									id='itemDesc'
									type='text'
									className='addItemDesc'
									placeholder='Write a description for your item...'
									onChange={(e) => setNotes(e.target.value)}/>
								</li>
								<li className='boxLabel'>
									<Typography variant='h6'>Tags</Typography>
								</li>
								<div className='tags'>
									{createTagButtons(tagNames, updateTags)}
								</div>
								<li className='buttonLi'>
								<Button variant='contained' type='submit' size='large' fullWidth
									sx={{
										alignSelf: 'center',
										backgroundColor: 'rgb(82, 179, 54)',
										height: '35px',
										ml: 1,
										width: '90%',
									}}>Add Item</Button>
								</li>
							</li>
						</ul>
					</form>
			</Box>
    </div>
  )
}

/**
 * Create buttons for tags
 *
 * @param {tagNames} JSX
 * @param {updateTags} JSX
 * @return {object} JSX
 */
function createTagButtons(tagNames, updateTags) {
  const rows = [];

  for (let i = 0; i < tagNames.length; i++) {
    const name = tagNames[i];
    rows.push(
      <label className='tagBox' key={name}>
        <input type='checkbox'
          key={name}
          id={'tag' + name}
          className='tag'
          onChange={(e) => updateTags(name, e.target.checked)}
        />
          {name}
      </label>
    );
  }
  return rows;
}