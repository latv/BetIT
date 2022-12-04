import React, {useEffect,useState}from 'react';
import APIClient from 'utils/apiClient';
import {Skeleton, Spin} from 'antd';
import isAuthorized from 'utils/jwt';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.scss';

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
        <br />
        <Input defaultValue={profile.username} size='small' prefix={<UserOutlined />}/>
        <label ><b>Name</b></label>
        <Input defaultValue={profile.name} size='small' prefix={<UserOutlined />}/>
        <label ><b>Last name</b></label>
        <Input defaultValue={profile.last_name} size='small' prefix={<UserOutlined />}/>
        <label ><b>Birthday</b></label>
        <Input defaultValue={profile.birthday} size='small' />
        <label ><b>Adress</b></label>
        <Input defaultValue={profile.adress} size='small' />

      </Skeleton>
    </div>
  )
}

export default Profile;