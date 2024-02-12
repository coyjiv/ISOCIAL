import Box from "@mui/material/Box"

import { GroupConversations, MainFeed, MainSidebar } from '../../components'
import { withLayout } from "../../hooks"
import s from './Home.module.scss'

const HomePage = () => {
	return (
    <Box className={s.main}>
      <MainSidebar />
      <MainFeed />
      <GroupConversations />
    </Box>
	)
}

const Home = withLayout(HomePage)

export default Home