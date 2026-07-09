import React from 'react';

export default function Card({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`bg-white border border-gray-100 rounded-2xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}