import {
  Authenticator,
  Breadcrumbs,
  Image,
  Grid,
  Fieldset,
  Card,
  useTheme,
  Button,
  TextAreaField,
} from "@aws-amplify/ui-react";
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
    <Fieldset
      legend={"AI Kitchen Generator"}
      direction={"column"}
      onSubmit={handleSubmit}
    >
      <Card>
        <h2>Lets generate something</h2>
        <p>Please enter a prompt for the AI</p>
      </Card>


      <Card>
        <TextAreaField
          descriptiveText="Enter a prompt for the AI to generate an image. For example: A blue backsack."
          label="ai-prompt"
          placeholder="A blue backsack"
          labelHidden={true}
          rows={4}
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
          id="AIPromptForm"
        />

        <Button
          disabled={answer.length === 0 || status === "submitting"}
          onClick={handleSubmit}
        >
          Generate
        </Button>
      </Card>

      <Card>
      {error !== null && <p className="Error">{error.message}</p>}
      {generatedImage.length > 0 && (
        <Image
          src={`data:image/jpeg;base64,${generatedImage}`}
          alt="Generated Image"
        />
      )}
      </Card>
    </Fieldset>
  );
};

function NavigateionBar() {
  return (
    <Breadcrumbs
      items={[
        { label: "Home", href: "#" },
        { label: "AI Kitchen Generator", href: "#" },
      ]}
    />
  );
}

function App() {
  const { tokens } = useTheme();

  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut }) => (
        <Grid
          templateColumns="1fr"
          templateRows="10rem 10rem"
          gap={tokens.space.small}
          style={{ flexGrow: 1 }}
        >
          <Card>
            <NavigateionBar />
          </Card>
          <Card>
            <h1>AI Kitchen Generator</h1>
            <p>Welcome</p>
          </Card>
          <Card>
            <FormUI />
          </Card>
          <Card>
            <Button style={{ flexGrow: 3 }} onClick={signOut}>
              Sign out
            </Button>
          </Card>
        </Grid>
      )}
    </Authenticator>
  );
}

export default App;
