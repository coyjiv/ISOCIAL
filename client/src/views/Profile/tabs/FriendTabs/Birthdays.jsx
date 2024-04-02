import { useGetUpcomingBirthdaysQuery, useRemoveFriendMutation } from "../../../../store/services/friendService"
import { Stack } from "@mui/material"
import { FriendCardSkeleton } from "../../../../components/friends-page-components/FriendCard/FriendCardSkeleton"
import { FriendCard } from "../../../../components/friends-page-components"
import styles from './friendTabs.module.scss'
import { timeToBirthday } from "../../../../utils/helpers/timeToBirthday"
import { useNavigate } from "react-router-dom"
import { FriendsNoUserSection } from "../../../Friends/FriendsNoUserSection"
import { useParams, useSearchParams } from "react-router-dom"


const Birthdays = () => {
    const { id: userId } = useParams();
    const [searchParams] = useSearchParams()


    const fetchUserId = userId ?? searchParams.get('id') ?? localStorage.getItem('userId')

    const { data, isLoading } = useGetUpcomingBirthdaysQuery({ userId: fetchUserId })

    const navigate = useNavigate()
    const [removeFriend] = useRemoveFriendMutation()

    const handleShowUser = (id) => {
        navigate(`/profile/${id}`);
    }

    if (!data && isLoading) {
        return <Stack marginTop={3} marginX={1} padding={1} marginBottom={1} direction='row' flexWrap='wrap' justifyContent='space-between' rowGap={2}>
            <FriendCardSkeleton variant='horizontal' />
            <FriendCardSkeleton variant='horizontal' />
            <FriendCardSkeleton variant='horizontal' />
            <FriendCardSkeleton variant='horizontal' />
        </Stack>
    }
    if (data.length === 0) {
        return <FriendsNoUserSection customTitle={'No results'} />
    }
    return (
        <div className={styles.infiniteWrapper}>
            {data?.map(({ id, firstName, lastName, avatarsUrl, dateOfBirth }) => (
                <FriendCard
                    variant={'horizontal'}
                    key={id}
                    id={id}
                    fullName={`${firstName} ${lastName}`}
                    images={avatarsUrl}
                    additionalInfo={timeToBirthday(dateOfBirth, firstName)}
                    // onConfirm={(e) => { onConfirm(e, id); onDelete(id) }}
                    onDelete={(e) => { e.stopPropagation(); removeFriend({ friendUserId: id }); }}
                    // onAddFriend={(...args) => { onAddFriend(...args); onDelete(id) }}
                    onClick={() => handleShowUser(id)}
                // onDontShowClick={(...args) => { onDontShowClick(...args); onDelete(id) }}
                />
            ))}
        </div>
    )
}

export default Birthdays