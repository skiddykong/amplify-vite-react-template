import {Card} from "@aws-amplify/ui-react";
import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";

function HomePage() {


  return (
    <>
      <NavigationBar/>
      <Card className="p-4 bg-sky-200">
        <h1>AI Kitchen Generator</h1>
        <p>Welcome</p>
      </Card>
      <Card>
        <h1>Home</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel magna sit amet neque interdum fermentum
          eget id ex. Donec eu pellentesque diam. Phasellus ac scelerisque est, id pretium mi. Nam vitae eros et ante
          tristique mollis vitae a lacus. Suspendisse ullamcorper ornare scelerisque. Sed sit amet convallis odio, ut
          sodales ipsum. Donec nisi lectus, fringilla ac placerat id, ullamcorper ut tortor. Nullam id justo pharetra,
          cursus quam ac, vulputate turpis. Suspendisse pellentesque dapibus libero, in fringilla nunc feugiat at. Proin
          non ex metus. Donec non congue lorem. Suspendisse vulputate elementum tristique. Sed sit amet molestie est,
          vitae dapibus mauris. Fusce vitae est ipsum. Ut varius ligula sit amet facilisis suscipit.</p>
      </Card>
    </>
  )
}

export default HomePage;
