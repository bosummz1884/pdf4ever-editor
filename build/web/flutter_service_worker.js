'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"assets/AssetManifest.bin": "50d7950d47788d1b28340c4e1b758ff8",
"assets/AssetManifest.bin.json": "f11946c2ead3662cb4a1f4d82a64e216",
"assets/AssetManifest.json": "1eb7d56a5a1460ee81b590d734b5ff43",
"assets/assets/fonts/Anton-Regular.ttf": "da0af4e9427ac8ddcac1a4eb0fb06f69",
"assets/assets/fonts/Barlow-Regular.ttf": "90af7baeeb14e5434bc8ea30bc25d340",
"assets/assets/fonts/CrimsonText-Regular.ttf": "3320d6ac936fb5fd5a85671d70a0375a",
"assets/assets/fonts/FiraSans-Regular.ttf": "b0aa1958e34c16cede8af5643a9c285c",
"assets/assets/fonts/Hind-Regular.ttf": "d4ddc8177b52ba76cb976e55db4c05d7",
"assets/assets/fonts/Lato-Regular.ttf": "8d72101cad1547bed5ba3105041eeeae",
"assets/assets/fonts/Lato.ttf": "8d72101cad1547bed5ba3105041eeeae",
"assets/assets/fonts/Montserrat-Italic-VariableFont_wght.ttf": "5a669c0a71801494df35130ab2f55295",
"assets/assets/fonts/Mukta-Regular.ttf": "4310ec2c2558ad3077a58556a078a008",
"assets/assets/fonts/OpenSans-Bold.ttf": "50145685042b4df07a1fd19957275b81",
"assets/assets/fonts/OpenSans-BoldItalic.ttf": "78b08a68d05d5fabb0b8effd51bf6ade",
"assets/assets/fonts/OpenSans-ExtraBold.ttf": "8bac22ed4fd7c8a30536be18e2984f84",
"assets/assets/fonts/OpenSans-ExtraBoldItalic.ttf": "73d6bb0d4f596a91992e6be32e82e3bc",
"assets/assets/fonts/OpenSans-Italic.ttf": "c7dcce084c445260a266f92db56f5517",
"assets/assets/fonts/OpenSans-Light.ttf": "1bf71be111189e76987a4bb9b3115cb7",
"assets/assets/fonts/OpenSans-LightItalic.ttf": "6943fb6fd4200f3d073469325c6acdc9",
"assets/assets/fonts/OpenSans-Regular.ttf": "629a55a7e793da068dc580d184cc0e31",
"assets/assets/fonts/OpenSans-Semibold.ttf": "33f225b8f5f7d6b34a0926f58f96c1e9",
"assets/assets/fonts/OpenSans-SemiboldItalic.ttf": "73f7301a9cd7a086295401eefe0c998f",
"assets/assets/fonts/Poppins-Regular.ttf": "09acac7457bdcf80af5cc3d1116208c5",
"assets/assets/fonts/Questrial-Regular.ttf": "940bb94cbf5409409e141956e4a6a82e",
"assets/assets/fonts/Roboto-Black.ttf": "ec4c9962ba54eb91787aa93d361c10a8",
"assets/assets/fonts/Roboto-BlackItalic.ttf": "50705c5ed1205b63efdbfee941a6b655",
"assets/assets/fonts/Roboto-Bold.ttf": "ee7b96fa85d8fdb8c126409326ac2d2b",
"assets/assets/fonts/Roboto-BoldItalic.ttf": "1eb7a893589ddce89d81cdb22a356660",
"assets/assets/fonts/Roboto-Italic.ttf": "42bbe4eefcde1297b11dc4b6491e9746",
"assets/assets/fonts/Roboto-Light.ttf": "fc84e998bc29b297ea20321e4c90b6ed",
"assets/assets/fonts/Roboto-LightItalic.ttf": "d1efcd4d126837fe0dcf9b6cf3a00d64",
"assets/assets/fonts/Roboto-Medium.ttf": "d08840599e05db7345652d3d417574a9",
"assets/assets/fonts/Roboto-MediumItalic.ttf": "bd19ad60600a1537c00d3b4923a5e5de",
"assets/assets/fonts/Roboto-Regular.ttf": "3e1af3ef546b9e6ecef9f3ba197bf7d2",
"assets/assets/fonts/Roboto-Thin.ttf": "89e2666c24d37055bcb60e9d2d9f7e35",
"assets/assets/fonts/Roboto-ThinItalic.ttf": "0fc25386220a58203994ce45fb4ae570",
"assets/assets/fonts/RobotoCondensed-Bold.ttf": "52f9b35f9f7cfa1be2644bcbac61a983",
"assets/assets/fonts/RobotoCondensed-BoldItalic.ttf": "2860190205c52812d6575eb24eed1020",
"assets/assets/fonts/RobotoCondensed-Italic.ttf": "12ca82aeda584d84d13d0c067a5e1e9d",
"assets/assets/fonts/RobotoCondensed-Light.ttf": "5b45554305562f2fc404839bb9fe418a",
"assets/assets/fonts/RobotoCondensed-LightItalic.ttf": "11989836a08a2e1f2e33c89b9420ceda",
"assets/assets/fonts/RobotoCondensed-Regular.ttf": "0e1821fdf320fddc0e1c2b272c422068",
"assets/assets/fonts/SpaceMono-Regular.ttf": "b0ea4c1a4ffde563a4d07fb343ed77bc",
"assets/assets/fonts/TitilliumWeb-Regular.ttf": "4f5848e6a415f5a4964a272d8b633164",
"assets/assets/fonts/WorkSans%255Bwght%255D.ttf": "5ed62406e4e9041c53ed702f5b83e456",
"assets/assets/fonts/WorkSans-Italic%255Bwght%255D.ttf": "d922aa1e59fcfd64b11a11674304a763",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "aa9c273c4f026ea3d9a5686e29898829",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "27361387bc24144b46a745f1afe92b50",
"canvaskit/canvaskit.wasm": "a37f2b0af4995714de856e21e882325c",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "f7c5e5502d577306fb6d530b1864ff86",
"canvaskit/chromium/canvaskit.wasm": "c054c2c892172308ca5a0bd1d7a7754b",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "9fe690d47b904d72c7d020bd303adf16",
"canvaskit/skwasm.wasm": "1c93738510f202d9ff44d36a4760126b",
"favicon.ico": "0b0cfa715fb6791f76cecb77cf030526",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "515251224b689afc0844055b7d04fa6f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "db0b230a0f2cc6bfa28ac734a5b91517",
"/": "db0b230a0f2cc6bfa28ac734a5b91517",
"main.dart.js": "f1a6842aba9100296a8ca337ce787f96",
"manifest.json": "cb505878fed7ea40881ff6a7259dbb00",
"src/App.jsx": "6cee5c94972b32e77b595aa8b50eb2dd",
"src/components/AnnotationCanvas.jsx": "7beac833cbf5bcb399d548a1531a5e49",
"src/components/AnnotationToolbar.jsx": "7db91d2d4353a3116f5fa0ce81549612",
"src/components/FontMatchingService.js": "187942fb11a41ece48d4360337d136b6",
"src/components/FontToolbar.jsx": "2cc95bd9ac69ccc517bb240d49c2508d",
"src/components/OceanGradient.jsx": "46f96428e51f6f3bd8dc1718470e8a32",
"src/components/OfferWall.jsx": "b1857851780f356c8fd832b6a7db1561",
"src/components/PageActions.jsx": "403797c8e768e3ac6a47e69ed8a695dd",
"src/components/PDFMerger.jsx": "52a5c5faaf001eb71d913761c43d8c5e",
"src/components/PDFSplitter.jsx": "739c1d59f95bad76873f75dbf6c95b34",
"src/components/PDFTextEditor.jsx": "52e836fdadfba8dff108719c0d4e3780",
"src/components/PremiumUpgradeBanner.jsx": "cd09edbf31735c42adca53cbf76d1da7",
"src/components/PremiumWrapper.jsx": "f94eac2f4a70823f42fbf42895043267",
"src/components/savePDFbutton.jsx": "6b16ec24b26977f390cdd45aac84b1fd",
"src/components/TextToolbar.jsx": "481c2e4f39d86373ef1e8800808ac2d4",
"src/index.css": "c126a9ab806a8c0742cd7aca869b8914",
"src/index.html": "add10ea6205f59db7c449afe8e0398f9",
"src/main.jsx": "f626a8b8fac63b161f29e6507fb6d129",
"src/pdfEditor.js": "335a2b09935c25d89a1673084e4bf7fa",
"src/styles/theme.css": "b7257e53f6476f3243d72e7fb66a435c",
"src/utils/annotationStore.js": "0e9ed3d0c1d287884d2a893406784dfc",
"src/utils/mergePDFs.js": "52a5f1f123644dc444b95e06fe8c9266",
"src/utils/pageTools.js": "de49b65233bb79a80101ef86613bfdcd",
"src/utils/splitPDF.js": "9803501646c72c971fffa307b63b0513",
"src/utils/StickyNoteTool.jsx": "cdca9c90d507177156b8ffb472fbfaee",
"src/utils/usePremiumAccess.js": "a03a3b0ced2ef6c14a60be393b544584",
"version.json": "6f3187d59550442032c1f94b8ebd993b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
