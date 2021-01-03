import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from '../../types/types';


type PropsType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    status: string
    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                saveProfile={props.saveProfile}
                updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;