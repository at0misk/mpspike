import { useState, useEffect } from 'react';
import { useMedplum } from '@medplum/react';
// Adding this to the hello world example

export function PractitionerRegisterPage(): JSX.Element {
  const medplum = useMedplum();
  const clientId = 'a2b2acfd-c070-4724-ab24-8c52cd6c5f9a';
  const clientSecret = 'a4fae71a48db0f9fa7addc5c1c187320ae15be0f654db89bedc834fef6c7aebf'
  const authString = btoa(`${clientId}:${clientSecret}`);
  
  // We need to get an auth token to authenticate against the medplum api
  // This is unneccessary if authenticated to Medplum through their SignInPage component, but
  // we'll want this if we're going to have Practitioners sign up on their own.
  const getAuthToken = async () => {
    await fetch(`https://api.medplum.com/oauth2/token`, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'openid'
      }),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${authString}`
      }
    }).then((response) => {
      return response.json()
    }).then(data => {
      // Handle the response data
      medplum.setAccessToken(data.access_token);
    });
  }

  useEffect(() => {
    getAuthToken();
  }, [medplum]);

  const [formData, setFormData] = useState({
    resourceType: 'Practitioner',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    sendEmail: false,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const medplumProjectId = '807a4844-a377-4868-9275-86dd3c024a70'

    try {
      // Invites a new Practitioner
      // @ts-ignore
      // Alternatively we can post to the following endpoint as well (which is what the invite method is doing under the hood)
      // Can use this endpoint from the backend if needed

      // const inviteUserEndpoint = `admin/projects/${medplumProjectId}/invite`
      // await medplum.post(inviteUserEndpoint, {
      //   resourceType: 'Practitioner',
      //   firstName: 'George',
      //   lastName: 'Washington',
      //   email: 'dr.gw@example.gov',
      //   password: 'lib3rty0rDe4th!',
      // });
      const response = await medplum.invite(medplumProjectId, formData);

      console.log(response)

      console.log(`Form submitted successfully!: ${response}`);
    } catch (error) {
      // debugger
      // Handle errors, e.g., display an error message
      console.error('Error submitting form:', error);
    }
  }
  
  return (
    <div style={{ 'margin': '100px' }}>
      <h2>Practitioner Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
        </label>
        <br/>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange}/>
        </label>
        <br/>
        <button>Submit</button>
      </form>
    </div>
  )
}
