import React from "react";
import classNames from "classnames";
import Image from "next/image";

const Skeleton: React.FC = () => {
  return (
    <div className={classNames("relative", "w-[800px]", "h-[214px]")}>
      <Image
        src="/images/skeleton.gif"
        alt="Loading..."
        layout="fill"
        objectFit="cover"
        className={classNames("animate-pulse")}
      />
    </div>
  );
};

export default Skeleton;
