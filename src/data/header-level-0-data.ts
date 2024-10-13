export type MenuItemAction =
  | { type: "dispatch"; action: string; payload?: any }
  | { type: "function"; handler: () => void };

export interface MenuItemProps {
  id: number;
  title: string;
  actions: {
    title: string;
    action: MenuItemAction;
  }[];
}

export const menuItems: MenuItemProps[] = [
  {
    id: 1,
    title: "Menu Item 1",
    actions: [
      { title: "Action 1", action: { type: "function", handler: () => console.log("Action 1 clicked") } },
      { title: "Action 2", action: { type: "function", handler: () => console.log("Action 2 clicked") } },
    ],
  },
  {
    id: 2,
    title: "View",
    actions: [
      { title: "Home", action: { type: "dispatch", action: "sidebar0/sidebar0Selected", payload: "Home" } },
      { title: "Query", action: { type: "dispatch", action: "sidebar0/sidebar0Selected", payload: "Query" } },
      {
        title: "Notifications",
        action: { type: "dispatch", action: "sidebar0/sidebar0Selected", payload: "Notifications" },
      },
    ],
  },
  {
    id: 3,
    title: "Menu Item 3",
    actions: [
      { title: "Action 5", action: { type: "function", handler: () => console.log("Action 5 clicked") } },
      { title: "Action 6", action: { type: "function", handler: () => console.log("Action 6 clicked") } },
    ],
  },
];
