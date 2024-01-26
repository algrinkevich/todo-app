# ToDo App
ToDo app is a simple application for managing daily tasks.

<img src="https://github.com/algrinkevich/todo-app/assets/8752900/f368757a-3386-41a8-881b-e4c64efc7648" width=500>
<img src="https://github.com/algrinkevich/todo-app/assets/8752900/d26d7994-2e54-4d9b-ade2-cac07ee237e7" width=500>

## Features
- Adding a new task;
- Marking the task as finished;
- Task deletion;
- Searching for a task;
- Task editing;
- Adding tags to a task;
- Filtering by tags;
- Search string appears in URL;
- Simultaneous filtering by tag and search string;
- Searching by substring preserves the state when the user refreshes the page;
- Modal with tasks planned for today appears;
- Weather for current location is displayed;
![demo](https://github.com/algrinkevich/quantori-js-school/raw/f2a9e1b09158597d391a6194e70321d5c3fe5466/HW5/demo-weather.gif)
- Synchronization between browser tabs;
![demo](https://github.com/algrinkevich/quantori-js-school/raw/449e86a5355e04dab2d1952c007b4974b226b544/HW5/demo-redux.gif)

## Technologies
- React, React-Router, Redux-Toolkit, Redux-Thunk;
- `json-server` for backend emulation (only for local deployment);
- local storage for storing the tasks (only for netlify deployment);

## Local deployment:
- Clone repository;
- Run `npm install`;
- Run `npm run server`;
- Run `npm run dev`.
