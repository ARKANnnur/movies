type Props = {
  children: any;
};

function layout({ children }: Props) {
  return <div className="w-dvw h-auto">{children}</div>;
}

export default layout;
