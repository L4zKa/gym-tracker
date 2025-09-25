import { Button, Subtitle1, Image } from "@fluentui/react-components";
import Logo from "../../../pictures/LogoGymTracker.png";
import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
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
          <Image height={60} src={Logo} />
        </Button>
        <div /> {/* Only for alignment with space-between*/}
      </div>
      <hr style={{ marginBottom: "50px" }} />
    </>
  );
}
