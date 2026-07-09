/**
 * Curated wedding photo library sourced from Unsplash (free, high-resolution).
 * Focused on weddings, engagements, brides, grooms, rings and celebrations.
 * Uses Unsplash's imgix CDN with auto-format + adaptive sizing.
 */

const portrait = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`,
  ratio: "portrait" as const,
  alt,
});
const landscape = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`,
  ratio: "landscape" as const,
  alt,
});

export const WEDDING_LIB = {
  weddings: [
    portrait("1519741497674-611481863552", "Bride portrait with veil"),
    portrait("1519741196428-6a2175fa2557", "Bride with bouquet"),
    landscape("1546032996-6dfacbacbf3f", "Wedding ceremony aisle"),
    portrait("1591604442449-ecc9943efabf", "Bride and groom by the window"),
    portrait("1591604466107-ec97de577aff", "Bride embraced by groom"),
    landscape("1596457221755-b96bc3a6df18", "Wedding first kiss"),
    portrait("1599462616558-2b75fd26a283", "Bride laughter with groom"),
    landscape("1606216794079-73f85bbd57d5", "Couple exchanging vows"),
    portrait("1606216836537-eea72a939072", "Bride profile in warm light"),
    landscape("1607357910286-1ff94ac13c24", "Bride and groom under arch"),
    portrait("1460978812857-470ed1c77af0", "Bride walking down the aisle"),
    landscape("1465495976277-4387d4b0b4c6", "Silhouette of a couple at dusk"),
    portrait("1469371670807-013ccf25f16a", "Couple beneath white curtains"),
    landscape("1501901609772-df0848060b33", "Formal wedding portrait"),
    portrait("1505944357431-27579db47558", "Bride in classic gown"),
    landscape("1515934751635-c81c6bc9a2d8", "Wedding party celebration"),
    portrait("1522033467113-b8db23657b96", "Bride and groom quiet moment"),
    landscape("1523438885200-e635ba2c371e", "Outdoor ceremony pathway"),
    portrait("1525258946800-98cfd641d0de", "Bride portrait editorial"),
    landscape("1527628173875-3c7bfd28ad78", "Couple laughing outdoors"),
    portrait("1529519195486-16945f0fb37f", "Wedding embrace"),
    landscape("1529634597503-139d3726fed5", "Bride and groom dance"),
    portrait("1529634806980-85c3dd6d34ac", "Bride illuminated in gold"),
    portrait("1529636798458-92182e662485", "Bride tender pose"),
  ],
  engagement: [
    portrait("1539464443546-5e3512c46694", "Couple engagement portrait"),
    landscape("1540076156429-35ffe82b7870", "Engagement session golden hour"),
    portrait("1541518926503-a6fdabd94147", "Couple forehead touch"),
    landscape("1541679368093-5c967ac6de11", "Couple romantic walk"),
    portrait("1543829969-57899edf981b", "Couple laughing under trees"),
    landscape("1545232979-8bf68ee9b1af", "Engaged couple at sunset"),
    portrait("1549488497-94b52bddac5d", "Couple sharing a look"),
    landscape("1550368566-f9cc32d7392d", "Engagement in soft light"),
  ],
  rings: [
    landscape("1583939003579-730e3918a45a", "Bride and groom wedding rings"),
    landscape("1583939411023-14783179e581", "Wedding rings on lace"),
    landscape("1550784718-990c6de52adf", "Rings held over bouquet"),
    landscape("1553915632-175f60dd8e36", "Wedding ring detail"),
    landscape("1554047310-ab6170fc7b10", "Gold wedding bands"),
  ],
  details: [
    portrait("1562249004-1f7289c19c49", "Bride shoes and lace"),
    landscape("1567051181435-c9c9647c9cd4", "Bridal bouquet detail"),
    portrait("1574871786514-46e1680ea587", "Bride jewellery close-up"),
    landscape("1576694667642-6f289dd54187", "Wedding table décor"),
    portrait("1595407753234-0882f1e77954", "Bridal veil in wind"),
  ],
  celebration: [
    landscape("1599142296733-1c1f2073e6de", "First dance floor"),
    landscape("1606216794074-735e91aa2c92", "Wedding toast and laughter"),
    landscape("1606217239582-d9f72323bcd7", "Reception candle glow"),
    landscape("1606490194859-07c18c9f0968", "Bride and groom in celebration"),
    landscape("1606800052052-a08af7148866", "Wedding sparklers exit"),
    landscape("1607190074257-dd4b7af0309f", "Bride and groom kiss reception"),
    landscape("1621621667797-e06afc217fb0", "Wedding hall lit in candlelight"),
    landscape("1622398925373-3f91b1e275f5", "Bride and groom family embrace"),
  ],
} as const;

export const ALL_WEDDING_IMAGES = [
  ...WEDDING_LIB.weddings,
  ...WEDDING_LIB.engagement,
  ...WEDDING_LIB.rings,
  ...WEDDING_LIB.details,
  ...WEDDING_LIB.celebration,
];
