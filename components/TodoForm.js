import { useState } from "react";
const TodoForm = () => {
  const [taskName, setTaskName] = useState("");
  const [unCompleted, setUnCompleted] = useState(
    JSON.parse(localStorage.getItem("taskifyPending")) ?? []
  );
  const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem("taskifyCompleted")) ?? []);

  //add tasks to an array
  const handleAddTask = () => {
    console.log("taskName :::", taskName);
    let pendingTasks = JSON.parse(localStorage.getItem("taskifyPending")) ?? [];
    if (pendingTasks.length == 0) {
      setUnCompleted([taskName]);
      localStorage.setItem("taskifyPending", JSON.stringify([taskName]));
    } else if (pendingTasks.length > 0) {
      setUnCompleted([taskName, ...pendingTasks]);
      localStorage.setItem(
        "taskifyPending",
        JSON.stringify([taskName, ...pendingTasks])
      );
    }
    console.log(pendingTasks);
    setTaskName("");
  };

  //delete a task
  function handleRemoveTask(index) {
    console.log("index to delete :::", index);
    let tasksAfterRemoving = unCompleted.filter((t, i) => i!==index );
    setUnCompleted(tasksAfterRemoving);
    localStorage.setItem("taskifyPending", JSON.stringify(tasksAfterRemoving));
  }

  //change task to completed
  function handleCompleteTask(index) {
    console.log("index to success :::", index);
    handleRemoveTask(index)
    let completedTask = unCompleted.filter((t, i) => i==index);
    console.log(typeof completedTask[0], completedTask[0]);
    let completedTasksArray =
      JSON.parse(localStorage.getItem("taskifyCompleted")) ?? []
    if(completedTasksArray.length==0){
      setCompleted([...completedTask]);
      localStorage.setItem("taskifyCompleted", JSON.stringify([...completedTask]));
    }else if (completedTasksArray.length > 0) {
      setCompleted([...completedTasksArray, ...completedTask]);
      localStorage.setItem(
        "taskifyCompleted",
        JSON.stringify([...completedTasksArray, ...completedTask])
      );
    }
  }

  //remove completed task
  const handleRemoveCompletedTask = (index) => {
    let tasksAfterRemoving = completed.filter((t, i) => i !== index);
    setCompleted(tasksAfterRemoving);
    localStorage.setItem(
      "taskifyCompleted",
      JSON.stringify(tasksAfterRemoving)
    );
  }

  //
  const handleChangeTaskToPending = (index, text) => {
    let completedTasksArr = completed.filter((t, i) => i!==index);
    localStorage.setItem("taskifyCompleted", JSON.stringify(completedTasksArr));
    setCompleted(completedTasksArr);

    let uncompletedTask = completed.filter((t, i) => i==index);
    let uncompletedTaskArr = [...uncompletedTask, ...unCompleted];
    setUnCompleted(uncompletedTaskArr);
    localStorage.setItem("taskifyPending", JSON.stringify(uncompletedTaskArr));
  };

  return (
		<>
			<div className="mx-auto p-2 d-flex" style={{ width: "500px" }}>
				<input
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					type="text"
					className="form-control border border-3"
					placeholder="Add your tasks here"
				/>
				<button onClick={handleAddTask} className="btn border border-3">
					➕
				</button>
			</div>
			{/* tasks display section */}
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 border border-2 mx-1">
						<div className="text-center text-warning h3">
							Pending 🟠
						</div>
						{unCompleted?.length == 0 && (
							<p className="lead text-secondary text-center my-5">
								"Free as a bird! No tasks in sight!"
							</p>
						)}

						{unCompleted?.map((t, i) => (
							<div
								class="alert alert-warning d-flex justify-content-between"
								role="alert"
								key={i}
							>
								<div>{t}</div>
								<div className="">
									<span style={{cursor:"pointer"}} className="mx-1" onClick={() => handleRemoveTask(i)}>
                                        🗑️
                                    </span>
									<span style={{cursor:"pointer"}} className="mx-1" onClick={() => handleCompleteTask(i)}>
										✅
									</span>
								</div>
							</div>
						))}
					</div>
					<div className="col-12 col-md-5 border border-2 mx-1">
						<div className="text-center text-success h3">
							Completed 🟢
						</div>
						{completed?.length == 0 && (
							<p className="lead text-secondary text-center my-5">
								"Looks like you are on a vacation!"
							</p>
						)}
						{completed?.map((t, i) => (
							<div
								class="alert alert-success d-flex justify-content-between"
								role="alert"
								key={i}
							>
								<div>{t}</div>
								<div className="">
									<span style={{cursor:"pointer"}} className="mx-1" onClick={() => handleChangeTaskToPending(i, t)}>
										⌛
									</span>
									<span style={{cursor:"pointer"}} className="mx-1" onClick={() => handleRemoveCompletedTask(i)}>
										🗑️
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
  );
}

export default TodoForm;