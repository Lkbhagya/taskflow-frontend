import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`field__control field__control--textarea ${error ? 'field__control--error' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...props}
      />
      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
