import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import AddIcon from '@mui/icons-material/Add';
import RetractIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import { CirclePicker  } from 'react-color';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import FormHelperText from '@mui/material/FormHelperText';
// import Stack from '@mui/material/Stack';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Form from 'react-bootstrap/Form';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateArea(props) {
   // Current Date
   const currentDate = new Date();
   const defaultDueDate = currentDate.getFullYear() + '-' 
                       + String(currentDate.getMonth() + 1).padStart(2, '0') + '-' 
                       + String(currentDate.getDate()+1).padStart(2, '0')
                       + "T00:00";

  // States: 
  const [isExpanded, setExpanded] = useState(false);
  const [dueDate, setDueDate] = useState(defaultDueDate);
  const [prevDueDate, setPrevDueDate] = useState(dueDate);
  const [selectedTags, setSelectedTags] = useState([]);
  const [todoItem, setTodoItem] = useState({
    key:uuid(),
    task_id:"",
    task_name:"",
    description:"",
    status:"Not Started",
    due_date:dueDate,
    tag_list:selectedTags
  });
  const [includeDueDate, setIncludeDueDate] = useState(true);
  const [error, setError] = useState("");
  const [addedTag, setAddedTag] = useState("");
  const [addedTagColour, setAddedTagColour] = useState("#f44336");
  const [isColourPicking, setColourPicking] = useState(false);
  const [deleteTagConfirm, setDeleteTagConfirm] = useState(false);
  // const [userTags, setUserTags] = useState(props.userTags);

  // for tags dropdown
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // for detecting click outside of create area
  // const refClick = useRef(null);
  
  function updateSelectedTags(event){
    //console.log("ENTER updateSelectedTags");
    const value  = event.target.value;
    // console.log("updating selected to: " + value);
    setSelectedTags(value);
    //console.log("EXIT updateSelectedTags");
  }

  function updateDueDate(event){
    //console.log("ENTER updateDueDate");
    const value  = event.target.value;
    setPrevDueDate(value);
    setDueDate(value);
    //console.log("EXIT updateDueDate");
  }

  function handleChange(event){
    //console.log("ENTER handleChange");
    const {name, value} = event.target; // name and value attributes
    setTodoItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value // the fields are [name]
      }
    });
    //console.log("EXIT handleChange");
  }

  function handleAddTagName(event){
    //console.log("ENTER handleAddTagName");
    const value  = event.target.value;
    setAddedTag(value);
    //console.log("EXIT handleAddTagName");
  }

  function handleAddTagColour(color){
    //console.log("ENTER handleAddTagColour");
    setAddedTagColour(color.hex);
    setColourPicking(false);
    //console.log("EXIT handleAddTagColour");
  }

  function handleAddTag(){
    //console.log("ENTER handleAddTag");

    // API CALL CHECK FOR SUCCESS
    if(addedTag.length !== 0) {
      let findTag = props.userTags.find((prevTag) => prevTag.tag_name === addedTag);
      if(findTag !== undefined){
        // console.log("tag exists"); // ADD ERROR
        setError("Tag with that name already exists");
      } else {
        // console.log("addedTag: " + addedTag);
        // console.log("addedTagColour: " + addedTagColour);
        props.addUserTags({ tag_name: addedTag, tag_color: addedTagColour});
        setAddedTag("");
        setAddedTagColour("#f44336");
        setColourPicking(false);
      }
    } else {
      // HANDLE EMPTY TAG
      // console.log("tag empty");
    }
    //console.log("EXIT handleAddTag");
  }

  function handleDeleteTagOpen(){
    //console.log("ENTER handleDeleteTagOpen");
    if(selectedTags.length !== 0) {
      setDeleteTagConfirm(true);
    }
    //console.log("EXIT handleDeleteTagOpen");
  }
  function handleDeleteTagClose(){
    //console.log("ENTER handleDeleteTagClose");
    setDeleteTagConfirm(false);
    //console.log("EXIT handleDeleteTagClose");
  }

  function handleDeleteTags(){
    //console.log("ENTER handleDeleteTags");
    // API CALL TO DELETE
    // let newTags = props.userTags;
    // selectedTags.forEach((deleteTag) => newTags = newTags.filter((tag) => tag.tag_name !== deleteTag));
    props.deleteUserTags(selectedTags);

    handleDeleteTagClose();
    setSelectedTags([]);
    //console.log("EXIT handleDeleteTags");
  }

  useEffect(() => {
    // console.log("ENTER useEffect includeDueDate");
    if(!includeDueDate) {
      setPrevDueDate(dueDate);
      setDueDate(null);
    } else {
      setDueDate(prevDueDate);
    }
    //console.log("EXIT useEffect includeDueDate");
  }, [includeDueDate]);

  useEffect(() => {
    // console.log("ENTER useEffect dueDate");
    // console.log("Updated dueDate: " + dueDate);
    setTodoItem((prevItem) => {
      return {
        ...prevItem,
        due_date: dueDate // update just due_date field
      }
    });
    //console.log("EXIT useEffect dueDate");
  }, [dueDate]);

  useEffect(() => {
    // console.log("ENTER useEffect selectedTags");
    // console.log("Updated selectedTags: " + selectedTags);
    setTodoItem((prevItem) => {
      return {
        ...prevItem,
        tag_list: selectedTags // update just selectedTags field
      }
    });
    //console.log("EXIT useEffect selectedTags");
  }, [selectedTags]);

  function submitTodoItem(event){
    //console.log("ENTER submitTodoItem");
    // console.log("CUR STATUS: " + todoItem.status);
    // console.log("due_date: " + todoItem.due_date);
    if(todoItem.description.length > 200) {
      setError("Description to long! (max 200 characters)");
    } else if (todoItem.task_name.length > 25){
      setError("Title to long! (max 25 characters)");
    } else if (todoItem.task_name === ""){
      setError("Please include a title!");
    } else {
      props.onAdd(todoItem);
      
      retract();
      setError("");

      setTodoItem({
        key:uuid(),
        task_id:"",
        task_name:"",
        description:"",
        status:"Not Started",
        due_date:dueDate,
        tag_list:[]
      });
      setPrevDueDate(defaultDueDate);
      setDueDate(includeDueDate ? defaultDueDate : null);
      setSelectedTags([]);
    }

    event.preventDefault();
    //console.log("EXIT submitTodoItem");
  }

  function expand(){
    //console.log("ENTER expand");
    setExpanded(true);
    //console.log("EXIT expand");
  }

  function retract(){
    //console.log("ENTER retract");
    setError("");
    setExpanded(false);
    setColourPicking(false);
    //console.log("EXIT retract");
  }

  function toggleIncludeDueDate(){
    //console.log("ENTER toggleIncludeDueDate");
    setIncludeDueDate(!includeDueDate);
    //console.log("EXIT toggleIncludeDueDate");
  }

  function toggleColourPicking(){
    //console.log("ENTER toggleColourPicking");
    setColourPicking(!isColourPicking);
    //console.log("EXIT toggleColourPicking");
  }

  function dismissError(){
    setError("");
  }

  return (
    <div>
      <form className="create-todoItem" >
        {/* <Stack noValidate spacing={1}>  */}
          <input className="create-area-title" value={todoItem.task_name} onChange={handleChange} onClick={expand} name="task_name" placeholder="Add Task..." />
          <div>
            {isExpanded &&
              <div className="due-date-check w-100" ><Checkbox checked={includeDueDate} onChange={toggleIncludeDueDate}  />Include Due Date</div>
            }
            {isExpanded && includeDueDate &&
              <TextField className="due-date-field w-100 ms-2 mb-3"
                id="datetime-local"
                name="due_date"
                label="Due Date"
                type="datetime-local"
                defaultValue={prevDueDate}
                onChange={updateDueDate}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            }
          </div>
          <div>
            {isExpanded &&
              <FormControl className="select-status-field w-100" sx={{ m: 1, minWidth: 160 }}>
                <InputLabel>Select Status*</InputLabel>
                <Select
                  name="status"
                  className="status-select"
                  value={todoItem.status} 
                  label="Select Status"
                  onChange={handleChange}
                  displayEmpty>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            }
            {isExpanded &&
              <FormControl className="select-tags-field w-100" sx={{ m: 1, minWidth: 240 }}>
                <InputLabel>Select Tags</InputLabel>
                <Select
                  multiple
                  name="tag_list"
                  className="tag-select"
                  value={todoItem.tag_list}
                  label="Select Tags"
                  onChange={updateSelectedTags}
                  // input={<OutlinedInput label="Selected Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  <div>
                    <Button className="delete-tag-button" variant="outlined" onClick={handleDeleteTagOpen}>
                      Delete selected tags
                    </Button>
                    <Dialog
                      open={deleteTagConfirm}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleDeleteTagClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Permanently delete selected tags?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          This will delete the tags from associated tasks.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDeleteTagClose}>Cancel</Button>
                        <Button onClick={handleDeleteTags}>Delete</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  {props.userTags.slice(0).reverse().map((tag, index) => (
                      <MenuItem className="tag-menu-item" key={index} value={tag.tag_name}>
                        <Checkbox checked={selectedTags.indexOf(tag.tag_name) > -1} />
                        <ListItemText primary={tag.tag_name} />
                        <CircleIcon style={{ color: tag.tag_color }} />
                      </MenuItem>
                  ))}
                </Select>
            </FormControl>
            }
          </div>
          {isExpanded && 
            <div className="add-tag-field">
              <TextField className="add-tag-title" onChange={handleAddTagName} label="Add new tag..." value={addedTag} variant="standard" />
              <CircleIcon className="add-tag-icon" onClick={toggleColourPicking} style={{ color: addedTagColour }} />
              <AddIcon className="add-tag-icon" onClick={handleAddTag} style={{ color: "#009FFD" }} />
              { isColourPicking &&
                <CirclePicker className="add-tag-colour" onChange={ handleAddTagColour } color={addedTagColour} />
              }   
            </div>
          }
          {isExpanded && 
            <textarea 
              value={todoItem.description} 
              onChange={handleChange} 
              name="description" 
              placeholder="Write a description here..." 
              rows={isExpanded ? 3 : 1} />
          } 
          {isExpanded && error.length > 0 &&
            <p onClick={dismissError} className="error-msg"> { error + " (Click to Dismiss)" } </p>
          }
          <Zoom in={isExpanded}>
          <Fab onClick={submitTodoItem}><AddIcon /></Fab>
          </Zoom>
          <Zoom in={isExpanded}>
          <Fab className="retract-create-area" onClick={retract}><RetractIcon /></Fab>
          </Zoom>
        {/* </Stack> */}
      </form>
    </div>
  );
}

export default CreateArea;
