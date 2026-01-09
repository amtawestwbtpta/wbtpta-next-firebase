function Loader({ overlay = true }) {
  const svg = (
    <svg
      className="spinner"
      viewBox="0 0 50 50"
      style={{ width: 100, height: 100 }}
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        scale={2}
      ></circle>
    </svg>
  );

  if (overlay) {
    return <div className="loader-container">{svg}</div>;
  }

  return <div style={{ textAlign: "center" }}>{svg}</div>;
}

export default Loader;
