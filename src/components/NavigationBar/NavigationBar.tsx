import { Breadcrumbs } from "@aws-amplify/ui-react";

function NavigationBar() {
    return (
      <Breadcrumbs
        items={[
          { label: "Home", href: "/src/pages/Home" },
          { label: "Text To Image Generator", href: "/src/pages/TextToImage" },
          { label: "About", href: "/src/pages/About" }
        ]}
      />
    );
  }


export default NavigationBar;