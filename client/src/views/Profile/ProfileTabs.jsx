import { profileTabs } from '../../data/profileTabs';
import { profileTabsStyles } from './styles';
import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../components/TabPanel';
import { a11yProps } from '../../helpers/a11y';
import { idFromTabLabel } from '../../helpers/misc';
import PropTypes from 'prop-types';

const ProfileTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: profileTabs[0].label });

  const handleChange = (event, newValue) => {
    const tab = profileTabs[newValue].label;
    setSearchParams((currentParams) => {
      const newParams = new URLSearchParams(currentParams);
      newParams.set('tab', tab);
      return newParams;
    });
  };

  const value = idFromTabLabel(searchParams.get('tab'), profileTabs)

  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth={'lg'}>
        <Tabs sx={profileTabsStyles} value={value} onChange={handleChange} aria-label="profile tabs">
          {profileTabs.map((tab, index) => <Tab sx={{ textTransform: 'capitalize' }} key={index} label={tab.label} {...a11yProps(index)} />)}
        </Tabs>
      </Container>
      {profileTabs.map((tab, index) => (
        <TabPanel key={index} value={idFromTabLabel(searchParams.get('tab'), profileTabs)} index={index}>
          <tab.component />
        </TabPanel>
      ))}
    </Box>
  );
}

ProfileTabs.propTypes = {
  id: PropTypes.number
}

export default ProfileTabs
