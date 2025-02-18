
'use client'

// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react'
// import { subscribeUser, unsubscribeUser, sendNotification } from '../app/actions'

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

// function PushNotificationManager() {
//   const router = useRouter();

//   const navigateToDashboard = () => {
//     router.push('/Dashboard'); // This navigates to the dashboard page
//   };

//   const [isSupported, setIsSupported] = useState(false)
//   const [subscription, setSubscription] = useState<any>(
//     null
//   )
//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     if ('serviceWorker' in navigator && 'PushManager' in window) {
//       setIsSupported(true)
//       registerServiceWorker()
//     }
//   }, [])

//   async function registerServiceWorker() {
//     const registration = await navigator.serviceWorker.register('/sw.js', {
//       scope: '/',
//       updateViaCache: 'none',
//     })
//     const sub: any = await registration.pushManager.getSubscription()
//     setSubscription(sub)
//   }

//   async function subscribeToPush() {
//     const registration = await navigator.serviceWorker.ready
//     const sub: any = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array(
//         process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//       ),
//     })
//     setSubscription(sub)
//     const serializedSub = JSON.parse(JSON.stringify(sub))
//     await subscribeUser(serializedSub)
//   }

//   async function unsubscribeFromPush() {
//     await subscription?.unsubscribe()
//     setSubscription(null)
//     await unsubscribeUser()
//   }

//   async function sendTestNotification() {
//     if (subscription) {
//       await sendNotification(message)
//       setMessage('')
//     }
//   }

//   if (!isSupported) {
//     return <p>Push notifications are not supported in this browser.</p>
//   }

//   return (
//     <div className="pb-10 p-6 bg-amber-100 rounded-lg shadow-lg max-w-md mx-auto text-black mb-6">
//   <h3 className="text-2xl font-semibold text-gray-800 mb-4">Push Notifications</h3>

//   {subscription ? (
//     <>
//       <p className="text-gray-700 mb-4">You are subscribed to push notifications.</p>
//       <button
//         onClick={unsubscribeFromPush}
//         className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4 w-full sm:w-auto"
//       >
//         Unsubscribe
//       </button>

//       <input
//         type="text"
//         placeholder="Enter notification message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <button
//         onClick={sendTestNotification}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
//       >
//         Send Test
//       </button>
//     </>
//   ) : (
//     <>
//       <p className="text-gray-700 mb-4">You are not subscribed to push notifications.</p>
//       <button
//         onClick={subscribeToPush}
//         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 w-full sm:w-auto"
//       >
//         Subscribe
//       </button>
//       <button
//         onClick={navigateToDashboard}
//         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-auto"
//       >
//         Redirect to Dashboard
//       </button>
//     </>
//   )}
// </div>
//   )
// }

// function InstallPrompt() {
//   const [isIOS, setIsIOS] = useState(false);
//   const [isStandalone, setIsStandalone] = useState(false);
//   const [deferredPrompt, setDeferredPrompt] = useState<any>(null); // For PWA install
//   const [isInstallable, setIsInstallable] = useState(true);

//   useEffect(() => {
//     setIsIOS(
//       /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
//     );
//     setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

//     // Listen for beforeinstallprompt event to handle installation on supported browsers
//     const promptEventHandler = (event: any) => {
//       event.preventDefault(); // Prevent the browser's default install prompt
//       setDeferredPrompt(event); // Save the event so it can be triggered later
//       setIsInstallable(true); // Make install button visible
//     };

//     window.addEventListener('beforeinstallprompt', promptEventHandler);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', promptEventHandler);
//     };
//   }, []);

//   const handleInstall = () => {
//     if (deferredPrompt) {
//       // Show the install prompt to the user
//       deferredPrompt?.prompt();

//       // Wait for the user's response
//       deferredPrompt?.userChoice.then((choiceResult: any) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the A2HS prompt');
//         } else {
//           console.log('User dismissed the A2HS prompt');
//         }
//         setDeferredPrompt(null); // Reset the deferred prompt
//         setIsInstallable(false); // Hide install button after prompt
//       });
//     }
//   };

//   if (isStandalone) {
//     return null; // Don't show install button if the app is already installed
//   }

//   return (
//     <div className="pb-10 p-6 bg-amber-100 rounded-lg shadow-lg max-w-md mx-auto text-black mb-6">
//   <h3 className="text-2xl font-semibold text-gray-800 mb-4">Install App</h3>

//   {isInstallable && (
//     <button
//       onClick={handleInstall}
//       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 w-full sm:w-auto"
//     >
//       Add to Home Screen
//     </button>
//   )}

//   {isIOS && !isInstallable && (
//     <p className="text-gray-700">
//       To install this app on your iOS device, tap the share button{" "}
//       <span role="img" aria-label="share icon" className="inline-block">
//         ⎋
//       </span>{" "}
//       and then "Add to Home Screen"
//       <span role="img" aria-label="plus icon" className="inline-block">
//         ➕
//       </span>
//       .
//     </p>
//   )}
// </div>
//   );
// }

// export default function Page() {
//   return (
//     <div>
//       <PushNotificationManager />
//       <InstallPrompt />
//     </div>
//   )
// }


import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchPieData, fetchBarData, fetchProjectData } from "../store/slices/dataSlice";
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Carousel from "./components/carousel";
import ThemeToggle from "./components/ToggleButton";
import { useTheme } from "./ThemeContext";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchPieData());
    dispatch(fetchBarData());
    dispatch(fetchProjectData());
  }, [dispatch]);

  const { pieData, barData, projectData, status, error } = useSelector((state: RootState) => state.data);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">SM NAGAR</h1>
        <p className="text-gray-600 dark:text-gray-400">ABCD PROMOTERS</p>
      </div>

      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <div className="p-4 rounded-lg shadow-md mb-4 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Plot Summary</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 rounded-lg shadow-md mb-4 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Plots per Project</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="SM1" fill="#0088FE" />
            <Bar dataKey="SM2" fill="#00C49F" />
            <Bar dataKey="SM3" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div onClick={() => router.push("/leadmanagement")} className="p-4 rounded-lg shadow-md mb-4 flex items-center cursor-pointer bg-white dark:bg-gray-800">
        <img src="/icons/web-app-manifest-512x512.png" alt="Lead Generation" className="w-12 h-12 rounded-full object-cover" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Lead Generation</h2>
          <p className="text-gray-500 dark:text-gray-400">Updated daily</p>
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-md mb-4 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Lead Generation Trends</h2>
        <p className="text-2xl font-bold">250 leads</p>
        <p className="text-green-500">Last 30 days +12%</p>
      </div>

      <div className="p-4 rounded-lg shadow-md mb-4 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Carousel>
          {projectData.map((project, index) => (
            <div key={index} className="p-2">
              <img src={"/icons/web-app-manifest-512x512.png"} alt={project.title} className="w-full h-32 object-cover rounded-lg" />
              <h3 className="text-md font-semibold mt-2">{project.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeScreen;

