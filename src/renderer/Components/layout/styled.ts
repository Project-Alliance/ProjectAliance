import { styled } from '@mui/system';
import {COLORS, size,blue} from 'renderer/AppConstants'


export const Wrapper = styled('div')`
display: flex;
font-size: ${size.normalFont};
font-family: ${size.fontFamily};
height: 100%;
width: 100%;
flex-direction: column;
`;


export const header = styled('div')`
font-size: inherit;
font-family: inherit;
padding-top: 5px;
padding-bottom: 5px;
display: flex;
width: 100%;
align-items: center;
flex-direction: row;
justify-content: space-between;
border-bottom: 1px solid ${COLORS.borderColor};
padding-left: ${size.padding}px;
padding-right: ${size.padding}px;
`;


export const PIcon = styled('div')`
height: 40px;
width: 40px;
display:flex;
justify-content:center;
align-items: center;
background: ${COLORS.primary};
`;
export const Row=styled('div')`
flex-direction: row;
display: flex;
`;

export const Col=styled('div')`
flex-direction: column;
display: flex;
`;
export const Text=styled('div')`
font-size: ${size.normalFont}px;
font-family: Inter, sans-serif;
`;

export const H1=styled('div')`
font-size: 17px;
font-family: Inter, sans-serif;
`;
export const H2=styled('div')`
font-size: 14px;
font-family: Inter, sans-serif;
`;

export const SmaalCardBox=styled('div')`
font-size: ${size.normalFont}px;
font-family: Inter, sans-serif;
background: ${blue[50]};
height: ${size.smallCardHeight}px;
width: ${size.smallCardWidth}px;
display: flex;
flex-direction: column;
padding: ${size.padding}px;
align-items: center;
border-radius: ${size.borderRadius}px;
border: 1px solid ${COLORS.borderColor};
&:hover{
  border: 1px solid ${COLORS.primary};
}
`;

export const Cartcontainer=styled('div')`
height: ${size.chartBoxHeight}px;
width: ${size.chartBoxWidth}px;
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid ${COLORS.borderColor};
border-radius: ${size.borderRadius}px;
&:hover{
  border: 1px solid ${COLORS.primary};
}
`;

export const InputP=styled('input')`
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  font-size: ${size.normalFont}px;
  width: auto;
&:focus{
  border: 1px solid ${COLORS.primary};
}
`;

export const InputSelect=styled('select')`
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  font-size: ${size.normalFont}px;
  padding: none;
  width: auto;
&:focus{
  border: 1px solid ${COLORS.primary};
}
`;
