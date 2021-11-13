export const ButtonsBar: React.FC = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      margin: "20px",
    }}
  >
    {children}
  </div>
);
