import React from 'react';

import { Row, Col,Cartcontainer } from './styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  childeren?:React.ReactNode;
}

export function ChartBox({ children, ...props }: Props) {
  return (
    <Cartcontainer {...props}>
      {children}
    </Cartcontainer>
  );
}
