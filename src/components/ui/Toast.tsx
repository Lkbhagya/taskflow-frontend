import { createContext, useContext, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const TOAST_DURATION = 4000;
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [{ id, ...toast }, ...prev]);
    window.setTimeout(() => removeToast(id), TOAST_DURATION);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container toast-container--top-center">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.variant}`} role="status" aria-live="polite">
            <div className="toast__content">
              <strong className="toast__title">{toast.title}</strong>
              {toast.description ? <p className="toast__description">{toast.description}</p> : null}
            </div>
            <button type="button" className="toast__close" onClick={() => removeToast(toast.id)}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
