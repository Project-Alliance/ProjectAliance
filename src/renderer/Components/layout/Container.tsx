import React from 'react';
import { Wrapper } from './styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Container = (props: Props) => {
    return <Wrapper {...props}>
        {props.children}
    </Wrapper>;
};
