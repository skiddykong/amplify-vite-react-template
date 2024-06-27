import {
  Authenticator,
  Flex
} from "@aws-amplify/ui-react";
import { useState, FormEvent, ChangeEvent, } from "react";
import "@aws-amplify/ui-react/styles.css";
import { amplifyClient } from "./amplify-utils";

const FormUI = () => {

  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<'typing' | 'submitting' | 'success'>('typing');
  const [generatedImage, setGeneratedImage] = useState<string>("");

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function generateImage() {
    console.log('generateImage() ' + answer);
    const response = await amplifyClient.queries.askBedrock({
      aiPrompt: answer ?? "",
    });

    console.log('generateImage() response' +  response.data?.body!);
  
    const res = JSON.parse(response.data?.body!);
    const content = res.content[0].images[0] ?? "";
    return content || "";
  }

  async function submitForm(): Promise<void> {
    // Pretend it's hitting the network.
    return new Promise((resolve) => {
      
      console.log('Submitting form 2');
      setTimeout(async () => {
        console.log('Submitting form 3');
        const image = await generateImage();
        setGeneratedImage(image);
        resolve();
      }, 500);
      
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      console.log('Submitting form 1');
      await submitForm();
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err as Error | null);
    }
  }

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>Lets generate something</h2>
      <p>
        Please enter a prompt for the AI
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
          id="AIPromptForm"
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
        {generatedImage != null &&
        <img src={generatedImage} alt="Generated Image" />
        }
      </form>
    </>
  );
}

function App() {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut }) => (
        <main>
          <Flex
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
            gap="1rem"
            direction="column"
          >
            <h1>AI Kitchen Generator</h1>
            <p>Welcome</p>
            <FormUI />
            <button style={{ flexGrow: 1 }} onClick={signOut}>
              Sign out
            </button>
          </Flex>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
