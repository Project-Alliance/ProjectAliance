import { styled } from '@mui/system';
import {COLORS, size} from 'renderer/AppConstants'


export const Wrapper = styled('div')`
display: flex;
font-size: ${size.normalFont};
font-family: ${size.fontFamily};
height: 100%;
width: 100%;
`;


export const header = styled('div')`
font-size: inherit;
font-family: inherit;
height: ${size.headerHeight+1}px;
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
