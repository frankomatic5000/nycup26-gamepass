import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Gift,
  Languages,
  MapPin,
  Megaphone,
  Music2,
  Radio,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  Utensils,
  WalletCards,
} from "lucide-react";

type LanguageCode = "en" | "es" | "pt-BR";

type Venue = {
  name: string;
  category: Record<LanguageCode, string>;
  neighborhood: string;
  address: string;
  benefits: Record<LanguageCode, string[]>;
  hours?: string;
  validFrom: string;
  validTo: string;
  mapUrl: string;
};

type Copy = {
  languageName: string;
  ticker: { label: string; value: string }[];
  nav: { venues: string; howItWorks: string; partners: string; faq: string; waitlist: string };
  hero: {
    liveBoard: string;
    tickerLabel: string;
    unlockSignal: string;
    badge: string;
    title: string;
    text: string;
    join: string;
    explore: string;
    stats: { label: string; value: string }[];
  };
  concept: { eyebrow: string; title: string; text: string };
  how: { eyebrow: string; title: string; text: string; steps: string[] };
  rulesPickup: {
    eyebrow: string;
    title: string;
    text: string;
    scheduleLabel: string;
    scheduleText: string;
    statuses: { confirmed: string; comingSoon: string };
    pickupTbdAddress: string;
    rules: { title: string; text: string }[];
  };
  venues: {
    eyebrow: string;
    title: string;
    text: string;
    arrival: string;
    departure: string;
    neighborhood: string;
    hours: string;
    passWindow: string;
    notSpecified: string;
    openMap: string;
    empty: string;
  };
  superpowers: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  infoPanels: { pickup: { eyebrow: string; title: string; text: string }; tickets: { eyebrow: string; title: string; text: string } };
  partners: {
    eyebrow: string;
    title: string;
    text: string;
    groupCta: string;
    types: string[];
  };
  signup: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    language: string;
    visitDates: string;
    visitDatesPlaceholder: string;
    visitHint: string;
    invalidEmail: string;
    success: string;
    idle: string;
    button: string;
  };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  footer: string;
  heroImageAlt: string;
};

const languageOptions: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt-BR", label: "PT-BR" },
];

const STORAGE_KEY = "nycup26-language";

const copy: Record<LanguageCode, Copy> = {
  en: {
    languageName: "English",
    ticker: [
      { label: "World Cup 2026", value: "NYC visitor experiences from June 11 to July 19" },
      { label: "Bracelet pass", value: "Unlocks perks at participating venues" },
      { label: "Pickup", value: "In-person bracelet handoff in NYC" },
      { label: "Partners", value: "Sponsor, fundraiser, and venue options" },
    ],
    nav: { venues: "Venues", howItWorks: "How it works", partners: "Partners", faq: "FAQ", waitlist: "Waitlist" },
    hero: {
      liveBoard: "Live Board",
      tickerLabel: "NYCUP26 updates",
      unlockSignal: "Bracelet unlock signal",
      badge: "Unlock NYC during the World Cup.",
      title: "Your bracelet unlocks the city.",
      text: "A festival-style visitor bracelet for World Cup fans in NYC: watch parties, curated venues, food and nightlife perks, sponsor moments, and a simple path to early access.",
      join: "Join the waitlist",
      explore: "Explore venues",
      stats: [
        { label: "Event dates", value: "June 11 - July 19, 2026" },
        { label: "Program length", value: "39 daily event days" },
        { label: "First round", value: "June 11 - June 27" },
      ],
    },
    concept: {
      eyebrow: "The concept",
      title: "A bracelet that doubles as a city guide.",
      text: "Visitors choose dates, see relevant venues, and follow a simple path from signup to pickup. The design is clean, practical, and built to launch fast.",
    },
    how: {
      eyebrow: "How it works",
      title: "Five simple steps from arrival to wristband access.",
      text: "The flow stays obvious while pickup locations, daily wristband colors, and ticket links are finalized.",
      steps: [
        "Choose the dates you will be in town.",
        "Use the ticket link once it is announced.",
        "Pick up your wristband at the assigned NYC location.",
        "Wear that day's wristband color to participating venues.",
        "Follow each venue's house rules and enjoy eligible specials.",
      ],
    },
    rulesPickup: {
      eyebrow: "Rules + pickup",
      title: "What customers need to know before event day.",
      text: "NYCUP26 runs daily June 11 to July 19, 2026. Customers receive the assigned pickup location before purchase or event day, and each event day uses a different wristband color.",
      scheduleLabel: "Confirmed pickup schedule",
      scheduleText: "June 11, 12, and 13 wristband pickup is confirmed at The Copa. June 14-27 locations are TBD / coming soon.",
      statuses: { confirmed: "Confirmed", comingSoon: "Coming soon" },
      pickupTbdAddress: "Pickup locations will be announced before purchase or event day.",
      rules: [
        { title: "Daily program", text: "NYCUP26 runs daily from June 11 to July 19, 2026. The first round runs June 11 to June 27." },
        { title: "Pickup can vary", text: "Customers pick up their wristband at the assigned pickup location. Locations may vary, and each day uses a different color wristband." },
        { title: "Age rules", text: "Nightclubs are 21+. Restaurants and non-nightclub venues are 18+ unless a venue policy says otherwise." },
        { title: "Venue policies", text: "Entry is subject to venue guidelines, house rules, capacity, and security. Customers must comply with each venue's policies." },
        { title: "No refunds", text: "All sales are final. There are no refunds." },
        { title: "Benefits disclaimer", text: "No free products are included. Wristbands unlock discounts, happy hour specials, and giveaway participation at participating venues." },
      ],
    },
    venues: {
      eyebrow: "Approved venues",
      title: "Wristband benefits by venue.",
      text: "All 15 participating venues from the approved source are listed with address, perks, and operating hours where provided.",
      arrival: "Arrival",
      departure: "Departure",
      neighborhood: "Neighborhood",
      hours: "Hours",
      passWindow: "Pass window",
      notSpecified: "Not specified in approved source",
      openMap: "Open map",
      empty: "No venues match that travel window yet.",
    },
    superpowers: {
      eyebrow: "Bracelet superpowers",
      title: "What users get from the pass.",
      items: [
        { title: "Watch the games", text: "Match-day rooms, big screens, and fan-friendly venues across NYC." },
        { title: "Unlock discounts", text: "Bracelet-holder offers while partner benefits are finalized." },
        { title: "Food & drink specials", text: "Partner menus, quick bites, and late-night tables." },
        { title: "Nightlife perks", text: "A smoother path from the final whistle into NYC after-dark energy." },
        { title: "Curated venues", text: "A practical route through restaurants, rooftops, bars, and activations." },
        { title: "Sponsor giveaways", text: "Limited partner gifts and brand moments as they become available." },
      ],
    },
    infoPanels: {
      pickup: { eyebrow: "Pickup", title: "In-person bracelet pickup.", text: "Customers pick up the wristband at the assigned NYC location. The location may vary by day, and each day has a different color wristband." },
      tickets: { eyebrow: "Tickets", title: "Ticket link coming soon.", text: "Ticket and checkout links will be shared later. No ticket platform or direct payment details are published here." },
    },
    partners: {
      eyebrow: "Sponsors / Partners",
      title: "Become a sponsor",
      text: "The layout reserves space for partners, community organizations, and local businesses that want to reach World Cup visitors.",
      groupCta: "Want your office party, large group of friends, or organization to participate at one of our viewing venues? Contact 917-721-5819 or Conquestnyc@gmail.com.",
      types: ["Institutions", "Community organizations", "Local businesses", "Hospitality groups"],
    },
    signup: {
      eyebrow: "Email signup",
      title: "Collect leads before launch.",
      text: "The form supports simple validation and a success state without extra backend plumbing.",
      email: "Email",
      language: "Language",
      visitDates: "Visit dates",
      visitDatesPlaceholder: "June 20 - June 27",
      visitHint: "Use the filter above to change the venue window.",
      invalidEmail: "Enter a valid email address so we can follow up.",
      success: "You're on the list. We'll follow up in English.",
      idle: "Early access includes updates on venues, wristband pickup, and the ticket link.",
      button: "Get early access",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Quick answers for first-time visitors.",
      items: [
        { question: "What is NYCUP26?", answer: "NYCUP26 is a World Cup–oriented bracelet pass that helps visitors discover venues, perks, and event-day experiences in New York City." },
        { question: "How do I buy the bracelet?", answer: "The ticket link is coming soon. Pickup instructions and the assigned pickup location will be announced before purchase or event day." },
        { question: "Where do I pick it up?", answer: "Pickup is in person at the assigned NYC location. June 11, 12, and 13 pickup is confirmed at The Copa, 625 West 51st St, New York, NY 10019. June 14-27 is TBD / coming soon." },
        { question: "Can I filter by my travel dates?", answer: "Yes. The venue grid filters down to locations active during the selected date window, so visitors only see relevant options. NYCUP26 runs daily from June 11 to July 19, 2026." },
        { question: "Are there age restrictions or refunds?", answer: "Nightclubs are 21+. Restaurants and non-nightclub venues are 18+ unless a venue policy says otherwise. All sales are final; there are no refunds." },
        { question: "Is this only for Brazilians?", answer: "No. It is a World Cup experience for visitors, fans, and communities from many backgrounds." },
      ],
    },
    footer: "NYCUP26 GAME PASS is an independent visitor pass concept and is not an official FIFA website.",
    heroImageAlt: "Statue of Liberty holding a soccer trophy with a glowing NYCUP26 Game Pass bracelet",
  },
  es: {
    languageName: "Español",
    ticker: [
      { label: "Mundial 2026", value: "Experiencias para visitantes en NYC del June 11 al July 19" },
      { label: "Pase pulsera", value: "Activa beneficios en venues participantes" },
      { label: "Retiro", value: "Entrega presencial de la pulsera en NYC" },
      { label: "Aliados", value: "Opciones para sponsors, recaudaciones y venues" },
    ],
    nav: { venues: "Venues", howItWorks: "Cómo funciona", partners: "Aliados", faq: "FAQ", waitlist: "Lista de espera" },
    hero: {
      liveBoard: "Tablero en vivo",
      tickerLabel: "Actualizaciones de NYCUP26",
      unlockSignal: "Señal de activación de pulsera",
      badge: "Descubre NYC durante el Mundial.",
      title: "Tu pulsera desbloquea la ciudad.",
      text: "Una pulsera estilo festival para fans del Mundial en NYC: watch parties, venues seleccionados, beneficios de comida y nightlife, momentos de sponsors y una ruta simple para recibir acceso temprano.",
      join: "Únete a la lista de espera",
      explore: "Explorar venues",
      stats: [
        { label: "Fechas del evento", value: "June 11 - July 19, 2026" },
        { label: "Duración del programa", value: "39 días de evento" },
        { label: "Primera ronda", value: "June 11 - June 27" },
      ],
    },
    concept: {
      eyebrow: "El concepto",
      title: "Una pulsera que también funciona como guía de la ciudad.",
      text: "Los visitantes eligen fechas, ven venues relevantes y siguen una ruta simple desde el registro hasta el retiro. El diseño es claro, práctico y listo para lanzar rápido.",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Cinco pasos simples desde la llegada hasta el acceso con pulsera.",
      text: "El flujo se mantiene claro mientras se finalizan los puntos de retiro, los colores diarios de pulsera y los links de tickets.",
      steps: [
        "Elige las fechas en las que estarás en la ciudad.",
        "Usa el link de tickets cuando sea anunciado.",
        "Retira tu pulsera en el punto asignado en NYC.",
        "Usa el color de pulsera de ese día en los venues participantes.",
        "Sigue las reglas de cada venue y disfruta los beneficios elegibles.",
      ],
    },
    rulesPickup: {
      eyebrow: "Reglas + retiro",
      title: "Lo que los clientes deben saber antes del día del evento.",
      text: "NYCUP26 opera todos los días de June 11 a July 19, 2026. Los clientes reciben el punto de retiro asignado antes de la compra o del día del evento, y cada día usa un color de pulsera diferente.",
      scheduleLabel: "Cronograma de retiro confirmado",
      scheduleText: "El retiro de pulseras de June 11, 12 y 13 está confirmado en The Copa. Las ubicaciones de June 14-27 están TBD / coming soon.",
      statuses: { confirmed: "Confirmado", comingSoon: "Próximamente" },
      pickupTbdAddress: "Los puntos de retiro se anunciarán antes de la compra o del día del evento.",
      rules: [
        { title: "Programa diario", text: "NYCUP26 opera todos los días desde June 11 hasta July 19, 2026. La primera ronda va de June 11 a June 27." },
        { title: "El retiro puede variar", text: "Los clientes retiran su pulsera en el punto asignado. Las ubicaciones pueden variar, y cada día usa un color de pulsera diferente." },
        { title: "Reglas de edad", text: "Los nightclubs son 21+. Los restaurantes y venues que no son nightclubs son 18+ salvo que una política del venue indique otra cosa." },
        { title: "Políticas de venues", text: "La entrada está sujeta a guías del venue, reglas de la casa, capacidad y seguridad. Los clientes deben cumplir las políticas de cada venue." },
        { title: "Sin reembolsos", text: "Todas las ventas son finales. No hay reembolsos." },
        { title: "Aviso de beneficios", text: "No se incluyen productos gratis. Las pulseras activan descuentos, happy hour specials y participación en giveaways en venues participantes." },
      ],
    },
    venues: {
      eyebrow: "Venues aprobados",
      title: "Beneficios de la pulsera por venue.",
      text: "Los 15 venues participantes de la fuente aprobada se listan con dirección, beneficios y horarios de operación cuando fueron provistos.",
      arrival: "Llegada",
      departure: "Salida",
      neighborhood: "Zona",
      hours: "Horario",
      passWindow: "Ventana del pase",
      notSpecified: "No especificado en la fuente aprobada",
      openMap: "Abrir mapa",
      empty: "Todavía no hay venues para esa ventana de viaje.",
    },
    superpowers: {
      eyebrow: "Beneficios de la pulsera",
      title: "Qué reciben los usuarios con el pase.",
      items: [
        { title: "Ver los partidos", text: "Salas de match-day, pantallas grandes y venues pensados para fans en toda NYC." },
        { title: "Activar descuentos", text: "Ofertas para quienes tienen pulsera mientras se finalizan beneficios de partners." },
        { title: "Especiales de comida y bebida", text: "Menús de partners, opciones rápidas y mesas late-night." },
        { title: "Beneficios de nightlife", text: "Una ruta más simple desde el pitazo final hacia la energía nocturna de NYC." },
        { title: "Venues seleccionados", text: "Una ruta práctica por restaurantes, rooftops, bares y activaciones." },
        { title: "Giveaways de sponsors", text: "Regalos limitados de partners y momentos de marca cuando estén disponibles." },
      ],
    },
    infoPanels: {
      pickup: { eyebrow: "Retiro", title: "Retiro presencial de pulsera.", text: "Los clientes retiran la pulsera en el punto asignado en NYC. La ubicación puede variar por día, y cada día tiene un color de pulsera diferente." },
      tickets: { eyebrow: "Tickets", title: "Link de tickets próximamente.", text: "Los links de ticket y checkout se compartirán más adelante. Aquí no se publica ninguna plataforma de tickets ni detalle de pago directo." },
    },
    partners: {
      eyebrow: "Sponsors / Aliados",
      title: "Conviértete en sponsor",
      text: "El layout reserva espacio para partners, organizaciones comunitarias y negocios locales que quieran llegar a visitantes del Mundial.",
      groupCta: "¿Quieres que tu office party, grupo grande de amigos u organización participe en uno de nuestros viewing venues? Contacta 917-721-5819 o Conquestnyc@gmail.com.",
      types: ["Instituciones", "Organizaciones comunitarias", "Negocios locales", "Grupos de hospitality"],
    },
    signup: {
      eyebrow: "Registro por email",
      title: "Captura leads antes del lanzamiento.",
      text: "El formulario tiene validación simple y un estado de éxito sin agregar backend extra.",
      email: "Email",
      language: "Idioma",
      visitDates: "Fechas de visita",
      visitDatesPlaceholder: "June 20 - June 27",
      visitHint: "Usa el filtro de arriba para cambiar la ventana de venues.",
      invalidEmail: "Ingresa un email válido para que podamos contactarte.",
      success: "Estás en la lista. Haremos seguimiento en español.",
      idle: "El acceso temprano incluye actualizaciones sobre venues, retiro de pulsera y el link de tickets.",
      button: "Recibir acceso temprano",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Respuestas rápidas para visitantes primerizos.",
      items: [
        { question: "¿Qué es NYCUP26?", answer: "NYCUP26 es un pase con pulsera orientado al Mundial que ayuda a los visitantes a descubrir venues, beneficios y experiencias de día de evento en New York City." },
        { question: "¿Cómo compro la pulsera?", answer: "El link de tickets llegará próximamente. Las instrucciones de retiro y el punto asignado se anunciarán antes de la compra o del día del evento." },
        { question: "¿Dónde la retiro?", answer: "El retiro es presencial en el punto asignado en NYC. El retiro de June 11, 12 y 13 está confirmado en The Copa, 625 West 51st St, New York, NY 10019. June 14-27 está TBD / coming soon." },
        { question: "¿Puedo filtrar por mis fechas de viaje?", answer: "Sí. La grilla de venues se filtra a ubicaciones activas durante la ventana de fechas seleccionada, para que los visitantes vean solo opciones relevantes. NYCUP26 opera todos los días de June 11 a July 19, 2026." },
        { question: "¿Hay restricciones de edad o reembolsos?", answer: "Los nightclubs son 21+. Los restaurantes y venues que no son nightclubs son 18+ salvo que una política del venue indique otra cosa. Todas las ventas son finales; no hay reembolsos." },
        { question: "¿Es solo para brasileños?", answer: "No. Es una experiencia del Mundial para visitantes, fans y comunidades de muchos orígenes." },
      ],
    },
    footer: "NYCUP26 GAME PASS es un concepto independiente de pase para visitantes y no es un sitio oficial de FIFA.",
    heroImageAlt: "Statue of Liberty sosteniendo un trofeo de fútbol con una pulsera luminosa de NYCUP26 Game Pass",
  },
  "pt-BR": {
    languageName: "Português (Brasil)",
    ticker: [
      { label: "Copa do Mundo 2026", value: "Experiências para visitantes em NYC de June 11 a July 19" },
      { label: "Pulseira pass", value: "Libera benefícios em venues participantes" },
      { label: "Retirada", value: "Entrega presencial da pulseira em NYC" },
      { label: "Parceiros", value: "Opções para patrocinadores, arrecadações e venues" },
    ],
    nav: { venues: "Venues", howItWorks: "Como funciona", partners: "Parceiros", faq: "FAQ", waitlist: "Lista de espera" },
    hero: {
      liveBoard: "Painel ao vivo",
      tickerLabel: "Atualizações do NYCUP26",
      unlockSignal: "Sinal de ativação da pulseira",
      badge: "Explore NYC durante a Copa do Mundo.",
      title: "Sua pulseira destrava a cidade.",
      text: "Uma pulseira estilo festival para fãs da Copa do Mundo em NYC: watch parties, venues selecionados, benefícios de comida e nightlife, momentos de patrocinadores e um caminho simples para acesso antecipado.",
      join: "Entrar na lista de espera",
      explore: "Explorar venues",
      stats: [
        { label: "Datas do evento", value: "June 11 - July 19, 2026" },
        { label: "Duração do programa", value: "39 dias de evento" },
        { label: "Primeira fase", value: "June 11 - June 27" },
      ],
    },
    concept: {
      eyebrow: "O conceito",
      title: "Uma pulseira que também funciona como guia da cidade.",
      text: "Visitantes escolhem datas, veem venues relevantes e seguem um caminho simples do cadastro até a retirada. O design é claro, prático e feito para lançar rápido.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "Cinco passos simples da chegada ao acesso com pulseira.",
      text: "O fluxo continua claro enquanto pontos de retirada, cores diárias das pulseiras e links de tickets são finalizados.",
      steps: [
        "Escolha as datas em que você estará na cidade.",
        "Use o link de tickets assim que ele for anunciado.",
        "Retire sua pulseira no local designado em NYC.",
        "Use a cor da pulseira daquele dia nos venues participantes.",
        "Siga as regras de cada venue e aproveite os benefícios elegíveis.",
      ],
    },
    rulesPickup: {
      eyebrow: "Regras + retirada",
      title: "O que os clientes precisam saber antes do dia do evento.",
      text: "O NYCUP26 acontece diariamente de June 11 a July 19, 2026. Clientes recebem o local de retirada designado antes da compra ou do dia do evento, e cada dia usa uma cor diferente de pulseira.",
      scheduleLabel: "Cronograma de retirada confirmado",
      scheduleText: "A retirada de pulseiras de June 11, 12 e 13 está confirmada no The Copa. Os locais de June 14-27 estão TBD / coming soon.",
      statuses: { confirmed: "Confirmado", comingSoon: "Em breve" },
      pickupTbdAddress: "Os locais de retirada serão anunciados antes da compra ou do dia do evento.",
      rules: [
        { title: "Programa diário", text: "O NYCUP26 acontece diariamente de June 11 a July 19, 2026. A primeira fase acontece de June 11 a June 27." },
        { title: "A retirada pode variar", text: "Clientes retiram a pulseira no local designado. Os locais podem variar, e cada dia usa uma cor diferente de pulseira." },
        { title: "Regras de idade", text: "Nightclubs são 21+. Restaurantes e venues que não são nightclubs são 18+, salvo se a política do venue disser o contrário." },
        { title: "Políticas dos venues", text: "A entrada está sujeita às orientações do venue, regras da casa, capacidade e segurança. Clientes devem cumprir as políticas de cada venue." },
        { title: "Sem reembolsos", text: "Todas as vendas são finais. Não há reembolsos." },
        { title: "Aviso sobre benefícios", text: "Nenhum produto grátis está incluído. As pulseiras liberam descontos, happy hour specials e participação em giveaways nos venues participantes." },
      ],
    },
    venues: {
      eyebrow: "Venues aprovados",
      title: "Benefícios da pulseira por venue.",
      text: "Todos os 15 venues participantes da fonte aprovada aparecem com endereço, benefícios e horários de operação quando fornecidos.",
      arrival: "Chegada",
      departure: "Saída",
      neighborhood: "Região",
      hours: "Horário",
      passWindow: "Janela do pass",
      notSpecified: "Não especificado na fonte aprovada",
      openMap: "Abrir mapa",
      empty: "Ainda não há venues para essa janela de viagem.",
    },
    superpowers: {
      eyebrow: "Benefícios da pulseira",
      title: "O que os usuários recebem com o pass.",
      items: [
        { title: "Assistir aos jogos", text: "Ambientes de match-day, telões e venues amigáveis para fãs em NYC." },
        { title: "Liberar descontos", text: "Ofertas para quem tem pulseira enquanto os benefícios de parceiros são finalizados." },
        { title: "Especiais de comida e bebida", text: "Menus de parceiros, opções rápidas e mesas late-night." },
        { title: "Benefícios de nightlife", text: "Um caminho mais simples do apito final para a energia noturna de NYC." },
        { title: "Venues selecionados", text: "Uma rota prática por restaurantes, rooftops, bares e ativações." },
        { title: "Giveaways de patrocinadores", text: "Presentes limitados de parceiros e momentos de marca conforme ficarem disponíveis." },
      ],
    },
    infoPanels: {
      pickup: { eyebrow: "Retirada", title: "Retirada presencial da pulseira.", text: "Clientes retiram a pulseira no local designado em NYC. O local pode variar por dia, e cada dia tem uma cor diferente de pulseira." },
      tickets: { eyebrow: "Tickets", title: "Link de tickets em breve.", text: "Links de ticket e checkout serão compartilhados depois. Nenhuma plataforma de ticket ou detalhe de pagamento direto está publicado aqui." },
    },
    partners: {
      eyebrow: "Sponsors / Parceiros",
      title: "Torne-se patrocinador",
      text: "O layout reserva espaço para parceiros, organizações comunitárias e negócios locais que queiram alcançar visitantes da Copa do Mundo.",
      groupCta: "Quer que sua office party, grupo grande de amigos ou organização participe em um dos nossos viewing venues? Entre em contato: 917-721-5819 ou Conquestnyc@gmail.com.",
      types: ["Instituições", "Organizações comunitárias", "Negócios locais", "Grupos de hospitality"],
    },
    signup: {
      eyebrow: "Cadastro por email",
      title: "Capture leads antes do lançamento.",
      text: "O formulário tem validação simples e estado de sucesso sem adicionar backend extra.",
      email: "Email",
      language: "Idioma",
      visitDates: "Datas da visita",
      visitDatesPlaceholder: "June 20 - June 27",
      visitHint: "Use o filtro acima para mudar a janela de venues.",
      invalidEmail: "Digite um email válido para que possamos entrar em contato.",
      success: "Você está na lista. Faremos contato em português.",
      idle: "O acesso antecipado inclui atualizações sobre venues, retirada da pulseira e o link de tickets.",
      button: "Receber acesso antecipado",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Respostas rápidas para visitantes de primeira viagem.",
      items: [
        { question: "O que é NYCUP26?", answer: "NYCUP26 é um pass com pulseira voltado à Copa do Mundo que ajuda visitantes a descobrir venues, benefícios e experiências de dias de evento em New York City." },
        { question: "Como compro a pulseira?", answer: "O link de tickets estará disponível em breve. As instruções de retirada e o local designado serão anunciados antes da compra ou do dia do evento." },
        { question: "Onde faço a retirada?", answer: "A retirada é presencial no local designado em NYC. A retirada de June 11, 12 e 13 está confirmada no The Copa, 625 West 51st St, New York, NY 10019. June 14-27 está TBD / coming soon." },
        { question: "Posso filtrar pelas minhas datas de viagem?", answer: "Sim. A grade de venues filtra locais ativos durante a janela de datas selecionada, para que visitantes vejam apenas opções relevantes. O NYCUP26 acontece diariamente de June 11 a July 19, 2026." },
        { question: "Há restrições de idade ou reembolsos?", answer: "Nightclubs são 21+. Restaurantes e venues que não são nightclubs são 18+, salvo se a política do venue disser o contrário. Todas as vendas são finais; não há reembolsos." },
        { question: "É só para brasileiros?", answer: "Não. É uma experiência da Copa do Mundo para visitantes, fãs e comunidades de várias origens." },
      ],
    },
    footer: "NYCUP26 GAME PASS é um conceito independente de pass para visitantes e não é um site oficial da FIFA.",
    heroImageAlt: "Statue of Liberty segurando um troféu de futebol com uma pulseira brilhante do NYCUP26 Game Pass",
  },
};

const venues: Venue[] = [
  {
    name: "Iron Bar",
    category: { en: "Bar", es: "Bar", "pt-BR": "Bar" },
    neighborhood: "Times Square",
    address: "713 8th Ave, New York, NY",
    benefits: {
      en: ["Drink specials", "Beer special", "Beer bucket special", "1 cocktail special"],
      es: ["Especiales de bebidas", "Especial de cerveza", "Especial de bucket de cervezas", "1 especial de cocktail"],
      "pt-BR": ["Especiais de bebidas", "Especial de cerveja", "Especial de bucket de cervejas", "1 especial de cocktail"],
    },
    hours: "4pm to 2am",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Iron+Bar+713+8th+Ave+New+York+NY",
  },
  {
    name: "Hard Rock Cafe Times Square",
    category: { en: "Restaurant / entertainment", es: "Restaurante / entretenimiento", "pt-BR": "Restaurante / entretenimento" },
    neighborhood: "Times Square",
    address: "1501 Broadway, New York, NY",
    benefits: {
      en: [
        "Happy hour specials and World Cup package for all games",
        "Game Day Menu and Special ALL TEAMS ONE PLACE menu",
        "Happy Hour Drink Specials during the game",
        "Foosball table",
        "Photo moment",
        "Retail add-on: glassware for $15.50 plus tax includes non-alcoholic drink or beer",
        "Premium games: fan face painting, interactive light game experience, game guess giveaways, on-site liquor partners",
        "Premium seating available for $25 per person per game for PIT seating",
      ],
      es: [
        "Especiales de happy hour y paquete del Mundial para todos los partidos",
        "Game Day Menu y menú especial ALL TEAMS ONE PLACE",
        "Happy Hour Drink Specials durante el partido",
        "Mesa de foosball",
        "Momento de foto",
        "Add-on retail: glassware por $15.50 plus tax incluye bebida sin alcohol o cerveza",
        "Juegos premium: fan face painting, experiencia interactiva de luces, game guess giveaways, liquor partners en sitio",
        "Asientos premium disponibles por $25 per person per game para PIT seating",
      ],
      "pt-BR": [
        "Especiais de happy hour e pacote da Copa do Mundo para todos os jogos",
        "Game Day Menu e menu especial ALL TEAMS ONE PLACE",
        "Happy Hour Drink Specials durante o jogo",
        "Mesa de foosball",
        "Momento para foto",
        "Add-on retail: glassware por $15.50 plus tax inclui bebida sem álcool ou cerveja",
        "Jogos premium: fan face painting, experiência interativa de luz, game guess giveaways, liquor partners no local",
        "Assentos premium disponíveis por $25 per person per game para PIT seating",
      ],
    },
    hours: "12pm to 12am",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Hard+Rock+Cafe+Times+Square+1501+Broadway+New+York+NY",
  },
  {
    name: "Fushimi Times Square",
    category: { en: "Restaurant", es: "Restaurante", "pt-BR": "Restaurante" },
    neighborhood: "Times Square",
    address: "311 W 43rd St, New York, NY",
    benefits: {
      en: ["Happy hour specials all throughout games", "10% off food orders"],
      es: ["Especiales de happy hour durante todos los partidos", "10% de descuento en pedidos de comida"],
      "pt-BR": ["Especiais de happy hour durante todos os jogos", "10% de desconto em pedidos de comida"],
    },
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Fushimi+Times+Square+311+W+43rd+St+New+York+NY",
  },
  {
    name: "Vivid Cabaret",
    category: { en: "Gentlemen's club", es: "Gentlemen's club", "pt-BR": "Gentlemen's club" },
    neighborhood: "Midtown",
    address: "61 W 37th St, New York, NY 10018",
    benefits: {
      en: ["Free admission", "$7 beers", "$12 drinks"],
      es: ["Entrada gratis", "$7 beers", "$12 drinks"],
      "pt-BR": ["Entrada gratuita", "$7 beers", "$12 drinks"],
    },
    hours: "12pm to 4am",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Vivid+Cabaret+61+W+37th+St+New+York+NY+10018",
  },
  {
    name: "Planet Hollywood",
    category: { en: "Entertainment", es: "Entretenimiento", "pt-BR": "Entretenimento" },
    neighborhood: "Times Square",
    address: "136 W 42nd St, New York, NY 10018",
    benefits: {
      en: ["20% off drinks and any food purchase", "$26 for 2026 combo"],
      es: ["20% de descuento en bebidas y cualquier compra de comida", "$26 para el combo 2026"],
      "pt-BR": ["20% de desconto em bebidas e qualquer compra de comida", "$26 para o combo 2026"],
    },
    hours: "12 noon to 2am",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Planet+Hollywood+136+W+42nd+St+New+York+NY+10018",
  },
  {
    name: "Sombrero",
    category: { en: "Restaurant / bar", es: "Restaurante / bar", "pt-BR": "Restaurante / bar" },
    neighborhood: "Hell's Kitchen",
    address: "303 W 48th St, New York, NY",
    benefits: {
      en: ["Drink specials", "Happy hour specials at the bar", "10% dining"],
      es: ["Especiales de bebidas", "Especiales de happy hour en el bar", "10% de descuento al comer"],
      "pt-BR": ["Especiais de bebidas", "Especiais de happy hour no bar", "10% de desconto ao comer"],
    },
    hours: "4pm until TBD",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Sombrero+303+W+48th+St+New+York+NY",
  },
  {
    name: "Patron",
    category: { en: "Bar", es: "Bar", "pt-BR": "Bar" },
    neighborhood: "Hell's Kitchen",
    address: "608 9th Ave, New York, NY",
    benefits: { en: ["Drink specials"], es: ["Especiales de bebidas"], "pt-BR": ["Especiais de bebidas"] },
    hours: "4pm to 12am",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Patron+608+9th+Ave+New+York+NY",
  },
  {
    name: "Eccolo",
    category: { en: "Restaurant", es: "Restaurante", "pt-BR": "Restaurante" },
    neighborhood: "Hell's Kitchen",
    address: "315 W 48th St, New York, NY",
    benefits: { en: ["10% off dinner"], es: ["10% de descuento en la cena"], "pt-BR": ["10% de desconto no jantar"] },
    hours: "4pm to 10pm",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Eccolo+315+W+48th+St+New+York+NY",
  },
  {
    name: "Bliss",
    category: { en: "Bar", es: "Bar", "pt-BR": "Bar" },
    neighborhood: "Financial District",
    address: "6 Platt Street, 2nd floor, New York, NY",
    benefits: {
      en: ["Drink specials: beers $7, wine $8, mixed drinks $12, shots $14"],
      es: ["Especiales de bebidas: cervezas $7, vino $8, mixed drinks $12, shots $14"],
      "pt-BR": ["Especiais de bebidas: cervejas $7, vinho $8, mixed drinks $12, shots $14"],
    },
    hours: "5pm weekdays; Saturday/Sunday 12pm",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Bliss+6+Platt+Street+2nd+floor+New+York+NY",
  },
  {
    name: "High Key Rooftop",
    category: { en: "Rooftop", es: "Rooftop", "pt-BR": "Rooftop" },
    neighborhood: "Financial District",
    address: "6 Platt Street, 29th floor, New York, NY",
    benefits: {
      en: ["Drink specials: beers $7, wine $8, mixed drinks $12, shots $14"],
      es: ["Especiales de bebidas: cervezas $7, vino $8, mixed drinks $12, shots $14"],
      "pt-BR": ["Especiais de bebidas: cervejas $7, vinho $8, mixed drinks $12, shots $14"],
    },
    hours: "3pm Mon-Friday; Saturday/Sunday 12pm",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=High+Key+Rooftop+6+Platt+Street+29th+floor+New+York+NY",
  },
  {
    name: "Copacabana",
    category: { en: "Nightlife", es: "Nightlife", "pt-BR": "Nightlife" },
    neighborhood: "Hell's Kitchen",
    address: "625 W 51st St, New York, NY 10019",
    benefits: {
      en: ["Drink specials - Happy hour prices", "$26 combo specials (2 drinks + 2 empanadas)"],
      es: ["Especiales de bebidas - precios de happy hour", "$26 combo specials (2 bebidas + 2 empanadas)"],
      "pt-BR": ["Especiais de bebidas - preços de happy hour", "$26 combo specials (2 bebidas + 2 empanadas)"],
    },
    hours: "Thursday through Sunday, 3pm on",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Copacabana+625+W+51st+St+New+York+NY+10019",
  },
  {
    name: "Haswell Greens",
    category: { en: "Bar / restaurant", es: "Bar / restaurante", "pt-BR": "Bar / restaurante" },
    neighborhood: "Midtown",
    address: "240 W 52nd St, New York, NY",
    benefits: {
      en: ["Free admission", "Drink specials", "$7 beer", "$30 Mich Ultra buckets", "$10 mixed drinks"],
      es: ["Entrada gratis", "Especiales de bebidas", "$7 beer", "$30 buckets de Mich Ultra", "$10 mixed drinks"],
      "pt-BR": ["Entrada gratuita", "Especiais de bebidas", "$7 beer", "$30 buckets de Mich Ultra", "$10 mixed drinks"],
    },
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Haswell+Greens+240+W+52nd+St+New+York+NY",
  },
  {
    name: "SOBs",
    category: { en: "Music venue", es: "Venue de música", "pt-BR": "Venue de música" },
    neighborhood: "Hudson Square",
    address: "200 Varick Street, New York, NY 10012",
    benefits: { en: ["Free admission", "$1 off all drinks"], es: ["Entrada gratis", "$1 de descuento en todas las bebidas"], "pt-BR": ["Entrada gratuita", "$1 de desconto em todas as bebidas"] },
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=SOBs+200+Varick+Street+New+York+NY+10012",
  },
  {
    name: "Low Key (Queens)",
    category: { en: "Bar", es: "Bar", "pt-BR": "Bar" },
    neighborhood: "Forest Hills, Queens",
    address: "70-15 Austin Street, Forest Hills, NY 11375",
    benefits: {
      en: ["Beers $7, wine $8, mixed drinks $12, shots $14"],
      es: ["Beers $7, wine $8, mixed drinks $12, shots $14"],
      "pt-BR": ["Beers $7, wine $8, mixed drinks $12, shots $14"],
    },
    hours: "3pm Mon-Friday; Saturday/Sunday 12pm",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Low+Key+70-15+Austin+Street+Forest+Hills+NY+11375",
  },
  {
    name: "Rio Bonito",
    category: { en: "Restaurant", es: "Restaurante", "pt-BR": "Restaurante" },
    neighborhood: "Astoria, Queens",
    address: "32-15 36th Ave, Astoria, NY 11106",
    benefits: { en: ["10% off bill at restaurant"], es: ["10% de descuento en la cuenta del restaurante"], "pt-BR": ["10% de desconto na conta do restaurante"] },
    hours: "7 days a week, 9am to 9pm",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Rio+Bonito+32-15+36th+Ave+Astoria+NY+11106",
  },
];

const pickupSchedule = [
  {
    dates: "June 11, 12, 13",
    location: "The Copa",
    address: "625 West 51st St, New York, NY 10019",
    statusKey: "confirmed" as const,
  },
  {
    dates: "June 14-27",
    location: "TBD / coming soon",
    addressKey: "pickupTbdAddress" as const,
    statusKey: "comingSoon" as const,
  },
];

const superpowerIcons = [Trophy, WalletCards, Utensils, Music2, MapPin, Gift];

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isLanguageCode(saved) ? saved : "en";
}

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "en" || value === "es" || value === "pt-BR";
}

function App() {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const [travelStart, setTravelStart] = useState("");
  const [travelEnd, setTravelEnd] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const t = copy[language];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const filteredVenues = useMemo(() => {
    if (!travelStart && !travelEnd) return venues;

    return venues.filter((venue) => {
      const start = travelStart || venue.validFrom;
      const end = travelEnd || venue.validTo;
      return venue.validFrom <= end && venue.validTo >= start;
    });
  }, [travelStart, travelEnd]);

  const signupMessage = useMemo(() => {
    if (status === "error") return t.signup.invalidEmail;
    if (status === "success") return t.signup.success;
    return t.signup.idle;
  }, [status, t.signup.idle, t.signup.invalidEmail, t.signup.success]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <main className="min-h-screen bg-us-cream text-us-navy">
      <header className="sticky top-0 z-40 border-b border-us-blue/10 bg-white/92 backdrop-blur">
        <div className="flag-band border-b border-white/20 text-white">
          <div className="flex h-11 items-center overflow-hidden">
            <div className="flex h-full shrink-0 items-center gap-2 bg-us-red px-4 text-xs font-black uppercase text-white">
              <Radio className="h-4 w-4" aria-hidden="true" />
              {t.hero.liveBoard}
            </div>
            <div className="ticker-track" aria-label={t.hero.tickerLabel}>
              <TickerItems items={t.ticker} />
              <TickerItems items={t.ticker} ariaHidden />
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
          <a href="#top" className="font-display text-lg leading-none text-us-blue">
            NYCUP26 <span className="text-us-red">GAME PASS</span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-extrabold text-us-blue lg:flex">
            <a href="#venues" className="hover:text-us-red">{t.nav.venues}</a>
            <a href="#how-it-works" className="hover:text-us-red">{t.nav.howItWorks}</a>
            <a href="#partners" className="hover:text-us-red">{t.nav.partners}</a>
            <a href="#faq" className="hover:text-us-red">{t.nav.faq}</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector language={language} onChange={setLanguage} variant="light" />
            <a
              href="#signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-extrabold text-us-navy transition hover:bg-[#EEF3FF] sm:px-5"
            >
              {t.nav.waitlist}
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="relative overflow-hidden bg-us-navy text-white">
        <div className="absolute inset-0">
          <img
            src="/nycup26-hero.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-105 object-cover object-center opacity-35 blur-[3px] saturate-125"
          />
          <img
            src="/nycup26-hero.png"
            alt={t.heroImageAlt}
            className="absolute inset-y-0 right-0 h-full w-full object-contain object-right opacity-100 drop-shadow-[0_30px_80px_rgba(215,40,47,0.34)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,74,0.98)_0%,rgba(7,27,74,0.86)_36%,rgba(7,27,74,0.20)_70%,rgba(7,27,74,0.16)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,74,0.10)_0%,rgba(7,27,74,0.04)_42%,rgba(7,27,74,0.74)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-us-red via-white to-us-blue opacity-95" />
          <div className="absolute right-[8%] top-[18%] hidden rounded-full border border-white/30 bg-us-navy/80 px-4 py-2 text-xs font-black uppercase text-white backdrop-blur-md md:block">
            {t.hero.unlockSignal}
          </div>
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl content-end px-5 pb-12 pt-24 md:min-h-[760px] md:px-8 md:pb-16">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-md bg-us-red px-3 py-2 text-sm font-black text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {t.hero.badge}
              </div>
              <LanguageSelector language={language} onChange={setLanguage} variant="dark" />
            </div>
            <h1 className="font-display text-5xl uppercase leading-[0.95] text-white sm:text-6xl md:text-8xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/90 md:text-xl">
              {t.hero.text}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#signup"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-extrabold text-us-navy transition hover:bg-[#EEF3FF]"
              >
                {t.hero.join}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#venues"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-us-blue/85 px-6 py-3 text-base font-extrabold text-white backdrop-blur-sm transition hover:bg-us-blue"
              >
                {t.hero.explore}
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {t.hero.stats.map((stat, index) => (
              <StatCard key={stat.label} icon={index === 0 ? CalendarDays : index === 1 ? Sparkles : Ticket} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 rounded-2xl border border-us-blue/10 bg-white p-6 shadow-card md:grid-cols-[1fr_1.4fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase text-us-red">{t.concept.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-us-blue">{t.concept.title}</h2>
          </div>
          <p className="text-base font-semibold leading-7 text-us-navy/70">{t.concept.text}</p>
        </div>
      </section>

      <section id="how-it-works" className="section-shell">
        <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} text={t.how.text} />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {t.how.steps.map((step, index) => (
            <div key={step} className="rounded-xl border border-us-blue/10 bg-white p-5 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-us-blue font-black text-white">
                {index + 1}
              </div>
              <p className="mt-4 text-sm font-extrabold leading-6 text-us-blue">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading eyebrow={t.rulesPickup.eyebrow} title={t.rulesPickup.title} text={t.rulesPickup.text} />
            <div className="mt-6 rounded-2xl border border-us-blue/10 bg-us-cream p-5 shadow-card">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-us-red" aria-hidden="true" />
                <div>
                  <p className="text-sm font-black uppercase text-us-red">{t.rulesPickup.scheduleLabel}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-us-navy/70">{t.rulesPickup.scheduleText}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {pickupSchedule.map((pickup) => (
                  <div key={pickup.dates} className="rounded-xl bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-black text-us-blue">{pickup.dates}</p>
                      <span className="rounded-full bg-us-blue/10 px-3 py-1 text-xs font-black uppercase text-us-blue">
                        {t.rulesPickup.statuses[pickup.statusKey]}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-xl leading-tight text-us-blue">{pickup.location}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-us-navy/70">
                      {"address" in pickup ? pickup.address : t.rulesPickup.pickupTbdAddress}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {t.rulesPickup.rules.map((rule) => (
              <article key={rule.title} className="rounded-2xl border border-us-blue/10 bg-us-cream p-5 shadow-card">
                <ShieldCheck className="h-6 w-6 text-us-red" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl leading-tight text-us-blue">{rule.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-us-navy/70">{rule.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="venues" className="section-shell bg-white">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.venues.eyebrow} title={t.venues.title} text={t.venues.text} />
          <div className="grid gap-3 sm:grid-cols-2">
            <DateField label={t.venues.arrival} value={travelStart} onChange={setTravelStart} />
            <DateField label={t.venues.departure} value={travelEnd} onChange={setTravelEnd} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredVenues.map((venue) => (
            <article key={venue.name} className="overflow-hidden rounded-2xl border border-us-blue/10 bg-us-cream shadow-card">
              <div className="h-2 bg-gradient-to-r from-us-red via-white to-us-blue" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-us-red">{venue.category[language]}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-us-blue">{venue.name}</h3>
                  </div>
                  <MapPin className="h-5 w-5 shrink-0 text-us-blue" aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm font-semibold leading-6 text-us-navy/70">{venue.address}</p>

                <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-us-navy/75">
                  {venue.benefits[language].map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-us-red" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-3 rounded-xl bg-white p-4">
                  <MetaRow icon={Clock3} label={t.venues.neighborhood} value={venue.neighborhood} />
                  <MetaRow icon={Clock3} label={t.venues.hours} value={venue.hours ?? t.venues.notSpecified} />
                  <MetaRow icon={CalendarDays} label={t.venues.passWindow} value={`${venue.validFrom} ${language === "en" ? "to" : "a"} ${venue.validTo}`} />
                </div>

                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-us-blue hover:text-us-red"
                >
                  {t.venues.openMap}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredVenues.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-us-blue/20 bg-us-cream p-6 text-sm font-semibold text-us-navy/70">
            {t.venues.empty}
          </div>
        ) : null}
      </section>

      <section className="section-shell">
        <SectionHeading eyebrow={t.superpowers.eyebrow} title={t.superpowers.title} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.superpowers.items.map(({ title, text }, index) => {
            const Icon = superpowerIcons[index];
            return (
              <div key={title} className="rounded-2xl border border-us-blue/10 bg-white p-5 shadow-card">
                <Icon className="h-8 w-8 text-us-red" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl leading-tight text-us-blue">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-us-navy/70">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-us-blue text-white">
        <div className="section-shell grid gap-4 md:grid-cols-2">
          <InfoPanel eyebrow={t.infoPanels.pickup.eyebrow} title={t.infoPanels.pickup.title} text={t.infoPanels.pickup.text} />
          <InfoPanel eyebrow={t.infoPanels.tickets.eyebrow} title={t.infoPanels.tickets.title} text={t.infoPanels.tickets.text} />
        </div>
      </section>

      <section id="partners" className="section-shell">
        <div className="flag-band grid gap-6 rounded-2xl p-6 text-white md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase text-white/75">{t.partners.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-5xl">{t.partners.title}</h2>
            <p className="mt-4 max-w-2xl font-semibold leading-7 text-white">{t.partners.text}</p>
            <p className="mt-4 max-w-2xl rounded-xl bg-white/12 p-4 text-sm font-black leading-6 text-white">{t.partners.groupCta}</p>
          </div>
          <div className="grid gap-2">
            {t.partners.types.map((type) => (
              <div key={type} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-black text-us-blue">
                <CheckCircle2 className="h-4 w-4 text-us-red" aria-hidden="true" />
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="bg-white">
        <div className="section-shell grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow={t.signup.eyebrow} title={t.signup.title} text={t.signup.text} />
          <form className="grid gap-4 rounded-2xl border border-us-blue/10 bg-us-cream p-5 shadow-card md:p-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-extrabold text-us-blue">{t.signup.email}</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={status === "error"}
                className="h-12 w-full rounded-md border border-us-blue/20 bg-white px-4 text-base text-us-navy placeholder:text-us-navy/40 focus:outline-none focus:ring-2 focus:ring-us-red"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-extrabold text-us-blue">{t.signup.language}</label>
                <LanguageSelector language={language} onChange={setLanguage} variant="form" />
              </div>

              <div>
                <label htmlFor="window" className="mb-2 block text-sm font-extrabold text-us-blue">{t.signup.visitDates}</label>
                <input
                  id="window"
                  type="text"
                  placeholder={t.signup.visitDatesPlaceholder}
                  value={travelStart && travelEnd ? `${travelStart} to ${travelEnd}` : ""}
                  onChange={() => undefined}
                  className="h-12 w-full rounded-md border border-us-blue/20 bg-white px-4 text-base text-us-navy placeholder:text-us-navy/40 focus:outline-none focus:ring-2 focus:ring-us-red"
                />
                <p className="mt-2 text-xs font-semibold text-us-navy/50">{t.signup.visitHint}</p>
              </div>
            </div>

            <p className={status === "error" ? "text-sm font-bold text-red-700" : "text-sm font-bold text-us-navy/60"} aria-live="polite">
              {signupMessage}
            </p>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-us-blue px-6 py-3 text-base font-extrabold text-white transition hover:bg-us-navy"
            >
              <Languages className="h-5 w-5" aria-hidden="true" />
              {t.signup.button}
            </button>
          </form>
        </div>
      </section>

      <section id="faq" className="section-shell">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="grid gap-3">
          {t.faq.items.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-us-blue/10 bg-white p-5 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-extrabold text-us-blue">
                <span>{item.question}</span>
                <Megaphone className="h-5 w-5 shrink-0 text-us-red transition group-open:rotate-12" aria-hidden="true" />
              </summary>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-us-navy/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-us-blue/10 bg-us-cream px-5 py-8 text-center text-sm font-semibold text-us-navy/60">
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}

function LanguageSelector({ language, onChange, variant }: { language: LanguageCode; onChange: (language: LanguageCode) => void; variant: "light" | "dark" | "form" }) {
  const baseClass =
    variant === "dark"
      ? "border-white/30 bg-us-navy/70 text-white"
      : variant === "form"
        ? "border-us-blue/20 bg-white text-us-blue"
        : "border-us-blue/20 bg-us-cream text-us-blue";
  const activeClass = variant === "dark" ? "bg-white text-us-blue" : "bg-us-blue text-white";
  const inactiveClass = variant === "dark" ? "text-white hover:bg-white/15" : "text-us-blue hover:bg-us-blue/10";

  return (
    <div className={`inline-flex max-w-full rounded-full border p-1 shadow-sm ${baseClass}`} aria-label="Language selector">
      {languageOptions.map((option) => {
        const active = option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => onChange(option.code)}
            className={`rounded-full px-2.5 py-1.5 text-xs font-black transition sm:px-3 ${active ? activeClass : inactiveClass}`}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white p-4 text-us-navy shadow-card">
      <Icon className="h-5 w-5 text-us-red" aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase text-us-navy/60">{label}</p>
      <p className="mt-1 text-sm font-black text-us-blue">{value}</p>
    </div>
  );
}

function TickerItems({ items, ariaHidden = false }: { items: { label: string; value: string }[]; ariaHidden?: boolean }) {
  return (
    <div className="flex min-w-max items-center" aria-hidden={ariaHidden}>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-3 px-5 text-sm font-extrabold">
          {index % 3 === 0 ? (
            <Clock3 className="h-4 w-4 text-white" aria-hidden="true" />
          ) : index % 3 === 1 ? (
            <Ticket className="h-4 w-4 text-white" aria-hidden="true" />
          ) : (
            <Gift className="h-4 w-4 text-white" aria-hidden="true" />
          )}
          <span className="uppercase text-white">{item.label}</span>
          <span className="text-white">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase text-us-red">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-us-blue md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base font-semibold leading-7 text-us-navy/70">{text}</p> : null}
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-us-red" aria-hidden="true" />
      <div>
        <p className="text-xs font-black uppercase text-us-navy/50">{label}</p>
        <p className="text-sm font-extrabold text-us-blue">{value}</p>
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-us-blue">
      <span>{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-md border border-us-blue/20 bg-white px-4 text-us-navy focus:outline-none focus:ring-2 focus:ring-us-red"
      />
    </label>
  );
}

function InfoPanel({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
      <p className="text-sm font-black uppercase text-white">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl leading-tight text-white">{title}</h2>
      <p className="mt-3 font-semibold leading-7 text-white/75">{text}</p>
    </div>
  );
}

export default App;
