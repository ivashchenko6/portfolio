class TaskList {
  tasksList = [];
  id = 0;
  inputTask = document.querySelector('input');
  ulList = document.querySelector('.list-task');
  constructor() { }

  addTask() {
    const newTask = {
      id: this.tasksList.length + 1,
      task: this.inputTask.value,
      status: false
    } //created task-sample
    this.inputTask.value = ''; //clean up our input
    if (newTask.task) { //will add task if it`s not empty

      this.tasksList.push(newTask); //added new Task in List

    }

    const liElement = document.createElement('li');

    liElement.innerHTML = `
      <div class="task-item">
        <p>${newTask.id}. ${newTask.task}</p>

        <div class="div-buttons">
          <button class='done-status'>✔</button>
          <button class='not-done-status'>×</button>
        </div>

      </div>

    `;

    this.ulList.append(liElement); //add new Task in HTML to TODO list




    //
    this.activateButtonsInTCurrentTask()
  }
  activateButtonsInTCurrentTask() {

    const divBtns = document.querySelectorAll('.div-buttons');

    function eventForBtns(e) {


      let clickedBtn = e.target; //done-status or not-done-status button
      let clickedClass = clickedBtn.className; //current class from button :
      let textTask = clickedBtn.parentElement.parentElement.firstElementChild.textContent.split('.')[1].trim();// text from tag <p></p>
      let tagWithCurrentTaskText = clickedBtn.parentElement.parentElement.firstElementChild; //tag <p></p> for change styles



      if (clickedClass === 'done-status') { //if clickedBtn has class 'done-status'

        this.tasksList.find(currentTask => currentTask.task === textTask).status = true;
        tagWithCurrentTaskText.classList.add('doneText');

        clickedBtn.classList.remove(clickedClass);

        clickedBtn.classList.add('changeDoneBtn');
        clickedBtn.textContent = '★';

      } else if (clickedClass === 'not-done-status') { //if clickedBtn has class 'not-done-status'

        clickedBtn.parentElement.parentElement.parentElement.remove();

        this.tasksList.splice(this.tasksList.findIndex(currentTask => currentTask.task === textTask));

      } else { //if clickedBtn has class 'changeDoneBtn'

        tagWithCurrentTaskText.classList.remove('doneText');
        clickedBtn.classList.remove(clickedClass);
        clickedBtn.classList.add('done-status');
        this.tasksList.find(currentTask => currentTask.task === textTask).status = false;
        clickedBtn.textContent = '✔';
      }

    }


    divBtns.forEach(divBtn => {

      if (!divBtn.classList.contains('hasListener')) {


        divBtn.addEventListener('click', eventForBtns.bind(this));

        divBtn.classList.add('hasListener');

        console.log(divBtn);
      }

    })

  }

  //end of Class
}

let todo = new TaskList();
document.querySelector('.add-task').addEventListener('click', () => todo.addTask());
document.querySelector('input').addEventListener('keydown', (e) => (e.key === 'Enter') ? todo.addTask() : '')