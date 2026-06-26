import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkboxId =
    id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label className={`checkbox ${className}`.trim()} htmlFor={checkboxId}>
      <input id={checkboxId} type="checkbox" className="checkbox__input" {...props} />
      <span className="checkbox__box" aria-hidden="true" />
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
