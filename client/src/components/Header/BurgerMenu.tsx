import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  Delete12Filled,
  DismissRegular,
  TextAlignJustifyRegular,
} from "@fluentui/react-icons";
import LogsIcon from "../../../icons/LogsIcon";
import { useState } from "react";
import "./burgermenu.css";

export default function BurgerMenu() {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <Menu>
      <MenuTrigger>
        <Button
          className={`rotate-btn ${clicked ? "rotated" : ""}`}
          onClick={() => setClicked(!clicked)}
          icon={clicked ? <DismissRegular /> : <TextAlignJustifyRegular />}
          appearance="transparent"
        />
      </MenuTrigger>
      <MenuPopover style={{ overflowY: "hidden" }}>
        <MenuList>
          <MenuItem icon={<LogsIcon />}>Log - Viewer</MenuItem>
          <MenuItem icon={<LogsIcon />}>Log - Viewer</MenuItem>
          <MenuItem icon={<LogsIcon />}>Log - Viewer</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
