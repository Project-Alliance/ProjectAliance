import React from 'react';
import { header as HeaderTop } from './styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Header = (props: Props) => {
    return <HeaderTop {...props}>
        {props.children}
    </HeaderTop>;
};
