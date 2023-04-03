"use client";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="max-w-[2520px] m-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};
