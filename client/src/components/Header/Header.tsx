import { Button, Subtitle1 } from "@fluentui/react-components";
import TrackerIcon from "../../../icons/TrackerIcon";
import { WeatherSunnyRegular } from "@fluentui/react-icons";
import BurgerMenu from "./BurgerMenu";

interface IHeader {
  onToggleTheme: () => void;
}

export default function Header(props: IHeader) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Left */}
      <BurgerMenu />

      {/* Center */}
      <Subtitle1 style={{ display: "flex", alignItems: "center" }}>
        <TrackerIcon height={32} width={32} style={{ marginRight: "5px" }} />
        Gym Tracker
      </Subtitle1>

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
