import { Authenticator, Divider, Flex, View } from "@aws-amplify/ui-react";
import { useState, FormEvent, ChangeEvent } from "react";
import "@aws-amplify/ui-react/styles.css";
import { amplifyClient } from "./amplify-utils";

const FormUI = () => {
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"typing" | "submitting" | "success">(
    "typing"
  );
  const [generatedImage, setGeneratedImage] = useState<string>("");

  async function generateImage() {
    console.log("generateImage() " + answer);
    const response = await amplifyClient.queries.askBedrock({
      aiPrompt: answer ?? "",
    });
    let content = "";

    if (typeof response.data?.body === "string") {
      const res = JSON.parse(response.data.body);
      console.log("generateImage() response" + (response.data?.body || ""));
      content = res.images[0] || "";
      console.log("generateImage() content" + content);
    } else {
      console.error("response.data.body is not a string or is undefined");
    }

    return content;
  }

  async function submitForm(): Promise<void> {
    // TODO: is promise needed??

    return new Promise((resolve) => {
      console.log("Submitting form 2");
      setTimeout(async () => {
        console.log("Submitting form 3");
        const image = await generateImage();
        setGeneratedImage(() => image);
        console.log("generateImage() image" + generatedImage);
        resolve();
      }, 500);
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      console.log("Submitting form 1");
      await submitForm();
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err as Error | null);
    }
  }

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>Lets generate something</h2>
      <p>Please enter a prompt for the AI</p>
      <Divider />
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
          id="AIPromptForm"
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
        {generatedImage !== null && (
          <img
            src={`data:image/jpeg;base64,${generatedImage}`}
            alt="Generated Image"
          />
        )}
      </form>
    </>
  );
};

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
            <View>
              <h1>AI Kitchen Generator</h1>
              <p>Welcome</p>
              <FormUI />
              <button style={{ flexGrow: 1 }} onClick={signOut}>
                Sign out
              </button>
            </View>
          </Flex>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
