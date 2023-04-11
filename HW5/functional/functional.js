(function () {
    const TASK_STATE_KEY = "taskAppState";
    let state = undefined;

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @param {string[]} saveToLS
     * @return {[T, function(T): void]}
     */
    function useState(initialValue, { saveToLS }) {
        if (!state && saveToLS) {
            state = readStateFromLocalStorage(initialValue);
            if (!state) {
                writeStateToLocalStorage(initialValue, saveToLS);
            }
        }
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            writeStateToLocalStorage(newValue, saveToLS);
            renderApp();
        }
        return [state, setValue];
    }

    /**
     * Read the state from the app's local storage and complete with initial value
     * @param {Object} initialValue
     * @return {Object}
     */
    function readStateFromLocalStorage(initialValue) {
        const savedState = JSON.parse(localStorage.getItem(TASK_STATE_KEY));
        if (!savedState) {
            return null;
        }
        return { ...initialValue, ...savedState };
    }

    /**
     * Write the state to the local storage
     * @param {Object} newState
     * @param {string[]} saveToLS
     * @return {void}
     */
    function writeStateToLocalStorage(newState, saveToLS) {
        if (!saveToLS) {
            return;
        }
        const stateToKeep = Object.fromEntries(
            Object.entries(newState).filter(([key]) => saveToLS.includes(key))
        );
        localStorage.setItem(TASK_STATE_KEY, JSON.stringify(stateToKeep));
    }

    /**
     * Functional component for the list
     * @param {HTMLElement[]} items
     * @param {string} styleClass
     * @return {HTMLUListElement} - List element
     */
    function List({ items, styleClass }) {
        const listItems = items.map((item) => {
            const li = document.createElement("li");
            li.append(item);
            return li;
        });

        const ul = document.createElement("ul");
        ul.classList.add(styleClass);
        ul.append(...listItems);
        return ul;
    }

    /**
     * Functional component for the button
     * @param {string} text
     * @param {function} onClick
     * @param {boolean} enabled
     * @param {string[]} styleClass
     * @param {string} type
     * @return {HTMLButtonElement} - Button element
     */
    function Button({ text, onClick, enabled = true, styleClass, type }) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = onClick;
        if (type) {
            button.type = type;
        }
        if (!enabled) {
            disableButton(button);
        }
        button.classList.add(...styleClass);
        return button;
    }

    /**
     * Functional component for the task
     * @param {string} title
     * @param {function} onComplete
     * @param {function} onDelete
     * @return {HTMLDivElement}
     */
    function Task({ title, onComplete, onDelete }) {
        const taskRow = document.createElement("div");
        taskRow.classList.add("task-row");

        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.value = title;
        checkbox.onchange = () => {
            if (checkbox.checked) {
                onComplete(title);
            }
        };
        const text = document.createElement("label");
        text.classList.add("task-row__title");
        text.innerHTML = title;

        const bucketIcon = document.createElement("img");
        bucketIcon.src = "bucket.svg";
        bucketIcon.classList.add("bucket-icon");
        bucketIcon.onclick = () => {
            onDelete(title);
        };
        taskRow.append(checkbox, text, bucketIcon);
        return taskRow;
    }

    /**
     * Functional component for the completed task
     * @param {string} title
     * @return {HTMLDivElement}
     */
    function CompletedTask({ title }) {
        const taskRow = document.createElement("div");
        taskRow.classList.add("task-row");

        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.checked = "true";
        checkbox.disabled = "true";
        checkbox.value = title;

        const text = document.createElement("label");
        text.classList.add("task-row__title", "task-row__title--completed");
        text.innerHTML = title;

        taskRow.append(checkbox, text);
        return taskRow;
    }

    /**
     * Functional component for the header
     * @param {string} text
     * @param {number} level
     * @param {string} styleClass
     * @return {HTMLHeadingElement}
     */
    function Header({ text, level, styleClass }) {
        const header = document.createElement(`h${level || 1}`);
        if (level === 1) {
            header.classList.add("header", styleClass);
        } else if (level === 2) {
            header.classList.add("subheader", styleClass);
        }
        header.innerHTML = text;
        return header;
    }

    /**
     * Functional component for the search
     * @param {string} placeholder
     * @param {function} onSearch
     * @param {string} query
     * @param {boolean} isFocused
     * @return {HTMLInputElement}
     */
    function Search({ placeholder, onSearch, query, isFocused }) {
        const search = InputText({
            placeholder,
            onInput: () => onSearch(search.value),
            name: "search",
            type: "search",
            value: query,
            setFocus: isFocused,
        });
        return search;
    }

    /**
     * Functional component for the input text
     * @param {string} placeholder
     * @param {function} onSearch
     * @param {string} query
     * @param {boolean} isFocused
     * @return {HTMLInputElement}
     */
    function InputText({
        placeholder,
        onInput,
        name,
        type = "text",
        value = "",
        setFocus = false,
    }) {
        const input = document.createElement("input");
        input.placeholder = placeholder;
        input.type = type;
        input.value = value;
        input.classList.add("input-text");
        input.name = name;
        input.oninput = onInput;
        input.autocomplete = "off";
        if (setFocus) {
            setTimeout(() => {
                input.focus();
            }, 0);
        }
        return input;
    }

    /**
     * Functional component for the popup
     * @param {function} onClickAdd
     * @return {HTMLDivElement}
     */
    function Popup({ onClickAdd }) {
        const popupContainer = document.createElement("div");
        const overlay = Overlay();
        const header = Header({ text: "Add New Task" });
        const form = document.createElement("form");
        form.onsubmit = (event) => {
            event.preventDefault;
            if (!titleInput.value) {
                return;
            }
            onClickAdd(titleInput.value);
        };
        const titleInput = InputText({
            placeholder: "Task Title",
            onInput: () => {
                if (titleInput.value) {
                    enableButton(addButton);
                } else {
                    disableButton(addButton);
                }
            },
            name: "taskTitle",
            setFocus: true,
        });
        const cancelButton = Button({
            text: "Cancel",
            onClick: () => {
                popupContainer.remove();
                disableButton(addButton);
            },
            styleClass: ["cancel-btn"],
            type: "reset",
        });
        const addButton = Button({
            text: "Add Task",
            enabled: false,
            styleClass: ["add-task-btn", "confirm-btn"],
            type: "submit",
        });

        form.append(titleInput, cancelButton, addButton);

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.append(header, form);

        popupContainer.append(popup, overlay);
        return popupContainer;
    }

    /**
     * Functional component for the blurring background under popup
     * @return {HTMLDivElement}
     */
    function Overlay() {
        const overlayContainer = document.createElement("div");
        overlayContainer.classList.add("overlay");
        return overlayContainer;
    }

    /**
     * Makes a button disabled
     * @param {HTMLButtonElement} button
     * @return {void}
     */
    function disableButton(button) {
        button.setAttribute("disabled", "true");
    }

    /**
     * Makes a button enabled
     * @param {HTMLButtonElement} button
     * @return {void}
     */
    function enableButton(button) {
        button.removeAttribute("disabled");
    }

    /**
     * App container
     * @return {HTMLDivElement} - The app container
     */
    function App() {
        const [appState, setAppState] = useState(
            {
                allTasks: ["Task 1 Title", "Task 2 Title", "Task 3 Title"],
                completedTasks: [
                    "Completed Task 1 Title",
                    "Completed Task 2 Title",
                    "Completed Task 3 Title",
                ],
                searchQuery: "",
                lastAction: null,
            },
            { saveToLS: ["allTasks", "completedTasks"] }
        );

        /**
         * Creates a new task from the popup and saves it in the app's state
         * @param {string} title
         * @return {void}
         */
        function addNewTask(title) {
            setAppState({
                ...appState,
                lastAction: "Add Task",
                allTasks: [...appState.allTasks, title],
            });
        }

        /**
         * Moves a task from general list to completed
         * @param {string} title
         * @return {void}
         */
        function addCompletedTask(title) {
            setAppState({
                ...appState,
                lastAction: "Complete Task",
                allTasks: appState.allTasks.filter((task) => task !== title),
                completedTasks: [...appState.completedTasks, title],
            });
        }

        /**
         * Deletes a task from 'All Tasks' list
         * @param {string} title
         * @return {void}
         */
        function deleteTask(title) {
            setAppState({
                ...appState,
                lastAction: "Delete Task",
                allTasks: appState.allTasks.filter((task) => task !== title),
            });
        }

        /**
         * Stores the last input value in the app's state
         * @param {string} query
         * @return {void}
         */
        function updateQuery(query) {
            setAppState({
                ...appState,
                lastAction: "Search Query",
                searchQuery: query,
            });
        }

        /**
         * Filters string tasks so that they match a search query
         * and then converts each string task into Task component
         * @return {HTMLDivElement[]}
         */
        function createTasks() {
            return appState.allTasks
                .filter((task) =>
                    task
                        .toLowerCase()
                        .includes(appState.searchQuery.toLowerCase())
                )
                .map((title) =>
                    Task({
                        title,
                        onComplete: addCompletedTask,
                        onDelete: deleteTask,
                    })
                );
        }

        /**
         * Converts each string completed task into CompletedTask component
         * @return {HTMLDivElement[]}
         */
        function createCompletedTasks() {
            return appState.completedTasks.map((title) =>
                CompletedTask({ title })
            );
        }

        /**
         * Creates top panel with the search and '+ new task' button
         * @return {HTMLDivElement}
         */
        function makeTopPanel() {
            const search = Search({
                placeholder: "Search Task",
                onSearch: updateQuery,
                query: appState.searchQuery,
                isFocused: appState.lastAction === "Search Query",
            });
            const showPopup = () => {
                appWrapper.append(Popup({ onClickAdd: addNewTask }));
            };
            const taskButton = Button({
                text: "+ New Task",
                onClick: showPopup,
                styleClass: [
                    "new-task-btn",
                    "top-panel__new-task-btn",
                    "confirm-btn",
                ],
            });
            const topPanel = document.createElement("div");
            topPanel.classList.add("top-panel");
            topPanel.append(search, taskButton);
            return topPanel;
        }

        /**
         * Creates a tasks section containing all and completed tasks
         * @return {HTMLDivElement}
         */
        function makeTasksSection() {
            const allTasksHeader = Header({
                text: "All Tasks",
                level: 2,
                styleClass: "tasks-section__subheader",
            });
            const unfinishedList = List({
                items: createTasks(),
                styleClass: "task-section",
            });
            const completedTasksHeader = Header({
                text: "Completed Tasks",
                level: 2,
                styleClass: "tasks-section__subheader",
            });
            const finishedList = List({
                items: createCompletedTasks(),
                styleClass: "task-section",
            });
            const tasksSection = document.createElement("div");
            tasksSection.classList.add("tasks-section");
            tasksSection.append(
                allTasksHeader,
                unfinishedList,
                completedTasksHeader,
                finishedList
            );
            return tasksSection;
        }

        const header = Header({
            text: "To Do List",
            level: 1,
            styleClass: "app-wraper__header",
        });

        const appWrapper = document.createElement("div");
        appWrapper.classList.add("app-wrapper");
        appWrapper.append(header, makeTopPanel(), makeTasksSection());
        return appWrapper;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.classList.add("app-container");
        appContainer.innerHTML = "";
        appContainer.append(App());
    }

    // initial render
    renderApp();
})();
