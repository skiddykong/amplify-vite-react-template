import { Authenticator, Grid, Card, Button, Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TextToImagePage from "./pages/TextToImage/TextToImagePage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

function App() {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut }) => (
        <Grid>
        <Card>
          <h1>AI Kitchen Generator</h1>
          <p>Welcome</p>
        </Card>
          <Router>
            <Flex>
              <Link to="/src/pages/Home" >Home</Link>
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
