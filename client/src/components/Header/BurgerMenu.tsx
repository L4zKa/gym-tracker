import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  AddRegular,
  DismissRegular,
  TextAlignJustifyRegular,
} from "@fluentui/react-icons";
import LogsIcon from "../../../icons/LogsIcon";
import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IMenuItem {
  label: string;
  icon: React.ReactElement;
  link: string;
}

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuItems: IMenuItem[] = [
    {
      label: "Wokrout Templates",
      icon: <DismissRegular />,
      link: "/workoutTemplates",
    },
    { label: "Add Workout", icon: <AddRegular />, link: "/addWorkout" },
    { label: "Log - Viewer", icon: <LogsIcon />, link: "/logViewer" },
  ];
  return (
    <Menu onOpenChange={() => setMenuOpen(!menuOpen)}>
      <MenuTrigger>
        <Button
          icon={menuOpen ? <DismissRegular /> : <TextAlignJustifyRegular />}
          appearance="transparent"
        />
      </MenuTrigger>
      <MenuPopover style={{ overflowY: "hidden" }}>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem onClick={() => navigate(item.link)} icon={item.icon}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
