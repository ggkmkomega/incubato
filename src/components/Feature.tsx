import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface FeatureProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  hadnleClick: () => void;
  className: string;
}

const Feature = ({
  title,
  subtitle,
  icon,
  className,
  hadnleClick,
}: FeatureProps) => {
  const Icon = icon;
  return (
    <div
      onClick={hadnleClick}
      className={cn(
        "flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] px-4 py-6 xl:max-w-[270px]",
        className,
      )}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Icon className="text-foreground" />
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{subtitle}</p>
      </div>
    </div>
  );
};

export default Feature;
