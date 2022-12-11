import React, {useEffect,useState}from 'react';
import APIClient from 'utils/apiClient';
import {Skeleton, Spin} from 'antd';
// import isAuthorized from 'utils/jwt';
import { Input,DatePicker,Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.scss';
import dayjs from 'dayjs';
const Profile = () => {

  const [profile,setProfile]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {getProfile()},[]);

  const getProfile = async () => {
    let response = await APIClient.request(
      '/api/auth/me',
      {},
      'GET'
    );
    console.log(response);
    setProfile(response);
    setIsLoading(false);
  }



  return (
    <div className='profile-wrapper'>
      
      <Skeleton loading={isLoading}>
        
        <label ><b>Username</b></label>
        <Input defaultValue={profile.username} size='small' prefix={<UserOutlined />}/>

        <label ><b>Name</b></label>
        <Input defaultValue={profile.name} size='small' prefix={<UserOutlined />}/>

        <label ><b>Last name</b></label>
        <Input defaultValue={profile.last_name} size='small' prefix={<UserOutlined />}/>

        <div className="date-wrapper">
          <label ><b>Birthday</b></label>
          <span id='birthday-date'>
            <DatePicker 
            format='DD.MM.YYYY'
            defaultValue={dayjs(profile.birthday,'YYYY.mm.dd')} 
              />
          </span>
        </div>

        <label ><b>Adress</b></label>
        <Input value={profile.adress} size='small' />

        <div className="save-profile">
          <Button>Update</Button>
        </div>

      </Skeleton>
     
    </div>
  )
}

export default Profile;