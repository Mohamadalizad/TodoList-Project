// get todos from localStorage
let todos = localStorage.getItem("todos")

// try parse data or null
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch (e) {
    todos = null
}

// set default value if todos == null
if (!todos) {
    todos = [
        { content: "shopping", status: true },
        { content: "watch video", status: false },
        { content: "Like videos", status: true },
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}
// func to create or update todos List == null
function createTodos(todos) {
    let todosList = document.querySelector("#todos-List")
    todosList.innerHTML = ""

    // create list tag for each todo
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item d-flex justify-content-between"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? "initial" : 'line-through'
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "./media/delete.png"
        deleteBtn.alt = "delete icon"

        // appened content and deleteBtn to li
        li.append(content)
        li.append(deleteBtn)

        todosList.append(li)

        // add deleteBtn functionality
        deleteBtn.addEventListener("click", e => {
            todos.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })

        // add complete functionality
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    })
}
createTodos(todos)

// action add and search
let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action => {
    // add todo
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="add" class="form-control p-0 m-0">
                    <input type="text" name="add" class="d-inline-block w-100" placeholder="Add Todos ...">
                </form>
            `
            createTodos(todos)
            let add = document.querySelector("#add")
            add.addEventListener("submit", e =>{
                e.preventDefault()
                if(add.add.value){
                    todos.push({content: add.add.value , status: true})
                    add.add.value = ""
                    localStorage.setItem("todos", JSON.stringify(todos))
                    createTodos(todos)
                    
                }
            })
        })
    }
    // search todo
    else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="search" class="form-control p-0">
                    <input type="text" name="search" class="d-inline-block w-100" placeholder="Search Todos ...">
                </form>
            `
            let search = document.querySelector("#search")
            search.addEventListener("keyup", e =>{
                e.preventDefault()
                if(search.search.value){
                    let filterd_todos = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filterd_todos)
                }
                else{
                    createTodos(todos)
                }
            })
        })
    }
})

