import React from 'react';
import { PIcon } from './styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ProjectIcon = (props: Props) => {
    return <PIcon {...props}>
        {props.children}
    </PIcon>;
};
