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
  function Button({ text, onClick, enabled = true }) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    if (!enabled) {
      disableButton(button);
    }
    return button;
  }

  //Header component
  function Header({ text, level }) {
    const header = document.createElement(`h${level || 1}`);
    header.innerHTML = text;
    return header;
  }

  //Search component
  function Search({ placeholder }) {
    const search = document.createElement("input");
    search.setAttribute("type", "search");
    search.setAttribute("placeholder", placeholder);
    return search;
  }

  function InputText({ placeholder, onInput }) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("required", "true");
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
    });

    function addNewTask(value) {
      setAppState({
        ...appState,
        allTasks: [...appState.allTasks, value],
      });
    }

    function addCompletedTask() {
      setAppState({
        ...appState,
        completedTasks: [
          ...appState.completedTasks,
          `Completed Task ${appState.completedTasks.length + 1} Title`,
        ],
      });
    }

    const div = document.createElement("div");
    const header = Header({ text: "To Do List", level: 1 });
    const search = Search({ placeholder: "Search Task" });
    const taskButton = Button({
      text: "+ New Task",
      onClick: () => showComponent(popup),
    });
    const allTasksHeader = Header({ text: "All Tasks", level: 2 });
    const unfinishedList = List({ items: appState.allTasks });
    const completedTasksHeader = Header({ text: "Completed Tasks", level: 2 });
    const finishedList = List({ items: appState.completedTasks });
    const popup = Popup(addNewTask);

    div.append(
      header,
      search,
      taskButton,
      allTasksHeader,
      unfinishedList,
      completedTasksHeader,
      finishedList,
      popup
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
