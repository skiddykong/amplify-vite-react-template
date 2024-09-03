import TextToImage from "../../components/TextToImage/ImageFromTextGenerator";
import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {withAuthenticator} from "@aws-amplify/ui-react";

function TextToImagePage() {
  return (
    <>
      <NavigationBar />
      <TextToImage />
    </>
  );
}

export default withAuthenticator(TextToImagePage);
