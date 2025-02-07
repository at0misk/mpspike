import { Title } from '@mantine/core';
import { Logo, SignInForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';

// This SignInPage allows users to sign in to Medplum, giving admin access to the project
// Not to be used for our Users (doctors or patients)
export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <SignInForm
      // Configure according to your settings
      googleClientId="921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com" // use this one to run against prod
      // ^ This worked locally so I'm unsure what this comment is intended to mean..

      // googleClientId="397236612778-c0b5tnjv98frbo1tfuuha5vkme3cmq4s.apps.googleusercontent.com" // use this one for localhost
      onSuccess={() => navigate('/')}
    >
      <Logo size={32} />
      <Title>Sign in to Medplum</Title>
    </SignInForm>
  );
}
