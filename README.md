# Limaréh Portfolio

Site institucional minimalista para Limaréh, desenvolvido com React, Vite e Tailwind CSS.

## 🚀 Desenvolvimento Local

Para rodar o projeto localmente:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📦 Como fazer o Deploy

Existem várias formas de colocar o site no ar. As mais recomendadas para este projeto são:

### 1. Vercel (Recomendado)
A Vercel é a plataforma mais simples para projetos Vite.
1. Crie uma conta em [vercel.com](https://vercel.com).
2. Conecte seu repositório do GitHub (`GabrielMorais99/limareh`).
3. A Vercel detectará automaticamente as configurações de build. Basta clicar em **Deploy**.
4. Qualquer novo `push` para a `main` atualizará o site automaticamente.

### 2. GitHub Pages (Via Actions)
Como seu projeto já está no GitHub, você pode usar o GitHub Actions:
1. Vá em **Settings** > **Pages** no seu repositório.
2. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
3. Procure pelo template de "Static HTML" ou configure um arquivo `.github/workflows/deploy.yml`.
4. (Opcional) Eu posso criar este arquivo de workflow para você se desejar.

### 3. Build Manual
Se quiser apenas gerar os arquivos para enviar para um servidor via FTP:
1. Execute o comando:
   ```bash
   npm run build
   ```
2. Isso criará uma pasta chamada `dist/`.
3. Todos os arquivos dentro da `dist/` são estáticos e podem ser hospedados em qualquer lugar.

---

## 🛠 Scripts úteis
- `npm run dev`: Inicia o desenvolvimento.
- `npm run build`: Gera a versão final para produção.
- `npm run git:publish`: Script PowerShell para commitar e dar push no GitHub.
