import { AlignLeft, Home, Settings } from "lucide-react";

const paths = [
    {
      pathId: "MP1",
      name: "Home",
      path: "/home",
      icon: Home
    },
    {
      pathId: "MP2",
      name: "Settings",
      path: "/settings",
      icon: Settings,
      subPaths: [
        {
          subPathId: "SP1",
          name: "State",
          path: "/settings/state",
          icon: AlignLeft
        },
        {
          subPathId: "SP2",
          name: "State District",
          path: "/settings/statedistrict",
          icon: AlignLeft
        },
      ]
    },
  ];
  
  export default paths;
  