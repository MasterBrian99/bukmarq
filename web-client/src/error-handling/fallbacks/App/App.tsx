export default function AppErrorBoundaryFallback() {
  return (
    <div>
      <div>500</div>
      <h1>Oops. something went wrong</h1>
      <h1>
        Try to refresh this page or feel free to contact us if the problem
        persists
      </h1>
      <div>
        <button onClick={() => (window.location.href = "/")}>
          Take me back to home page
        </button>
      </div>
    </div>
  );
}
