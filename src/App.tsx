import {
  Authenticator, Grid,
  Card, Button
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TextToImagePage from "./pages/TextToImage/TextToImagePage";



function App() {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut }) => (
        <Grid>
          <TextToImagePage />
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
