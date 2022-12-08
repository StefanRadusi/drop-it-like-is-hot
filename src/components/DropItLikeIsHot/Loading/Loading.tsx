import './Loading.css';

export const Loading = () => {
  return (
    <div className="dilih__loading">
      {['.', '.', '.'].map((point, index) => (
        <p
          key={index}
          className="dilih__loading__point"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {point}
        </p>
      ))}
    </div>
  );
};
