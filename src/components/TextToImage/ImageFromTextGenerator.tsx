import {
  Image,
  Text,
  Card,
  Button,
  TextAreaField,
  Loader,
  View,
  Grid,
  Fieldset

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

  const lorumIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et lectus id odio faucibus bibendum ac vitae diam. Aenean sit amet massa a lectus ultricies aliquam sit amet a est. Donec et aliquet mi, eu euismod odio. Integer a commodo nisl. Aenean in purus dui. Vestibulum luctus eros vitae gravida tristique. Integer luctus consectetur imperdiet. Suspendisse pulvinar, turpis quis laoreet elementum, metus velit malesuada odio, ut iaculis nisi nunc eu mi.Etiam sit amet mi gravida, porttitor ligula a, malesuada nunc. Nam placerat porta ipsum ut rutrum. In sapien lorem, elementum et maximus id, varius vel orci. Integer hendrerit quam eu eros vehicula mattis. Phasellus rhoncus rhoncus est, hendrerit dictum velit dictum non. Etiam rhoncus consectetur sagittis. Nunc a mattis ex, sit amet tristique nulla. Suspendisse varius tempus tortor quis porttitor. Sed in tempor urna. Nunc luctus viverra blandit. Mauris maximus augue id lobortis posuere. Nulla suscipit mattis velit at convallis. Phasellus ultricies lacus sit amet fermentum blandit.Proin tellus elit, viverra eget volutpat at, varius nec purus. Phasellus dignissim ante sed magna mollis sagittis. Fusce finibus risus felis, ut suscipit nulla lobortis in. Etiam egestas magna sit amet dolor congue porta. Donec tincidunt eros sit amet placerat laoreet. Integer eget aliquam felis, ut volutpat est. Quisque lacinia varius dignissim. Fusce finibus suscipit mauris fermentum lacinia. Donec imperdiet ultrices convallis. Aliquam quis justo ante. Donec finibus fermentum aliquam.Fusce lacinia velit nisi, non suscipit augue blandit a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris at arcu elit. Nulla consectetur tincidunt pulvinar. Ut sit amet lorem eget lectus tincidunt sagittis. Sed facilisis urna eu lobortis vestibulum. In sem ipsum, facilisis eget libero eu, porta malesuada ipsum. Maecenas viverra, nulla maximus vestibulum pretium, libero erat placerat nunc, vel consectetur nisi nulla ac nibh. Etiam fringilla, erat at volutpat consectetur, nunc lectus malesuada dolor, in mattis nisi ligula a tortor. Integer eget tortor varius, laoreet ipsum sed, mattis nisl.Phasellus felis tellus, hendrerit et molestie at, gravida at velit. Phasellus eget purus elementum sapien eleifend bibendum vel eget dolor. Integer eros mauris, venenatis accumsan elit convallis, porta luctus nisi. Duis efficitur vel ligula nec mattis. Proin a maximus nulla. Praesent nunc justo, aliquam pharetra rhoncus et, laoreet ac tellus. Donec aliquam, mi nec mattis consectetur, massa elit accumsan nibh, quis sodales quam augue a nisi. Morbi in metus eu purus vulputate interdum non id ex. Vivamus in mattis magna. Morbi imperdiet nibh lacus, eget fringilla eros aliquet vitae.";

  return (
    <Grid
      rowGap="1rem"
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
      <p>
        {lorumIpsum}
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
      </Card>
      <Card>

        {error !== null && <p className="Error">{error.message}</p>}
        {status === "submitting" && (
          <View>
            <Loader />
            <Text>Hang tight, your image is being generated...</Text>
          </View>
        )}
        {generatedImage.length > 0 && (

          <Image
            width="400px"
            maxWidth="800px"
            height={"400px"}
            src={`data:image/jpeg;base64,${generatedImage}`}
            alt="Generated Image"
          />
          
        )}
      </Card>
    </Grid>
  );
}

export default TextToImage;
