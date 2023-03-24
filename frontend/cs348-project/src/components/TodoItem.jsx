import React, { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import Fab from '@mui/material/Fab';
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

function TodoItem(props) {
  const [showDueDate, setShowDueDate] = useState(props.due_date === null ? false : true);

  // setInterval(updateTime, 1000);
  // let now = null;
  let dueDateDate = null;
  let dueDateHours = null;
  let dueDateMinutes = null;
  let AMorPM = null;
  // const [curTime, setCurTime] = useState(now);
  const [dueDate, setDueDate] = useState(props.due_date);

  // function updateTime() {
  //   now = new Date();
  //   setCurTime(now);
  // }

  function handleDelete(){
    props.onDelete(props.task_id);
  }

  useEffect(() => {
    // console.log("IN useEffect props.due_date");
    // now = new Date();

    if(props.due_date !== null) {
      let theDate = null;
      let theDateString = "";
      if(props.due_date !== null) {
        theDate = new Date(props.due_date)
        theDate.setHours(theDate.getHours() - 5);
        theDateString = theDate.toISOString();
      }
      // console.log(theDateString);
      dueDateDate = theDateString.slice(0,-14);
      // console.log(dueDateDate);
      dueDateHours = parseInt(theDateString.slice(11,-3));
      // console.log(dueDateHours);
      AMorPM = dueDateHours >= 12 ? "PM" : "AM";
      if(dueDateHours > 13) {
        dueDateHours -= 12;
      } else if (dueDateHours === 0) {
        dueDateHours = 12;
      }
      dueDateMinutes = theDateString.slice(13,16);
      // console.log(dueDateMinutes);
      let dateString = dueDateDate + " @ " + dueDateHours + dueDateMinutes + " " + AMorPM;
      setDueDate(dateString);
      setShowDueDate(true);
    } else {
      setShowDueDate(false);
    }
  }, [props.due_date]);

  

  return (
    <>
      <div className="todoItem">
        <div className="border-bottom d-flex">
          <h5 className="text-break">{props.task_name}</h5>
          <div className="ms-auto mb-2 text-break align-self-center w-25">
            <span className={`border p-1 border-${props.status === 'Not Started' ? 'danger' : props.status === 'In Progress' ? 'warning' : 'success'}
							  text-${props.status === 'Not Started' ? 'danger' : props.status === 'In Progress' ? 'warning' : 'success'}`}>
              {props.status}
            </span>
          </div>
        </div>

        {/* STYLING */}
        {props.tag_list.length !== 0 &&
        <div className="border-bottom d-flex">
          {props.tag_list.map((tag_id, index) => {
            tag_id = tag_id.TagTagId;
            const tag = props.userTags.find(theTag => tag_id === theTag.tag_id);
            if(tag !== undefined){
              return <span key={index} style={{"backgroundColor": tag.tag_color}} className="badge rounded-pill m-1 overflow-auto">{tag.tag_name}</span>
            }
          })}
        </div>
        }
        
        {showDueDate &&
          <h2 className="mt-1 overflow-auto" id={
            // curTime > dueDate && 
            props.status !== 'Completed'  ? 'overdue' : null}>
          Due Date: {dueDate}
          </h2>
        }
        
		<div className="overflow-auto text-break description mb-2">
	        {props.description}
		</div>
		<div>
			<Fab data-bs-toggle="modal" data-bs-target={"#deleteModal" + props.id}>
			<DeleteOutlineIcon />
			</Fab>
			<Fab data-bs-toggle="modal" data-bs-target={"#editModal" + props.id}>
			<EditIcon />
			</Fab>
		</div>
      </div>
      <EditModal {...props} />
	  <DeleteModal onDelete={handleDelete} id={props.id} />
    </>
  );
}

export default TodoItem;
