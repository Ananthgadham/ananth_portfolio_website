
# Generate a simple SVG placeholder avatar
svg = '''<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a24;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#111118;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c6aff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background circle -->
  <circle cx="200" cy="200" r="200" fill="url(#bg)"/>
  <!-- Border ring -->
  <circle cx="200" cy="200" r="196" fill="none" stroke="url(#accent)" stroke-width="2" opacity="0.5"/>
  <!-- Body/shoulders -->
  <ellipse cx="200" cy="320" rx="110" ry="80" fill="url(#accent)" opacity="0.18"/>
  <!-- Head -->
  <circle cx="200" cy="165" r="72" fill="url(#accent)" opacity="0.25"/>
  <!-- Inner head highlight -->
  <circle cx="200" cy="165" r="60" fill="#7c6aff" opacity="0.12"/>
  <!-- Initials -->
  <text x="200" y="183" font-family="Inter, sans-serif" font-size="48" font-weight="600" fill="#a78bfa" text-anchor="middle" opacity="0.9">AK</text>
  <!-- Replace label -->
  <rect x="80" y="348" width="240" height="32" rx="16" fill="#7c6aff" opacity="0.15"/>
  <text x="200" y="370" font-family="Inter, sans-serif" font-size="13" fill="#a78bfa" text-anchor="middle" opacity="0.8">Replace with your photo</text>
</svg>'''

with open('/home/claude/portfolio/images/profile.svg', 'w') as f:
    f.write(svg)
print("Done")
