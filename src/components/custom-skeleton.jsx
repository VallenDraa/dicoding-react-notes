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
      highlightColor={theme === "dark" ? "#202124" : "#f5f6f6"}
      baseColor={theme === "dark" ? "#414349" : "#cdd0d4"}
    />
  );
}
