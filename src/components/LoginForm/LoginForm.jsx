import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PasswordStrengthBar from 'react-password-strength-bar';
import { registerThunk } from '../../redux/auth/authOperations';
// import { useAuth } from 'hooks';
import  loginSchema  from './loginSchema';
// import { PROGRESS_BAR_COLORS } from 'constants';
// import SmallLoader from 'components/Loader/SmallLoader';
import {
  Background,
  FormWrap,
  AuthList,
  AuthLink,
  FormUi,
  Input,
  SubmitBtn,
  ErrorPara,
  PassInputWrap,
  HideBtn,
  
} from '../RegisterForm/RegisterForm.styled';
import Eye from '../RegisterForm/Eye';
import EyeCrossed from '../RegisterForm/EyCrossed';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"



const LoginForm = () => {
  
  const [visible, setVisible] = useState(false);
  const [pwd, setPwd] = useState('');

  const dispatch = useDispatch();
//   const { isLoading } = useAuth();

  const submit = async (evt) => {
    console.log(evt.email,'qwe' );
    
    const formData = {
          name: evt.name,
          email: evt.email,
          password: evt.password,
        };
        console.log(formData)
        const isValid = await loginSchema.isValid(formData);            

          if (!isValid) {
            return;
           }
        // dispatch(registerThunk({ ...formData }))
        // await new Promise(res => setTimeout(res, 500));
    reset();
  }

  const {register, handleSubmit,  reset, formState:{errors, isValid}  } = useForm({
    initialValues: {
             name: '',
            email: '',
            password: '',
          },
    mode: "onBlur",
    resolver:yupResolver(loginSchema)
  })
// console.log(errors.name.message)
console.log(isValid)
  

  return (
    <Background>
      <FormWrap>
        <AuthList>
          <li>
            <AuthLink to={`/auth/register`}>Registration</AuthLink>
          </li>
          <li>
            <AuthLink to={`/auth/login`}>Log In</AuthLink>
          </li>
        </AuthList>

        <FormUi onSubmit={handleSubmit(submit)} autoComplete="off">
         
          
          <label>
            <Input
            {...register('email') }
            
              name="email"
              placeholder= 'Enter your email'
              type="email"
            />
             {errors?.email && (<ErrorPara>{errors?.email?.message || 'Errors!'}</ErrorPara>)}
          </label>
        
          <label>
          
            <PassInputWrap>
              <Input
              {...register('password') }
              
               
                // onChange={e => {
                //   setPwd(e.target.value);
                //   handleChange(e);
                // }}
                
                name="password"
                placeholder= 'Create a password'
                type={visible ? 'text' : 'password'}
              />
               {errors?.password && (<ErrorPara>{errors?.password?.message || 'Errors!'}</ErrorPara>)}
              <HideBtn
                type="button"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? (
                  <Eye
                    width={20}
                    height={20}
                    fillColor={'none'}
                    strokeColor={`#fff`}
                  />
                ) : (
                  <EyeCrossed
                    width={20}
                    height={20}
                    strokeColor={`#fff`}
                    fillColor={'none'}
                  />
                )}
              </HideBtn>
            </PassInputWrap>
           
            
          </label>
         
          {pwd && (
            <PasswordStrengthBar
              password={pwd}
              minLength={6}
              // barColors={PROGRESS_BAR_COLORS}
            />
          )}
          
          <SubmitBtn type="submit"
            disabled={!isValid}> 
            
              Register Now
            
          </SubmitBtn>
        </FormUi>
      </FormWrap>
    </Background>
  );
};

export default LoginForm;
