import {
  Image,
  Text,
  Card,
  Button,
  TextAreaField,
  Loader,
  View,
  Grid,
  Fieldset,
} from "@aws-amplify/ui-react";
import { useState, FormEvent, ChangeEvent } from "react";
import "@aws-amplify/ui-react/styles.css";
import { amplifyClient } from "../../amplify-utils";

function TextToImage() {
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
      if (Object.hasOwn(res, "images")) {
        content = res.images[0] || "";
        console.log("generateImage() content" + content);
      } else {
        console.error("response.data.body does not have images");
        setError(new Error(res.message?.toString() || "Error"));
      }
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
        setError(null);
        setGeneratedImage(() => "");
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
    <Grid
      rowGap="0.5rem"
      padding={0}
      templateColumns="1fr"
      templateRows="3fr"
    >
      <Card>
      <h2>Lets generate something</h2>
      <p>
        Enter a prompt for the AI to generate an image. For example: A blue
        backsack.
      </p>
      </Card>
      <Card>
      <Fieldset
      legend="Text To Image Generator"
      variation="plain"
      direction="column"
      >
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
      </Fieldset>
   
        {error !== null && <p className="Error">{error.message}</p>}
        {status === "submitting" && (
          <View>
            <Loader />
            <Text>Hang tight, your image is being generated...</Text>
          </View>
        )}
        {generatedImage.length > 0 && (
          <Image
            src={`data:image/jpeg;base64,${generatedImage}`}
            alt="Generated Image"
          />
        )}
      </Card>
    </Grid>
  );
}

export default TextToImage;
