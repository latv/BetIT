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
        <p>Username</p>
        <Input defaultValue={profile.username} size='small' prefix={<UserOutlined />}/>
        <h1>Name: {profile.name}</h1>
        <h1>Last name: {profile.last_name}</h1>
        <h1>Birthday: {profile.birthday}</h1>
        <h1>Adress: {profile.address}</h1>
      </Skeleton>
    </div>
  )
}

export default Profile;