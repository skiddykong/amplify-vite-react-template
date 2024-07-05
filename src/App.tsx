import {
  Authenticator,
  Grid,
  Card,
  Button,
  Flex,
  ScrollView,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TextToImagePage from "./pages/TextToImage/TextToImagePage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

function App() {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut }) => (
        <ScrollView width="100%" height="10000px" maxWidth="580px">
          <Grid
            columnGap="0.5rem"
            rowGap="0.5rem"
            templateColumns="1fr"
            templateRows="3fr"
            position="fixed"
            top="0px"
            left="0px"
          >
            <Card columnStart="1" columnEnd="-1">
              <h1>AI Kitchen Generator</h1>
              <p>Welcome</p>
            </Card>
            <Router>
              <Flex
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="stretch"
                wrap="nowrap"
                gap="1rem"
              >
                <Link to="/src/pages/Home">Home</Link>
                <Link to="/src/pages/TextToImage">Text To Image Generator</Link>
                <Link to="/src/pages/About">About</Link>
              </Flex>
              <Routes>
                <Route
                  path="/src/pages/TextToImage"
                  element={<TextToImagePage />}
                />
                <Route path="/src/pages/Home" element={<Home />} />
                <Route path="/src/pages/About" element={<About />} />
              </Routes>
            </Router>
            <Card>
              <Button style={{ flexGrow: 1 }} onClick={signOut}>
                Sign out
              </Button>
            </Card>
          </Grid>
        </ScrollView>
      )}
    </Authenticator>
  );
}

export default App;
