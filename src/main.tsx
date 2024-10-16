import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { sidebar1Added, ___ROOT, Item } from "@/redux/sidebar-level-1/sidebar-level-1-slice";

const items: Item[] = [
  { id: "1", name: "Folder 1", type: "Folder", parentId: ___ROOT.id, childrenIds: [] },
  { id: "2", name: "File 1", type: "File", parentId: ___ROOT.id, childrenIds: [] },
  { id: "3", name: "Folder 2", type: "Folder", parentId: ___ROOT.id, childrenIds: [] },
  { id: "4", name: "File 2", type: "File", parentId: ___ROOT.id, childrenIds: [] },
  { id: "5", name: "Subfolder 1", type: "Folder", parentId: "1", childrenIds: [] },
  { id: "6", name: "Subfile 1", type: "File", parentId: "2", childrenIds: [] },
  { id: "7", name: "Subfolder 2", type: "Folder", parentId: "3", childrenIds: [] },
  { id: "8", name: "Subfile 2", type: "File", parentId: "3", childrenIds: [] },
  { id: "9", name: "Deep Folder", type: "Folder", parentId: "5", childrenIds: [] },
  { id: "10", name: "Deep File", type: "File", parentId: "9", childrenIds: [] },
];

// Add items to the root
store.dispatch(sidebar1Added({ newItem: items[0] }));
store.dispatch(sidebar1Added({ newItem: items[1] }));
store.dispatch(sidebar1Added({ newItem: items[2] }));
store.dispatch(sidebar1Added({ newItem: items[3] }));

// Add nested items
store.dispatch(sidebar1Added({ newItem: items[4] }));
store.dispatch(sidebar1Added({ newItem: items[5] }));
store.dispatch(sidebar1Added({ newItem: items[6] }));
store.dispatch(sidebar1Added({ newItem: items[7] }));

// Add deeply nested items
store.dispatch(sidebar1Added({ newItem: items[8] }));
store.dispatch(sidebar1Added({ newItem: items[9] }));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
