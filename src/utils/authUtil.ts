import {Hub} from "aws-amplify/utils";


let signedIn = false;

Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signedIn':
      console.log('user have been signedIn successfully.');
      signedIn = true;
      break;
    case 'signedOut':
      console.log('user have been signedOut successfully.');
      break;
  }
});

export const isSignedIn = () => signedIn;
