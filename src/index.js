import { StrictMode } from "react";
import ReactDOM from "react-dom";

import UserList from "./UserList";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserList />
  </StrictMode>,
  rootElement
);
