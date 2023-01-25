interface Props {
  onClick: () => void;
  children: string;
  className?: string;
  textClassName?: string;
}

export default function RectButton({
  onClick,
  children,
  className,
  textClassName,
}: Props) {
  return (
    <div className={`${className} flex`}>
      <p
        onClick={onClick}
        className={`${textClassName} cursor-pointer p-1 hover:text-lime-200 border border-white hover:border-lime-200 transition-all hover:-translate-y-[0.08rem] hover:underline`}
      >
        {children}
      </p>
    </div>
  );
}
