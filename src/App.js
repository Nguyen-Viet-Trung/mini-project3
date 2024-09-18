import './App.css';
import Title from './component/Title';
import Control from './component/Control';
import Form from './component/Form';
import ListTask from './component/ListTask';
import { useEffect, useState } from 'react';

function App() {
  const listTaskInit = [
    {taskId:1, taskName:"Lorem ipsum dolor sit amet,  Reiciendis ea a",level:1},
    {taskId:2, taskName:"Lorem ipsum dolor sit amet, Reiciendis ea b",level:2},
    {taskId:3, taskName:"Lorem ipsum dolor sit amet,  Reiciendis ea c",level:3},
    {taskId:4, taskName:"Lorem ipsum dolor sit amet,  Reiciendis ea d",level:1},
  ]
  //const [tasks, setTasks] = useState(listTaskInit);
  const [tasks, setTasks] = useState(() =>{
    const list = JSON.parse(localStorage.getItem('listTask'))
    if(list === null){
      return listTaskInit;
    }else{
      return list;
    }
  })
  useEffect(() => {
    localStorage.setItem('listTask', JSON.stringify(tasks))
    setTaskResult(tasks);
  }, [tasks])
  const [isToggle, setToggle] = useState(false)
  const handleCancleForm = (toggle) =>{
    setToggle(toggle);
  }

  const [task, setTask] = useState({taskId:0, taskName:"",level:2}) // State Form
  
  const [actionName, setActionName] = useState("Save")
  
  const handleAddOrEditTask = (toggle, actionName,task) =>{
    setToggle(toggle);
    if(actionName !== 'Delete'){
      setActionName(actionName);
    }    
    console.log(actionName);
    if(task === null){
      setTask({taskId:0, taskName:"",level:2})
    }else{
      setTask(task);     
      //xử lý thêm mới
      if(actionName=== 'Save'){
       
        setTasks((pre)=>{
          pre.sort((x,y)=>{
            return x.taskId - y.taskId;
          });
          //lấy id lớn nhất của listTask +1
          let id = pre.length <=0? 1: pre[pre.length -1].taskId +1;
          const taskAdd = {
            taskId: id,
            taskName: task.taskName,
            level: task.level
          };
       
          return [...pre, taskAdd]
        })
      }else if(actionName=== 'Update'){
        setTasks((pre)=>{
          for(let i = 0; i <pre.length ; i++){
            if(pre[i].taskId === task.taskId){
              pre[i] =task;
              break;
            }
          }
          return [...pre]
        })
      }else if(actionName === 'Delete'){
        setTasks((pre) =>{
          pre = pre.filter((x)=>x.taskId != task.taskId);
          return  [...pre]
        })
      }
    }

  }

  
  let elementForm = isToggle === true ?(<Form onCancel={handleCancleForm} actionName={actionName} renderTask = {task} onSubmit ={handleAddOrEditTask} ></Form>):("");
  const [keyword, setKeyword] = useState('');
  const [taskResults, setTaskResult] = useState([]);
  useEffect(()=>{
    if(keyword ===''){
      setTaskResult(tasks);
    }
    else{
      setTaskResult(taskResults);
    }
  },[tasks])
  const handleSearch = (keyword) =>{
    setKeyword(keyword);
    //tìm kiếm trong task
    if(keyword !== ''){
    let results = tasks.filter(x =>x.taskName.includes(keyword));
    setTaskResult(results);
  }
  else{
    setTaskResult(tasks);
  }
  }
  const handleSort=(sortField, sortBy) =>{
    let results = [];
    if(sortField ==="Name"){
      if(sortBy ==="ASC"){ 
        results = tasks.sort((x,y) =>{
          if(x.taskName > y.taskName){
            return 1;
          }
          else{
            return -1;
          }
        })
      }
      else{
        results = tasks.sort((x,y) =>{
          if(x.taskName < y.taskName){
            return 1;
          }
          else{
            return -1;
          }
        })
      }
        setTasks((pre)=>{
          pre=[...results];
          return pre;
        })

    }else if(sortField ==="Level"){
      if(sortBy ==="ASC"){
      results = tasks.sort((x,y)=>{
        return x.level - y.level;
      });
    }else{
      results = tasks.sort((x,y)=>{
        return y.level - x.level;
      });
    }
    setTasks((pre)=>{
      pre=[...results];
      return pre;
    })
    }
  }
  return (
    <div>
  <div className="container">
    {/* TITLE : START */}
    <div className="page-header">
      <Title></Title>
    </div>
    {/* TITLE : END */}
    {/* CONTROL (SEARCH + SORT + ADD) : START */}
    <div className="row">
      {/* SEARCH : START */}
      <Control onAddTask={handleAddOrEditTask} onSearch={handleSearch} onSort={handleSort}></Control>
    </div>
    {/* CONTROL (SEARCH + SORT + ADD) : END */}
    {/* FORM : START */}
    <div className="row">
      {elementForm}
    </div>
    {/* FORM : END */}
    {/* LIST : START */}
    <ListTask renderTasks = {taskResults} onEdit ={handleAddOrEditTask}></ListTask>
  </div>
  {/*
		This HTML file is a template.
		If you open it directly in the browser, you will see an empty page.
		You can add webfonts, meta tags, or analytics to this file.
		The build step will place the bundled scripts into the <body> tag.
		To begin the development, run `npm start` or `yarn start`.
		To create a production bundle, use `npm run build` or `yarn build`.
	*/}
  {/* jQuery (necessary for Bootstrap's JavaScript plugins) */}
  {/* Include all compiled plugins (below), or include individual files as needed */}
</div>

  );
}

export default App;
