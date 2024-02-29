import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { profileTabs } from '../../data/profileTabs';
import { profileTabsStyles } from './styles';
import { Container } from '@mui/material';


const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth={'lg'}>
        <Tabs sx={profileTabsStyles} value={value} onChange={handleChange} aria-label="profile tabs">
          {profileTabs.map((tab, index) => <Tab sx={{ textTransform: 'capitalize' }} key={index} label={tab.label} {...a11yProps(index)} />)}
        </Tabs>
      </Container>
      {profileTabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <tab.component />
        </TabPanel>
      ))}
    </Box>
  );
}

export default ProfileTabs



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}
