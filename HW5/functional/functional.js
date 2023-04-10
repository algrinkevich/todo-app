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
  function List({ items }) {
    const listItems = items.map((item) => {
      const li = document.createElement("li");
      li.append(item);
      return li;
    });

    const ul = document.createElement("ul");
    ul.append(...listItems);
    return ul;
  }

  /**
   * Button component
   * @param text {string}
   * @param onClick {function}
   * @returns {HTMLButtonElement} - Button element
   */
  function Button({ text, onClick, enabled = true, styleClass }) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    if (!enabled) {
      disableButton(button);
    }
    button.classList.add(...styleClass);
    return button;
  }

  function Task({ title, onComplete, onDelete }) {
    const div = document.createElement("div");
    div.classList.add("task-row");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = title;
    checkbox.onchange = () => {
      if (checkbox.checked) {
        onComplete();
      }
    };

    const label = document.createElement("label");
    label.innerHTML = title;

    const img = document.createElement("img");
    img.src = "bucket.svg";
    img.classList.add("bucket-icon");

    img.onclick = () => {
      onDelete();
    };

    div.append(checkbox, label, img);
    return div;
  }

  function CompletedTask({ title }) {
    const div = document.createElement("div");
    div.classList.add("task-row");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = "true";
    checkbox.value = title;

    const label = document.createElement("label");
    label.innerHTML = title;

    div.append(checkbox, label);
    return div;
  }

  //Header component
  function Header({ text, level }) {
    const header = document.createElement(`h${level || 1}`);
    if (level === 1) {
      header.classList.add("app-header");
    } else if (level === 2) {
      header.classList.add("subheader");
    }

    header.innerHTML = text;
    return header;
  }

  //Search component
  function Search({ placeholder, onSearch, query, isFocused }) {
    const search = document.createElement("input");

    if (isFocused) {
      setTimeout(() => {
        search.focus();
      }, 0);
    }

    search.classList.add("search");
    search.setAttribute("type", "search");
    search.setAttribute("placeholder", placeholder);
    search.value = query;
    search.oninput = () => {
      onSearch(search.value);
    };
    return search;
  }

  function InputText({ placeholder, onInput }) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("required", "true");
    input.classList.add("search");
    input.oninput = onInput;
    return input;
  }

  //Modal component
  function Popup(onClickAdd) {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("hidden");

    const overlay = Overlay();
    const header = Header({ text: "Add New Task" });
    const titleInput = InputText({
      placeholder: "Task Title",
      onInput: () => {
        if (titleInput.value) {
          enableButton(addButton);
        } else {
          disableButton(addButton);
        }
      },
    });
    const cancelButton = Button({
      text: "Cancel",
      onClick: () => hideComponent(popupContainer),
      styleClass: ["cancel-btn"],
    });
    const addButton = Button({
      text: "Add Task",
      onClick: () => {
        if (!titleInput.value) {
          return;
        }
        onClickAdd(titleInput.value);
      },
      enabled: false,
      styleClass: ["add-task-btn", "confirm-btn"],
    });

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.append(header, titleInput, cancelButton, addButton);

    popupContainer.append(popup, overlay);
    return popupContainer;
  }

  function Overlay() {
    const div = document.createElement("div");
    div.classList.add("overlay");
    return div;
  }

  function showComponent(component) {
    component.classList.remove("hidden");
  }

  function hideComponent(component) {
    component.classList.add("hidden");
  }

  function disableButton(button) {
    button.setAttribute("disabled", "true");
  }

  function enableButton(button) {
    button.removeAttribute("disabled");
  }

  /**
   * App container
   * @returns {HTMLDivElement} - The app container
   */
  function App() {
    const [appState, setAppState] = useState({
      allTasks: ["Task 1 Title", "Task 2 Title", "Task 3 Title"],
      completedTasks: [
        "Completed Task 1 Title",
        "Completed Task 2 Title",
        "Completed Task 3 Title",
      ],
      searchQuery: "",
      lastAction: null,
    });

    function addNewTask(title) {
      setAppState({
        ...appState,
        lastAction: "Add Task",
        allTasks: [...appState.allTasks, title],
      });
    }

    function addCompletedTask(title) {
      setAppState({
        ...appState,
        lastAction: "Complete Task",
        allTasks: appState.allTasks.filter((task) => task !== title),
        completedTasks: [...appState.completedTasks, title],
      });
    }

    function deleteNewTask(title) {
      setAppState({
        ...appState,
        lastAction: "Delete Task",
        allTasks: appState.allTasks.filter((task) => task !== title),
      });
    }

    const div = document.createElement("div");
    const header = Header({ text: "To Do List", level: 1 });
    const search = Search({
      placeholder: "Search Task",
      onSearch: (query) => {
        setAppState({
          ...appState,
          lastAction: "Search Query",
          searchQuery: query,
        });
      },
      query: appState.searchQuery,
      isFocused: appState.lastAction === "Search Query",
    });
    const taskButton = Button({
      text: "+ New Task",
      onClick: () => showComponent(popup),
      styleClass: ["new-task-btn", "confirm-btn"],
    });
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    searchContainer.append(search, taskButton);

    const allTasksHeader = Header({ text: "All Tasks", level: 2 });
    const unfinishedList = List({
      items: appState.allTasks
        .filter((task) =>
          task.toLowerCase().includes(appState.searchQuery.toLowerCase())
        )
        .map((title) =>
          Task({
            title,
            onComplete: () => {
              addCompletedTask(title);
            },
            onDelete: () => {
              deleteNewTask(title);
            },
          })
        ),
    });
    const completedTasksHeader = Header({ text: "Completed Tasks", level: 2 });
    const finishedList = List({
      items: appState.completedTasks.map((title) => CompletedTask({ title })),
    });
    const tasksSection = document.createElement("div");
    tasksSection.classList.add("tasks-section");
    tasksSection.append(
      allTasksHeader,
      unfinishedList,
      completedTasksHeader,
      finishedList
    );
    const popup = Popup(addNewTask);

    div.append(header, searchContainer, tasksSection, popup);
    return div;
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
