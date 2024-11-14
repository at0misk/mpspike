// Adding this to the hello world example
import { RegisterForm, RegisterFormProps } from '@medplum/react';

// The RegisterForm component seems to work for registering patients
// type can either be 'patient' or 'project'.
// 'patient' creates a new Patient resource
// 'project' creates a new Medplum project.
// I'm not entirely sure if either will be useful for our use case

export function PatientRegisterPage(): JSX.Element {
  return (
    <div style={{ 'margin': '100px' }}>
      <RegisterForm
        type={'patient'}
        googleClientId="921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"
        onSuccess={() => {}}
      />
    </div>
  )
}