'use client'

import { Button, Col, Row } from 'antd';
import loginImage from '../../assets/login-image.png'
import Image from 'next/image';
import Form from '../components/Forms/Form';
import FormInput from '../components/Forms/FormInput';;
import {  SubmitHandler } from "react-hook-form";
import { getUserInfo, storeUserInfo } from '@/services/auth.service';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
interface FormValue {
   id:string;
   password:string
}


const LoginPage = () => {
const router = useRouter()
const [userLogin] = useUserLoginMutation()
  const onSubmit:SubmitHandler<FormValue>=async (data:any)=>{
    try {
      const res = await userLogin({...data}).unwrap()
      if(res?.data?.accessToken){
        router.push('/profile')
      }
      storeUserInfo({accessToken:res?.data?.accessToken})
    
    } catch (error:any) {
      console.log(error.message)
    }
  }
  return (
    <Row justify='center' align='middle' style={{minHeight:'100vh'}}>
    <Col  sm={12} md={16} lg={10} >
    <Image src={loginImage} width={500} alt='loginImage'/>
    </Col>
    <Col  sm={12} md={8} lg={8}>
      <h1 style={{margin:"15px 0"}}>First Login Your Account</h1>
      <div>
        <Form submitHandler={onSubmit}>
         <div>
         <FormInput name='id' type='text' placeholder='Enter your id' size='large' label='User Id' />
         </div>
         <div style={{margin:"15px 0"}}>
         <FormInput name='password' type='password' placeholder='Enter your Password' size='large' label='User Password' />
         </div>
         <Button type='primary' size='middle' htmlType='submit'>
          Login
         </Button>
        </Form>
      </div>
    </Col>
  </Row>
  )
}
export default LoginPage