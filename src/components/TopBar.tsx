import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const TopBar = () => {
  const useStyle = {
    barStyle: {
      backgroundColor: "#003f88",
      height: "50px",
      display: "flex",
      alignItems: "center",
    },
    iconStyle: {
      marginRight: "20px",
      cursor: "pointer",
      fontSize: "21px",
    },
  };
  return (
    <div style={useStyle.barStyle}>
      <div className="pr-10 text-white w-full">
        <div className="float-right">
          <NotificationsIcon style={useStyle.iconStyle} />
          <FullscreenIcon style={useStyle.iconStyle} />
          <DarkModeIcon style={useStyle.iconStyle} />
          <SettingsIcon style={useStyle.iconStyle} />
          <LogoutIcon style={{ fontSize: "21px" }} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
