
'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '../app/actions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function PushNotificationManager() {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/Dashboard'); // This navigates to the dashboard page
  };

  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<any>(
    null
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub: any = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub: any = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Push Notifications</h3>

      {subscription ? (
        <>
          <p className="text-gray-700 mb-4">You are subscribed to push notifications.</p>
          <button
            onClick={unsubscribeFromPush}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
          >
            Unsubscribe
          </button>

          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendTestNotification}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Test
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-700 mb-4">You are not subscribed to push notifications.</p>
          <button
            onClick={subscribeToPush}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Subscribe
          </button>
          <button
            onClick={navigateToDashboard}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Redirect to Dashboard
          </button>
          
        </>
      )}
    </div>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null); // For PWA install
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Listen for beforeinstallprompt event to handle installation on supported browsers
    const promptEventHandler = (event: any) => {
      event.preventDefault(); // Prevent the browser's default install prompt
      setDeferredPrompt(event); // Save the event so it can be triggered later
      setIsInstallable(true); // Make install button visible
    };

    window.addEventListener('beforeinstallprompt', promptEventHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', promptEventHandler);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      // Show the install prompt to the user
      deferredPrompt?.prompt();

      // Wait for the user's response
      deferredPrompt?.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null); // Reset the deferred prompt
        setIsInstallable(false); // Hide install button after prompt
      });
    }
  };

  if (isStandalone) {
    return null; // Don't show install button if the app is already installed
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Install App</h3>

      {isInstallable && (
        <button
          onClick={handleInstall}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        >
          Add to Home Screen
        </button>
      )}

      {isIOS && !isInstallable && (
        <p className="text-gray-700">
          To install this app on your iOS device, tap the share button{" "}
          <span role="img" aria-label="share icon" className="inline-block">
            ⎋
          </span>{" "}
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon" className="inline-block">
            ➕
          </span>
          .
        </p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}