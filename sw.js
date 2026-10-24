/* Estrutura para push web. Envio real exige assinaturas autenticadas e servidor da clínica. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
  let payload={};
  try{payload=event.data?event.data.json():{}}catch(e){payload={body:event.data?event.data.text():''}}
  const title=String(payload.title||'OdontoCompany Valinhos').slice(0,100);
  const body=String(payload.body||'Você tem uma nova mensagem.').slice(0,220);
  const allowed=['inicio','agenda','avisos','promocoes','beneficios','tratamento','contato'];
  const screen=allowed.includes(payload.screen)?payload.screen:'avisos';
  event.waitUntil(self.registration.showNotification(title,{
    body,
    tag:String(payload.tag||'odc-aviso').slice(0,65),
    badge:'assets/logo-embedded.svg',
    icon:'assets/logo-embedded.svg',
    data:{screen}
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const screen=event.notification.data&&event.notification.data.screen||'avisos';
  const destination=new URL('./#'+screen,self.registration.scope).href;
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of windows){
      if(client.url.startsWith(self.registration.scope)){
        await client.navigate(destination);
        return client.focus();
      }
    }
    return self.clients.openWindow(destination);
  })());
});
