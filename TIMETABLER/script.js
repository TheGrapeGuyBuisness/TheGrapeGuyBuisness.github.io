// Check if the browser supports notifications
if ('Notification' in window) {
    // Request permission for notifications if not already granted
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}

// Function to show a notification
function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: 'path_to_icon.png',  // Optional: Add an icon here
        });
    }
}

// Handle the test notification button click
document.getElementById('testNotificationBtn').addEventListener('click', function() {
    // Check platform-specific behavior for notifications
    if (navigator.userAgent.match(/Windows/)) {
        // Windows platform: Use standard browser notifications
        showNotification('Test Notification', 'This is a test notification for the weekly plan!');
    } else if (navigator.userAgent.match(/Android/)) {
        // Android platform: Check if the app is installed as PWA for persistent notifications
        if ('serviceWorker' in navigator && Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                if (registration) {
                    registration.showNotification('Test Notification', {
                        body: 'This is a test notification for the weekly plan!',
                        icon: 'path_to_icon.png',
                    });
                }
            });
        }
    } else {
        // Other platforms (Fallback)
        showNotification('Test Notification', 'This is a test notification for the weekly plan!');
    }
});
