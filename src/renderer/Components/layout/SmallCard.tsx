import React from 'react';
import { SmaalCardBox,Text,H1 } from './styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
  value: number;
}

export const SCard = (props: Props) => {
    return <SmaalCardBox {...props}>
        {props.children?props.children:
        <div>
        <Text style={{textAlign:'center',fontSize:18}}>
          {props.title}
        </Text>
        <Text style={{textAlign:'center',fontSize:35,lineHeight:2}}>
          {props.value}
        </Text>
        </div>}
    </SmaalCardBox>;
};

const styles= {
  title:{
    textAlign:'center',
  }
}
