import React, { useState } from 'react';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [item, setItem] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = item;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            localStorage.setItem('userId', email);

            setItem({ email: '', password: '' })

        } catch (error) {
            if (error?.message === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
                alert('Password Invalid or User email does not exist')
            } else if (error?.message === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
                alert('User record not found, check the email and try again.')
            } else {
                alert('Ooops, Network Error! Please try again.')
            }

            console.log(error)
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value })
    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    value={item.email}
                    label='email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    handleChange={handleChange}
                    value={item.password}
                    label='password'
                    required
                />
                <div className="buttons">
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )

}

export default SignIn;