# Our Vow Renewal Celebration

A beautiful, responsive website for Andréanne & Michaël's vow renewal celebration on September 19th, 2026.

## 🚀 Features

- **Responsive Design**: Beautiful design that works on all devices
- **Bilingual Support**: English and French language options
- **Server-Side Rendering**: Pre-rendered content for perfect link previews
- **Social Media Ready**: Open Graph and Twitter Card support
- **SEO Optimized**: Structured data and meta tags for search engines

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Building for Production

#### Standard Build
```bash
npm run build
```

#### Build with SSR (Recommended for Production)
```bash
npm run build:preview
```

This command:
1. Builds the client bundle
2. Builds the server bundle for SSR
3. Pre-renders the content into `index.html`

#### Testing Pre-rendered Content
```bash
npm run test:preview
```

## 📱 Link Preview Features

The site now includes comprehensive meta tags and pre-rendered content for:

- **Facebook/LinkedIn**: Open Graph tags with rich previews
- **Twitter**: Twitter Card support with large image previews
- **Messaging Apps**: WhatsApp, Telegram, Discord, etc.
- **Search Engines**: Structured data and meta descriptions

### What Gets Pre-rendered

- Hero section with save the date information
- Couple names and event details
- Location and venue information
- Our story section with journey details
- Contact and RSVP information
- Footer with love message

## 🌐 Deployment

After building with `npm run build:preview`, the `dist/` folder contains:

- `index.html` - Pre-rendered HTML with all content
- `assets/` - CSS, JavaScript, and images
- `server/` - Server bundle for SSR (if needed)

Deploy the entire `dist/` folder to your hosting provider.

## 🔧 Customization

### Update Domain URLs
Replace `https://your-domain.com/` in `index.html` with your actual domain.

### Update Hero Image
Replace the hero image path in the meta tags with your actual image URL.

### Modify Content
Update the content in `src/languages/en.ts` and `src/languages/fr.ts` as needed.

## 📚 Documentation

For detailed information about the SSR setup, see [SSR_SETUP.md](./SSR_SETUP.md).

## 🎨 Design

Built with:
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Custom wedding-themed design system

## 📄 License

Private project for personal use.
