interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div>
      this is public layout
      <div>{children}</div>
    </div>
  );
}
