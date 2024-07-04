import { Breadcrumbs } from "@aws-amplify/ui-react";

function NavigateionBar() {
    return (
      <Breadcrumbs
        items={[
          { label: "Home", href: "#" },
          { label: "AI Kitchen Generator", href: "#" },
        ]}
      />
    );
  }


export default NavigateionBar;