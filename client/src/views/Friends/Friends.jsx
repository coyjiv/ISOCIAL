import { withLayout } from '../../hooks/withLayout'
import { FriendsMainSidebar } from '../../components/sidebars'
import { FriendsMainContent } from './FriendsMainContent'
import { FriendsPageWrapper } from './Friends.styled'
import { useMediaQuery } from 'usehooks-ts'
import { MQ } from '../../utils/constants'

const FriendsPage = () => {
  const isMatch = useMediaQuery(MQ.TABLET)

  return (
    <FriendsPageWrapper>
      <FriendsMainSidebar />
      {!isMatch && <FriendsMainContent />}
    </FriendsPageWrapper>
  )
}

const Friends = withLayout(FriendsPage)

export default Friends
