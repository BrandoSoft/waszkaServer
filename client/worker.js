console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Recieved...');
    self.registration.showNotification(data.title, {
        body: 'Notified by Ruda Spierdolina!',
        icon: 'https://image.freepik.com/free-vector/gnome-holding-blank-banner-cartoon-character-white-background_1308-43864.jpg'
    });

})