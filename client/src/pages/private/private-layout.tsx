interface Props {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: Props) {
  return (
    <div>
      this is private layout
      <div>{children}</div>
    </div>
  );
}
