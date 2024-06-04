import { Authenticator, Flex, ThemeProvider } from "@aws-amplify/ui-react";
import { TextAreaField, Divider } from "@aws-amplify/ui-react";
import React, { useState } from "react";

import {} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const GenAIForm = () => {
  const [file, setFile] = useState<string | undefined>();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <div>
      <TextAreaField
        width="300px"
        label="Please enter prompt for AI"
        placeholder="Placeholder"
      />
      <h2>Upload your image</h2>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={handleChange}
      />
      <img src={file} alt="Uploaded image" width="300px" height="300px" />
      <Divider width="300px" height="5px" />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Authenticator socialProviders={["google"]}>
        {({ signOut, user }) => (
          <main>
            <Flex
              width="360px"
              height="640px"
              overflow="visible"
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
                <h1>AI Kitchen Generator</h1>
                <p>Welcome {user?.userId}</p>
                <GenAIForm />
                <button style={{ width: '300px' }} onClick={signOut}>Sign out</button>
              </Flex>
            </Flex>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
