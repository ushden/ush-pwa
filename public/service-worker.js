/* eslint-disable no-restricted-globals */
const staticCacheName = 's-app-v1';
const dynamicCacheName = 'd-app-v1';

const assetUrls = ['index.html', 'offline.html', '404.html'];

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

		return cache.match('/offline.html');
	}
});
