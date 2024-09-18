import React, { Component } from 'react';

function Task({renderTask, onEdit,stt}) {
  let elementLevel = <span className="label label-default">Small</span>
  if(renderTask.level === 2){
    elementLevel = <span className="label label-warning">Medium</span>
  }
  else if(renderTask.level === 3){
    elementLevel = <span className="label label-danger">High</span>
  }
  const handleEdit = (toggle,actionName) =>{ 
    onEdit(toggle,actionName, renderTask);
  }
        return (
            <>
             <tbody>
          <tr>
            <td className="text-center">{stt}</td>
            <td>
              {renderTask.taskName}
            </td>
            <td className="text-center">
              {elementLevel}
            </td>
            <td>
              <button type="button" className="btn btn-warning"  onClick={()=>handleEdit(true,'Update')}>
                Edit
              </button>
              <button type="button" className="btn btn-danger"  onClick={()=>handleEdit(false,'Delete')}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>   
            </>
        );
    }

export default Task;