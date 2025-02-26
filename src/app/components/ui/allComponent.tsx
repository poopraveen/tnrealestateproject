// import React from "react";
// import { useTheme } from '../../ThemeContext';
// import { cn } from "../lib/utils";

// export const Card = ({ children, className = "" }) => {
//   return (
//     <div className={`rounded-lg shadow-md bg-white p-4 ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardContent = ({ children }) => {
//   return <div className="p-2">{children}</div>;
// };

// export const Button = ({ children, onClick, className = "" }) => {
//   return (
//     <button
//       className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// export const Input = ({ type = "text", value, onChange, placeholder, className = "" }) => {
//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={`border p-2 rounded-lg w-full ${className}`}
//     />
//   );
// };

// export const Label = ({ children, htmlFor, className = "" }) => {
//   return (
//     <label htmlFor={htmlFor} className={`block font-medium mb-1 ${className}`}>
//       {children}
//     </label>
//   );
// };

// const ThemedCard = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
//     const { theme } = useTheme();
//     return <Card className={cn(theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black", className)} {...props} />;
//   };
  
//   const ThemedCardContent = ({ className, ...props }: React.ComponentProps<typeof CardContent>) => {
//     return <CardContent className={cn("p-4", className)} {...props} />;
//   };
  
//   const ThemedButton = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
//     const { theme } = useTheme();
//     return <Button className={cn(theme === "dark" ? "bg-blue-500 hover:bg-blue-400" : "bg-blue-600 hover:bg-blue-500", className)} {...props} />;
//   };
  
//   const ThemedInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => {
//     const { theme } = useTheme();
//     return <Input className={cn(theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300", className)} {...props} />;
//   };
  
//   const ThemedLabel = ({ className, ...props }: React.ComponentProps<typeof Label>) => {
//     return <Label className={cn("font-medium", className)} {...props} />;
//   };
  
//   export { ThemedCard as Card, ThemedCardContent as CardContent, ThemedButton as Button, ThemedInput as Input, ThemedLabel as Label };
