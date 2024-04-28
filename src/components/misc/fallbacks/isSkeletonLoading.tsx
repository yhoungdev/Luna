import { FC } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
type TSkeleton = {
  count?: number;
};

const IsSkeletonLoader: FC<TSkeleton> = ({ count }: TSkeleton): JSX.Element => {
  return (
    <div className="w-full ">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton count={count ? count : 3} />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default IsSkeletonLoader;
