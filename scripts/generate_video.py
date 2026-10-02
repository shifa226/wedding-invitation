import os
import sys
import base64
import subprocess
import json
import time

def get_base64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

couple_b64 = get_base64('src/assets/images/wedding_couple_portrait_1790340802201.jpg')
nikah_b64 = get_base64('src/assets/images/nikah_ceremony_venue_1790340816525.jpg')
valima_b64 = get_base64('src/assets/images/valima_reception_venue_1790340831852.jpg')

os.makedirs('/tmp/video_scenes', exist_ok=True)
os.makedirs('public/video', exist_ok=True)

# Generate sparkling stardust coordinates for ambient background
def stardust():
    stars = [
        (120, 180, 0.4), (960, 240, 0.6), (180, 480, 0.5), (900, 520, 0.7),
        (220, 840, 0.3), (860, 820, 0.5), (150, 1150, 0.6), (930, 1180, 0.4),
        (190, 1450, 0.7), (890, 1420, 0.5), (250, 1720, 0.6), (830, 1700, 0.4),
        (540, 140, 0.5), (540, 1760, 0.5), (320, 310, 0.4), (760, 310, 0.4),
        (130, 720, 0.5), (950, 720, 0.5), (140, 1310, 0.4), (940, 1310, 0.4)
    ]
    elements = []
    for x, y, op in stars:
        elements.append(f'''
        <g transform="translate({x},{y})">
          <circle cx="0" cy="0" r="1.5" fill="#fce8a6" opacity="{op}" />
          <path d="M 0 -7 L 1.5 -1.5 L 7 0 L 1.5 1.5 L 0 7 L -1.5 1.5 L -7 0 L -1.5 -1.5 Z" fill="#cca052" opacity="{op*0.75}" />
        </g>
        ''')
    return "\n".join(elements)

def common_defs():
    return '''
    <defs>
      <!-- Imperial 24K Royal Gold Gradient -->
      <linearGradient id="gold24k" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b68228" />
        <stop offset="18%" stop-color="#ddaa4e" />
        <stop offset="35%" stop-color="#fff2be" />
        <stop offset="50%" stop-color="#caa055" />
        <stop offset="68%" stop-color="#fdf4cf" />
        <stop offset="85%" stop-color="#c69135" />
        <stop offset="100%" stop-color="#936015" />
      </linearGradient>

      <!-- Soft Light Gold for script & highlights -->
      <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#cca052" />
        <stop offset="50%" stop-color="#fff5cc" />
        <stop offset="100%" stop-color="#cca052" />
      </linearGradient>

      <!-- Deep Emerald Velvet Background -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#020905" />
        <stop offset="25%" stop-color="#041810" />
        <stop offset="50%" stop-color="#072217" />
        <stop offset="75%" stop-color="#041810" />
        <stop offset="100%" stop-color="#020905" />
      </linearGradient>

      <!-- Center Warm Amber Glow -->
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#e8be66" stop-opacity="0.18" />
        <stop offset="60%" stop-color="#cca052" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#020905" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="goldPlate" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#fff2be" />
        <stop offset="40%" stop-color="#caa055" />
        <stop offset="80%" stop-color="#936015" />
        <stop offset="100%" stop-color="#5a3b0d" />
      </radialGradient>

      <!-- Mughal / Andalusian Cusped Arch for Couple Portrait -->
      <clipPath id="royalArchClip">
        <path d="M 230 380
                 C 230 290, 310 240, 390 220
                 C 450 200, 510 180, 540 160
                 C 570 180, 630 200, 690 220
                 C 770 240, 850 290, 850 380
                 L 850 1060
                 C 850 1070, 840 1080, 830 1080
                 L 250 1080
                 C 240 1080, 230 1070, 230 1060
                 Z" />
      </clipPath>

      <!-- Venue Cusped Arch -->
      <clipPath id="venueArchClip">
        <path d="M 240 370
                 C 240 290, 315 245, 390 225
                 C 450 205, 510 185, 540 165
                 C 570 185, 630 205, 690 225
                 C 765 245, 840 290, 840 370
                 L 840 920
                 C 840 930, 830 940, 820 940
                 L 260 940
                 C 250 940, 240 930, 240 920
                 Z" />
      </clipPath>
    </defs>
    '''

def royal_borders():
    return f'''
    <!-- Royal Filigree Multi-layer Borders -->
    <rect x="36" y="36" width="1008" height="1848" rx="22" fill="none" stroke="url(#gold24k)" stroke-width="4" />
    <rect x="52" y="52" width="976" height="1816" rx="16" fill="none" stroke="#cca052" stroke-width="1.4" opacity="0.8" stroke-dasharray="10 5" />
    <rect x="68" y="68" width="944" height="1784" rx="12" fill="none" stroke="url(#goldLight)" stroke-width="0.8" opacity="0.45" />

    <!-- 4 Ornate Arabesque Corner Stars (8-point Khatim with inner rosette) -->
    <!-- Top-Left -->
    <g transform="translate(52, 52)">
      <polygon points="0,18 18,18 18,0 36,0 36,18 54,18 54,36 36,36 36,54 18,54 18,36 0,36" fill="url(#gold24k)" />
      <circle cx="27" cy="27" r="10" fill="#041810" />
      <circle cx="27" cy="27" r="6" fill="url(#gold24k)" />
    </g>
    <!-- Top-Right -->
    <g transform="translate(974, 52)">
      <polygon points="0,18 18,18 18,0 36,0 36,18 54,18 54,36 36,36 36,54 18,54 18,36 0,36" fill="url(#gold24k)" />
      <circle cx="27" cy="27" r="10" fill="#041810" />
      <circle cx="27" cy="27" r="6" fill="url(#gold24k)" />
    </g>
    <!-- Bottom-Left -->
    <g transform="translate(52, 1814)">
      <polygon points="0,18 18,18 18,0 36,0 36,18 54,18 54,36 36,36 36,54 18,54 18,36 0,36" fill="url(#gold24k)" />
      <circle cx="27" cy="27" r="10" fill="#041810" />
      <circle cx="27" cy="27" r="6" fill="url(#gold24k)" />
    </g>
    <!-- Bottom-Right -->
    <g transform="translate(974, 1814)">
      <polygon points="0,18 18,18 18,0 36,0 36,18 54,18 54,36 36,36 36,54 18,54 18,36 0,36" fill="url(#gold24k)" />
      <circle cx="27" cy="27" r="10" fill="#041810" />
      <circle cx="27" cy="27" r="6" fill="url(#gold24k)" />
    </g>

    <!-- Side Flourish Accents -->
    <g transform="translate(36, 960) translate(-8, -12)">
      <polygon points="8,0 16,12 8,24 0,12" fill="url(#gold24k)" />
    </g>
    <g transform="translate(1044, 960) translate(-8, -12)">
      <polygon points="8,0 16,12 8,24 0,12" fill="url(#gold24k)" />
    </g>

    {stardust()}
    '''

# SCENE 1: Welcome, Sacred Bismillah & 3D Royal Wax Seal Monogram
s1 = f'''<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  {common_defs()}
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="540" cy="960" r="580" fill="url(#centerGlow)" />
  {royal_borders()}

  <!-- Top Sacred Bismillah in Amiri Calligraphy -->
  <text x="540" y="210" text-anchor="middle" fill="url(#gold24k)" font-size="52" font-family="Amiri, serif" font-weight="bold">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</text>
  <text x="540" y="265" text-anchor="middle" fill="#cca052" font-size="17" font-family="Cinzel, serif" letter-spacing="5">IN THE NAME OF ALLAH, THE MOST BENEFICENT, THE MOST MERCIFUL</text>

  <!-- Royal Divider -->
  <line x1="240" y1="310" x2="840" y2="310" stroke="url(#gold24k)" stroke-width="1.8" />
  <polygon points="540,302 548,310 540,318 532,310" fill="url(#gold24k)" />

  <text x="540" y="420" text-anchor="middle" fill="#fce8a6" font-size="32" font-family="Cinzel Decorative, Cinzel, serif" font-weight="bold" letter-spacing="10">ROYAL WEDDING INVITATION</text>

  <!-- Grand 3D Royal Wax Seal / Gold Medallion -->
  <g transform="translate(540, 710)">
    <!-- Outer Glow & Bevel -->
    <circle cx="0" cy="0" r="176" fill="none" stroke="url(#gold24k)" stroke-width="2" opacity="0.6" stroke-dasharray="8 6" />
    <circle cx="0" cy="0" r="162" fill="url(#goldPlate)" stroke="#cca052" stroke-width="4" />
    <circle cx="0" cy="0" r="144" fill="#04160f" stroke="url(#gold24k)" stroke-width="3" />
    <circle cx="0" cy="0" r="132" fill="none" stroke="#cca052" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8" />

    <!-- Laurel Wreath Leaves Around Monogram -->
    <path d="M -90 -10 C -110 -60, -60 -110, 0 -118 C 60 -110, 110 -60, 90 -10" fill="none" stroke="url(#gold24k)" stroke-width="2" opacity="0.6" stroke-dasharray="4 4" />
    <path d="M -90 10 C -110 60, -60 110, 0 118 C 60 110, 110 60, 90 10" fill="none" stroke="url(#gold24k)" stroke-width="2" opacity="0.6" stroke-dasharray="4 4" />

    <!-- Monogram Characters -->
    <text x="0" y="24" text-anchor="middle" fill="url(#gold24k)" font-size="82" font-family="Cinzel Decorative, Cinzel, serif" font-weight="bold" letter-spacing="8">S &amp; M</text>
    <text x="0" y="74" text-anchor="middle" fill="#fce8a6" font-size="13" font-family="Cinzel, serif" letter-spacing="6">ROYAL UNION</text>
  </g>

  <!-- Poetic Invitation in Great Vibes Cursive -->
  <text x="540" y="1030" text-anchor="middle" fill="#fceda2" font-size="40" font-family="Great Vibes, cursive">Together with their families,</text>
  <text x="540" y="1085" text-anchor="middle" fill="#dfba73" font-size="34" font-family="Great Vibes, cursive">cordially invite you to celebrate the sacred union of</text>

  <!-- Groom & Bride Large Typography with Drop Shadows -->
  <text x="540" y="1235" text-anchor="middle" fill="url(#gold24k)" font-size="68" font-family="Cinzel, serif" font-weight="bold" letter-spacing="7">SYED IRFAN</text>
  <text x="540" y="1310" text-anchor="middle" fill="#fff3c4" font-size="52" font-family="Great Vibes, cursive">&amp;</text>
  <text x="540" y="1415" text-anchor="middle" fill="url(#gold24k)" font-size="68" font-family="Cinzel, serif" font-weight="bold" letter-spacing="7">MEHEK S.</text>

  <!-- Bottom Crest & Dates -->
  <line x1="300" y1="1500" x2="780" y2="1500" stroke="url(#gold24k)" stroke-width="1.8" />
  <polygon points="540,1492 548,1500 540,1508 532,1500" fill="url(#gold24k)" />

  <text x="540" y="1590" text-anchor="middle" fill="#fce8a6" font-size="28" font-family="Cinzel, serif" letter-spacing="10">OCTOBER 2026</text>
  <text x="540" y="1640" text-anchor="middle" fill="#dfba73" font-size="21" font-family="Cinzel, serif" letter-spacing="5">MADHUGIRI &amp; SIRA, KARNATAKA</text>
</svg>'''

# SCENE 2: The Sacred Covenant & Arched Couple Portrait
s2 = f'''<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  {common_defs()}
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="540" cy="620" r="500" fill="url(#centerGlow)" />
  {royal_borders()}

  <text x="540" y="150" text-anchor="middle" fill="#cca052" font-size="22" font-family="Cinzel, serif" letter-spacing="9">THE SACRED COVENANT</text>
  <text x="540" y="205" text-anchor="middle" fill="url(#gold24k)" font-size="44" font-family="Amiri, serif" font-weight="bold">سَيِّد عِرْفَان &amp; مَهَك</text>

  <!-- Hanging Chandelier Motif -->
  <line x1="540" y1="70" x2="540" y2="115" stroke="url(#gold24k)" stroke-width="1.5" />
  <polygon points="540,115 544,123 540,131 536,123" fill="url(#gold24k)" />

  <!-- Arched Couple Portrait Photo Frame with Multi-tier Gold Borders -->
  <path d="M 224 380
           C 224 286, 306 234, 388 214
           C 448 194, 508 174, 540 152
           C 572 174, 632 194, 692 214
           C 774 234, 856 286, 856 380
           L 856 1066
           C 856 1078, 844 1088, 832 1088
           L 248 1088
           C 236 1088, 224 1078, 224 1066
           Z" fill="none" stroke="url(#gold24k)" stroke-width="6" />

  <path d="M 238 382
           C 238 296, 314 248, 392 228
           C 450 208, 510 188, 540 168
           C 570 188, 630 208, 688 228
           C 766 248, 842 296, 842 382
           L 842 1056
           L 238 1056
           Z" fill="none" stroke="#cca052" stroke-width="1.8" stroke-dasharray="10 5" opacity="0.8" />

  <!-- The Portrait Photo Inside Arch -->
  <image href="data:image/jpeg;base64,{couple_b64}" x="230" y="150" width="620" height="930" preserveAspectRatio="xMidYMid slice" clip-path="url(#royalArchClip)" />

  <!-- Couple Names Below Portrait -->
  <text x="540" y="1185" text-anchor="middle" fill="url(#gold24k)" font-size="56" font-family="Cinzel, serif" font-weight="bold" letter-spacing="6">SYED IRFAN</text>
  <text x="540" y="1255" text-anchor="middle" fill="#fff3c4" font-size="44" font-family="Great Vibes, cursive">&amp;</text>
  <text x="540" y="1335" text-anchor="middle" fill="url(#gold24k)" font-size="56" font-family="Cinzel, serif" font-weight="bold" letter-spacing="6">MEHEK S.</text>

  <!-- Sacred Quranic Blessing Card -->
  <g transform="translate(140, 1420)">
    <rect x="0" y="0" width="800" height="240" rx="18" fill="#041610" stroke="url(#gold24k)" stroke-width="2" opacity="0.95" />
    <rect x="12" y="12" width="776" height="216" rx="12" fill="none" stroke="#cca052" stroke-width="1" stroke-dasharray="8 4" opacity="0.6" />

    <!-- Quranic Arabic Calligraphy in Amiri -->
    <text x="400" y="60" text-anchor="middle" fill="url(#goldLight)" font-size="34" font-family="Amiri, serif" font-weight="bold">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا</text>
    <text x="400" y="105" text-anchor="middle" fill="url(#goldLight)" font-size="32" font-family="Amiri, serif" font-weight="bold">وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</text>

    <!-- English Translation in Playfair -->
    <text x="400" y="155" text-anchor="middle" fill="#fce8a6" font-size="20" font-family="Playfair Display, serif" font-style="italic">"And among His signs is that He created for you mates from among yourselves,</text>
    <text x="400" y="185" text-anchor="middle" fill="#fce8a6" font-size="20" font-family="Playfair Display, serif" font-style="italic">that you may dwell in tranquility, and He placed between you love and mercy."</text>

    <text x="400" y="222" text-anchor="middle" fill="#cca052" font-size="14" font-family="Cinzel, serif" letter-spacing="3">SURAH AR-RUM [30:21]</text>
  </g>
</svg>'''

# SCENE 3: Sacred Nikah Ceremony
s3 = f'''<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  {common_defs()}
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="540" cy="540" r="500" fill="url(#centerGlow)" />
  {royal_borders()}

  <!-- Top Arabic Heading -->
  <text x="540" y="150" text-anchor="middle" fill="url(#gold24k)" font-size="52" font-family="Amiri, serif" font-weight="bold">النِّكَاحُ مِن سُنَّتِي</text>
  <text x="540" y="200" text-anchor="middle" fill="#cca052" font-size="24" font-family="Cinzel, serif" letter-spacing="9">THE SACRED NIKAH CEREMONY</text>

  <!-- Venue Photography Arched Frame -->
  <path d="M 234 370
           C 234 286, 310 240, 386 220
           C 446 200, 506 180, 540 158
           C 574 180, 634 200, 694 220
           C 770 240, 846 286, 846 370
           L 846 926
           L 234 926
           Z" fill="none" stroke="url(#gold24k)" stroke-width="5" />

  <image href="data:image/jpeg;base64,{nikah_b64}" x="240" y="150" width="600" height="780" preserveAspectRatio="xMidYMid slice" clip-path="url(#venueArchClip)" />

  <!-- Venue Badge Tag -->
  <g transform="translate(320, 885)">
    <rect x="0" y="0" width="440" height="64" rx="32" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.5" />
    <text x="220" y="41" text-anchor="middle" fill="url(#gold24k)" font-size="22" font-family="Cinzel, serif" font-weight="bold" letter-spacing="5">HSR SHADI MAHAL</text>
  </g>

  <!-- Event Details Royal Card -->
  <g transform="translate(130, 1020)">
    <rect x="0" y="0" width="820" height="630" rx="22" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.2" opacity="0.96" />
    <rect x="15" y="15" width="790" height="600" rx="16" fill="none" stroke="#cca052" stroke-width="1.2" stroke-dasharray="10 5" opacity="0.6" />

    <!-- Day & Date -->
    <text x="410" y="75" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">CEREMONIAL DATE</text>
    <text x="410" y="130" text-anchor="middle" fill="#fce8a6" font-size="40" font-family="Cinzel, serif" font-weight="bold">Thursday, 22nd October 2026</text>

    <line x1="180" y1="175" x2="640" y2="175" stroke="url(#gold24k)" stroke-width="1.2" opacity="0.7" />

    <!-- Ceremony Time -->
    <text x="410" y="225" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">AUSPICIOUS TIME</text>
    <text x="410" y="280" text-anchor="middle" fill="url(#gold24k)" font-size="48" font-family="Playfair Display, serif" font-weight="bold">12:30 PM (Noon)</text>

    <line x1="180" y1="325" x2="640" y2="325" stroke="url(#gold24k)" stroke-width="1.2" opacity="0.7" />

    <!-- Venue & Address -->
    <text x="410" y="375" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">CEREMONY DESTINATION</text>
    <text x="410" y="430" text-anchor="middle" fill="#fce8a6" font-size="36" font-family="Cinzel, serif" font-weight="bold">HSR Shadi Mahal</text>
    <text x="410" y="475" text-anchor="middle" fill="#dfba73" font-size="23" font-family="Playfair Display, serif">Opp. KSRTC Bus Stand, Madhugiri</text>

    <!-- Banquet Feast Ribbon -->
    <g transform="translate(130, 520)">
      <rect x="0" y="0" width="560" height="60" rx="30" fill="#08281d" stroke="url(#gold24k)" stroke-width="2" />
      <text x="280" y="38" text-anchor="middle" fill="url(#goldLight)" font-size="21" font-family="Cinzel, serif" font-weight="bold" letter-spacing="3">LUNCH SERVED AFTER NIKAH</text>
    </g>
  </g>
</svg>'''

# SCENE 4: The Grand Valima Reception
s4 = f'''<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  {common_defs()}
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="540" cy="540" r="500" fill="url(#centerGlow)" />
  {royal_borders()}

  <!-- Top Arabic Heading -->
  <text x="540" y="150" text-anchor="middle" fill="url(#gold24k)" font-size="52" font-family="Amiri, serif" font-weight="bold">حَفْلُ الْوَلِيمَة الْمُبَارَك</text>
  <text x="540" y="200" text-anchor="middle" fill="#cca052" font-size="24" font-family="Cinzel, serif" letter-spacing="9">THE GRAND VALIMA RECEPTION</text>

  <!-- Venue Photography Arched Frame -->
  <path d="M 234 370
           C 234 286, 310 240, 386 220
           C 446 200, 506 180, 540 158
           C 574 180, 634 200, 694 220
           C 770 240, 846 286, 846 370
           L 846 926
           L 234 926
           Z" fill="none" stroke="url(#gold24k)" stroke-width="5" />

  <image href="data:image/jpeg;base64,{valima_b64}" x="240" y="150" width="600" height="780" preserveAspectRatio="xMidYMid slice" clip-path="url(#venueArchClip)" />

  <!-- Venue Badge Tag -->
  <g transform="translate(310, 885)">
    <rect x="0" y="0" width="460" height="64" rx="32" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.5" />
    <text x="230" y="41" text-anchor="middle" fill="url(#gold24k)" font-size="22" font-family="Cinzel, serif" font-weight="bold" letter-spacing="5">JAMIYA SHADI MAHAL</text>
  </g>

  <!-- Event Details Royal Card -->
  <g transform="translate(130, 1020)">
    <rect x="0" y="0" width="820" height="630" rx="22" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.2" opacity="0.96" />
    <rect x="15" y="15" width="790" height="600" rx="16" fill="none" stroke="#cca052" stroke-width="1.2" stroke-dasharray="10 5" opacity="0.6" />

    <!-- Day & Date -->
    <text x="410" y="75" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">RECEPTION DATE</text>
    <text x="410" y="130" text-anchor="middle" fill="#fce8a6" font-size="40" font-family="Cinzel, serif" font-weight="bold">Saturday, 24th October 2026</text>

    <line x1="180" y1="175" x2="640" y2="175" stroke="url(#gold24k)" stroke-width="1.2" opacity="0.7" />

    <!-- Reception Time -->
    <text x="410" y="225" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">EVENING TIME</text>
    <text x="410" y="280" text-anchor="middle" fill="url(#gold24k)" font-size="48" font-family="Playfair Display, serif" font-weight="bold">7:30 PM Onwards</text>

    <line x1="180" y1="325" x2="640" y2="325" stroke="url(#gold24k)" stroke-width="1.2" opacity="0.7" />

    <!-- Venue & Address -->
    <text x="410" y="375" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">RECEPTION DESTINATION</text>
    <text x="410" y="430" text-anchor="middle" fill="#fce8a6" font-size="36" font-family="Cinzel, serif" font-weight="bold">Jamiya Shadi Mahal</text>
    <text x="410" y="475" text-anchor="middle" fill="#dfba73" font-size="23" font-family="Playfair Display, serif">Near Jamiya Masjid, Sira</text>

    <!-- Dinner Feast Ribbon -->
    <g transform="translate(130, 520)">
      <rect x="0" y="0" width="560" height="60" rx="30" fill="#08281d" stroke="url(#gold24k)" stroke-width="2" />
      <text x="280" y="38" text-anchor="middle" fill="url(#goldLight)" font-size="21" font-family="Cinzel, serif" font-weight="bold" letter-spacing="3">VALIMA DINNER BANQUET: 7:30 PM</text>
    </g>
  </g>
</svg>'''

# SCENE 5: Honoured Families & Elders' Lineage
s5 = f'''<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  {common_defs()}
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="540" cy="960" r="540" fill="url(#centerGlow)" />
  {royal_borders()}

  <text x="540" y="150" text-anchor="middle" fill="#cca052" font-size="22" font-family="Cinzel, serif" letter-spacing="8">FAMILY LINEAGE &amp; ELDERS</text>
  <text x="540" y="210" text-anchor="middle" fill="url(#gold24k)" font-size="44" font-family="Cinzel Decorative, Cinzel, serif" font-weight="bold" letter-spacing="5">HONOURED FAMILIES</text>
  <text x="540" y="265" text-anchor="middle" fill="#fceda2" font-size="36" font-family="Great Vibes, cursive">Rooted in the timeless traditions of Sira &amp; Madhugiri</text>

  <line x1="260" y1="305" x2="820" y2="305" stroke="url(#gold24k)" stroke-width="1.8" />
  <polygon points="540,297 548,305 540,313 532,305" fill="url(#gold24k)" />

  <!-- Groom Family Card -->
  <g transform="translate(110, 350)">
    <rect x="0" y="0" width="860" height="580" rx="22" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.2" opacity="0.96" />
    <rect x="15" y="15" width="830" height="550" rx="16" fill="none" stroke="#cca052" stroke-width="1.2" stroke-dasharray="10 5" opacity="0.5" />

    <text x="430" y="65" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">THE GROOM &amp; FAMILY</text>
    <text x="430" y="125" text-anchor="middle" fill="url(#gold24k)" font-size="44" font-family="Cinzel, serif" font-weight="bold">Syed Irfan</text>

    <text x="430" y="180" text-anchor="middle" fill="#fce8a6" font-size="25" font-family="Playfair Display, serif" font-weight="bold">S/o Syed Akbar (Late)</text>
    <text x="430" y="225" text-anchor="middle" fill="#dfba73" font-size="20" font-family="Playfair Display, serif">S.A. Fashions, R.T. Road, Sira</text>

    <line x1="160" y1="270" x2="700" y2="270" stroke="url(#gold24k)" stroke-width="1" opacity="0.6" />

    <text x="430" y="325" text-anchor="middle" fill="#dfba73" font-size="22" font-family="Playfair Display, serif">Paternal Grand S/o Syed Abdur-Rehman (Late)</text>
    <text x="430" y="365" text-anchor="middle" fill="#cca052" font-size="19" font-family="Cinzel, serif" letter-spacing="2">UPPAR BAZAR, SIRA</text>

    <line x1="250" y1="405" x2="610" y2="405" stroke="#cca052" stroke-width="0.8" opacity="0.4" />

    <text x="430" y="455" text-anchor="middle" fill="#dfba73" font-size="22" font-family="Playfair Display, serif">Maternal Grand S/o Hassain Khan (Late)</text>
    <text x="430" y="495" text-anchor="middle" fill="#cca052" font-size="19" font-family="Cinzel, serif" letter-spacing="2">SHIRANI MOHALLA, SIRA</text>
  </g>

  <!-- Bride Family Card -->
  <g transform="translate(110, 980)">
    <rect x="0" y="0" width="860" height="580" rx="22" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.2" opacity="0.96" />
    <rect x="15" y="15" width="830" height="550" rx="16" fill="none" stroke="#cca052" stroke-width="1.2" stroke-dasharray="10 5" opacity="0.5" />

    <text x="430" y="65" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="5">THE BRIDE &amp; FAMILY</text>
    <text x="430" y="125" text-anchor="middle" fill="url(#gold24k)" font-size="44" font-family="Cinzel, serif" font-weight="bold">Mehek S.</text>

    <text x="430" y="180" text-anchor="middle" fill="#fce8a6" font-size="25" font-family="Playfair Display, serif" font-weight="bold">D/o Syed Suban urf Syed Ansar</text>
    <text x="430" y="225" text-anchor="middle" fill="#dfba73" font-size="20" font-family="Playfair Display, serif">Fruit Merchant, 1st Block, Madhugiri</text>

    <line x1="160" y1="270" x2="700" y2="270" stroke="url(#gold24k)" stroke-width="1" opacity="0.6" />

    <text x="430" y="325" text-anchor="middle" fill="#dfba73" font-size="22" font-family="Playfair Display, serif">Paternal Grand D/o Syed Ismail (Late)</text>
    <text x="430" y="365" text-anchor="middle" fill="#cca052" font-size="19" font-family="Cinzel, serif" letter-spacing="2">MADHUGIRI</text>

    <line x1="250" y1="405" x2="610" y2="405" stroke="#cca052" stroke-width="0.8" opacity="0.4" />

    <text x="430" y="455" text-anchor="middle" fill="#dfba73" font-size="22" font-family="Playfair Display, serif">Maternal Grand D/o Syed Lateef (Late)</text>
    <text x="430" y="495" text-anchor="middle" fill="#cca052" font-size="19" font-family="Cinzel, serif" letter-spacing="2">MADHUGIRI</text>
  </g>

  <!-- Du'as of Elders in Great Vibes -->
  <text x="540" y="1650" text-anchor="middle" fill="#fceda2" font-size="34" font-family="Great Vibes, cursive">With the prayers &amp; loving blessings of our respected elders</text>
</svg>'''

# SCENE 6: JazakAllahu Khairan & Divine Prophetic Du'a
s6 = f'''<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  {common_defs()}
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="540" cy="960" r="560" fill="url(#centerGlow)" />
  {royal_borders()}

  <!-- Arabic With Love -->
  <text x="540" y="240" text-anchor="middle" fill="url(#gold24k)" font-size="60" font-family="Amiri, serif" font-weight="bold">بِكُلِّ حُبٍّ وَتَقْدِيرٍ</text>
  <text x="540" y="300" text-anchor="middle" fill="#cca052" font-size="23" font-family="Cinzel, serif" letter-spacing="9">WITH HEARTFELT LOVE &amp; GRATITUDE</text>

  <!-- Couple Names -->
  <text x="540" y="430" text-anchor="middle" fill="url(#gold24k)" font-size="62" font-family="Cinzel, serif" font-weight="bold" letter-spacing="6">SYED IRFAN</text>
  <text x="540" y="495" text-anchor="middle" fill="#fff3c4" font-size="44" font-family="Great Vibes, cursive">&amp;</text>
  <text x="540" y="575" text-anchor="middle" fill="url(#gold24k)" font-size="62" font-family="Cinzel, serif" font-weight="bold" letter-spacing="6">MEHEK S.</text>

  <!-- Grand 12-pointed Islamic Shamsa Star Rosette -->
  <g transform="translate(540, 750) scale(1.8)">
    <polygon points="0,-45 12,-15 42,-22 22,-3 45,15 15,22 12,45 -3,22 -22,42 -15,12 -45,0 -15,-12 -22,-42 3,-22" fill="url(#gold24k)" />
    <circle cx="0" cy="0" r="28" fill="#04160f" stroke="url(#gold24k)" stroke-width="2" />
    <circle cx="0" cy="0" r="20" fill="url(#gold24k)" />
    <circle cx="0" cy="0" r="10" fill="#04160f" />
  </g>

  <!-- JazakAllahu Khairan & Du'a Royal Plaque -->
  <g transform="translate(120, 940)">
    <rect x="0" y="0" width="840" height="520" rx="22" fill="#04160f" stroke="url(#gold24k)" stroke-width="2.2" opacity="0.96" />
    <rect x="15" y="15" width="810" height="490" rx="16" fill="none" stroke="#cca052" stroke-width="1.2" stroke-dasharray="10 5" opacity="0.6" />

    <!-- Sacred JazakAllahu Khairan -->
    <text x="420" y="95" text-anchor="middle" fill="url(#gold24k)" font-size="64" font-family="Amiri, serif" font-weight="bold">جَزَاكُمُ اللَّهُ خَيْرًا</text>

    <text x="420" y="175" text-anchor="middle" fill="#fce8a6" font-size="26" font-family="Playfair Display, serif" font-style="italic">"Thank you for being an indispensable part of our sacred celebration</text>
    <text x="420" y="220" text-anchor="middle" fill="#fce8a6" font-size="26" font-family="Playfair Display, serif" font-style="italic">and gracing our union with your heartfelt prayers."</text>

    <line x1="180" y1="275" x2="660" y2="275" stroke="url(#gold24k)" stroke-width="1.2" opacity="0.7" />

    <!-- Prophetic Sunnah Wedding Du'a -->
    <text x="420" y="340" text-anchor="middle" fill="url(#goldLight)" font-size="34" font-family="Amiri, serif" font-weight="bold">بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</text>
    <text x="420" y="395" text-anchor="middle" fill="#cca052" font-size="18" font-family="Cinzel, serif" letter-spacing="4">BARAKALLAHU LAKUMA WA BARAKA ALAIKUMA</text>
    <text x="420" y="435" text-anchor="middle" fill="#cca052" font-size="16" font-family="Cinzel, serif" letter-spacing="3">WA JAMA'A BAINAKUMA FI KHAIR</text>

    <text x="420" y="480" text-anchor="middle" fill="#dfba73" font-size="16" font-family="Playfair Display, serif" font-style="italic">May Allah bless your union and shower His mercy upon you both.</text>
  </g>

  <!-- Bottom Crest -->
  <text x="540" y="1590" text-anchor="middle" fill="url(#gold24k)" font-size="26" font-family="Cinzel, serif" letter-spacing="8">OCTOBER 2026</text>
  <text x="540" y="1640" text-anchor="middle" fill="#dfba73" font-size="20" font-family="Cinzel, serif" letter-spacing="5">MADHUGIRI &amp; SIRA, KARNATAKA</text>
</svg>'''

scenes = [s1, s2, s3, s4, s5, s6]
durations = [8, 8, 9, 9, 8, 7] # sum = 49s

print("1. Rendering SVG scenes with high-resolution librsvg...")
png_files = []
for i, sc in enumerate(scenes):
    svg_path = f'/tmp/video_scenes/scene_{i}.svg'
    png_path = f'/tmp/video_scenes/scene_{i}.png'
    with open(svg_path, 'w') as f:
        f.write(sc)
    subprocess.run(['ffmpeg', '-y', '-i', svg_path, '-frames:v', '1', png_path], check=True)
    png_files.append(png_path)
    print(f"Scene {i+1} rendered: {png_path}")

print("2. Generating subtle Ken Burns motion clips for each scene...")
clip_files = []
for i, (png, dur) in enumerate(zip(png_files, durations)):
    clip_path = f'/tmp/video_scenes/clip_{i}.mp4'
    fps = 25
    frames = int(dur * fps)

    # Alternate between gentle zoom-in and gentle zoom-out for cinematic elegance
    if i % 2 == 0:
        # Subtle zoom-in: 1.00 -> 1.045
        vf = f"zoompan=z='min(zoom+0.0003,1.045)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps={fps}"
    else:
        # Subtle pan & gentle zoom
        vf = f"zoompan=z='min(zoom+0.00025,1.04)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+(in*0.04)':s=1080x1920:fps={fps}"

    cmd_clip = [
        'ffmpeg', '-y',
        '-loop', '1', '-i', png,
        '-vf', vf,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '19',
        '-pix_fmt', 'yuv420p',
        '-t', str(dur),
        clip_path
    ]
    subprocess.run(cmd_clip, check=True)
    clip_files.append(clip_path)
    print(f"Clip {i+1} created with Ken Burns motion ({dur}s)")

print("3. Stitching scenes with smooth 1.2s golden crossfade transitions...")
# Durations: [8, 8, 9, 9, 8, 7]
# xfade duration = 1.2s
# offset 1: 8 - 1.2 = 6.8
# offset 2: 6.8 + (8 - 1.2) = 13.6
# offset 3: 13.6 + (9 - 1.2) = 21.4
# offset 4: 21.4 + (9 - 1.2) = 29.2
# offset 5: 29.2 + (8 - 1.2) = 36.0
# total video duration = 36.0 + 7.0 = 43.0 seconds

trans_dur = 1.2
o1 = round(durations[0] - trans_dur, 2)
o2 = round(o1 + durations[1] - trans_dur, 2)
o3 = round(o2 + durations[2] - trans_dur, 2)
o4 = round(o3 + durations[3] - trans_dur, 2)
o5 = round(o4 + durations[4] - trans_dur, 2)
total_duration = round(o5 + durations[5], 2)

inputs = []
for clip in clip_files:
    inputs.extend(['-i', clip])

filter_complex = [
    f"[0:v][1:v]xfade=transition=fade:duration={trans_dur}:offset={o1}[v01]",
    f"[v01][2:v]xfade=transition=fade:duration={trans_dur}:offset={o2}[v02]",
    f"[v02][3:v]xfade=transition=fade:duration={trans_dur}:offset={o3}[v03]",
    f"[v03][4:v]xfade=transition=fade:duration={trans_dur}:offset={o4}[v04]",
    f"[v04][5:v]xfade=transition=fade:duration={trans_dur}:offset={o5}[v05]"
]

video_filter = ";".join(filter_complex)
temp_video = '/tmp/video_scenes/temp_full_video.mp4'

cmd_stitch = [
    'ffmpeg', '-y',
    *inputs,
    '-filter_complex', video_filter,
    '-map', '[v05]',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '19',
    '-pix_fmt', 'yuv420p',
    '-t', str(total_duration),
    temp_video
]
subprocess.run(cmd_stitch, check=True)
print(f"Stitched video stream created ({total_duration}s)!")

print("4. Muxing wedding soundtrack with gentle fade-in and studio-grade fade-out...")
final_mp4 = 'public/video/wedding-invitation.mp4'

cmd_mux = [
    'ffmpeg', '-y',
    '-i', temp_video,
    '-i', 'public/music/wedding-song.mp3',
    '-filter_complex', f'[1:a]atrim=0:{total_duration},afade=t=in:st=0:d=1.0,afade=t=out:st={total_duration-3.0}:d=3.0[a]',
    '-map', '0:v',
    '-map', '[a]',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '256k',
    '-movflags', '+faststart',
    final_mp4
]
subprocess.run(cmd_mux, check=True)

size_mb = os.path.getsize(final_mp4) / (1024 * 1024)
print(f"MASTERPIECE COMPLETE! Created {final_mp4} ({size_mb:.2f} MB, {total_duration}s)")
