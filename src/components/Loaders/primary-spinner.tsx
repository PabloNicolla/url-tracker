const PrimarySpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <output
        className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200"
        style={{ borderTopColor: "#3b82f6" }}
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </output>
    </div>
  );
};

export default PrimarySpinner;
