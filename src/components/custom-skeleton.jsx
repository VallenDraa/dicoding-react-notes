import Skeleton from "react-loading-skeleton";

import { useTheme } from "../hooks";

/**
 * @param {import("react-loading-skeleton").SkeletonProps} props
 * @returns
 */
export function CustomSkeleton(props) {
  const { theme } = useTheme();

  return (
    <Skeleton
      {...props}
      style={{ marginBottom: 5 }}
      highlightColor={theme === "dark" ? "#2021241a" : "#f5f6f61a"}
      baseColor={theme === "dark" ? "#4143491a" : "#cdd0d41a"}
    />
  );
}
