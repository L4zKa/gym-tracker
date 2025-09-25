import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { AddRegular, DismissRegular, TextAlignJustifyRegular } from "@fluentui/react-icons";
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
      label: "Exercises",
      icon: <DismissRegular />,
      link: "/exercises",
    },
    { label: "Plans", icon: <AddRegular />, link: "/plans" },
    { label: "Days", icon: <LogsIcon />, link: "/days" },
    { label: "FrogTheme", icon: <LogsIcon />, link: "/frog" },
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
          {menuItems.map((item, i) => (
            <a
              style={{ textDecoration: "none" }}
              key={i}
              href={"http://localhost:5173" + item.link}
            >
              <MenuItem key={i} onClick={() => navigate(item.link)} /* icon={item.icon} */>
                {item.label}
              </MenuItem>
            </a>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
