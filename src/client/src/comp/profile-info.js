import '../css/profile-info.css'

function ProfileInfo(props){
    return(
        <div className="ProfileInfo">
            <div className='icon'>LOGO</div>
            <div></div>
            <div className='accountInfo'>
                <div className='accountName'>{props.name}</div>
                <div className='accountStats'>Test</div>
            </div>
        </div>
    )
}

export default ProfileInfo;