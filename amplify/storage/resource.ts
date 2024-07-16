import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'amplifyTeamDrive',
    access: (allow) => ({
      'unstaged/*': [
        allow.authenticated.to(['read']),
      ],
      'users/uploads/*': [
        allow.authenticated.to(['read', 'write']),
      ],
    })
  });