// import AmendAnImage from "../../components/AmendAnImage/AmendAnImageGenerator";
import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {withAuthenticator} from '@aws-amplify/ui-react'

function AmendAnImageWithMaskPage() {
  return (
    <>
      <NavigationBar/>
      <h1>
        <b>
          <p>WARNING NOT BEING ACTIVELY DEVELOPED - WE ARE GOING WITH AMEND IMAGE FLOW FIRST</p>
          <p>THIS PAGE USES THE MASK PROMPT CAPABILITY WHICH IS MORE COMPLEX</p>
        </b>
      </h1>
      {/*<AmendAnImage/>*/}
    </>
  )
}

export default withAuthenticator(AmendAnImageWithMaskPage);
