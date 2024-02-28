const taskIDDOM = document.querySelector('.task-edit-id');
const taskDescriptionDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempDescription;

const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { id: taskID, isCompleted, description } = task;

    taskIDDOM.textContent = taskID;
    taskDescriptionDOM.value = description;
    tempDescription = description;
    if (isCompleted) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...';
  e.preventDefault();
  try {
    const taskDescription = taskDescriptionDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      description: taskDescription,
      isCompleted: taskCompleted,
    });

    const { id: taskID, isCompleted, description } = task;

    taskIDDOM.textContent = taskID;
    taskDescriptionDOM.value = description;
    tempDescription = description;
    if (isCompleted) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.error(error);
    taskDescriptionDOM.value = tempDescription;
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = 'Edit';
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
