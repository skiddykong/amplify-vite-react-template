import {Card, Flex} from "@aws-amplify/ui-react";
import {Link} from "react-router-dom";
import Logout from "../Logout/Logout.tsx";

function NavigationBar() {
  return (
    <>
      <Card>
        <h1>AI Kitchen Generator</h1>
        <p>Welcome</p>
      </Card>
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="left"
        alignContent="top"
        wrap="wrap"
        gap="1rem"
      >
        <Link to="/">Home</Link>
        <Link to="/text_to_image">Text To Image Generator</Link>
        <Link to={"/amend_image"}>Upload and Amend Image</Link>
        <Link to="/amend_image_with_mask">Amend Image With Mask</Link>
        <Link to="/account">Account Management</Link>
        <Link to="/billing">Subscription Management</Link>
        <Link to="/about">About</Link>
        <Logout />
      </Flex>
    </>
  );
}


export default NavigationBar;
