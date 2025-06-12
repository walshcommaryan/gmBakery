import React from "react";
import { motion, Transition, SVGMotionProps } from "framer-motion";

interface Props extends SVGMotionProps<SVGSVGElement> {
  isOpen?: boolean;
  color?: string;
  strokeWidth?: string | number;
  transition?: Transition;
  lineProps?: any;
  width?: number;
  height?: number;
}

const MenuButton = ({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 2,
  color = "#000",
  transition = {
    duration: 0.3,
  },
  lineProps = {},
  ...props
}: Props) => {
  const variant = isOpen ? "opened" : "closed";

  // Adjusted motion variants
  const top = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 6 },
  };
  const center = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -6 },
  };

  // Styling for each line
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    strokeLinecap: "round",
    ...lineProps,
  };

  // spacing units
  const unitHeight = 16;
  const unitWidth = (unitHeight * (width as number)) / (height as number);

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      width={width}
      height={height}
      overflow="visible"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="2"
        y2="2"
        variants={top}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="8"
        y2="8"
        variants={center}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="14"
        y2="14"
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  );
};

export { MenuButton };
