import { motion, useAnimation } from "motion/react";

const badgeVariants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const alertVariants = {
  normal: { pathLength: 1, opacity: 1, y: 0 },
  animate: {
    pathLength: [1, 0.8, 1],
    opacity: [1, 0.8, 1],
    y: [0, -2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      y: { duration: 0.3, repeat: 2, repeatType: "reverse" },
    },
  },
};

const BadgeAlert = ({
  width = 22,
  height = 22,
  strokeWidth = 2,
  stroke = "#ff3b3b",
  ...props
}) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none", // so it doesn't block hover
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.path
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
          variants={badgeVariants}
          animate={controls}
          initial="normal"
        />
        <motion.g variants={alertVariants} animate={controls} initial="normal">
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </motion.g>
      </svg>
    </div>
  );
};

export default BadgeAlert;