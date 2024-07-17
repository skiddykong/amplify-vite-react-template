import { Divider } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { list } from 'aws-amplify/storage';
import { StorageImage } from '@aws-amplify/ui-react-storage';

function Gallery() {

    return (
        <>
        <StorageManager
        acceptedFileTypes={['image/*']}
        path={({identityId}) => `users/${identityId}/uploads/base_image/`}
        maxFileCount={1}
        isResumable
      />
      <Divider />
      {result.items.map(item => (
        <StorageImage key={item.path} path={item.path} alt={"An Image"} />
      ))}
      </>
    );
}

const result = await list({
  path: ({identityId}) => `users/${identityId}/uploads/base_image/`
});

export default Gallery;