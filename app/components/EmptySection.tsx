import React from "react";

type EmptySectionProps = {
  title: string;
  children?: React.ReactNode;
};

export default function EmptySection({ title, children }: EmptySectionProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-5 min-h-[200px] bg-blue-100 rounded-xl">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
