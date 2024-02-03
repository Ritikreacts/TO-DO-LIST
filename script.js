
const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

// Load todo items from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadToDoList();
});

item.addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        addToDo(this.value);
        this.value = '';
        // Save todo items to local storage after adding a new item
        saveToDoList();
    }
});

const addToDo = (item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    ${item}
    <i class="fa-solid fa-x"></i>
    `;
    listItem.addEventListener('click', function () {
        this.classList.toggle('done');
        // Save todo items to local storage after marking an item as done
        saveToDoList();
    });
    listItem.querySelector("i").addEventListener('click', function () {
        listItem.remove();
        // Save todo items to local storage after removing an item
        saveToDoList();
    });
    toDoBox.appendChild(listItem);
    // Save todo items to local storage after adding an item
    saveToDoList();
};

const saveToDoList = () => {
    const todoItems = Array.from(toDoBox.children).map(item => ({
        text: item.firstChild.textContent.trim(),
        done: item.classList.contains('done')
    }));
    localStorage.setItem('todoList', JSON.stringify(todoItems));
};

const loadToDoList = () => {
    const storedToDoList = localStorage.getItem('todoList');
    if (storedToDoList) {
        const todoItems = JSON.parse(storedToDoList);
        todoItems.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            ${item.text}
            <i class="fa-solid fa-x"></i>
            `;
            if (item.done) {
                listItem.classList.add('done');
            }
            listItem.addEventListener('click', function () {
                this.classList.toggle('done');
                saveToDoList();
            });
            listItem.querySelector("i").addEventListener('click', function () {
                listItem.remove();
                saveToDoList();
            });
            toDoBox.appendChild(listItem);
        });
    }
};
