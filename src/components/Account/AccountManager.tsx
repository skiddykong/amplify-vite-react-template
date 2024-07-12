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
      <AccountSettings.ChangePassword onSuccess={handleChangeSuccess}/>
      <AccountSettings.DeleteUser onSuccess={handleDeleteSuccess} />
    </Card>
  );
}

export default AccountManagement;