import { useState } from "react";

const TodoForm = () => {
    const [taskName, setTaskName] = useState("");
    //add tasks to an array
    const handleAddTask = () => {
        console.log("taskName :::", taskName);
        let pendingTasks = JSON.parse(localStorage.getItem("taskifyPending")) ?? [];
        if(pendingTasks.length==0){
            pendingTasks = [taskName];
            localStorage.setItem("taskifyPending", JSON.stringify(pendingTasks));
        }else if(pendingTasks.length >0){
            pendingTasks = [taskName, ...pendingTasks]
            localStorage.setItem("taskifyPending", JSON.stringify(pendingTasks));
        }
        console.log(pendingTasks)
    }

    return (
      <div className="mx-auto p-2 d-flex" style={{width:"500px"}}>
        <input value={taskName} onChange={e => setTaskName(e.target.value)} type="text" className="form-control border border-3"  placeholder="Add your tasks here" />
        <button onClick={handleAddTask} className="btn border border-3">➕</button>
      </div>
    );
}

export default TodoForm;