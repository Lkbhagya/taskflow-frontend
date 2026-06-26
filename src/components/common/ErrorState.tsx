interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state state--error" role="alert">
      <h3 className="state__title">Something went wrong</h3>
      <p className="state__description">{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn--secondary btn--sm" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}
