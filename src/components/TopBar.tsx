import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState, type RefObject } from "react";
import TooltipWrapper from "./TooltipWrapper";

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

// 👇 Accept props
interface TopBarProps {
  editorRef: RefObject<HTMLDivElement> | null;
}

const TopBar = ({
  editorRef,
}: {
  editorRef: RefObject<HTMLDivElement | null>;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
  return (
    <div style={useStyle.barStyle}>
      <div className="pr-10 text-white w-full">
        <div className="float-right flex items-center">
          <TooltipWrapper
            title="Notification"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <NotificationsIcon style={useStyle.iconStyle} />
          </TooltipWrapper>
          <TooltipWrapper
            title={isFullscreen ? "Exit Full screen" : "Full screen"}
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <button
              type="button"
              style={useStyle.iconStyle}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </button>
          </TooltipWrapper>
          <TooltipWrapper
            title="Dark Mode"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <DarkModeIcon style={useStyle.iconStyle} />
          </TooltipWrapper>
          <TooltipWrapper
            title="Settings"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <SettingsIcon style={useStyle.iconStyle} />
          </TooltipWrapper>
          <TooltipWrapper
            title="Logout"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <LogoutIcon
              style={{ fontSize: "21px" }}
              className="cursor-pointer"
            />
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
