import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

let changesMade = false;

function EditModal(props) {
  // States: 
  const [dueDate, setDueDate] = useState(props.due_date);
  const [prevDueDate, setPrevDueDate] = useState(dueDate?.slice(0,-1));
  const [includeDueDate, setIncludeDueDate] = useState(props.due_date !== null);
  const [selectedTags, setSelectedTags] = useState(props.tag_list.length === 0 ? [] : props.tag_list.map((item) => {
    return props.userTags.find(theTag => item.TagTagId === theTag.tag_id)?.tag_name
  }));
  const [error, setError] = useState("");
  const [todoItem, setTodoItem] = useState({
	  key:props.theKey,
    task_id:props.task_id,
    task_name:props.task_name,
    description:props.description,
    status:props.status,
    due_date:props.due_date,
    tag_list:props.userTags.filter((item) => selectedTags.includes(item.tag_name)),
  });

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
	disablePortal: true,
  };

  function updateDueDate(event){
    //console.log("ENTER updateDueDate");
    const value  = event.target.value;
    // console.log("updateduedate to: " + value);
    setPrevDueDate(value);
    if(value === null || value === undefined || value === ""){
      setDueDate(null);
    } else {
      setDueDate(value + "Z");
    }
    
	  changesMade = true;
    //console.log("EXIT updateDueDate");
  }

  function handleChange(event) {
    // console.log("ENTER handleChange");
    const {name, value} = event.target; // name and value attributes
    
	  changesMade = true;
    setTodoItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value // the fields are [name]
      }
    });
    // console.log("EXIT handleChange");
  }


  function toggleIncludeDueDate(){
    //console.log("ENTER toggleIncludeDueDate");
    setIncludeDueDate(!includeDueDate);
    //console.log("EXIT toggleIncludeDueDate");
  }

  function updateSelectedTags(event){
    // console.log("ENTER updateSelectedTags");
    const value  = event.target.value;
    
	  changesMade = true;
    if(value === null) {
      setSelectedTags([]);
    } else {
      setSelectedTags(value);
    }
    // console.log("EXIT updateSelectedTags");
  }

  function handleUpdate(event) {
    // console.log("ENTER handleUpdate");
    if(todoItem.description.length > 200) {
      setError("Description to long! (max 200 characters)");
    } else if (todoItem.task_name.length > 25){
      setError("Title to long! (max 25 characters)");
    } else if (todoItem.task_name === ""){
      setError("Please include a title!");
    } else if (!changesMade) { 
      setError("No changes were made!");
    } else {
      props.onUpdate(todoItem, changesMade);
      // document.getElementsByClassName('modal')[0].classList.remove('show');
      // document.getElementsByClassName('modal-backdrop')[0].remove();
      // document.getElementsByClassName('modal')[0].style.display = "none";
    }
    // close the modal if to do items updated
    

    event.preventDefault();
    // console.log("EXIT handleUpdate");
  }

  function handleClose() {
    // console.log("ENTER handleClose");
    setSelectedTags(props.tag_list.map((item) => {
      return props.userTags.find(theTag => item.TagTagId === theTag.tag_id).tag_name;
    }));
    if(setSelectedTags === null) {
      setSelectedTags([]);
    }
    setTodoItem({
      key:props.theKey,
      task_id:props.task_id,
      task_name:props.task_name,
      description:props.description,
      status:props.status,
      due_date:props.due_date,
      tag_list:props.userTags.filter((item) => selectedTags.includes(item.tag_name)),
    });
    setDueDate(props.due_date);
    setIncludeDueDate(props.due_date !== null);
    dismissError();
    // console.log("EXIT handleClose");
  }

  function dismissError(){
    setError("");
  }

  useEffect(() => {
    //console.log("ENTER useEffect dueDate");
    // console.log("Updated dueDate: " + dueDate);
	setTodoItem((prevItem) => {
		return {
			...prevItem,
			due_date: dueDate,
		}
	});
    //console.log("EXIT useEffect dueDate");
  }, [dueDate]);

  useEffect(() => {
    // console.log("ENTER useEffect selectedTags");
    setTodoItem((prevItem) => {
      return {
        ...prevItem,
        tag_list: props.userTags.filter((item) => selectedTags.includes(item.tag_name)),
      }
    });
    // console.log("EXIT useEffect selectedTags");
  }, [selectedTags]);
  
  useEffect(() => {
    // console.log("ENTER useEffect includeDueDate");
    if(!includeDueDate) {
      setPrevDueDate(dueDate?.slice(0,1));
      setDueDate(null);
    } else {
      if(prevDueDate === null || prevDueDate === undefined || prevDueDate === ""){
        setDueDate(null);
      } else {
        setDueDate(prevDueDate + "Z");
      }
    }
    // console.log("EXIT useEffect includeDueDate");
  }, [includeDueDate]);

  return (
    <div className="modal fade" id={"editModal" + props.id} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModalLabel">Edit Task</h1>
            <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="taskTitle">Task Title</label>
              <input className="form-control" id="taskTitle" value={todoItem.task_name} name="task_name" onChange={handleChange} />
            </div>
            <div className="my-3">
              <label htmlFor="taskStatus">Task Status</label>
              <select id="taskStatus" className="form-select" value={todoItem.status} name="status" onChange={handleChange}>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="my-3">
              <div className="due-date-check w-100" ><Checkbox checked={includeDueDate} onChange={toggleIncludeDueDate}  />Include Due Date</div>
              {includeDueDate &&
                <TextField className="due-date-field w-100"
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
            <FormControl className="select-tags-field w-100" sx={{ m: 1, minWidth: 240 }}>
              <InputLabel>Select Tags</InputLabel>
              <Select
                multiple
                name="tag_list"
                className="tag-select"
                value={selectedTags}
                label="Select Tags"
                onChange={updateSelectedTags}
                // input={<OutlinedInput label="Selected Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {props.userTags.slice(0).reverse().map((tag, index) => (
                    <MenuItem className="tag-menu-item" key={index} value={tag.tag_name}>
                      <Checkbox checked={selectedTags.indexOf(tag.tag_name) > -1} />
                      <ListItemText primary={tag.tag_name} />
                      <CircleIcon style={{ color: tag.tag_color }} />
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="mt-3">
              <label htmlFor="taskDescription">Task Description</label>
              <textarea className="form-control" id="taskDescription" value={todoItem.description} name="description" onChange={handleChange} />
            </div>
            {error.length > 0 &&
              <p onClick={dismissError} className="error-msg"> { error + " (Click to Dismiss)" } </p>
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
