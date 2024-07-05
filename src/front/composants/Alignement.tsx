import React, { ReactNode } from 'react';

interface AlignementProps {
  alignement: 'X' | 'Y';
  children: ReactNode;
}

export default function Alignement({ alignement, children }: AlignementProps) {
  return (
    <div style={{ display: 'flex', flexDirection: alignement === 'X' ? 'row' : 'column' }}>
      {children}
    </div>
  );
}
