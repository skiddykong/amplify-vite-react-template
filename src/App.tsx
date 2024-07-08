import {
  Authenticator,
  Card,
  Button,
  Flex
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TextToImagePage from "./pages/TextToImage/TextToImagePage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import AccountManagement from "./pages/Account/AccountManagementPage";

import Subscription from "./pages/Billing/SubsPage";

import AmendAnImagePage from "./pages/AmendAnImage/AmendAnImagePage";

function App() {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut }) => (
      <Flex direction="column" gap="1rem" padding="1rem" 
      >
          <Card>
            <h1>AI Kitchen Generator</h1>
            <p>Welcome</p>
          </Card>
          <Router>
            <Flex
              direction="row"
              justifyContent="flex-start"
              alignItems="left"
              alignContent="top"
              wrap="wrap"
              gap="1rem"
            >
              <Link to="/src/pages/Home">Home</Link>
              <Link to="/src/pages/TextToImage">Text To Image Generator</Link>
              <Link to="/src/pages/AmendAnImage">Amend an Image Generator</Link>
              <Link to="/src/pages/AccountManagement">Account Management</Link>
              <Link to="/src/pages/Billing">Subscription Management</Link>
              <Link to="/src/pages/About">About</Link>
            </Flex>
            <Routes>
              <Route
              
                path="/src/pages/TextToImage"
                element={<TextToImagePage />}
              />
              <Route path="/src/pages/Home" element={<Home />} />
              <Route path="/src/pages/About" element={<About />} />
              <Route path="/src/pages/AmendAnImage" element={<AmendAnImagePage />} />
              <Route path="/src/pages/AccountManagement" element={<AccountManagement />} />
              <Route path="/src/pages/Billing" element={<Subscription />} />
            </Routes>
          </Router>
          <Card>
            <Button style={{ flexGrow: 1 }} onClick={signOut}>
              Sign out
            </Button>
          </Card>
          </Flex>
      )}
    </Authenticator>
  );
}

export default App;
