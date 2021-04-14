/* eslint-disable no-restricted-globals */
const staticCacheName = 's-app-v1';
const dynamicCacheName = 'd-app-v1';

const assetUrls = [
	'index.html',
	'offline.html',
	'404.html',
	'images/default_avatar.png',
	'images/empty-img.png',
	'images/icons/icon-128x128.png',
	'images/icons/icon-144x144.png',
	'images/icons/icon-152x152.png',
	'images/icons/icon-192x192.png',
	'images/icons/icon-384x384.png',
	'images/icons/icon-512x512.png',
	'images/icons/icon-72x72.png',
	'images/icons/icon-96x96.png',
];

self.addEventListener('install', async (event) => {
	const cache = await caches.open(staticCacheName);
	await cache.addAll(assetUrls);
	self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
	const cacheNames = await caches.keys();
	await Promise.all(
		cacheNames
			.filter((name) => name !== staticCacheName)
			.filter((name) => name !== dynamicCacheName)
			.map((name) => caches.delete(name))
	);
});

self.addEventListener('fetch', async (event) => {
	if (!(event.request.url.indexOf('http') === 0)) {
		return;
	}

	const cache = await caches.match(event.request);

	try {
		if (cache) {
			return cache;
		} else {
			const response = await fetch(event.request);
			const cache = await caches.open(dynamicCacheName);

			await cache.put(event.request.url, response.clone());
			return response;
		}
	} catch (error) {
		const cache = await caches.open(staticCacheName);

		return cache.match('offline.html');
	}
});
