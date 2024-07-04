import { Card, Grid, useTheme } from "@aws-amplify/ui-react";
import TextToImage from "../../components/TextToImage/ImageFromTextGenerator";
import NavigateionBar from "../../components/NavigationBar/NavigationBar";

function TextToImagePage() {
    const { tokens } = useTheme();
  
    return (
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
          <TextToImage />
        </Card>
      </Grid>
    );
  }

  export default TextToImagePage;