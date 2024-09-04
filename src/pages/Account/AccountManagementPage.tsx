import AccountManager from "../../components/Account/AccountManager";
import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import { withAuthenticator } from '@aws-amplify/ui-react'

function AccountManagement() {
  return (
    <>
      <NavigationBar/>
      <AccountManager/>
    </>
  )
}

export default withAuthenticator(AccountManagement);
