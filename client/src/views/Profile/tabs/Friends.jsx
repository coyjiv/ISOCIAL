// import { Link } from 'react-router-dom'
import { a11yProps } from '../../../helpers/a11y'
import { idFromTabLabel } from '../../../helpers/misc'
import { friendTabs } from '../../../data/friendTabs'
import { Link, useSearchParams } from 'react-router-dom'
import { Box, Container, Typography, Tabs, Tab } from '@mui/material'
import TabPanel from '../../../components/TabPanel'
import styles from '../profile.module.scss'
import classNames from 'classnames'

const Friends = () => {

  const cardClasses = classNames(styles.card, styles.cardPadding)

  const [searchParams, setSearchParams] = useSearchParams({ type: friendTabs[0].label });

  const handleChange = (event, newValue) => {
    const tab = friendTabs[newValue].label;
    setSearchParams((currentParams) => {
      const newParams = new URLSearchParams(currentParams);
      newParams.set('type', tab);
      return newParams;
    });
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: (theme) => theme.palette.wash }}>
      <Container maxWidth={'lg'} sx={{ p: 2 }}>
        <div className={cardClasses}>
          <div className={classNames(styles.flex, styles.spaceBetween)}>
            <Typography fontWeight={900} fontSize={20}>Friends</Typography>
            <div className={classNames(styles.flex, styles.linkWrapper)}>
              <Link to='/friends/requests'>
                Friend requests
              </Link>
            </div>
          </div>
          <Tabs allowScrollButtonsMobile={false} variant='scrollable' sx={{
            root: {
              textTransform: 'capitalize',
            },
          }} value={idFromTabLabel(searchParams.get('type'), friendTabs)} onChange={handleChange} aria-label="profile tabs">
            {friendTabs.map((tab, index) => <Tab sx={{ textTransform: 'capitalize' }} key={index} label={tab.label} {...a11yProps(index)} />)}
          </Tabs>
          {friendTabs.map((tab, index) => (
            <TabPanel key={index} value={idFromTabLabel(searchParams.get('type'), friendTabs)} index={index}>
              <tab.component />
            </TabPanel>
          ))}
        </div>
      </Container>
    </Box>
  )
}

export default Friends