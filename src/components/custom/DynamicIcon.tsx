import React from 'react';
// Import all icons from lucide-react into an "Icons" object
import * as Icons from 'lucide-react';

// Define the props type for TypeScript (optional)
interface DynamicIconProps {
  name: keyof typeof Icons; // Ensures the name is a valid icon name
  className?: string;
  size?: number | string;
  color?: string;
  width?:string;
  height?:string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // Access the icon component by its PascalCase name (e.g., 'Star', 'Activity')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = Icons[name] as React.ComponentType<any>;
  
  if (!IconComponent) {
    // You can return a default icon or null if the name is invalid
    return <Icons.HelpCircle {...props} />; // Example default
  }

  // Render the component with passed props
  return <IconComponent {...props} />;
};

export default DynamicIcon;
