import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface CompoundNameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  erro?: string;
}

const CompoundNameInput = forwardRef<HTMLInputElement, CompoundNameInputProps>(
  ({ erro, ...props }, ref) => {
    return (
      <div className="mb-3">
        <label htmlFor="compound-input" className="form-label">
          Nome do composto
        </label>
        <input
          id="compound-input"
          type="text"
          className={`form-control ${erro ? 'is-invalid' : ''}`}
          placeholder="Ex: aspirin"
          ref={ref}
          {...props}
        />
        {erro && <div className="invalid-feedback">{erro}</div>}
      </div>
    );
  },
);

export default CompoundNameInput;