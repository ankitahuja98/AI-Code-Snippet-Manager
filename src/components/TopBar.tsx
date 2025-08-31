import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState, type RefObject } from "react";
import TopBarLogo from "../images/TopBarLogo.png";
import TooltipWrapper from "./TooltipWrapper";
import { useTheme } from "../Context/ThemeContext";
import { Button } from "@mui/material";

const useStyle = {
  barStyle: {
    backgroundColor: "#003f88",
    height: "60px",
    display: "flex",
    alignItems: "center",
    borderRadius: "22px",
    margin: "10px",
    boxShadow: "rgb(45 45 45 / 85%) 1px 3px 5px",
  },
  iconStyle: {
    cursor: "pointer",
    fontSize: "25px",
    color: "white",
  },
  logoStyle: {
    height: "55px",
    margin: "2px 2px 2px 25px",
  },
};

const TopBar = ({
  NotificationIsOpen,
  setNotificationIsOpen,
  editorRef,
}: {
  NotificationIsOpen: boolean;
  editorRef: RefObject<HTMLDivElement | null>;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (editorRef.current?.requestFullscreen) {
        editorRef.current.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleNotification = () => {
    setNotificationIsOpen((prev) => !prev);
  };
  return (
    <div style={useStyle.barStyle}>
      <div>
        <img src={TopBarLogo} alt="Logo" style={useStyle.logoStyle} />
      </div>
      <div className="pr-10 text-white w-full">
        <div className="float-right flex items-center">
          <TooltipWrapper
            title="Notification"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <Button onClick={handleNotification}>
              {!NotificationIsOpen ? (
                <NotificationsIcon style={useStyle.iconStyle} />
              ) : (
                <NotificationsActiveIcon style={useStyle.iconStyle} />
              )}
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title={isFullscreen ? "Exit Full screen" : "Full screen"}
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <Button type="button" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <FullscreenExitIcon style={useStyle.iconStyle} />
              ) : (
                <FullscreenIcon style={useStyle.iconStyle} />
              )}
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title="Dark Mode"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <Button onClick={toggleTheme}>
              {theme === "light" ? (
                <DarkModeIcon style={useStyle.iconStyle} />
              ) : (
                <LightModeIcon style={useStyle.iconStyle} />
              )}
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title="Settings"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <Button>
              <SettingsIcon style={useStyle.iconStyle} />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title="Logout"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <Button>
              <LogoutIcon
                style={{ fontSize: "21px", color: "white" }}
                className="cursor-pointer"
              />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
