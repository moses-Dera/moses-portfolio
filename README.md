# Moses Chidera Okonkwo - Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring geometric design elements, smooth animations, and a contact form with email functionality.

## 🚀 Features

- **Modern Design**: Geometric clip-path shapes and techy aesthetic
- **Smooth Animations**: Framer Motion animations throughout the site
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Interactive Elements**: Hover effects, modal slideshows, and grain background
- **Contact Form**: Nodemailer integration for direct email sending
- **Project Showcase**: Modal galleries with keyboard navigation
- **Theme System**: CSS custom properties for consistent theming

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.10
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: Nodemailer
- **Fonts**: JetBrains Mono, Fira Code, Inter, Source Code Pro
- **Icons**: React Icons
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
moses-portfolio/
├── app/
│   ├── contact/          # Contact page with form
│   ├── project/          # Projects showcase
│   ├── skill/            # Skills & expertise
│   ├── api/contact/      # Email API endpoint
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Homepage
├── components/
│   ├── GrainBackground.tsx    # Animated grain texture
│   ├── navbar.tsx            # Navigation with animations
│   ├── projectCard.tsx       # Project cards with modals
│   └── footer.tsx            # Footer component
├── lib/
│   └── project.ts            # Project data
└── public/                   # Static assets
```

## 🎨 Design Features

### Geometric Elements
- Custom clip-path polygons for modern shapes
- Hexagonal skill cards
- Techy button designs with cut corners

### Animations
- Page transitions with staggered elements
- Hover effects with scale and lift
- Rotating logo on hover
- Grain background with mouse interaction

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## 📧 Contact Form

The contact form uses Nodemailer to send emails directly to your inbox:

1. **Setup**: Configure environment variables in `.env.local`
2. **Gmail Integration**: Uses Gmail SMTP with app passwords
3. **Form Validation**: Client-side validation with loading states
4. **Success Feedback**: Visual confirmation when message is sent

### Environment Variables
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/moses-Dera/moses-portfolio.git
   cd moses-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your email credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Pages

- **Home** (`/`): Introduction with social links and grain background
- **Skills** (`/skill`): Expertise areas with animated cards
- **Projects** (`/project`): Portfolio showcase with modal galleries
- **Contact** (`/contact`): Contact form with social media links

## 🎯 Key Components

### GrainBackground
- Canvas-based animated texture
- Mouse interaction effects
- Theme-aware color adaptation

### ProjectCard
- Image galleries with modal slideshow
- Keyboard navigation (arrow keys, escape)
- Geometric clip-path styling

### Navbar
- Smooth slide-in animation
- Hover effects on navigation items
- Rotating logo interaction

## 🌐 Social Links

- **GitHub**: [moses-Dera](https://github.com/moses-Dera)
- **LinkedIn**: [m-chidera-okonkwo](https://www.linkedin.com/in/m-chidera-okonkwo/)
- **Twitter**: [@0x_moze](https://x.com/0x_moze)
- **Credly**: [moses-okonkwo](https://www.credly.com/users/moses-okonkwo)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

Moses Chidera Okonkwo - okonkwomoses158@gmail.com

Project Link: [https://github.com/moses-Dera/moses-portfolio](https://github.com/moses-Dera/moses-portfolio)