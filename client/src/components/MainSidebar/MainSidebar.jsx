import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'

import { SidebarItem } from './SidebarItem'
import { sidebarMenuItems } from './MainSidebar.utils.jsx'
import s from './MainSidebar.module.scss'

const MainSidebar = () => {
  const { palette } = useTheme()

  return (
    <Box className={s.sidebarWrapper} bgcolor={palette.background.secondary}>
      {sidebarMenuItems.map(({ id, ...item }) => (
        <SidebarItem key={id} {...item} />
      ))}
    </Box>
  )
}

MainSidebar.displayName = 'MainSidebar'

export default MainSidebar
