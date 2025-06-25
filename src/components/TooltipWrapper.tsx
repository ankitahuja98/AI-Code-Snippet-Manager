import { Tooltip } from "@mui/material";
import type { TooltipProps } from "@mui/material";
import type { ReactNode } from "react";

type TooltipWrapperProps = Omit<TooltipProps, "children" | "title"> & {
  title: NonNullable<TooltipProps["title"]>;
  children: ReactNode;
};

const TooltipWrapper = ({ children, title, ...props }: TooltipWrapperProps) => {
  return (
    <Tooltip title={title} arrow {...props}>
      <span style={{ display: "inline-flex" }}>{children}</span>
    </Tooltip>
  );
};

export default TooltipWrapper;
