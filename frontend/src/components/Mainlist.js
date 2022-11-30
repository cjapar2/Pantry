/* eslint-disable */

import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import './Mainlist.css';
import {dataBaseContext} from './App';
import { Dialog, ListItemButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from './EditDialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
  const authentication = useAuth();
  const token = authentication.getToken();

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

  const updateList = () => {
    if (listId) {
      checkList();
    }
  }

  useEffect(() => {
    updateList();
  }, [data, currentList])

  function handleClickOpen (item) {
    setEditItem(item);
    setOpen(true);
  };

  function handleDeleteClick (item){
    setOpenDelete(true);
    setDeleteItem(item);
    console.log(openDelete);
  };

  
  function handleClose (){
    setOpenDelete(false);
  };

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
    <div className='mainList' >
      <Typography variant="h4" mt={1} ml={2}>{listTitle}</Typography>
      <div>
      <List key={'toolbar'} sx={{ mt: 1}} component={Stack} direction="row">
        <ListItem key={'item'}>
          <ListItemText primary="Item"/>
        </ListItem>
        <ListItem key={'amount'}>
          <ListItemText primary="Amount" />
        </ListItem>
        <ListItem key={'date'}>
          <ListItemText primary="Date Purchased" />
        </ListItem>
        <ListItem key={'notes'}>
          <ListItemText primary="Notes" />
        </ListItem>
        <ListItem key={'tags'}>
          <ListItemText primary="Tags" />
        </ListItem>
        <ListItem key={'edit'}>
          <ListItemButton disabled={true}/>
        </ListItem>
        <ListItem key={'space1'}>
          <ListItemButton disabled={true}/>
        </ListItem>
      </List>
      {itemList.map((object) => (
            <List component={Stack} direction="row" spacing={0}
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
              <ListItem key={String(object.id).concat('notes')}>
                <ListItemText primary={object.notes} />
              </ListItem>
              <ListItem key={String(object.id).concat('tags')}>
                <ListItemText primary= {printTags(object.tags)} />
              </ListItem>
              <ListItem key={String(object.id).concat('edit')}>
                  <ListItemButton role={'button'} color='blue' key={'editButton'}
                     onClick={() => {handleClickOpen(object)}}>
                      <EditIcon/>
                  </ListItemButton>
              </ListItem>
              <ListItem >
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

