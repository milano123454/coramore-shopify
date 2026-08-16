import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Magnetic wrapper: children subtly follow the cursor, spring back on leave
export const MagneticButton = ({ children, className = "", strength = 0.35, testId, ...rest }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.4 }}
      className={`inline-block ${className}`}
      data-testid={testId}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
