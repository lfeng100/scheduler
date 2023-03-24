import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import CreateArea from "./CreateArea";
import FilterArea from "./FilterArea";
import { v4 as uuid } from "uuid";

function ListSection(props){
  const [todoItems, setTodoItems] = useState([]);
  // todoItem: 
  // {
  //   key:"",
  //   task_id: "".
  //   task_name:"",
  //   description:"",
  //   status:"Not Started",
  //   due_date:null,
  //   tag_list:[]
  // };

  const [userTags, setUserTags] = useState([]);
  // { tag_name: "Home", tag_color: "#00B8D9"}
  
  let resetting = false;

  function getTags(){
    // console.log("IN GET TAGS");
    const tagUrl = "http://127.0.0.1:8000/tags/" + props.user.user_id;
    fetch(tagUrl, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(msg => {
      // console.log(msg);
      msg.forEach(item => item.tag_color="#" + item.tag_color);
      setUserTags(msg);
    });
  }

  function getTasks(){
    const taskUrl = "http://127.0.0.1:8000/tasks/" + props.user.user_id;

    fetch(taskUrl, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(msg => {
      msg.forEach(item => item.key=uuid());
      setTodoItems(msg);
    });
  }

  useEffect(() => {
    // console.log("INITIALIZING TAGS AND TASKS");
    getTags();
    getTasks();
  }, []);

  const [displayedItems, setDisplayedItems] = useState([]);

  // Filters:
  const [statusFilter, setStatusFilter] = useState("None");
  const [dateFilter, setDateFilter] = useState("cdd");
  const [tagsFilter, setTagsFilter] = useState("na");

  // OTHER FILTER STATES HERE

  function handleStatusFilter(event){
    const value  = event.target.value;
    setStatusFilter(value);
  }

  function handleDateFilter(event){
    const value  = event.target.value;
    setDateFilter(value);
  }

  function handleTagsFilter(event) {
    const value = event.target.value;
    setTagsFilter(value);
  }

  function resetFilters() {
    setStatusFilter("None");
    setDateFilter("cdd");
    setTagsFilter("na");
  }

  function applyFilters() {
    let filtered = [...todoItems];
    // STATUS FILTER
    if(statusFilter !== "None") {
      filtered = filtered.filter((todoItem) => todoItem.status === statusFilter);
    } 

    // DATE FILTER
    if(dateFilter === "mrc") {
      // console.log("mrc");
      filtered.sort(function(a,b){
        return (a.createdAt < b.createdAt) ? 1 : -1;
      });
    } else if (dateFilter === "lrc") {
      // console.log("lrc");
      filtered.sort(function(a,b){
        return (a.createdAt < b.createdAt) ? -1 : 1;
      });
    } else if (dateFilter === "cdd") {
      // console.log("cdd");
      filtered.sort(function(a,b){
        return a.due_date === null || (b.due_date < a.due_date) ? 1 : -1;
      });
    } else if (dateFilter === "fdd") {
      // console.log("fdd");
      filtered.sort(function(a,b){
        return b.due_date === null || (a.due_date < b.due_date) ? 1 : -1;
      });
    }

    if (tagsFilter != "na") {
      if (tagsFilter == "none") {
        filtered = filtered.filter((todoItem) => todoItem.tag_list.length == 0);
      } else {
        filtered = filtered.filter((todoItem) => todoItem.tag_list.map((tagId) => tagId.TagTagId).includes(tagsFilter));
      }
    }

    // OTHER FILTERS HERE
    
    setDisplayedItems(filtered);
  }

  // Apply filters when todoItems, or filters change
  useEffect(() => {
    // console.log("todoItems useEffect");
    applyFilters();
    resetting = false;
  }, [todoItems]);
  
  useEffect(() => {
    // console.log("statusFilter useEffect");
    if(!resetting){
      applyFilters();
    }
  }, [statusFilter, dateFilter]); 

  useEffect(() => { // last filter to be reset in resetFilters(), so we apply filters after this completes
    applyFilters();
    resetting = false;
  }, [tagsFilter]); 

  function updateDate(date) {
    if(date.slice(-1) !== "Z") {
      date = date + ":59.000Z";
    }
    let theDate = null;
    theDate = new Date(date)
    theDate.setHours(theDate.getHours() + 5);
    return theDate.toISOString();
  }

  function addTagTasks(task_id, tag_list){
    let count = tag_list.length;
    tag_list.forEach(tag_id => {
      const url = "http://127.0.0.1:8000/tagTasks";
      fetch(url, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            task_id: task_id,
            tag_id: tag_id
          })
      })
      .then(res => res.json())
      .then(msg => {
        --count;
        if(count == 0 && msg.message === "tag_id " + tag_id + " and task_id " + task_id + " link created successfully!") {
          getTasks();
        } else {
          // tag task relationship failed to create
        }
      });
    });
  }

  function deleteTagTasks(task_id, tag_list){
    let count = tag_list.length;
    tag_list.forEach(tag_id => {
      const url = "http://127.0.0.1:8000/tagTasks";
      fetch(url, {
          method: 'DELETE',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            task_id: task_id,
            tag_id: tag_id
          })
      })
      .then(res => res.json())
      .then(msg => {
        --count;
        if(count == 0 && msg.message === "tag_id " + tag_id + " and task_id " + task_id + " link removed successfully!") {
          getTasks();
        } else {
          // tag task relationship failed to delete
        }
      });
    });
  }

  function addTodoItem(todoItem){
    todoItem.tag_list = userTags.filter((tag) => todoItem.tag_list.indexOf(tag.tag_name) > -1);
    if(todoItem.due_date !== null && todoItem.due_date !== undefined && todoItem.due_date !== "") {
      todoItem.due_date = updateDate(todoItem.due_date); 
    }

    // console.log(todoItem.due_date);
    const url = "http://127.0.0.1:8000/tasks";

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          user_id: props.user.user_id,
          task_name: todoItem.task_name,
          description: todoItem?.description,
          status: todoItem?.status,
          due_date: todoItem?.due_date,
          description: todoItem?.description,
        })
    })
    .then(res => res.json())
    .then(msg => {
      // console.log(msg);
      if(msg.message === "Task created successfully.") {
        console.log(msg);
        let tagIds = todoItem.tag_list.map(tag => tag.tag_id);
        console.log("tagIds:");
        console.log(tagIds);
        console.log("msg.task_id:");
        console.log(msg.task_id);
        addTagTasks(msg.task_id, tagIds);

        getTasks()
      } else {
        // task failed to create, notify user?
      }
    });
  }

  function updateTodoItem(todoItem, changesMade){
    if(changesMade){
      if(todoItem.due_date !== null && todoItem.due_date !== undefined && todoItem.due_date !== "") {
        todoItem.due_date = updateDate(todoItem.due_date); 
      }
  
      const url = "http://127.0.0.1:8000/tasks/task/" + todoItem.task_id;
  
      fetch(url, {
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            task_name: todoItem.task_name,
            description: todoItem?.description,
            status: todoItem?.status,
            due_date: todoItem?.due_date,
            description: todoItem?.description,
          })
      })
      .then(res => res.json())
      .then(msg => {
        if(msg.message === "Task was updated successfully.") {
          let theTodoItem = todoItems.find(theItem => theItem.task_id === todoItem.task_id);
          let prevTagIds = theTodoItem.tag_list.map(tag => tag.TagTagId);
          let newTagIds = todoItem.tag_list.map(tag => tag.tag_id);
  
          // set difference to determine deleted and added tags
          let toDelete = prevTagIds.filter(x => !newTagIds.includes(x));
          let toAdd = newTagIds.filter(x => !prevTagIds.includes(x));
  
          if(toDelete.length > 0) deleteTagTasks(todoItem.task_id, toDelete);
          if(toAdd.length > 0) addTagTasks(todoItem.task_id, toAdd);
  
          getTasks();
        } else {
          // task failed to create, notify user?
        }
      });
    }
  }

  function deleteTodoItem(id){
    const url = "http://127.0.0.1:8000/tasks/" + id;

    fetch(url, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(msg => {
      if(msg.message === "Task was deleted successfully!") {
        getTasks();
      } else {
        // task failed to create, notify user?
      }
    });
  }

  function addUserTags(tag){
    const url = "http://127.0.0.1:8000/tags";

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          user_id: props.user.user_id,
          tag_name: tag.tag_name,
          color: tag.tag_color.substring(1)
        })
    })
    .then(res => res.json())
    .then(msg => {
      // console.log(msg);
      if(msg.message === "Tag created successfully.") {
        getTags();
      } else {
        // tag failed to create, notify user?
      }
    });
  }

  function deleteUserTags(tags){
    tags.forEach(item => {
      const deleteID = userTags.filter(tag => tag.tag_name === item)[0].tag_id;
      // console.log("deleteID" + deleteID);
      const url = "http://127.0.0.1:8000/tags/" + deleteID;
      fetch(url, {
          method: 'DELETE'
      })
      .then(res => res.json())
      .then(msg => {
        if(msg.message === "Tag was deleted successfully!") {
          

          getTags();
        } else {
          // task failed to create, notify user?
        }
      });
    });
  }

  return (
    <div>
      <CreateArea 
        onAdd={addTodoItem} 
        userTags={userTags}
        addUserTags={addUserTags}
        deleteUserTags={deleteUserTags}
      />
      <FilterArea
    	  userTags={userTags}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        tagsFilter={tagsFilter}
        handleStatusFilter={handleStatusFilter}
        handleDateFilter={handleDateFilter}
        handleTagsFilter={handleTagsFilter}
        resetFilters={resetFilters}
      />
      <div className="todoItem-display">
        {displayedItems.map((theItem, index) => {
          return (
            <div key={theItem.key} className="todoItem-wrapper">
              <TodoItem
                theKey={theItem.key}
                id={index}
                task_id={theItem.task_id}
                task_name={theItem.task_name}
                description={theItem.description}
                status={theItem.status}
                userTags={userTags}
                tag_list={theItem.tag_list}
                due_date={theItem.due_date}
                onDelete={deleteTodoItem} 
                onChange={setTodoItems}  
                onUpdate={updateTodoItem}
                />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ListSection;
