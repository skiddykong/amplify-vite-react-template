import {Accordion, Card, withAuthenticator} from "@aws-amplify/ui-react";
import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {StorageImage, StorageManager} from "@aws-amplify/ui-react-storage";
import {list} from "aws-amplify/storage";
import React, {useState} from "react";
import AmendImagePrompt from "../../components/AmendAnImage/AmendImagePrompt";


interface BaseImageList {
  items:
    {
      path: string;
    }[];
}

const AmendImageMainFlowPage = () => {

  const [usersBaseImages, setUsersBaseImages] = useState<BaseImageList>({items: []});
  const [usersAmendedImages, setUsersAmendedImages] = useState<BaseImageList>({items: []});
  const [selectedImage, setSelectedImage] = useState<string>("");

  React.useEffect(() => {

    async function fetchUsersBaseImages() {
      const result = await getBaseImageList();
      setUsersBaseImages(result);
    }

    async function fetchAIAmendedImages() {
      const result = await getAmendedImageList();
      setUsersAmendedImages(result);
    }

    fetchAIAmendedImages().catch(console.error);
    fetchUsersBaseImages().catch(console.error);
  }, []);


  function displayBaseImages(usersBaseImages: BaseImageList) {

    function imageFromStorage(item: { path: string }) {
      return <Card className="rounded-t-[0.625rem] h-full rounded-b-none w-full">
        <StorageImage className=" p-0"
                      key={'_' + Math.random().toString(36).substr(2, 9)} path={item.path}
                      alt={"User loaded image"}
                      onClick={() => {
                        console.log("Selected image: ", item.path);
                        setSelectedImage(item.path);
                      }}/>
      </Card>;
    }

    function selectedImageFromStorage(item: { path: string }) {
      return <Card className="rounded-t-[0.625rem] h-[100px] rounded-b-none w-full">
        <StorageImage
          key={'_' + Math.random().toString(36).substr(2, 9)} path={item.path}
          alt={"User loaded image"}/>
      </Card>;
    }

    return <div className="flex overflow-y-hidden overflow-x-scroll
    divide-green-50 divide-x-1 divide-y-2 focus:border-2 focus:border-green-600">
      {usersBaseImages.items?.map(item => (
        item.path == selectedImage ? selectedImageFromStorage(item) : imageFromStorage(item)
      ))}
    </div>
  }

  function displayAmendedImages(usersAmendedImages: BaseImageList) {
    return <div className="flex overflow-y-hidden overflow-x-scroll
    divide-green-50 divide-x-1 divide-y-2 focus:border-2 focus:border-green-600">
      {
        usersAmendedImages.items?.map(item => (
          <Card className="rounded-t-[0.625rem] h-full rounded-b-none w-full">
            <StorageImage key={'_' + Math.random().toString(36).substr(2, 9)} path={item.path}
                          alt={"AI Amended Image"}/>
          </Card>
        ))
      }
    </div>;
  }


  const [status, setStatus] = useState<"uploading" | "typing" | "submitting" | "success">(
    "uploading"
  );
  const [mostRecentImageName, setMostRecentImageName] = useState<string>("");

  const processFile = async ({file}: { file: File }) => {
    const fileExtension = file.name.split('.').pop();

    return file
      .arrayBuffer()
      .then((filebuffer: ArrayBuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
      .then((hashBuffer: ArrayBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, '0'))
          .join('');
        return {file, key: `${hashHex}.${fileExtension}`};
      });
  };

  return (
    <div>
      <NavigationBar/>
      <Accordion
        className="p-2 justify-center bg-white rounded-lg"
        allowMultiple={true}
        items={[
          {
            trigger: 'Upload an image',
            value: 'accessible',
            content:
              <StorageManager
                acceptedFileTypes={['image/*']}
                path={({identityId}) => `users/${identityId}/uploads/base_image/`}
                maxFileCount={1}
                isResumable
                onUploadSuccess={
                  (e) => {
                    if (e.key) {
                      setMostRecentImageName(e.key.toString());
                      setStatus("typing");
                      console.log("Most recent image name: " + mostRecentImageName);
                    }
                  }
                }
                processFile={processFile}
              />
          },
          {
            trigger: 'Uploaded base images',
            value: 'styling',
            content: displayBaseImages(usersBaseImages)
          },
          {
            trigger: 'Add prompt for AI',
            value: 'styling',
            content:
              <AmendImagePrompt imageName={selectedImage} amendStatus={status}/>
          },
          {
            trigger: 'AI Amended images',
            value: 'content',
            content:
              displayAmendedImages(usersAmendedImages)
          }
        ]}
      />
    </div>
  )
}

export const getBaseImageList = async (): Promise<BaseImageList> => {
  const listResp = await list({
    path: ({identityId}) => `users/${identityId}/uploads/base_image/`
  })
  return listResp;
};

export const getAmendedImageList = async (): Promise<BaseImageList> => {
  const listResp = await list({
    path: ({identityId}) => `users/${identityId}/processed/amended_image/`
  })
  return listResp;
};

export default withAuthenticator(AmendImageMainFlowPage);
