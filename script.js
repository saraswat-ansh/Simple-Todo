//SELECT DOM Element
const input = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

//try to load saved todo from localstorage(if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function savetodo() {
    // save current todos
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create a dom node for todo

function createtodonode(todo, index) {
    const li = document.createElement('li');

    //check to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //visual feedback
        textspan.style.textDecoration = todo.completed ? 'line-through' : "";
        savetodo();
    })

    //text of the todo
    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = '0 8px';
    if (todo.completed) {
        textspan.style.textDecoration = 'line-through';
    }
    //double- click
    textspan.addEventListener("dblclick", () => {
        const newtext = prompt("Edit Todo", todo.text);
        if (newtext !== null) {
            todo.text = newtext.trim()
            textspan.textContent = todo.text;
            savetodo();
        }
    })
    //delete todo button
    const delbtn = document.createElement('button');
    delbtn.textContent = "Delete";
    delbtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        savetodo();
    })
    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(delbtn);
    return li

}

//render the whole todo lidt from todos array
function render() {
    list.innerHTML = '';
    //recreate each item
    todos.forEach((todo, index) => {
        const node = createtodonode(todo, index);
        list.appendChild(node)
    });
}

function addtodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }
    //push a new todo odbject
    todos.push({ text: text, completed: false });
    input.value = '';
    render()
    savetodo()
}

addbtn.addEventListener("click", addtodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addtodo();
    }
})
render();