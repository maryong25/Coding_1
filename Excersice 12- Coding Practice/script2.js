// Get references to the input field, button, and list
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const progress = document.querySelector("progress");

// Keep track of the number of completed tasks
let completedTasks = 0;


// Define the click event handler for the button

function addTask() {
  // Get the value of the input field
  const newTaskText = newTaskInput.value;

  // Create a new list item element with the new task text
  const newTaskListItem = document.createElement("li");



  // Create a new checkbox element and add it to the list item
  const newTaskCheckbox = document.createElement("input");
  newTaskCheckbox.type = "checkbox";
  newTaskListItem.appendChild(newTaskCheckbox);



  // Add the new task text to the list item
  const newTaskTextSpan = document.createElement("span");
  newTaskTextSpan.textContent = newTaskText;
  newTaskListItem.appendChild(newTaskTextSpan);

   // If the input is empty, show an alert message and do nothing
   if (newTaskText.trim() === "") {
    alert("Please enter a task");

    return;
  }

  // Add event listener for when the checkbox is clicked
  newTaskCheckbox.onclick = function() {

    if (newTaskCheckbox.checked) {
      // Increment the number of completed tasks and update the progress bar
      completedTasks++;
      progress.value = completedTasks;
    } else {
      // Decrement the number of completed tasks and update the progress bar
      completedTasks--;
      progress.value = completedTasks;
    }

    // Toggle the "done" class on the task item
    newTaskListItem.classList.toggle("done");
  };

  // Append the new task item to the list
  taskList.appendChild(newTaskListItem);

  // Update the max value of the progress bar
  progress.max = taskList.children.length;

  // Clear the input field
  newTaskInput.value = "";
}