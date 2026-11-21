/* DecoSoft Hub — service worker mínimo.
   Serve só para mostrar os avisos do sistema (ex.: "Tempo acabou!" do cronômetro do Treinos),
   que o Chrome do Android só permite através de um service worker. Não guarda nada em cache. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => "focus" in x);
    return c ? c.focus() : self.clients.openWindow(url);
  }));
});
