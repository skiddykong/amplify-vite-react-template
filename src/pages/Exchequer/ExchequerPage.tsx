import {withAuthenticator} from "@aws-amplify/ui-react";
import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {amplifyClient} from "../../amplify-utils.ts";
import {useEffect, useState} from "react";

interface CustomerExchequer {
  items:
    {

    }[];
}

function ExchequerPage() {

  const [ customerExchequer, setCustomerExchequer ] = useState<CustomerExchequer>({items: []});

  useEffect(() => {
amplifyClient.models.CustomerExchequer.list().then((result) => {
  setCustomerExchequer({ items: result.data });
});  }, []);


  return (
    <div>
      <NavigationBar/>
      <div>
        <h1>Exchequer</h1>
      </div>
      <p>The create form is only here for testing and admin purposes, this will not be exposed in production</p>
      <div>{customerExchequer.items.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}</div>
      <p>Use this form to add more credits</p>
    </div>
  );
}

export default withAuthenticator(ExchequerPage);
