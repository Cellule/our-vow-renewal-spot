# Server-Side Rendering (SSR) Setup

This project now supports server-side rendering to enable proper link previews when sharing the website on social media, messaging apps, and other platforms.

## How It Works

1. **Build Process**: The build process now creates both a client bundle and a server bundle
2. **Pre-rendering**: After building, a script pre-renders the React app and injects the HTML into the `index.html` file
3. **Link Previews**: The pre-rendered HTML contains all the content, making it perfect for link unfurling

## Build Commands

### For Production with SSR:

```bash
npm run build:preview
```

This command:

1. Builds the client bundle (`npm run build`)
2. Builds the server bundle (`npm run build:server`)
3. Pre-renders the content (`npm run pre-render`)

### Individual Commands:

- `npm run build` - Build client bundle only
- `npm run build:server` - Build server bundle only
- `npm run pre-render` - Pre-render content into index.html

## What Gets Pre-rendered

The following content is now included in the built `index.html`:

- **Hero Section**: Save the date, couple names, date, location
- **Our Story Section**: Journey description, years married, milestones
- **Event Details**: Celebration information, venue details
- **Contact Section**: Contact information and RSVP details
- **Footer**: Love message and names

## Meta Tags for Link Previews

The HTML now includes comprehensive meta tags for:

- **Open Graph** (Facebook, LinkedIn, etc.)
- **Twitter Cards**
- **Search Engine Optimization**
- **Theme colors and canonical URLs**
