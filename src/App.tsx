import { Authenticator, Flex, ThemeProvider } from '@aws-amplify/ui-react'
import { TextAreaField, Divider, Button } from '@aws-amplify/ui-react';
import {  } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

function GenAIForm() {
  return (
  <Flex
    width="360px"
    height="640px"
    overflow="hidden"
    position="relative"
    backgroundColor="rgba(255,255,255,1)"
  >
    <Flex
      gap="21px"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="absolute"
      top="139px"
      left="30px"
    >
      <TextAreaField
        width="300px"
        label="Please enter prompt for AI"
        placeholder="Placeholder"
      />
      <Button
        width="302px"
      >
        Upload A Photo
      </Button>
      <Divider
        width="300px"
        height="5px"
      />
    </Flex>
  </Flex>
  )
}


function App() {


  return (
    <ThemeProvider>
      <Authenticator socialProviders={['google']}>
        {({ signOut, user }) => (
          <main>
            <h1>AI Kitchen Generator</h1>
            <p>Welcome {user?.userId}</p>
            <GenAIForm/>
            <button onClick={signOut}>Sign out</button>
            </main>
          )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
