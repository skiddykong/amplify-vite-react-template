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
    return usersBaseImages.items?.map(item => (
      <Card>
        <StorageImage key={item.path} path={item.path} alt={"User loaded image"}
        onClick={() => {
          console.log("Selected image: ", item.path);
          setSelectedImage(item.path);
        }}
        />
        <p>{item.path}</p>
      </Card>
    ));
  }

  function displayAmendedImages(usersAmendedImages: BaseImageList) {
    return usersAmendedImages.items?.map(item => (
      <StorageImage key={item.path} path={item.path} alt={"AI Amended Image"}/>
    ));
  }


  const [status, setStatus] = useState<"uploading" | "typing" | "submitting" | "success">(
    "uploading"
  );
  const [mostRecentImageName, setMostRecentImageName] = useState<string>("");

  return (
    <div>
      <NavigationBar/>
      <Accordion allowMultiple={true}
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
