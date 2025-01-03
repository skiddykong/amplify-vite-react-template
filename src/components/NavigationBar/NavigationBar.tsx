import {Card, Flex, Menu} from "@aws-amplify/ui-react";
import {Link} from "react-router-dom";
import Logout from "../Logout/Logout.tsx";

function NavigationBar() {
  return (
    <>
      <Card className="p-4 justify-center bg-sky-500">
        <h1 className="p-4 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600">AI Kitchen Generator</h1>
      </Card>
      <Flex className="justify-between p-1 bg-sky-200 flex-col md:flex-row"
      >
        <Menu>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to="/">Home</Link>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to={"/amend_image"}>Upload and Amend Image</Link>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to="/text_to_image">Text To Image Generator</Link>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to="/account">Account Management</Link>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to="/billing">Subscription Management</Link>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to="/exchequer">Exchequer</Link>
          <Link className="p-3 border-amber-800 justify-center align-middle accent-lime-50 bg-amber-200 rounded hover:bg-amber-600 active:outline-none active:ring active:ring-violet-300" to="/about">About</Link>
          <Logout/>
        </Menu>
      </Flex>
    </>
  );
}


export default NavigationBar;
