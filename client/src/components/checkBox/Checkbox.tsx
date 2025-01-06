import type { FunctionComponent, PropsWithChildren } from 'react';
import React from 'react';

interface CheckboxProps extends PropsWithChildren {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: string;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({ name, checked, onChange, children }) => {
  return (
    <label className="check-label">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        />
        {children}
    </label>
  );
};

export default Checkbox;