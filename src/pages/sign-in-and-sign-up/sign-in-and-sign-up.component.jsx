import React, { useEffect } from 'react';
import { SignInSignOutWrapper } from './sign-in-and-sign-up.styles';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SignInAndSignUpPage = (props) => {
    const navigate = useNavigate();

    const { currentUser } = props;

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, navigate])


    return (
        <SignInSignOutWrapper>
            <SignIn />
            <SignUp />
        </SignInSignOutWrapper>
    )
}


const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
})

export default connect(mapStateToProps)(SignInAndSignUpPage);