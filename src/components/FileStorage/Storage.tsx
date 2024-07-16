import { StorageManager } from '@aws-amplify/ui-react-storage';

function UploadFile(path: string) {

    return (
        <StorageManager
        acceptedFileTypes={['image/*']}
        path={`users/${path}/uploads`}
        maxFileCount={1}
        isResumable
      />
    );
}

export default UploadFile;