import PropTypes from 'prop-types';
import { profileTabs } from '../../data/profileTabs';
import { profileTabsStyles } from './styles';
import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const ProfileTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: profileTabs[0].label });

  const handleChange = (event, newValue) => {
    const tab = profileTabs[newValue].label;
    setSearchParams({ tab: tab });
  };

  const idFromTabLabel = (tabLabel) => parseInt(profileTabs.find(tab => tab.label === tabLabel).id) - 1;

  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth={'lg'}>
        <Tabs sx={profileTabsStyles} value={idFromTabLabel(searchParams.get('tab'))} onChange={handleChange} aria-label="profile tabs">
          {profileTabs.map((tab, index) => <Tab sx={{ textTransform: 'capitalize' }} key={index} label={tab.label} {...a11yProps(index)} />)}
        </Tabs>
      </Container>
      {profileTabs.map((tab, index) => (
        <TabPanel key={index} value={idFromTabLabel(searchParams.get('tab'))} index={index}>
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
