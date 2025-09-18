import { Button, Subtitle1 } from "@fluentui/react-components";
import TrackerIcon from "../../../icons/TrackerIcon";
import { WeatherSunnyRegular } from "@fluentui/react-icons";
import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";

interface IHeader {
  onToggleTheme: () => void;
}

export default function Header(props: IHeader) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Left */}
      <BurgerMenu />

      {/* Center */}
      <Button appearance="transparent" onClick={() => navigate("/")}>
        <Subtitle1 style={{ display: "flex", alignItems: "center" }}>
          <TrackerIcon height={32} width={32} style={{ marginRight: "5px" }} />
          Gym Tracker
        </Subtitle1>
      </Button>

      {/* Right */}
      <Button
        onClick={props.onToggleTheme}
        size="large"
        icon={<WeatherSunnyRegular className="spinButton" />}
        appearance="transparent"
        aria-label="Theme wechseln"
      />
    </div>
  );
}
