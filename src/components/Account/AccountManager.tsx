import {Card} from "@aws-amplify/ui-react";
import { AccountSettings } from '@aws-amplify/ui-react';


function AccountManagement() {
  const handleChangeSuccess = () => {
    alert('password is successfully changed!')
  }

  const handleDeleteSuccess = () => {
    alert('user has been successfully deleted')
  }
  
  return (
    <Card>
      <p>To change your password please use the following</p>
      <AccountSettings.ChangePassword onSuccess={handleChangeSuccess}/>
      <p>If you wish to delete your account please press this button</p>
      <AccountSettings.DeleteUser onSuccess={handleDeleteSuccess} />
    </Card>
  );
}

export default AccountManagement;