import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { blue } from 'renderer/AppConstants';
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 6px 8px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;


  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 12px;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  height:40px;
`;

const Row = styled('div')`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width:100%;
margin:5px;
`;
const Label = styled('label')`
font-size: 12px;
font-family: Inter,sans-serif;
font-weight: 500;
color: #000;

`;

const SelectRole = styled('select')`
width: 200px;
height: 20px;
border-radius: 5px;
font-size: 12px;
border: 1px solid ${blue[200]};
`;

const Input = styled('input')`
width: 200px;
height: 20px;
border-radius: 5px;
font-size: 12px;
border: 1px solid ${blue[200]};
`;

export {
  Input,
  SelectRole,
  Label,
  Row,
  Tab,TabsList,TabPanel,TabsUnstyled
}
