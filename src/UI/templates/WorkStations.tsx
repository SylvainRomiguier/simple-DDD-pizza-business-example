export const WorkStations: React.FC = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
    }}
  >
    {children}
  </div>
);
