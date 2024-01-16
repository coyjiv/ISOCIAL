
import { useEffect } from "react"
import { GrayButton } from "../../components/buttons/index"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserProfile } from "../../store/actions/profile"
import { LuChevronDown } from "react-icons/lu";
import "./profile.scss"
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(profile.firstName === ""){
          dispatch(fetchUserProfile())
        } 
    }, [])

  return (
    <main>
        {/* top part */}
        <div className="profile-banner-wrapper">
            {/* banner */}
            <div className="profile-banner">
                {profile.bannerUrl ? <img src={profile.bannerUrl} alt="profile banner" /> : null}
                <GrayButton>Add a cover</GrayButton>
            </div>
            <div className="profile-details">
            {/* avatar */}
              <div className="profile-avatar">
                  {profile.avatarUrl ? <img className="avatar" src={profile.avatarUrl} alt="profile-avatar" /> : null}
              </div>
              <h1 className="profile-name">{profile.firstName + " " + profile.lastName}</h1>
              <div className="profile-details-btn-wrapper">
                <button>Add to friends</button>
                <button>Message</button>
                <button><LuChevronDown /></button>
              </div>
            </div>
            <div className="profile-details-tabs">
              <ProfileTabs/>
            </div>
        </div>
    </main>
  )
}

export default Profile