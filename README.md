# Master AI - Site de Cursos sobre IAs

Um site completo de cursos sobre as 5 melhores IAs de 2026 com sistema de pagamento integrado, autenticação de usuários e comunicação por email.

## 🚀 Features

- ✅ Landing page atrativa
- ✅ Catálogo de cursos
- ✅ Sistema de pagamento (Stripe)
- ✅ Autenticação de usuários
- ✅ Dashboard do aluno
- ✅ Sistema de emails automatizados
- ✅ Página de contato
- ✅ Painel administrativo
- ✅ Responsivo (Mobile First)

## 📋 Requisitos

- Node.js 16+
- MongoDB
- Conta Stripe
- Conta Gmail (para envio de emails)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/flavio200024-debug/master-ai.git
cd master-ai
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Preencha o `.env.local` com suas credenciais:
```
MONGODB_URI=sua_url_mongodb
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=sua_chave_secreta
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app_google
```

5. Execute em desenvolvimento:
```bash
npm run dev
```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
master-ai/
├── pages/
│   ├── api/
│   │   ├── contact.ts          # API de contato com email
│   │   ├── auth/
│   │   ├── courses/
│   │   └── payments/
│   ├── contact.tsx             # Página de contato
│   ├── index.tsx               # Home
│   ├── courses.tsx             # Catálogo de cursos
│   └── dashboard.tsx           # Dashboard do aluno
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CourseCard.tsx
│   └── ...
├── lib/
│   ├── email.ts                # Serviço de emails
│   ├── auth.ts                 # Autenticação
│   ├── stripe.ts               # Integração Stripe
│   └── mongodb.ts              # Conexão BD
├── styles/
│   └── globals.css             # Estilos globais
├── .env.example                # Exemplo de env vars
├── next.config.js              # Config Next.js
├── tailwind.config.js          # Config Tailwind
└── tsconfig.json               # Config TypeScript
```

## 💳 Integração com Stripe

1. Crie uma conta em [stripe.com](https://stripe.com)
2. Obtenha suas chaves públicas e privadas
3. Adicione no `.env.local`

## 📧 Configurar Emails

1. Ative 2FA no Gmail
2. Gere uma [Senha de App](https://myaccount.google.com/apppasswords)
3. Use no `SMTP_PASS`

## 🎨 Personalização

- Altere as cores em `tailwind.config.js`
- Modifique os templates de email em `lib/email.ts`
- Customize a landing page em `pages/index.tsx`

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t master-ai .
docker run -p 3000:3000 master-ai
```

## 📞 Suporte

- 📧 Email: suporte@masterai.com
- 🌐 Website: https://masterai.com
- 💬 Discord: [Link do servidor]

## 📄 Licença

MIT License - veja LICENSE.md

## 👨‍💻 Autor

Desenvolvido com ❤️ por Flavio

---

**Versão**: 1.0.0  
**Última atualização**: 2026
