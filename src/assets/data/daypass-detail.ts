import { ImageSourcePropType } from 'react-native';

export type Mock_Daypass_Purchase = typeof daypass_detail.hotel;
export const daypass_detail = {
  hotel: {
    name: 'Hilton Cancun, an All-Inclusive Resort asdasd',
    location: {
      city: 'Cancún',
      address: 'Carretera Federal 307 Cancun-Tulum, ROO 77569 Cancún, Mexico',
      latitude: 40.390893,
      longitude: -3.691122,
      map_url: 'https://maps.google.com/?q=40.390893,-3.691122',
    },
    category: '5 Star Hotel',
    ratings: {
      score: 5.0,
      reviews_count: 48,
      description: 'Muy Bueno',
    },
    details: {
      description: 'El Hilton Cancun, an All-Inclusive Resort se encuentra en Cancún, a 17 km del Museo Subacuático de Cancún, y ofrece alojamiento con bicicletas gratuitas, estacionamiento privado gratuito, piscina al aire libre y centro fitness.',
    },
    amenities: [
      {
        type: 'beachfront',
        label: 'Frente a la playa',
      },
      {
        type: 'pool',
        label: 'Piscina al aire libre',
      },
      {
        type: 'restaurant',
        label: '3 restaurantes',
      },
      {
        type: 'spa',
        label: 'Centro de spa',
      },
    ],
    daypass_details: [
      'Piscina infinita al aire libre',
      'Servicio junto a la piscina con alimentos y bebidas disponibles para comprar en The Verandah Terrace',
      'Acceso privado a la playa (camas y tumbonas por orden de llegada)',
      'Gimnasio',
      'Snorkel, remo y kayak',
      'Cine privado con películas y aplicaciones de streaming (se requiere reservación)',
    ],
    images: [
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Imagen de la piscina principal',
      },
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Imagen de la piscina principal 2',
      },
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Imagen de la piscina principal 3',
      },
    ],
    availability: {
      checkin_date: '14 sep',
      guests: 2,
    },
  },
};

export const daypass_reviews = [
  {
    name: 'Jamie',
    location: 'Madrid, España',
    rating: 5.0,
    image: 'https://ui-avatars.com/api/?name=Jamie',
    time: 'Hace 16 horas',
    comment:
      'La comida fue una de las mejores cosas del resort. El personal fue muy servicial y acogedor. La disponibilidad para bebidas fue excelente.',
  },
  {
    name: 'Ayotade',
    location: 'Ottawa, Canada',
    rating: 5.0,
    image: 'https://ui-avatars.com/api/?name=Ayotade',
    time: 'Hace 8 días',
    comment:
      'En general, el personal fue práctico, servicial, etc. Un reconocimiento especial para Raymundo, el tipo fue excelente y servicial e hizo que nuestra estadía en general fuera más fácil.',
  },
  {
    name: 'Liliadne',
    location: 'Texas, Estados Unidos',
    rating: 5.0,
    image: 'https://ui-avatars.com/api/?name=Liliadne',
    time: 'Hace 12 días',
    comment:
      'Hotel muy cómodo, solo sugiero que en las actividades diga el lugar donde se realizarán. El personal es muy agradable, excelente servicio al cliente.',
  },
  {
    name: 'Marco',
    location: 'Roma, Italia',
    rating: 4.5,
    image: 'https://ui-avatars.com/api/?name=Marco',
    time: 'Hace 1 día',
    comment:
      'El lugar era hermoso, pero el servicio en la piscina fue un poco lento. Aparte de eso, todo fue genial.',
  },
  {
    name: 'Emily',
    location: 'Londres, Reino Unido',
    rating: 4.0,
    image: 'https://ui-avatars.com/api/?name=Emily',
    time: 'Hace 3 días',
    comment:
      'La habitación estaba limpia y cómoda, pero la comida en el restaurante podría haber sido mejor.',
  },
  {
    name: 'Carlos',
    location: 'Ciudad de México, México',
    rating: 5.0,
    image: 'https://ui-avatars.com/api/?name=Carlos',
    time: 'Hace 5 días',
    comment:
      'Un lugar maravilloso para relajarse. El personal fue increíble y las instalaciones estuvieron a la altura de nuestras expectativas.',
  },
  {
    name: 'Yuki',
    location: 'Tokio, Japón',
    rating: 4.8,
    image: 'https://ui-avatars.com/api/?name=Yuki',
    time: 'Hace 10 días',
    comment:
      'Excelente servicio y una vista impresionante desde la habitación. Definitivamente recomendaría este lugar.',
  },
  {
    name: 'Fatima',
    location: 'Casablanca, Marruecos',
    rating: 5.0,
    image: 'https://ui-avatars.com/api/?name=Fatima',
    time: 'Hace 2 semanas',
    comment:
      'Una experiencia inolvidable. Todo fue perfecto desde el momento en que llegamos. Sin duda volveré.',
  },
  {
    name: 'Lars',
    location: 'Oslo, Noruega',
    rating: 4.7,
    image: 'https://ui-avatars.com/api/?name=Lars',
    time: 'Hace 3 semanas',
    comment:
      'El hotel es fantástico, aunque el clima no ayudó mucho. Aun así, disfrutamos nuestra estancia.',
  },
  {
    name: 'Sofia',
    location: 'Buenos Aires, Argentina',
    rating: 4.9,
    image: 'https://ui-avatars.com/api/?name=Sofia',
    time: 'Hace 1 mes',
    comment:
      'Increíble lugar para desconectar. La atención al detalle es impresionante y el personal muy atento.',
  },
];

export const daypass_polices = {
  cancellation_policy: {
    description:
      'Las políticas de cancelación y pago anticipado varían según el tipo de alojamiento. Consulta qué condiciones se aplican a cada opción.',
    after: {
      date: '16 sep',
      time: '8:12 PM',
      refund: 'Esta reservación no\ntiene reembolso',
    },
    cleaning_fee: 'Los gastos de limpieza se reembolsan si cancela antes del check-in.',
  },
  house_rules: {
    title: 'Reglas de casa',
    description: 'Hilton Cancún, un Resort Todo Incluido acepta solicitudes especiales: ¡agréguelas en el siguiente paso!',
    rules: [
      {
        title: 'Entrada y salida',
        entry: 'Entrada a partir de las 10:00 AM',
      },
      {
        title: 'Durante su estancia',
        rules: [
          'Máximo 2 personas',
          'Sin mascotas',
          'Horas tranquilas 12:00 AM - 8:00 AM',
          'No hay fiestas ni eventos',
        ],
      },
    ],
  },
};

export const daypass_list: IDaypassDetailListItem[] = [
  {
    name: 'Hilton Cancun, an All-Inclusive Resort',
    location: {
      city: 'Cancún',
      address: 'Carretera Federal 307 Cancun-Tulum, ROO 77569 Cancún, Mexico',
      latitude: 21.027764,
      longitude: -86.822083,
      map_url: 'https://maps.google.com/?q=21.027764,-86.822083',
    },
    category: '5 Star Hotel',
    ratings: {
      score: 5.0,
      reviews_count: 48,
      description: 'Muy Bueno',
    },
    details: {
      description: 'El Hilton Cancun, an All-Inclusive Resort se encuentra en Cancún, y ofrece alojamiento con frente a la playa, piscina infinita, y restaurantes reconocidos. Es ideal para familias y escapadas tranquilas.',
    },
    amenities: [
      {
        type: 'beachfront',
        label: 'Frente a la playa',
      },
      {
        type: 'pool',
        label: 'Piscina al aire libre',
      },
      {
        type: 'restaurant',
        label: '3 restaurantes',
      },
      {
        type: 'spa',
        label: 'Centro de spa',
      },
    ],
    daypass_details: [
      'Piscina infinita al aire libre',
      'Servicio junto a la piscina con alimentos y bebidas disponibles para comprar en The Verandah Terrace',
      'Acceso privado a la playa (camas y tumbonas por orden de llegada)',
      'Gimnasio',
      'Snorkel, remo y kayak',
      'Cine privado con películas y aplicaciones de streaming (se requiere reservación)',
    ],
    images: [
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Vista aérea de la piscina infinita',
      },
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Área de spa y descanso',
      },
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Playa privada del resort',
      },
    ],
    availability: {
      checkin_date: '22 nov',
      guests: 2,
    },
    tickets: [
      {type: 'DAY PASS', price: 56, currency: 'USD'},
      {type: 'CABANA', price: 168, currency: 'USD', availability: 'consumo incluido', availabilityType: 'include'},
      {type: 'CABANA', price: 168, currency: 'USD', availability: 'consumo incliudo', availabilityType: 'few-left' },
      {type: 'DAY BED', price: 112, currency: 'USD', availability: 'Solo quedan 2', availabilityType: 'few-left'},
    ],
  },
  {
    name: 'Grand Palladium Costa Mujeres Resort & Spa',
    location: {
      city: 'Costa Mujeres',
      address: 'Costa Mujeres, Quintana Roo, México',
      latitude: 21.23798,
      longitude: -86.82338,
      map_url: 'https://maps.google.com/?q=21.23798,-86.82338',
    },
    category: '5 Star Hotel',
    ratings: {
      score: 4.8,
      reviews_count: 35,
      description: 'Excelente',
    },
    details: {
      description: 'El Grand Palladium Costa Mujeres Resort & Spa cuenta con una ubicación privilegiada en Costa Mujeres. Este resort ofrece actividades para toda la familia y lujosas instalaciones frente a la playa.',
    },
    amenities: [
      {
        type: 'beachfront',
        label: 'Frente a la playa',
      },
      {
        type: 'pool',
        label: 'Piscina exterior',
      },
      {
        type: 'restaurant',
        label: '7 restaurantes',
      },
      {
        type: 'kids_club',
        label: 'Club infantil',
      },
    ],
    daypass_details: [
      'Acceso a las playas privadas',
      'Piscinas temáticas y servicio en la piscina',
      'Spa de lujo y área de relajación',
      'Actividades acuáticas como paddleboard y kayak',
    ],
    images: [
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Piscina principal del resort',
      },
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Vista de la playa privada',
      },
      {
        url: require('@app/assets/images/daypass-detail.png'),
        caption: 'Área de spa y gimnasio',
      },
    ],
    availability: {
      checkin_date: '22 nov',
      guests: 2,
    },
    tickets: [
      {type: 'DAY PASS', price: 56, currency: 'USD'},
      {type: 'CABANA', price: 168, currency: 'USD', availability: 'consumo incluido', availabilityType: 'include'},
      {type: 'CABANA', price: 168, currency: 'USD', availability: 'consumo incliudo', availabilityType: 'few-left' },
      {type: 'DAY BED', price: 112, currency: 'USD', availability: 'Solo quedan 2', availabilityType: 'few-left'},
    ],
  },
];


export interface IDaypassDetailListItem {
  name: string
  location: IDaypassLocation
  category: string
  ratings: IDaypassRatings
  details: IDaypassDetails
  amenities: IDaypassAmenity[]
  daypass_details: string[]
  images: IDaypassImage[]
  availability: IDaypassAvailability
  tickets: DaypassTicket[]
}

export interface IDaypassLocation {
  city: string
  address: string
  latitude: number
  longitude: number
  map_url: string
}

export interface IDaypassRatings {
  score: number
  reviews_count: number
  description: string
}

export interface IDaypassDetails {
  description: string
}

export interface IDaypassAmenity {
  type: string
  label: string
}

export interface IDaypassImage {
  url: ImageSourcePropType
  caption: string
}

export interface IDaypassAvailability {
  checkin_date: string
  guests: number
}

export interface DaypassTicket {
  type: string
  price: number
  currency: string
  availability?: string
  availabilityType?: 'include' | 'few-left'
}

// TODO: remove this
export type HotelMapDataMockType = typeof dataHotelsMock[0];

export const dataHotelsMock = [
  {
    'id_venue': 'hotel123',
    'name': 'Hotel Paraíso Maya',
    'stars': 4,
    'rating': 9,
    'rating_descp': 'Excelente',
    'reviews': 120,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1619,
    'longitude': -86.8515,
    'price': 230,
  },
  {
    'id_venue': 'hotel456',
    'name': 'Gran Hotel Riviera',
    'stars': 5,
    'rating': 8.5,
    'rating_descp': 'Muy bueno',
    'reviews': 85,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 20.6295,
    'longitude': -87.0736,
    'price': 200,
  },
  {
    'id_venue': 'hotel789',
    'name': 'Hotel Costa Real',
    'stars': 3,
    'rating': 7.8,
    'rating_descp': 'Bueno',
    'reviews': 50,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 20.6295,
    'longitude': -86.0736,
    'price': 210,
  },
  {
    'id_venue': 'hotel101',
    'name': 'Hotel Selva Escondida',
    'stars': 4,
    'rating': 9.2,
    'rating_descp': 'Fantástico',
    'reviews': 150,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 20.2095,
    'longitude': -86.0736,
    'price': 220,
  },
  {
    'id_venue': 'hotel112',
    'name': 'Hotel Sol y Luna',
    'stars': 3,
    'rating': 7.5,
    'rating_descp': 'Agradable',
    'reviews': 60,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.2095,
    'longitude': -87.0736,
    'price': 205,
  },
  {
    'id_venue': 'hotel124', // Nuevo ID para evitar duplicado de hotel123
    'name': 'Hotel Paraíso Maya',
    'stars': 4,
    'rating': 9,
    'rating_descp': 'Excelente',
    'reviews': 120,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1619,
    'longitude': -86.8515,
    'price': 230,
  },
  {
    'id_venue': 'hotel457', // Nuevo ID para evitar duplicado de hotel456
    'name': 'Gran Hotel Riviera',
    'stars': 5,
    'rating': 8.5,
    'rating_descp': 'Muy bueno',
    'reviews': 85,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1625,
    'longitude': -86.8520,
    'price': 200,
  },
  {
    'id_venue': 'hotel790', // Nuevo ID para evitar duplicado de hotel789
    'name': 'Hotel Costa Real',
    'stars': 3,
    'rating': 7.8,
    'rating_descp': 'Bueno',
    'reviews': 50,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1630,
    'longitude': -86.8510,
    'price': 210,
  },
  {
    'id_venue': 'hotel102', // Nuevo ID para evitar duplicado de hotel101
    'name': 'Hotel Selva Escondida',
    'stars': 4,
    'rating': 9.2,
    'rating_descp': 'Fantástico',
    'reviews': 150,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1610,
    'longitude': -86.8525,
    'price': 220,
  },
  {
    'id_venue': 'hotel113', // Nuevo ID para evitar duplicado de hotel112
    'name': 'Hotel Sol y Luna',
    'stars': 3,
    'rating': 7.5,
    'rating_descp': 'Agradable',
    'reviews': 60,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1622,
    'longitude': -86.8518,
    'price': 205,
  },
  {
    'id_venue': 'hotel223',
    'name': 'Hotel Amanecer Cancun',
    'stars': 4,
    'rating': 8.8,
    'rating_descp': 'Muy bien',
    'reviews': 90,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1628,
    'longitude': -86.8512,
    'price': 215,
  },
  {
    'id_venue': 'hotel334',
    'name': 'Hotel Brisas del Mar',
    'stars': 5,
    'rating': 9.5,
    'rating_descp': 'Excepcional',
    'reviews': 200,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1615,
    'longitude': -86.8522,
    'price': 240,
  },
  {
    'id_venue': 'hotel445',
    'name': 'Hotel Luna Azul',
    'stars': 3,
    'rating': 7.2,
    'rating_descp': 'Regular',
    'reviews': 40,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1632,
    'longitude': -86.8517,
    'price': 195,
  },
  {
    'id_venue': 'hotel556',
    'name': 'Hotel Estrella del Caribe',
    'stars': 4,
    'rating': 8.9,
    'rating_descp': 'Excelente',
    'reviews': 110,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1620,
    'longitude': -86.8519,
    'price': 225,
  },
  {
    'id_venue': 'hotel667',
    'name': 'Hotel las Palmas',
    'stars': 3,
    'rating': 8.0,
    'rating_descp': 'Muy bien',
    'reviews': 70,
    'images': 'https://www.daypass.com/content/venue/MX/iL0rb65ThFK42EAS4NlTlQ==/1.jpeg',
    'latitude': 21.1617,
    'longitude': -86.8521,
    'price': 210,
  },
];
