/* eslint-disable */


import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import './Mainlist.css';
import './FoodInput.css';
import {dataBaseContext} from './App';
import { Dialog, ListItemButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from './EditDialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import IconButton from '@mui/material/IconButton';
import FoodInput from './FoodInput';

const editItemContext = React.createContext();

export default function Mainlist() {
  const context = React.useContext(dataBaseContext);
  const {currentList, listTitle, listId} = context;
  const data = context.dataChanged;
  const [itemList, setItemList] = useState([]);
  const [editItem, setEditItem] = React.useState({});
  const [deleteItem, setDeleteItem] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [item, setItem] = React.useState('');
  const authentication = useAuth();
  const token = authentication.getToken();

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

  // Gets the items in the currently selected list.
  // Updates whenever the list is changed.
  async function checkList() {
    console.log(currentList);
    fetch(`http://localhost:3010/v0/foodInList/${listId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      let items = json;
      items.sort((a, b) => a.id < b.id ? -1 : 1);
      setItemList(items);
    })
  }

  // Fetches the list if one is selected
  const updateList = () => {
    if (listId) {
      checkList();
    }
  }

  useEffect(() => {
    updateList();
  }, [data, currentList])

  // Opens Edit popup
  function handleClickOpen (item) {
    setEditItem(item);
    setOpen(true);
  };

  // Opens delete popup
  function handleDeleteClick (item){
    setOpenDelete(true);
    setDeleteItem(item);
    console.log(openDelete);
  };

  // Closes delete popup
  function handleClose (){
    setOpenDelete(false);
  };

  // Deletes an item from the list and closes popup
  function deletingItem (){
    fetch(`http://localhost:3010/v0/food/${deleteItem.id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authentication.getToken()}`,
      },
    })
    .then(() => {
      setOpenDelete(false);
      checkList();
    })
  }


  return (
    <div className='mainList'>
      <List component={Stack} direction="row">
        <ListItem>
          <Typography variant="h5" mt={1}>{listTitle}</Typography>
        </ListItem>
        {/* Button that opens the add food item modal popup */}
        <ListItem sx={{ justifyContent: "flex-end" }}>
          <Tooltip title="Add Item" arrow>
            <IconButton onClick={() => setModalOpen(true)}>
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
      <div>
      <List key={'toolbar'} sx={{mt: 1}} component={Stack} direction="row"
      >
        <ListItem key={'item'}>
          <ListItemText primary="Item"/>
        </ListItem>
        <ListItem key={'amount'}>
          <ListItemText primary="Amount" />
        </ListItem>
        <ListItem key={'date'}>   
          <ListItemText primary="Date Purchased" />
        </ListItem>
        <ListItem key={'tags'}>
          <ListItemText primary="Tags" />
        </ListItem>
        <ListItem key={'notes'}>
          <ListItemText primary="Notes" />
        </ListItem>
        <ListItem key={'edit'}>
          <ListItemButton disabled={true}/>
        </ListItem>
        <ListItem key={'space1'}>
          <ListItemButton disabled={true}/>
        </ListItem>
      </List>
      {itemList.map((object) => (
            <List component={Stack} direction="row"
              key={String(object.id).concat('list')}>
                <ListItem key={String(object.id).concat('item')}>
                  <ListItemText primary={object.item} />
                </ListItem>
                <ListItem key={String(object.id).concat('amount')}>
                  <ListItemText primary={object.amount} />
                </ListItem>
                <ListItem key={String(object.id).concat('date')}>
                  <ListItemText primary={formatDate(object.purchasedate)} />
                </ListItem> 
                <ListItem key={String(object.id).concat('tags')}>
                  <ListItemText primary= {printTags(object.tags)} />
                </ListItem>
                <ListItem key={String(object.id).concat('notes')}>
                  <ListItemText primary={object.notes} />
                </ListItem>
                <ListItem key={String(object.id).concat('edit')}>
                    <ListItemButton aria-label='test' role={'button'} color='blue' key={'editButton'}
                      onClick={() => {handleClickOpen(object)}}>
                        <EditIcon/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton role={'button'} color='blue' key={'deleteButton'}
                      onClick={() => {handleDeleteClick(object)}}>
                        <DeleteIcon/>
                    </ListItemButton>
                </ListItem>
           </List>
          ))}
          <editItemContext.Provider value={{open, setOpen, editItem}}>
            {open? (<EditDialog/>) : null}
          </editItemContext.Provider>
          <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you do want to delete {deleteItem.item} from the list?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={deletingItem} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <FoodInput />
          </Dialog>
      </div>
    </div>
  );
}

function printTags(objectTags){
  console.log(objectTags)
  console.log(Object.keys(objectTags))
  var result = "";
  Object.keys(objectTags).forEach((key) =>{
    result = result + key + ", "
  });
  result = result.replace(/,\s*$/, "");
  return result
}

function formatDate(date_string){
  let date = new Date(date_string);
  let dateMDY = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  return dateMDY
}

export {
  editItemContext,
};

