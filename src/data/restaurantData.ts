export interface MenuItem {
  id: string;
  name: string;
  italianName?: string;
  description: string;
  price: number;
  category: 'antipasti' | 'pizza' | 'pasta' | 'dolci' | 'bevande';
  image: string;
  isChefSpecial?: boolean;
  dietary?: ('V' | 'VG' | 'GF')[]; // V: Vegetarian, VG: Vegan, GF: Gluten Free available
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: string;
  highlight: string;
}

export const RESTAURANT_INFO = {
  name: "Viva Italian Restaurant Bar & Pizzeria",
  shortName: "Viva Leeds",
  tagline: "Authentic Italian Trattoria & Pizzeria on Bridge End",
  address: "9-11 Bridge End, Leeds LS1 7HG, UK",
  city: "Leeds",
  postcode: "LS1 7HG",
  phone: "0113 242 0185",
  formattedPhone: "+44 113 242 0185",
  email: "ciao@vivaitalianrestaurant-demo.co.uk",
  officialWebsite: "vivaitalianrestaurant.co.uk",
  rating: 4.7,
  reviewCount: 598,
  coordinates: {
    lat: 53.79339,
    lng: -1.54228
  },
  openingHours: [
    { day: "Monday", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00 – 22:00" },
    { day: "Tuesday", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00 – 22:00" },
    { day: "Wednesday", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00 – 22:00" },
    { day: "Thursday", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00 – 22:00" },
    { day: "Friday", open: "12:00", close: "22:00", text: "12:00 – 22:00", hours: "12:00 – 22:00" },
    { day: "Saturday", open: "12:00", close: "22:00", text: "12:00 – 22:00", hours: "12:00 – 22:00" },
    { day: "Sunday", open: "14:00", close: "21:00", text: "14:00 – 21:00", hours: "14:00 – 21:00" },
  ]
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Full Menu', label: 'Tutti i Piatti' },
  { id: 'antipasti', name: 'Antipasti', label: 'Starters' },
  { id: 'pizza', name: 'Pizza al Forno', label: 'Stone-Baked Pizza' },
  { id: 'pasta', name: 'Pasta & Secondi', label: 'Handmade Pasta & Mains' },
  { id: 'dolci', name: 'Dolci', label: 'Desserts' },
  { id: 'bevande', name: 'Bar & Vini', label: 'Wines & Cocktails' }
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // ANTIPASTI
  {
    id: 'anti-1',
    name: 'Burrata Pugliese',
    italianName: 'Burrata con Pomodorini',
    description: 'Creamy Puglian burrata cheese served with heritage confit cherry tomatoes, basil pesto drizzle, toasted pine nuts, and grilled sourdough.',
    price: 9.95,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23156?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
    dietary: ['V']
  },
  {
    id: 'anti-2',
    name: 'Bruschetta Tradizionale',
    italianName: 'Bruschetta al Pomodoro e Basilico',
    description: 'Toasted Altamura bread rubbed with garlic, topped with marinated San Marzano tomatoes, fresh basil, oregano, and extra virgin olive oil.',
    price: 7.50,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=800&auto=format&fit=crop',
    dietary: ['VG', 'V']
  },
  {
    id: 'anti-3',
    name: 'Calamari Fritti',
    italianName: 'Calamari Dorati con Salsa Tartara',
    description: 'Lightly dusted tender baby squid flash-fried until golden, served with homemade roasted garlic lemon aioli and charred fresh lemon.',
    price: 9.50,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },
  {
    id: 'anti-4',
    name: 'Carpaccio di Manzo',
    italianName: 'Carpaccio con Rucola e Grana',
    description: 'Thinly sliced British beef fillet with wild rocket, aged 24-month Parmigiano Reggiano shavings, capers, and cold-pressed white truffle oil.',
    price: 10.95,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    dietary: ['GF']
  },
  {
    id: 'anti-5',
    name: 'Arancini ai Funghi Porcini',
    italianName: 'Arancini Siciliani al Tartufo',
    description: 'Crispy Sicilian risotto balls stuffed with wild porcini mushrooms, melted smoked provola cheese, served on rich pomodoro reduction.',
    price: 8.50,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=800&auto=format&fit=crop',
    dietary: ['V']
  },

  // PIZZA (Stone-baked)
  {
    id: 'piz-1',
    name: 'Margherita D.O.P.',
    italianName: 'Regina Margherita',
    description: 'San Marzano tomato sauce, fresh Fior di Latte mozzarella, fragrant sweet basil, extra virgin olive oil, baked at 450°C in our stone oven.',
    price: 12.50,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
    dietary: ['V']
  },
  {
    id: 'piz-2',
    name: 'Diavola Calabra',
    italianName: 'Pizza alla Diavola Piccante',
    description: 'San Marzano sauce, Fior di Latte, spicy Spianata Calabrese salami, fresh red chillies, and a drizzle of chilli blossom honey.',
    price: 14.95,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },
  {
    id: 'piz-3',
    name: 'Tartufo & Funghi Selvatici',
    italianName: 'Pizza Bianca con Crema di Tartufo',
    description: 'White base with Fior di Latte, wild forest mushrooms, roasted garlic, creamy black truffle paste, thyme, and pecorino romano.',
    price: 15.50,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
    dietary: ['V']
  },
  {
    id: 'piz-4',
    name: 'Prosciutto di Parma & Rucola',
    italianName: 'Parma e Parmigiano',
    description: 'Fior di Latte, slow-simmered tomato sauce base, topped fresh after bake with 18-month Parma ham, wild baby rocket, and Parmigiano shavings.',
    price: 15.95,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },
  {
    id: 'piz-5',
    name: 'Quattro Formaggi',
    italianName: 'I Quattro Formaggi Italiani',
    description: 'A harmonious blend of Fior di Latte, aged Gorgonzola Dolce, creamy Taleggio, and 24-month Parmigiano Reggiano with toasted walnuts.',
    price: 14.50,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
    dietary: ['V']
  },
  {
    id: 'piz-6',
    name: 'Calzone Vesuvio',
    italianName: 'Calzone Ripieno Napoletano',
    description: 'Folded stone-baked pizza filled with ricotta, salami napoli, fior di latte, fresh basil, topped with a ladle of warm tomato sugo.',
    price: 15.20,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },

  // PASTA & SECONDI
  {
    id: 'pas-1',
    name: 'Tagliatelle al Tartufo Nero',
    italianName: 'Tagliatelle Fresche con Tartufo',
    description: 'Hand-rolled egg pasta ribboned with creamy butter emulsion, wild forest mushrooms, 24-month Parmigiano, and freshly shaved black autumn truffle.',
    price: 17.50,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
    dietary: ['V']
  },
  {
    id: 'pas-2',
    name: 'Pappardelle al Ragù di Cinghiale',
    italianName: 'Pappardelle con Ragù Tradizionale',
    description: 'Wide ribbons of artisanal pasta tossed with slow-braised wild boar and Tuscan beef ragù, simmered with red wine and rosemary for 8 hours.',
    price: 16.95,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },
  {
    id: 'pas-3',
    name: 'Linguine ai Frutti di Mare',
    italianName: 'Linguine allo Scoglio',
    description: 'Bronze-die linguine with Scottish mussels, king prawns, palourde clams, and squid in white wine, cherry tomato broth, garlic, and flat parsley.',
    price: 18.95,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },
  {
    id: 'pas-4',
    name: 'Pollo alla Milanese',
    italianName: 'Cotoletta di Pollo alla Milanese',
    description: 'Free-range corn-fed chicken breast coated in herb focaccia breadcrumbs, pan-fried in clarified butter, served with spaghetti al pomodoro.',
    price: 17.00,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
    dietary: []
  },

  // DOLCI (With clear £ prices)
  {
    id: 'dol-1',
    name: 'Tiramisù Tradizionale',
    italianName: 'Il Nostro Tiramisù della Nonna',
    description: 'Savoiardi ladyfingers soaked in dark espresso and Vecchia Romagna brandy, layered with whipped mascarpone cream and dusted with Valrhona cocoa.',
    price: 7.50,
    category: 'dolci',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
    dietary: ['V']
  },
  {
    id: 'dol-2',
    name: 'Cannoli Siciliani Croccanti',
    italianName: 'Tris di Cannoli alla Ricotta',
    description: 'Crisp golden pastry shells filled with sweetened sheep milk ricotta, candied orange peel, and dipped in crushed Bronte pistachios.',
    price: 7.20,
    category: 'dolci',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
    dietary: ['V']
  },
  {
    id: 'dol-3',
    name: 'Panna Cotta alla Vaniglia',
    italianName: 'Panna Cotta con Frutti di Bosco',
    description: 'Velvety Madagascar vanilla bean panna cotta served with a warm wild berry compote and almond cantucci crumble.',
    price: 6.95,
    category: 'dolci',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop',
    dietary: ['GF']
  },

  // BEVANDE / BAR
  {
    id: 'bev-1',
    name: 'Classic Venetian Aperol Spritz',
    description: 'Aperol, premium Valdobbiadene Prosecco Superiore DOCG, soda water, served over rock ice with a fresh orange wheel and Castelvetrano olive.',
    price: 9.50,
    category: 'bevande',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-2',
    name: 'Viva Signature Negroni',
    description: 'Campari, Bombay Sapphire Gin, Cocchi Vermouth di Torino, stirred over handcrafted clear ice block with expressed orange peel oils.',
    price: 10.50,
    category: 'bevande',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-3',
    name: 'Chianti Classico Riserva DOCG',
    description: 'Castello di Monsanto, Tuscany. Rich aromas of wild dark cherries, tobacco, violets, and subtle oak spice. 750ml bottle.',
    price: 36.00,
    category: 'bevande',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    dietary: ['VG', 'GF']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Mark Henderson',
    rating: 5,
    date: '3 weeks ago',
    text: 'Found Viva on Bridge End during a weekend in Leeds. The stone-baked pizza is genuinely the closest you will get to Naples outside of Italy! The crust has that perfect sourdough blister, and the burrata starter was sublime. Staff were attentive and genuinely warm.',
    source: 'Google Review',
    highlight: 'Closest pizza to Naples in Leeds'
  },
  {
    id: 't-2',
    author: 'Sophie Beaumont',
    rating: 5,
    date: '1 month ago',
    text: 'We celebrated my partner\'s 30th birthday here. The atmosphere with the warm amber lights and Italian music in the background was incredible. The black truffle tagliatelle and wild boar ragù are unforgettable. A true gem on the Leeds waterfront!',
    source: 'Google Review',
    highlight: 'Incredible atmosphere & handmade pasta'
  },
  {
    id: 't-3',
    author: 'David & Clare Walsh',
    rating: 5,
    date: '2 months ago',
    text: 'Viva has been our go-to Italian in Leeds city centre for years. Consistently outstanding quality. Excellent Negronis at the bar, followed by authentic pasta and friendly, family-run service. 4.7 stars on Google is well deserved!',
    source: 'Google Review',
    highlight: 'Consistently outstanding quality'
  },
  {
    id: 't-4',
    author: 'Elena Rossi',
    rating: 5,
    date: '3 months ago',
    text: 'Being Italian myself living in West Yorkshire, I am very picky with Italian food. Viva exceeded all expectations — the tomato sauce tastes of true San Marzano sunshine, and the tiramisù was made with real mascarpone and proper espresso.',
    source: 'Google Review',
    highlight: 'Italian-approved authentic taste'
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'Wood-fired Pizza Crust',
    subtitle: 'Fermented 48-hour sourdough baked at 450°C',
    category: 'Pizza',
    url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'gal-2',
    title: 'Fresh Tagliatelle al Tartufo',
    subtitle: 'Hand-rolled daily in our open kitchen',
    category: 'Pasta',
    url: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'gal-3',
    title: 'The Trattoria Ambiance',
    subtitle: 'Warm intimate lighting at 9-11 Bridge End',
    category: 'Atmosphere',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'gal-4',
    title: 'Aperitivo & Italian Cocktails',
    subtitle: 'Classic Negronis and Venetian Spritzes',
    category: 'Bar',
    url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'gal-5',
    title: 'Burrata Pugliese',
    subtitle: 'Heirloom tomatoes, fresh basil pesto & virgin olive oil',
    category: 'Antipasti',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23156?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'gal-6',
    title: 'Artisanal Dolci & Espresso',
    subtitle: 'Handcrafted Tiramisù with Valrhona cocoa',
    category: 'Dessert',
    url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop'
  }
];

export const FAQS = [
  {
    question: "Do you cater for vegetarian and gluten-free diets?",
    answer: "Yes, absolutely! We offer vegetarian, vegan, and gluten-free pasta and pizza options prepared with strict care. Let our team know your dietary preferences upon booking or arrival."
  },
  {
    question: "Is booking required or do you accept walk-ins?",
    answer: "We welcome walk-ins at our bar and main dining area whenever space permits. However, reservations are strongly recommended for Friday, Saturday, and Sunday evenings."
  },
  {
    question: "Where are you located and what is parking like?",
    answer: "We are at 9-11 Bridge End, Leeds LS1 7HG, right next to Leeds Bridge and a 5-minute stroll from Leeds Railway Station. On-street pay-and-display parking and nearby multi-storey car parks at Crown Point and Trinity Leeds are within easy walking distance."
  },
  {
    question: "Do you accommodate large parties and private events?",
    answer: "Yes! Our trattoria can host private celebrations, birthday dinners, corporate gatherings, and family feasts. Please contact us in advance for parties of 8 or more."
  }
];

/**
 * Returns precise 30-minute booking time slots matching official restaurant hours:
 * - Sunday: 14:00–21:00 -> 14:00 to 20:30 (last booking 30 min before close)
 * - Friday & Saturday: 12:00–22:00 -> 12:00 to 21:30 (last booking 30 min before close)
 * - Monday to Thursday: 16:00–22:00 -> 16:00 to 21:30 (last booking 30 min before close)
 */
export function getTimeSlotsForDate(dateStr: string): string[] {
  if (!dateStr) {
    return [
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ];
  }

  // Parse YYYY-MM-DD cleanly
  const [year, month, day] = dateStr.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const dayOfWeek = selectedDate.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday

  if (dayOfWeek === 0) {
    // Sunday: 14:00 to 20:30 in 30-min increments
    return [
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30'
    ];
  } else if (dayOfWeek === 5 || dayOfWeek === 6) {
    // Friday or Saturday: 12:00 to 21:30 in 30-min increments
    return [
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
      '21:00', '21:30'
    ];
  } else {
    // Monday, Tuesday, Wednesday, Thursday: 16:00 to 21:30 in 30-min increments
    return [
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ];
  }
}
