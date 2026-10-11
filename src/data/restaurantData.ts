export interface MenuItem {
  id: string;
  name: string;
  italianName?: string;
  description: string;
  price: number;
  category: 'starters' | 'pizza' | 'pasta' | 'mains' | 'sides' | 'dolci' | 'bevande';
  image: string;
  isChefSpecial?: boolean;
  specialNote?: string;
  dietary?: ('V' | 'VG' | 'GF')[];
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: string;
  dishMentioned?: string;
  highlight: string;
}

export interface OpeningHour {
  day: string;
  short: string;
  open: string;
  close: string;
  text: string;
  hours: string;
}

export const RESTAURANT_INFO = {
  name: "VIVA Italian Restaurant & Pizzeria",
  shortName: "VIVA Leeds",
  tagline: "Authentic Italian Restaurant & Pizzeria in the Heart of Leeds City Centre",
  description: "Authentic Italian food in a warm, intimate atmosphere in the heart of Leeds city centre: 300 yards from Leeds Corn Exchange, 10 min walk from the bus & train station. Hot and cold starters, a wide variety of pasta dishes, delicious main courses, and a great selection of pizzas.",
  address: "9-11 Bridge End, Leeds LS1 7HG",
  city: "Leeds",
  postcode: "LS1 7HG",
  country: "United Kingdom",
  phone: "0113 242 0185",
  formattedPhone: "+44 113 242 0185",
  email: "book@vivaitalianrestaurant.co.uk",
  officialWebsite: "vivaitalianrestaurant.co.uk",
  rating: 4.7,
  reviewCount: 598,
  coordinates: {
    lat: 53.79339,
    lng: -1.54228
  },
  openingHours: [
    { day: "Monday", short: "Mon", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00–22:00" },
    { day: "Tuesday", short: "Tue", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00–22:00" },
    { day: "Wednesday", short: "Wed", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00–22:00" },
    { day: "Thursday", short: "Thu", open: "16:00", close: "22:00", text: "16:00 – 22:00", hours: "16:00–22:00" },
    { day: "Friday", short: "Fri", open: "12:00", close: "22:00", text: "12:00 – 22:00", hours: "12:00–22:00" },
    { day: "Saturday", short: "Sat", open: "12:00", close: "22:00", text: "12:00 – 22:00", hours: "12:00–22:00" },
    { day: "Sunday", short: "Sun", open: "14:00", close: "21:00", text: "14:00 – 21:00", hours: "14:00–21:00" },
  ]
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Full Menu', label: 'All Dishes' },
  { id: 'starters', name: 'Starters', label: 'Cold & Hot Antipasti' },
  { id: 'pasta', name: 'La Pasta', label: 'Fresh Pasta & Risotto' },
  { id: 'pizza', name: 'La Pizza', label: 'Stone-Baked Pizzas' },
  { id: 'mains', name: 'Main Course', label: 'Pollo & Bistecca' },
  { id: 'sides', name: 'Side Orders', label: 'Contorni' },
  { id: 'dolci', name: 'Dolci', label: 'Desserts' },
  { id: 'bevande', name: 'Wine & Cocktails', label: 'Drinks & Bar' }
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS (Cold)
  {
    id: 'sta-1',
    name: 'Bread Basket',
    italianName: 'Cestino di Pane',
    description: 'Freshly prepared Italian bread served with extra virgin olive oil and balsamic vinegar.',
    price: 2.95,
    category: 'starters',
    image: '/client-images/menu-1.jpg',
    dietary: ['V']
  },
  {
    id: 'sta-2',
    name: 'Mixed Olives',
    italianName: 'Olive Miste Marinate',
    description: 'A rich selection of marinated Italian green and black olives with herbs and cold-pressed olive oil.',
    price: 6.95,
    category: 'starters',
    image: '/client-images/gallery-5.jpg',
    dietary: ['VG', 'V', 'GF']
  },
  {
    id: 'sta-3',
    name: 'Bruschetta alla Napoletana (V)',
    italianName: 'Bruschetta Tradizionale Napoletana',
    description: 'Crisp toasted bread topped with ripe chopped tomatoes, fresh garlic, basil, and extra virgin olive oil.',
    price: 8.35,
    category: 'starters',
    image: '/client-images/menu-2.jpg',
    isChefSpecial: true,
    specialNote: 'A true classic starter',
    dietary: ['V']
  },
  {
    id: 'sta-4',
    name: 'Duck Pate',
    italianName: 'Pâté d’Anatra con Crostini',
    description: 'Smooth, rich duck liver pate served with warm toasted artisan bread and sweet red onion marmalade.',
    price: 8.95,
    category: 'starters',
    image: '/client-images/gallery-2.jpg',
    dietary: []
  },
  {
    id: 'sta-5',
    name: 'Bresaola della Valtellina',
    italianName: 'Bresaola con Rucola e Scaglie di Parmigiano',
    description: 'Air-cured tender salted beef from Valtellina served with peppery wild rocket and shaved parmesan.',
    price: 12.75,
    category: 'starters',
    image: '/client-images/gallery-26.jpg',
    dietary: ['GF']
  },
  {
    id: 'sta-6',
    name: 'Antipasto Italiano',
    italianName: 'Grande Tagliere di Salumi e Formaggi',
    description: 'Generous platter of authentic Italian cured meats, cheeses, olives, and marinated vegetables.',
    price: 14.95,
    category: 'starters',
    image: '/client-images/gallery-28.jpg',
    isChefSpecial: true,
    specialNote: 'Perfect to share',
    dietary: []
  },
  {
    id: 'sta-7',
    name: 'Parma Ham & Mozzarella',
    italianName: 'Prosciutto di Parma e Mozzarella',
    description: 'Finest Prosciutto di Parma paired with delicate, creamy Italian mozzarella and virgin olive oil.',
    price: 13.45,
    category: 'starters',
    image: '/client-images/gallery-8.jpg',
    dietary: ['GF']
  },
  {
    id: 'sta-8',
    name: 'Goats Cheese',
    italianName: 'Formaggio di Capra al Forno',
    description: 'Warm creamy baked goats cheese served on toasted croutons with mixed baby leaves and balsamic glaze.',
    price: 9.95,
    category: 'starters',
    image: '/client-images/menu-3.jpg',
    dietary: ['V']
  },

  // STARTERS (Hot)
  {
    id: 'sta-9',
    name: 'Garlic Mushroom',
    italianName: 'Funghi all’Aglio Trifolati',
    description: 'Plump field mushrooms sautéed in rich garlic butter, white wine, and fresh flat-leaf parsley.',
    price: 8.95,
    category: 'starters',
    image: '/client-images/gallery-4.jpg',
    dietary: ['V']
  },
  {
    id: 'sta-10',
    name: 'Mozzarella in Carrozza',
    italianName: 'Mozzarella Dorata in Carrozza',
    description: 'Golden fried crusty bread parcels oozing melted mozzarella cheese, served with warm Napoli sauce.',
    price: 9.00,
    category: 'starters',
    image: '/client-images/menu-4.jpg',
    specialNote: 'Crispy & comforting',
    dietary: ['V']
  },
  {
    id: 'sta-11',
    name: 'Homemade Meatballs',
    italianName: 'Polpette Fatte in Casa al Sugo',
    description: 'Traditional handmade seasoned minced beef meatballs simmered in rich Napoli tomato and basil sauce.',
    price: 9.45,
    category: 'starters',
    image: '/client-images/menu-5.jpg',
    isChefSpecial: true,
    specialNote: 'Handmade daily in our kitchen',
    dietary: []
  },
  {
    id: 'sta-12',
    name: 'Bruschetta Pizza (to share)',
    italianName: 'Bruschetta Pizza per Condividere',
    description: 'Our hand-stretched pizza dough base baked with garlic and fresh herbs, topped with diced seasoned tomatoes and mozzarella.',
    price: 14.95,
    category: 'starters',
    image: '/client-images/gallery-10.jpg',
    specialNote: 'Ideal for 2 to 4 guests',
    dietary: ['V']
  },

  // LA PASTA
  {
    id: 'pas-1',
    name: 'Spaghetti alla Carbonara',
    italianName: 'Spaghetti alla Carbonara Tradizionale',
    description: 'Spaghetti tossed with crispy cured pancetta, free-range egg yolks, parmesan, cracked black pepper, and a touch of cream.',
    price: 14.95,
    category: 'pasta',
    image: '/client-images/menu-6.jpg',
    isChefSpecial: true,
    specialNote: 'Our most loved pasta on Bridge End',
    dietary: []
  },
  {
    id: 'pas-2',
    name: 'Spaghetti all Pesto Sauce',
    italianName: 'Spaghetti al Pesto Genovese',
    description: 'Spaghetti coated in aromatic homemade basil pesto, pine nuts, garlic, parmesan, and extra virgin olive oil.',
    price: 13.65,
    category: 'pasta',
    image: '/client-images/gallery-14.jpg',
    dietary: ['V']
  },
  {
    id: 'pas-3',
    name: 'Risotto Zucchine e Gamberetti',
    italianName: 'Risotto con Zucchine e Gamberetti',
    description: 'Creamy slow-simmered Carnaroli risotto with sweet tender baby courgettes, succulent prawns, and a whisper of garlic.',
    price: 15.45,
    category: 'pasta',
    image: '/client-images/gallery-15.jpg',
    specialNote: 'Fresh & delicate',
    dietary: ['GF']
  },
  {
    id: 'pas-4',
    name: 'Risotto Funghi',
    italianName: 'Risotto ai Funghi di Bosco',
    description: 'Arborio rice cooked with a medley of wild woodland mushrooms, white wine, garlic, butter, and parmesan.',
    price: 14.45,
    category: 'pasta',
    image: '/client-images/gallery-16.jpg',
    dietary: ['V', 'GF']
  },
  {
    id: 'pas-5',
    name: 'Lasagne (Homemade)',
    italianName: 'Lasagne Tradizionali al Forno',
    description: 'Layers of fresh pasta sheets, rich slow-cooked beef bolognese ragù, silky béchamel sauce, and melted mozzarella.',
    price: 15.45,
    category: 'pasta',
    image: '/client-images/menu-7.jpg',
    isChefSpecial: true,
    specialNote: 'Baked fresh every morning',
    dietary: []
  },
  {
    id: 'pas-6',
    name: "Penne all'Arrabbiata",
    italianName: "Penne all'Arrabbiata Piccante",
    description: 'Penne pasta tossed in a fiery San Marzano tomato sauce with chopped garlic, fresh red chillies, and parsley.',
    price: 15.45,
    category: 'pasta',
    image: '/client-images/gallery-17.jpg',
    dietary: ['VG', 'V']
  },
  {
    id: 'pas-7',
    name: 'Penette al Granchio',
    italianName: 'Penette con Granchio e Pomodoro',
    description: 'Tender penne pasta simmered with sweet flaked crab meat, garlic, a splash of white wine, and light tomato cream sauce.',
    price: 16.05,
    category: 'pasta',
    image: '/client-images/gallery-18.jpg',
    dietary: []
  },
  {
    id: 'pas-8',
    name: 'Tagliolini al Salmone',
    italianName: 'Tagliolini Freschi al Salmone Affumicato',
    description: 'Fine tagliolini pasta ribbons paired with Scottish smoked salmon, chives, white wine, and a light creamy sauce.',
    price: 16.45,
    category: 'pasta',
    image: '/client-images/gallery-19.jpg',
    dietary: []
  },
  {
    id: 'pas-9',
    name: 'Tagliolini Supreme',
    italianName: 'Tagliolini Supreme della Casa',
    description: 'Delicate ribbon pasta with strips of chicken breast, wild mushrooms, baby spinach, garlic, and cream sauce.',
    price: 15.45,
    category: 'pasta',
    image: '/client-images/gallery-20.jpg',
    dietary: []
  },
  {
    id: 'pas-10',
    name: 'Tortelloni Caprese',
    italianName: 'Tortelloni Ripieni Caprese',
    description: 'Handcrafted pasta parcels filled with sweet ricotta and spinach, finished in Napoli tomato sugo with fresh mozzarella.',
    price: 15.05,
    category: 'pasta',
    image: '/client-images/gallery-21.jpg',
    dietary: ['V']
  },
  {
    id: 'pas-11',
    name: "Ravioli all'Aragosta",
    italianName: "Ravioli all'Aragosta in Salsa Rosa",
    description: 'Luxurious handmade egg ravioli filled with lobster meat, served in a delicate tomato cream and brandy bisque.',
    price: 16.45,
    category: 'pasta',
    image: '/client-images/gallery-22.jpg',
    isChefSpecial: true,
    specialNote: 'Chef recommendation for special dinners',
    dietary: []
  },

  // LA PIZZA
  {
    id: 'piz-1',
    name: 'Margerita',
    italianName: 'Pizza Classica Margherita',
    description: 'San Marzano tomato base, creamy mozzarella cheese, fresh garden basil, and a drizzle of extra virgin olive oil.',
    price: 11.95,
    category: 'pizza',
    image: '/client-images/menu-8.jpg',
    isChefSpecial: true,
    specialNote: 'Stone-baked perfection',
    dietary: ['V']
  },
  {
    id: 'piz-2',
    name: 'Formaggi',
    italianName: 'Pizza ai Formaggi Italiani',
    description: 'Tomato sauce and a rich blend of four melted Italian cheeses: mozzarella, Gorgonzola, fontina, and parmesan.',
    price: 14.45,
    category: 'pizza',
    image: '/client-images/gallery-23.jpg',
    dietary: ['V']
  },
  {
    id: 'piz-3',
    name: 'Fuocone',
    italianName: 'Pizza Fuocone con Salame Piccante',
    description: 'Tomato sauce, mozzarella, spicy Italian salami, jalapeño chillies, and cracked black pepper for a fiery kick.',
    price: 14.45,
    category: 'pizza',
    image: '/client-images/gallery-24.jpg',
    isChefSpecial: true,
    specialNote: 'For spicy pizza lovers',
    dietary: []
  },
  {
    id: 'piz-4',
    name: 'Quattro Stagioni',
    italianName: 'Pizza Quattro Stagioni',
    description: 'Four distinct quadrants of flavours: ham, mushrooms, artichoke hearts, and black olives over mozzarella and tomato.',
    price: 14.85,
    category: 'pizza',
    image: '/client-images/gallery-25.jpg',
    dietary: []
  },
  {
    id: 'piz-5',
    name: 'Fiorentina',
    italianName: 'Pizza Fiorentina con Spinaci e Uovo',
    description: 'Tomato sauce, mozzarella, baby leaf spinach, black olives, garlic oil, and a soft baked egg in the centre.',
    price: 13.75,
    category: 'pizza',
    image: '/client-images/gallery-27.jpg',
    dietary: ['V']
  },
  {
    id: 'piz-6',
    name: 'Grigliata di Verdure',
    italianName: 'Pizza con Verdure Grigliate',
    description: 'Tomato base, mozzarella, grilled courgettes, aubergines, sweet roasted peppers, and Italian herbs.',
    price: 13.95,
    category: 'pizza',
    image: '/client-images/gallery-29.jpg',
    dietary: ['V']
  },
  {
    id: 'piz-7',
    name: 'Tropicale',
    italianName: 'Pizza Tropicale con Prosciutto e Ananas',
    description: 'Tomato sauce, mozzarella cheese, sweet cooked ham, and juicy pineapple pieces.',
    price: 13.95,
    category: 'pizza',
    image: '/client-images/gallery-30.jpg',
    dietary: []
  },
  {
    id: 'piz-8',
    name: 'Calzone',
    italianName: 'Calzone Tradizionale Ripieno',
    description: 'Folded pizza pocket stuffed with mozzarella, ham, mushrooms, and topped with warm Napoli tomato sugo.',
    price: 15.45,
    category: 'pizza',
    image: '/client-images/slider-3.jpg',
    isChefSpecial: true,
    specialNote: 'Generously stuffed and golden baked',
    dietary: []
  },
  {
    id: 'piz-9',
    name: 'Dolcelatte',
    italianName: 'Pizza con Formaggio Dolcelatte',
    description: 'Tomato base, mozzarella, creamy Italian dolcelatte blue cheese, sweet red onions, and fresh rocket leaves.',
    price: 15.45,
    category: 'pizza',
    image: '/client-images/gallery-1.jpg',
    dietary: ['V']
  },
  {
    id: 'piz-10',
    name: 'Pizza Al Funghi',
    italianName: 'Pizza ai Funghi Champignon',
    description: 'Tomato sauce, mozzarella, sliced fresh field mushrooms, and a fragrant drizzle of garlic oil.',
    price: 13.95,
    category: 'pizza',
    image: '/client-images/gallery-3.jpg',
    dietary: ['V']
  },
  {
    id: 'piz-11',
    name: 'Pizza Con Carne',
    italianName: 'Pizza con Carne Mista',
    description: 'The meat feast: tomato base, mozzarella, pepperoni, spicy meatballs, chicken breast strips, and ham.',
    price: 15.65,
    category: 'pizza',
    image: '/client-images/gallery-6.jpg',
    isChefSpecial: true,
    specialNote: 'Generous combination of prime meats',
    dietary: []
  },
  {
    id: 'piz-12',
    name: 'Pizza al Prosciutto di Parma',
    italianName: 'Pizza con Prosciutto Crudo di Parma',
    description: 'Tomato base, fior di latte mozzarella, 18-month cured Prosciutto di Parma, wild rocket, and shaved parmesan.',
    price: 15.45,
    category: 'pizza',
    image: '/client-images/gallery-7.jpg',
    dietary: []
  },
  {
    id: 'piz-13',
    name: 'Goats Cheese Pizza',
    italianName: 'Pizza con Formaggio di Capra e Cipolle',
    description: 'Tomato sauce, mozzarella, tangy melted goats cheese, sweet caramelised balsamic onions, and baby spinach.',
    price: 14.95,
    category: 'pizza',
    image: '/client-images/gallery-9.jpg',
    dietary: ['V']
  },

  // MAIN COURSE (Carne e Pesce)
  {
    id: 'mai-1',
    name: 'Petto di Pollo Crema e Funghi',
    italianName: 'Petto di Pollo in Crema di Funghi',
    description: 'Tender pan-fried chicken breast served in a velvety cream, white wine, and sautéed mushroom sauce.',
    price: 23.95,
    category: 'mains',
    image: '/client-images/gallery-11.jpg',
    dietary: ['GF']
  },
  {
    id: 'mai-2',
    name: 'Battuta di Pollo alla Milanese',
    italianName: 'Cotoletta di Pollo alla Milanese',
    description: 'Tenderized chicken breast coated in seasoned breadcrumbs, fried until golden and crisp, served with lemon wedges.',
    price: 23.95,
    category: 'mains',
    image: '/client-images/gallery-12.jpg',
    isChefSpecial: true,
    specialNote: 'Classic Milanese favourite',
    dietary: []
  },
  {
    id: 'mai-3',
    name: 'Pollo alla Boscaiola',
    italianName: 'Pollo alla Boscaiola con Funghi e Pomodoro',
    description: 'Chicken breast cooked with woodland mushrooms, smoked pancetta, red wine, and a rich Napoli tomato sugo.',
    price: 23.95,
    category: 'mains',
    image: '/client-images/gallery-13.jpg',
    dietary: []
  },
  {
    id: 'mai-4',
    name: 'Filetto alla Stroganoff',
    italianName: 'Filetto di Manzo alla Stroganoff',
    description: 'Prime strips of British beef fillet sautéed with onions, mushrooms, paprika, brandy, and cream, served with rice.',
    price: 28.95,
    category: 'mains',
    image: '/client-images/gallery-26.jpg',
    isChefSpecial: true,
    specialNote: 'A guest favourite since opening',
    dietary: ['GF']
  },
  {
    id: 'mai-5',
    name: 'Bistecca al Gamberoni',
    italianName: 'Bistecca di Manzo con Gamberoni Reali',
    description: 'Aged sirloin steak grilled to your liking, crowned with large king prawns in garlic butter and white wine sauce.',
    price: 35.00,
    category: 'mains',
    image: '/client-images/gallery-28.jpg',
    isChefSpecial: true,
    specialNote: 'Surf & Turf the Italian way',
    dietary: ['GF']
  },
  {
    id: 'mai-6',
    name: 'Bistecca Griglia',
    italianName: 'Bistecca di Manzo alla Griglia',
    description: 'Finest British prime sirloin steak grilled over high heat, seasoned with sea salt, rosemary, and cracked pepper.',
    price: 30.00,
    category: 'mains',
    image: '/client-images/slider-2.jpg',
    dietary: ['GF']
  },
  {
    id: 'mai-7',
    name: 'Filetto Griglia',
    italianName: 'Filetto di Manzo alla Griglia',
    description: 'Centre-cut prime fillet steak cooked to perfection, intensely tender, served with grilled tomato and mushroom.',
    price: 35.00,
    category: 'mains',
    image: '/client-images/gallery-24.jpg',
    dietary: ['GF']
  },
  {
    id: 'mai-8',
    name: 'Filetto ai Gamberoni',
    italianName: 'Filetto di Manzo con Gamberoni Imperiali',
    description: 'Luxurious tender fillet steak paired with succulent king prawns in a rich garlic, white wine, and herb reduction.',
    price: 39.00,
    category: 'mains',
    image: '/client-images/gallery-28.jpg',
    isChefSpecial: true,
    specialNote: 'The ultimate celebratory dinner',
    dietary: ['GF']
  },
  {
    id: 'mai-9',
    name: 'Sauces (Dianne / Pepe / Blue Cheese)',
    italianName: 'Salse d’Accompagnamento',
    description: 'Choose our homemade peppercorn sauce, classic Dianne with brandy and mushrooms, or creamy Italian blue cheese sauce.',
    price: 3.50,
    category: 'mains',
    image: '/client-images/gallery-4.jpg',
    dietary: ['V', 'GF']
  },

  // SIDE ORDERS (Contorni)
  {
    id: 'sid-1',
    name: 'Mixed Salad',
    italianName: 'Insalata Mista di Stagione',
    description: 'Crisp seasonal mixed leaves, cucumbers, sweet cherry tomatoes, and red onions with Italian dressing.',
    price: 4.95,
    category: 'sides',
    image: '/client-images/gallery-5.jpg',
    dietary: ['VG', 'V', 'GF']
  },
  {
    id: 'sid-2',
    name: 'Rocket and Parmesan',
    italianName: 'Insalata di Rucola e Scaglie di Parmigiano',
    description: 'Peppery wild rocket tossed with aged balsamic glaze and generous shavings of Parmigiano Reggiano.',
    price: 5.95,
    category: 'sides',
    image: '/client-images/gallery-7.jpg',
    dietary: ['V', 'GF']
  },
  {
    id: 'sid-3',
    name: 'Pomodoro e Cipolla',
    italianName: 'Insalata di Pomodoro e Cipolla Rossa',
    description: 'Ripe vine-ripened tomatoes, sweet red onions, dried oregano, and cold-pressed extra virgin olive oil.',
    price: 5.45,
    category: 'sides',
    image: '/client-images/gallery-9.jpg',
    dietary: ['VG', 'V', 'GF']
  },
  {
    id: 'sid-4',
    name: 'Fresh Spinach con Parmiggiano',
    italianName: 'Spinaci Saltati con Parmigiano',
    description: 'Fresh baby leaf spinach sautéed in garlic butter and topped with melted parmesan shavings.',
    price: 6.45,
    category: 'sides',
    image: '/client-images/gallery-10.jpg',
    dietary: ['V', 'GF']
  },
  {
    id: 'sid-5',
    name: 'Zucchine Fritte',
    italianName: 'Zucchine Fritte Croccanti',
    description: 'Crispy deep-fried courgette matchsticks dusted in sea salt, served piping hot.',
    price: 6.45,
    category: 'sides',
    image: '/client-images/gallery-11.jpg',
    dietary: ['V']
  },
  {
    id: 'sid-6',
    name: 'Fries',
    italianName: 'Patatine Fritte Dorate',
    description: 'Golden crispy French fries seasoned with fine sea salt.',
    price: 5.95,
    category: 'sides',
    image: '/client-images/gallery-12.jpg',
    dietary: ['VG', 'V']
  },
  {
    id: 'sid-7',
    name: 'Green Beans',
    italianName: 'Fagiolini Saltati all’Aglio',
    description: 'Tender fine green beans tossed in garlic oil and a sprinkle of cracked black pepper.',
    price: 5.25,
    category: 'sides',
    image: '/client-images/gallery-13.jpg',
    dietary: ['VG', 'V', 'GF']
  },

  // DOLCI (Desserts) - WITH GUARANTEED £ PRICES
  {
    id: 'dol-1',
    name: 'Tiramisù Tradizionale',
    italianName: 'Il Nostro Famoso Tiramisù Fatto in Casa',
    description: 'Savoiardi ladyfingers soaked in rich freshly brewed Italian espresso and liqueur, layered with sweet mascarpone cream and cocoa powder.',
    price: 7.50,
    category: 'dolci',
    image: '/client-images/gallery-16.jpg',
    isChefSpecial: true,
    specialNote: 'Homemade traditional family recipe',
    dietary: ['V']
  },
  {
    id: 'dol-2',
    name: 'Panna Cotta alla Vaniglia',
    italianName: 'Panna Cotta con Salsa ai Frutti di Bosco',
    description: 'Velvety smooth vanilla panna cotta served with a tangy wild berry coulis and fresh mint.',
    price: 6.95,
    category: 'dolci',
    image: '/client-images/gallery-17.jpg',
    specialNote: 'Silky smooth & refreshing',
    dietary: ['GF']
  },
  {
    id: 'dol-3',
    name: 'Cannoli Siciliani',
    italianName: 'Cannoli Tradizionali alla Siciliana',
    description: 'Crisp pastry tubes filled with sweetened ricotta cheese, candied fruit, and dark chocolate chips.',
    price: 7.20,
    category: 'dolci',
    image: '/client-images/gallery-18.jpg',
    dietary: ['V']
  },
  {
    id: 'dol-4',
    name: 'Gelato Artigianale',
    italianName: 'Tris di Gelati Artigianali',
    description: 'Three scoops of authentic Italian artisan gelato: choice of chocolate, vanilla, pistachio, or strawberry.',
    price: 6.50,
    category: 'dolci',
    image: '/client-images/gallery-19.jpg',
    dietary: ['V', 'GF']
  },
  {
    id: 'dol-5',
    name: 'Torta al Cioccolato',
    italianName: 'Torta Calda al Cioccolato Fondente',
    description: 'Warm, rich dark chocolate fudge cake served with vanilla cream or a scoop of gelato.',
    price: 7.25,
    category: 'dolci',
    image: '/client-images/gallery-20.jpg',
    dietary: ['V']
  },

  // WINES & COCKTAILS (Bevande)
  {
    id: 'bev-1',
    name: 'Classic Cocktails (Choice of 12)',
    italianName: 'I Cocktails Classici di Viva',
    description: 'Americano, Godfather, Godmother, Aperol Spritzer, Limoncello Spritzer, Peach Bellini, Bicicletta, Rasperry Bellini, Frangelico Tuscan Mule, Mad Monk, Negroni, or Wedding Cake Martini.',
    price: 10.50,
    category: 'bevande',
    image: '/client-images/gallery-2.jpg',
    isChefSpecial: true,
    specialNote: 'All cocktails £10.50 each',
    dietary: []
  },
  {
    id: 'bev-2',
    name: 'House White Wine (Bottle)',
    italianName: 'Vino Bianco della Casa (175ml £7.15 / 250ml £8.75 / Bottle £25.50)',
    description: 'Crisp and refreshing dry white wine, perfectly balanced for pairing with pasta, seafood, and light starters.',
    price: 25.50,
    category: 'bevande',
    image: '/client-images/gallery-3.jpg',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-3',
    name: 'Pinot Grigio Intrigo',
    italianName: 'Pinot Grigio Intrigo delle Venezie DOC',
    description: 'Delicate citrus and pear aromas with a crisp, mineral finish. (175ml £7.95 / 250ml £9.65 / Bottle £27.95)',
    price: 27.95,
    category: 'bevande',
    image: '/client-images/slider-1.jpg',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-4',
    name: 'Gavi di Gavi DOCG Bricco dei Guazzi',
    italianName: 'Gavi di Gavi DOCG',
    description: 'Piedmont’s premier white wine: elegant, complex, white floral notes with green apple and toasted almond.',
    price: 45.95,
    category: 'bevande',
    image: '/client-images/gallery-1.jpg',
    specialNote: 'Prestigious Piedmont white',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-5',
    name: 'House Red Wine (Bottle)',
    italianName: 'Vino Rosso della Casa (175ml £7.15 / 250ml £8.75 / Bottle £25.50)',
    description: 'Smooth medium-bodied red wine with flavours of ripe red berries, gentle spice, and soft tannins.',
    price: 25.50,
    category: 'bevande',
    image: '/client-images/slider-2.jpg',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-6',
    name: 'Chianti Vernaido Rocca delle Macie',
    italianName: 'Chianti Vernaido DOCG',
    description: 'Tuscan classic with aromas of violet and wild cherry, medium-bodied with a warm, lingering finish.',
    price: 34.95,
    category: 'bevande',
    image: '/client-images/gallery-14.jpg',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-7',
    name: 'Amarone Classico Costasera Masi',
    italianName: 'Amarone della Valpolicella Classico',
    description: 'Proud and majestic Venetian red: baked plums, dark cocoa, cooked cherries, and intense velvety depth.',
    price: 78.95,
    category: 'bevande',
    image: '/client-images/gallery-25.jpg',
    isChefSpecial: true,
    specialNote: 'Legendary Italian reserve',
    dietary: ['VG', 'GF']
  },
  {
    id: 'bev-8',
    name: 'House Prosecco (Bottle)',
    italianName: 'Prosecco Spumante DOC Extra Dry (Glass £8.95 / Bottle £29.95)',
    description: 'Lively, sparkling Italian Prosecco with fine perlage, notes of golden apple, and crisp celebratory fizz.',
    price: 29.95,
    category: 'bevande',
    image: '/client-images/slider-1.jpg',
    specialNote: 'Glass £8.95 / Bottle £29.95',
    dietary: ['VG', 'GF']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    author: 'Mark & Sarah Thornton',
    rating: 5,
    date: '3 weeks ago',
    text: "We booked a table for four on a Friday night after walking down from the Corn Exchange. The atmosphere in Viva is warm and bustling, proper old-school Italian welcome. We had the Antipasto Italiano board and the Homemade Meatballs to start, followed by the Bistecca al Gamberoni and Spaghetti Carbonara. Absolutely top class! Finished off with homemade Tiramisù which was light as a feather. We'll be back every month.",
    source: 'Google Review',
    dishMentioned: 'Bistecca al Gamberoni & Tiramisù',
    highlight: 'Proper old-school Italian welcome, best carbonara in Leeds'
  },
  {
    id: 'rev-2',
    author: 'David H.',
    rating: 5,
    date: '1 month ago',
    text: "Discovered Viva completely by chance near Leeds Bridge about 6 months ago, and it's become our go-to spot for birthdays and date nights. Franco and the team couldn't be friendlier. The stone-baked Fuocone pizza has just the right heat, and my wife swore the Lasagne tasted just like the trattoria we visited in Florence. Great wine list too with proper Italian bottles at fair prices.",
    source: 'TripAdvisor Certificate of Excellence Review',
    dishMentioned: 'Pizza Fuocone & Homemade Lasagne',
    highlight: 'Our go-to spot in Leeds city centre for genuine Italian'
  },
  {
    id: 'rev-3',
    author: 'Elena & Matteo G.',
    rating: 5,
    date: '2 months ago',
    text: "Being Italian and living in Leeds for 8 years, finding authentic Italian food isn't always easy. Viva feels like home. The Mozzarella in Carrozza was golden and crisp, the Tagliolini al Salmone was cooked al dente just as it should be, and the Tiramisù Tradizionale is the real deal with espresso and savoiardi. 10 out of 10 for both food and hospitality.",
    source: 'Google Review',
    dishMentioned: 'Tagliolini al Salmone & Tiramisù Tradizionale',
    highlight: 'Being Italian in Leeds, Viva truly feels like home'
  },
  {
    id: 'rev-4',
    author: 'Rachel P., Headingley',
    rating: 5,
    date: '3 months ago',
    text: "Hired their private room upstairs for my mum's 60th birthday with about 25 of us. They don't charge any room hire fee, which is unheard of in Leeds city centre! The food arrived piping hot for all 25 people — Filetto alla Stroganoff, Battuta di Pollo alla Milanese, and plenty of pizza for the kids. Everyone raved about the meal. Thank you so much to the Viva team!",
    source: 'Google Review',
    dishMentioned: 'Private Party & Filetto Stroganoff',
    highlight: 'Free private room hire for 25 people and superb food'
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    url: '/client-images/slider-1.jpg',
    title: 'The Intimate Dining Room',
    subtitle: 'Warm ambient candlelit tables and rustic wine collection at Bridge End',
    category: 'Interior & Atmosphere'
  },
  {
    id: 'gal-2',
    url: '/client-images/slider-2.jpg',
    title: 'Welcoming Family Tables',
    subtitle: 'Cosy seating for couples, family celebrations, and get-togethers',
    category: 'Atmosphere'
  },
  {
    id: 'gal-3',
    url: '/client-images/slider-3.jpg',
    title: 'Stone Oven Craft & Preparation',
    subtitle: 'Hand-stretched pizza dough and fresh ingredients baked to golden perfection',
    category: 'Kitchen'
  },
  {
    id: 'gal-4',
    url: '/client-images/gallery-26.jpg',
    title: 'Chef Specialities & Fine Steaks',
    subtitle: 'Filetto alla Stroganoff and prime steaks prepared with traditional care',
    category: 'Main Courses'
  },
  {
    id: 'gal-5',
    url: '/client-images/gallery-28.jpg',
    title: 'Antipasto & Seafood Delights',
    subtitle: 'Generous sharing platters of Italian cured meats, cheeses, and king prawns',
    category: 'Antipasti'
  },
  {
    id: 'gal-6',
    url: '/client-images/gallery-24.jpg',
    title: 'Stone-Baked Fuocone Pizza',
    subtitle: 'Crisp, blistered crust with spicy Italian salami and rich mozzarella',
    category: 'La Pizza'
  },
  {
    id: 'gal-7',
    url: '/client-images/gallery-16.jpg',
    title: 'Tiramisù Tradizionale Fatto in Casa',
    subtitle: 'Freshly prepared daily with Italian espresso, mascarpone, and cocoa (£7.50)',
    category: 'Dolci'
  },
  {
    id: 'gal-8',
    url: '/client-images/gallery-2.jpg',
    title: 'Classic Italian Cocktails & Spritzes',
    subtitle: 'Aperol Spritzers, Negronis, and Italian Bellinis at the Viva bar (£10.50)',
    category: 'Bar & Wine'
  },
  {
    id: 'gal-9',
    url: '/client-images/about-us.png',
    title: 'Viva Italian Restaurant & Pizzeria',
    subtitle: 'In the heart of Leeds city centre, 300 yards from the Corn Exchange',
    category: 'About Viva'
  }
];

export const FAQS = [
  {
    question: "Do you offer private room hire for parties or family events?",
    answer: "Yes! We offer a private function room upstairs that accommodates up to 35 people FREE of charge (no room hire fee). It is perfect for birthdays, wedding celebrations, office parties, and family gatherings. Please call 0113 242 0185 or email book@vivaitalianrestaurant.co.uk to reserve."
  },
  {
    question: "Where exactly are you located in Leeds?",
    answer: "We are at 9-11 Bridge End, Leeds LS1 7HG, right near Leeds Bridge and the River Aire. We are only 300 yards from Leeds Corn Exchange and a short 5 to 10-minute walk from Leeds train and bus stations."
  },
  {
    question: "Do you have vegetarian and gluten-free options?",
    answer: "Yes, our menu features many vegetarian dishes (clearly marked with V) and gluten-free choices (GF), including starters, pasta dishes, steaks, and side orders. Please let our waitstaff know about any dietary requirements when you are seated."
  },
  {
    question: "Is the restaurant wheelchair accessible and fully licensed?",
    answer: "Yes, Viva is wheelchair accessible and has a full bar serving classic Italian cocktails (all £10.50), regional Italian wines, Prosecco, beers, and spirits."
  },
  {
    question: "Do I need to book in advance or can I walk in?",
    answer: "Walk-ins are always warmly welcomed! However, Friday and Saturday evenings can get very busy, so we recommend reserving a table online or calling 0113 242 0185 in advance."
  }
];

/**
 * Helper to compute available time slots for a given date in YYYY-MM-DD format.
 * Opening hours:
 * - Sunday: 14:00–21:00 -> 14:00 to 20:30 (30-min increments)
 * - Mon–Thu: 16:00–22:00 -> 16:00 to 21:30
 * - Fri–Sat: 12:00–22:00 -> 12:00 to 21:30
 */
export function getTimeSlotsForDate(dateString: string): string[] {
  if (!dateString) return [];
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday

  let startMinutes = 16 * 60; // 16:00 Mon-Thu
  let endMinutes = 21 * 60 + 30; // 21:30 (last slot before 22:00 close)

  if (dayOfWeek === 0) {
    // Sunday: 14:00 to 20:30 (close at 21:00)
    startMinutes = 14 * 60;
    endMinutes = 20 * 60 + 30;
  } else if (dayOfWeek === 5 || dayOfWeek === 6) {
    // Friday & Saturday: 12:00 to 21:30 (close at 22:00)
    startMinutes = 12 * 60;
    endMinutes = 21 * 60 + 30;
  }

  const slots: string[] = [];
  for (let m = startMinutes; m <= endMinutes; m += 30) {
    const hours = Math.floor(m / 60);
    const mins = m % 60;
    slots.push(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
  }
  return slots;
}
