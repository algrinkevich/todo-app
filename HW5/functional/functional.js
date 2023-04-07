(function () {
    let state = undefined;

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(initialValue) {
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            renderApp();
        }

        return [state, setValue];
    }

    /**
     * Functional component for the list
     * @param items {string[]}
     * @returns {HTMLElement} - List element
     */
     function List({items}) {
        const listItems = items.map((item) => `<li>${item}</li>`).join("");
        const ul = document.createElement("ul");
        ul.innerHTML = listItems;
        return ul;
    }

    /**
     * Button component
     * @param text {string}
     * @param onClick {function}
     * @returns {HTMLButtonElement} - Button element
     */
    function Button({text, onClick}) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = onClick;
        return button;
    }

    //Header component
    function Header({text, level}) {
        const header = document.createElement(`h${level || 1}`);
        header.innerHTML = text;
        return header;
    }

    //Search component
    function Search({placeholder}) {
        const search = document.createElement("input");
        search.setAttribute("type", "search");
        search.setAttribute("placeholder", placeholder);
        return search;
    }

    function InputText({placeholder}) {
        const input = document.createElement("input");
        input.setAttribute("placeholder", placeholder);
        return input;
    }

    //Modal component
    function Modal(overlay) {
        const div = document.createElement("div"); 

        function closeModal() {
            div.classList.add("hidden");
            overlay.classList.add("hidden");
        }

        div.classList.add("modal", "hidden");
        const header = Header({text: "Add New Task"});
        const inputModal = InputText({placeholder: "Task Title"});
        const cancelButton = Button({text: "Cancel", onClick: closeModal});
        const addButton = Button({text: "Add Task"});
        div.append(header, inputModal, cancelButton, addButton);
        return div;
    }

    function Overlay() {
        const div = document.createElement("div");
        div.classList.add("overlay", "hidden");
        return div;
    }

    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function App() {
        const [items, setItems] = useState(["Task 1 Title", "Task 2 Title", "Task 3 Title"]);
        const [completedItems, setCompletedItems] = useState([
            "Completed Task 1 Title", 
            "Completed Task 2 Title", 
            "Completed Task 3 Title"
        ]);

        function addItem() {
            setItems([...items, `Task ${items.length + 1} Title`]);
        }

        function addCompletedItem() {
            setCompletedItems([...completedItems, `Completed Task ${completedItems.length + 1} Title`]);
        }

        function openModal() {
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
        }


        const div = document.createElement("div");
        const header = Header({text: "To Do List", level: 1})
        const search = Search({placeholder: "Search Task"});
        const taskButton = Button({text: "+ New Task", onClick: openModal});
        const allTasksHeader = Header({text: "All Tasks", level: 2});
        const unfinishedList = List({items});
        const itemButton = Button({text: "Add item", onClick: addItem});
        const completedTasksHeader = Header({text: "Completed Tasks", level: 2});
        const finishedList = List({items: completedItems});
        const overlay = Overlay();
        const modal = Modal(overlay);
   

        div.append(
            header, 
            search, 
            taskButton, 
            allTasksHeader, 
            unfinishedList, 
            itemButton, 
            completedTasksHeader, 
            finishedList,
            modal,
            overlay
        );
        return div;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
    }

    // initial render
    renderApp();
})();