const Button = ({ value, className, onClick }) => {
  return (
    <div className={className}>
      <button onClick={onClick}>{value}</button>
    </div>
  );
};

export default Button;
