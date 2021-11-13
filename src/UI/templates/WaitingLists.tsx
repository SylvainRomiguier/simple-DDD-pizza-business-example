export const WaitingLists: React.FC = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      margin: "20px",
    }}
  >
    {children}
  </div>
);
