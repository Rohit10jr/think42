const Section = ({ title, children }) => (
    <div className="section">
      <h2 className="user-info-h2">{title}</h2>
      {children}
    </div>
  );