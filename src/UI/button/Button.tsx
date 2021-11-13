export const Button: React.FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      cursor: "pointer",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "10px",
      maxWidth: "200px",
    }}
  >
    {children}
  </div>
);
