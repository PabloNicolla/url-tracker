import { MenuItemProps } from "@/components/main-structure/level-0-menu-item";

export const menuItems: MenuItemProps[] = [
  {
    id: 1,
    title: "Menu Item 1",
    actions: [
      { title: "Action 1", onClick: () => console.log("Action 1 clicked") },
      { title: "Action 2", onClick: () => console.log("Action 2 clicked") },
    ],
  },
  {
    id: 2,
    title: "Menu Item 2",
    actions: [
      { title: "Action 3", onClick: () => console.log("Action 3 clicked") },
      { title: "Action 4", onClick: () => console.log("Action 4 clicked") },
    ],
  },
  {
    id: 3,
    title: "Menu Item 3",
    actions: [
      { title: "Action 5", onClick: () => console.log("Action 5 clicked") },
      { title: "Action 6", onClick: () => console.log("Action 6 clicked") },
    ],
  },
];
