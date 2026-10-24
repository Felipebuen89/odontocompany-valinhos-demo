# Campanha da semana e mensagens — OdontoCompany Valinhos

## O que já está funcionando
- Home com um espaço fixo para **Oferta da Semana**.
- Exemplo visual `Sorriso 2.0 — Até 20% OFF` com etiqueta **EXEMPLO**: não é uma promoção real aprovada.
- Página de detalhes da campanha.
- Central de mensagens públicas e contador de não lidas; leitura salva **apenas neste navegador**.
- Manifesto de PWA e service worker com eventos para receber push futuramente.
- Teste de notificação **local**, iniciado pelo próprio usuário; não há servidor disparador conectado.

## Como alterar a oferta atualmente
Abra `conteudo-publico.json` no repositório do GitHub e edite o objeto `campaign`.

Campos:
- `id`: identificador único da campanha.
- `status`: `demo` (apenas simulação), `draft` (não publicada) ou `published`.
- `label`, `title`, `highlight`, `description`, `cta`, `disclaimer`.
- `validFrom` e `validUntil`: datas no formato `AAAA-MM-DD`.

**Regra de segurança de apresentação:** o aplicativo só apresenta uma campanha como publicada se:
1. `status` for `published`;
2. houver período válido com início e fim;
3. existir texto de condições/ressalva em `disclaimer`;
4. a data atual estiver dentro do período.

Caso não exista campanha válida, o espaço da semana mostra **Novidades em breve**. Isso evita prometer descontos vencidos ou não aprovados.

**Antes de publicar:** a gerência deve aprovar desconto real, serviços elegíveis, exclusões, início e fim, canais de atendimento e condições contratuais.

## Mensagens no aplicativo
O campo `notifications` em `conteudo-publico.json` recebe avisos genéricos não personalizados:
- `id`, `title`, `body`, `type` (`campaign` ou `general`), `target`;
- `status`: `demo`, `draft`, `published`;
- `publishedAt`, `expiresAt` (datas `AAAA-MM-DD`, quando aplicável).

A caixa de entrada exibe as mensagens válidas ao abrir o site. O indicador de lidas/não lidas é local, não sincroniza com outro aparelho. Não colocar dados pessoais, procedimentos, diagnóstico, cobrança ou lembretes individuais nesse JSON **público**.

## Push real: pendente de integração
GitHub Pages hospeda apenas arquivos estáticos: não guarda assinaturas privadas nem envia push sozinho. O service worker `sw.js` é uma base para receber notificações **depois** da implantação do servidor de envio.

Para ativar push real:
1. Criar painel gerencial autenticado com perfis/autorização e histórico de envio.
2. Criar cadastro seguro de usuários e consentimento separado para marketing e avisos de serviço.
3. Publicar chave pública VAPID e configurar PushManager.subscribe a partir de ação voluntária do usuário.
4. Enviar o endpoint e as chaves da assinatura para backend autenticado (nunca para `conteudo-publico.json`).
5. Implementar servidor de envio Web Push, cancelamento de assinatura, limites de frequência e logs.
6. Proteger o conteúdo: não enviar informações clínicas sensíveis no corpo da notificação.
7. Testar em Android, desktop e iPhone com aplicativo instalado pela opção **Adicionar à Tela de Início**, e permissão explícita.

No iPhone, notificações Web Push exigem web app adicionado à Tela de Início (iOS 16.4+). O botão **Testar uma notificação** realiza só uma demonstração local; não estabelece assinatura nem habilita disparo da clínica.

## Próximo passo de produto
Substituir a edição manual de `conteudo-publico.json` por painel gerencial autenticado, no qual o proprietário cria, agenda, aprova e encerra campanhas. O aplicativo continua somente leitura para pacientes.
