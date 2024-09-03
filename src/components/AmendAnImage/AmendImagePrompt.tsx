import {Button, Fieldset, Text, TextAreaField} from "@aws-amplify/ui-react";
import {ChangeEvent, FormEvent, useState} from "react";
import {amplifyClient} from "../../amplify-utils";


interface AmendImagePromptProps {
  amendStatus: "uploading" | "submitting" | "success" | "typing",
  imageName: string
}


function AmendImagePrompt({imageName, amendStatus}: AmendImagePromptProps) {

  const [answer, setAnswer] = useState<string>("");
  const [status, setAmendStatus] = useState<"uploading" | "submitting" | "success" | "typing">(
    amendStatus
  );

  function handlePromptChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    setAmendStatus("submitting");
    amplifyClient.mutations.amendAnImage({
      aiPrompt: answer,
      image: imageName
    });
  }

  return (
    <div>
      <h1>Amend an Image</h1>
      <p>
        This page allows you to amend an image using a prompt. Please enter a prompt below.
      </p>
      <Fieldset
        legend="Amend an Image"
        variation="plain"
        direction="column"
      >
        <Text>
          Please enter a prompt describing an object to add into the image
        </Text>
        <TextAreaField
          descriptiveText="Enter a prompt for the AI to generate a new version of the image"
          label="ai-prompt"
          placeholder="A highback chair with a blue cushion."
          labelHidden={true}
          rows={4}
          value={answer}
          onChange={handlePromptChange}
          disabled={status === "submitting"}
          id="AIPromptForm"
        />
        <Button
          disabled={answer.length === 0 || amendStatus === "submitting"}
          onClick={handleSubmit}
        >
          Generate
        </Button>
      </Fieldset>
    </div>
  );
}

export default AmendImagePrompt;
