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
import { StorageImage } from "@aws-amplify/ui-react-storage";


// Function to fetch an image and convert it to Base64
async function fetchImageAndConvertToBase64(imgUrl: string) {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Usage

function AmendAnImage() {
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"typing" | "submitting" | "success">(
    "typing"
  );
  const [generatedImage, setGeneratedImage] = useState<string>("");


  async function generateImage() {
    console.log("generateImage() " + answer);

    const imgUrl = new URL("../../assets/empty_room.jpg", import.meta.url)
      .href; // Adjust the path as necessary
    const base64Image = await fetchImageAndConvertToBase64(imgUrl);
    console.log(base64Image); // This is your Base64 encoded image string
    const b64 = (await base64Image) as string;
    const b64Mod = b64.replace("data:image/jpeg;base64,", "");

    const response = await amplifyClient.queries.amendAnImage({
      aiPrompt: answer ?? "",
      image: b64Mod,
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
        setGeneratedImage(() => image as string);
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
    <Grid rowGap="1rem" padding={0} templateColumns="1fr" templateRows="3fr">
      <Card>
        <h2>Lets generate something</h2>
        <p>Enter a prompt for the AI to generate a new object for the image</p>
      </Card>
      <Card>
        {error !== null && <p className="Error">{error.message}</p>}
        {status === "typing" && (
          <StorageImage
            width="375px"
            path="unstaged/empty_room.jpg"
            alt="Placeholder"
          />
        )}
        {status === "submitting" && (
          <View>
            <Loader />
            <Text>Hang tight, your image is being generated...</Text>
          </View>
        )}
        {generatedImage.length > 0 && (
          <Image
            width="375px"
            src={`data:image/jpeg;base64,${generatedImage}`}
            alt="Generated Image"
          />
        )}
      </Card>
      <Card>
        <Fieldset
          legend="Amend an Image Generator"
          variation="plain"
          direction="column"
        >
          <TextAreaField
            descriptiveText="Enter a prompt for the AI to generate a new object for the image"
            label="ai-prompt"
            placeholder="A highback chair with a blue cushion."
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
      </Card>
    </Grid>
  );
}

export default AmendAnImage;
