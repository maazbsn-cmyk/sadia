import { User, DesignItem, AnalysisResult, ChatMessage } from './types';

export const initialUser: User = {
  name: "Sadia Shabir",
  email: "sadia.shabir@lumina.design",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcHXiqaWSvXhUzmh-WoLxb6ZkMsR7XZfqJsPaEyYg0L61X7d6DPWE9Cj8bYWX3uxOlEgvTtGmOKAcqvjRBYSxT7mJswapDjzdc9NYKG4aahZHaSMEjVTDMlRmOXH1eqtpOcIJZA9g9e7aT7yzRiGX4K1NqMlsD5OcJCgQLd9yjxjSsUzLnjqGumB7MTHPkgTmnlMqerZ0TnVa2TuFV0jkFfnqF1MbzJQEhDHOHc4Qi460USd3zHEFN1avTbJ0uAQdBJ79CBlF0oStW",
  isLoggedIn: true
};

export const sampleDesigns: DesignItem[] = [
  {
    id: "design-1",
    title: "Morning Sanctuary",
    roomType: "Living Room",
    style: "Scandinavian",
    styleTag: "SCANDI",
    createdText: "Created 2 days ago",
    analyzedDate: "Oct 12, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlL-S9JudwDxRbE5CNJHvSYeIGHawHVz5PewDoqae2d_pSCYnUfjSPWN8LrDmsmUhjKX61kEBDTcLapjUJIDOHlrgu1cI1ZUfSt2IJiRNruE_p8FgQyBpsTpX34LdZR00ABF3BpXPV0IKhyFUMQqRqsqvwpCXRlZLOu62u6JlLvzanqxFnS0Wjs5Vl1DufBXbwI3nVBYWXNGCsSHDnKTdHjipR1Qtkdhh9GRzNrRyLNO9hPMgCQJxR5aK7sMfUmKWlALiPIDJGz1kl",
    isFavorite: true,
    score: 8.8
  },
  {
    id: "design-2",
    title: "Midnight Velvet",
    roomType: "Bedroom",
    style: "Contemporary",
    styleTag: "MODERN",
    createdText: "Created 5 days ago",
    analyzedDate: "Oct 08, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFB578yJPcNut1GfMEdfu-ZkuhlxPOOew9WwRKbjVVDftupC8XzKIuDkI_khmj3i2EwzrKle6SG9VwOPvPV5RYoPoUNHkXN_k5ZX0jp3mUmy3COHiFf7WBOCJHw72kTjzQw-3yQVFkDL7Kv8OeMMNHngM5Lrg7xr8111FvsvEsnNU-nU-6bUfK3yAohvH86c-BnIkd_nDa_UyZr9-YBbVHp7g2RnaXSl_f8EE3i9Nv8DRe9aquBSB1U4iuirvghIVdprr1bpGKHDe_",
    isFavorite: false,
    score: 8.4
  },
  {
    id: "design-3",
    title: "Executive Retreat",
    roomType: "Office",
    style: "Mid-Century",
    styleTag: "JAPANDI",
    createdText: "Created 1 week ago",
    analyzedDate: "Sep 29, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPcWTaxXa3UJlRPb_MSttRoOMSxH1D6FPUNf9VGUiarjFojzib43imKJibUBsNspviEeZ5YCc1V46h6cwbNwEiEveIpPf06OwJbzHP6XftiRX76fRi18iue0NPBPOPMnRTzbFu4FDxD2dWrHfcGiko084TurUo20KhYSohSYmnqJVhSnSj4b1Zjg2BtkSYlQcWSWRDQS3CQJJJIYIPMZCVp97e30RmLL0bbU1iys1DwJUdhs-RnmbrXUXftKZHQNxr-awup7Odm6NR",
    isFavorite: false,
    score: 8.1
  },
  {
    id: "design-4",
    title: "Loft Bedroom",
    roomType: "Bedroom",
    style: "Industrial",
    styleTag: "INDUSTRIAL",
    createdText: "Created 2 weeks ago",
    analyzedDate: "Sep 15, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1sFalH22XyDB5nu6mu7CcVcOsR5OdmQP4edbJDLQamIwZy1UShDEcohX2HzJPVldzS8RCaLC5UtQN71_B0UmDPwSb-f3wlUoMS2-4FmpIBdMpwMBD_2szcXH49jFpO6RsYnrZA7_LzGCMFg6-sTEXFjzjRJ6QKjqRCNJhN9suRxO4kQPPqf4rD_o9WwylVMHimknECgA24DxbAXK0WN_U_ksAdQkzKFcxTdPY1Tc1kPj7BLQbskh3OwK3jQZwO7U3Be9veImtBFSn",
    isFavorite: false,
    score: 7.9
  }
];

export const defaultAnalysisResult: AnalysisResult = {
  spatialOverview: "Our AI has identified a spacious 32m² contemporary living area with excellent natural light orientation.",
  designScore: 8.4,
  scoreLabel: "Optimal",
  percentileRank: "top 15%",
  styleMatch: "88% Nordic",
  toneMap: "Cool Warm",
  wallColour: {
    name: "Oyster White",
    hex: "#E5E7EB",
    description: "The current shade reflects 72% of natural light, maximizing spatial perception but lacking focal warmth."
  },
  lightingAnalysis: {
    kelvin: "3200K (Warm)",
    description: "Exposure is optimal in the NW corner. Recommend adding a floor lamp to the SE corner to balance shadows."
  },
  furnitureAssets: [
    "Mid-Century Sofa",
    "Oak Coffee Table",
    "Jute Rug"
  ],
  colourPalette: [
    { name: "Midnight Slate", role: "Accent / Trim", hex: "#2D3142" },
    { name: "Steel Blue", role: "Secondary", hex: "#4F5D75" },
    { name: "Cool Grey", role: "Transition", hex: "#BFC0C0" },
    { name: "Pure Alpine", role: "Primary Wall", hex: "#FFFFFF" },
    { name: "Muted Ochre", role: "Pop Accent", hex: "#EF8354" }
  ],
  furnitureMatches: [
    {
      title: "Sørensen Armchair",
      subtitle: "Matches Sofa Materiality",
      price: "$849.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcaOcakxtUovcugqoHXDExl65J0IXq6Po9-rgjCrYxTN4HnEoBzfc3H2NklOWiP_n2BkAObAJ1XhPwqXlzRw4Tzgr9rvWcPBen4HU9NMUSJvllFm9Kvj3fmdgPx3UdfRWmpFIBRtD7WtTXTA-u4nvlshQBF2eTkfeV-OG1os_ht-v6c4P-7lxiibKE-Oc4zAOP8AAgzOt_JERa0eyXG0mi29AdGHJCrAdqFewFDpT-EKbZyNzmni389H2vHNCIUY8gC61JQNB_HG3T"
    },
    {
      title: "Eclipse Floor Lamp",
      subtitle: "Ideal for Corner Lighting",
      price: "$320.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWV3McZvDFk1ibblcKcjbVsBcgY5GlFUp_9MAidOzD-HteEG4JNQkGCvPOxyenjhBCaJjsstCxUgLUUiyFZMs9iyRM94HOUGEpCCm0YT6FBgl__LVOzxwCUTMyudhkMf1Svn98MYEf5FgNQhvLXQT3QcN7KA3j_7ampSHoILAr9Tl7Br6LCBzRW-ggq9AIZr8-f0KdKG6M-5nluW8Mcrw1INpePR3pkJDAJQG1zJvsAjW2Mr3AheV8v8-3UWkR1RHUbrSKY5SPKTSx"
    }
  ],
  decorationGuide: [
    {
      title: "Organic Vases",
      subtitle: "Texture Harmony",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQULADc9H1sVkk7gLSXOSDifcMZQkhKabt-Afu925SS1weN4m8OyFTMawm46DeF6CTIO-IzFOaMl3NaNbACy3bTpuJhKpYjnaErE_ku0RvilxRXzEYicla2EqIHrLTiqUHjP9_Nh9k9UsHBsfnC7KXsEY_6ofd2uvxwxDoWEJhdu03blz3h-l4TqjtcV64kUCgMWtx5vsvf96ThF3Tlgcqv_3htoweFRw95Pw2GuA-EustiFMZrXZMXCjyAwjY8TYJBBin24e0HJee"
    },
    {
      title: "Abstract Canvas",
      subtitle: "Focal Point",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvWO4ocqzZzRfFmAa9bub-W7fI-MROJXWMzyqEh7M8Qyqgg1d_uK1F0Saj1EAIbrRCUPe8VEBNdsi1JmzuQj53DXWQzqCPvGPJqacjVC0jmsWn1kb-EgVPsqlmHW3afDY3E2r8Dxjwz0IVU_wP6GFUCqwnCOpfKVpSsYtTlruEj1PSrVCT32icnDbI0pFiEqEbUvUkiNgNatMDUwqc-qoQYHPSmz4IPPfGQ0XQ3x7GID3GSIwsKazsC4y5Slw_rNksutNK6dbq7p-o"
    }
  ],
  budgetRange: {
    min: "$1,200",
    max: "$2,450",
    tier: "Medium"
  },
  tips: [
    "Use sheer curtains to soften the harsh morning light from the North window.",
    "Introduce vertical greenery like a Fiddle Leaf Fig to lead the eye upwards.",
    "The coffee table should be 2-4 inches lower than the sofa seat height."
  ],
  analyzedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD20a9G4DV64_kf9LUE_oRUhpyU1x11ntFQDfMEesy87iCG9Idhl3WnrLg2Eeps1VVohP_PwqSaishG5yBF_un4I3L13dj8TbBanRx12jE3eZUsF2TzjddbxPSzrkHX1Lzc9qqrnsXGEj4YFiZbfTFV7E_yocxe0zatZEybf47pukj1Js06hfjuywhE6ufDWU31Giw5eJmuliz3_ou5_B3adNbNHoT6GHFBvB1lDjlgarjudQLQ8k0RKxl-7_xfXk1b0plolWrDUwau",
  roomType: "Living Room",
  style: "Contemporary",
  budget: "Medium"
};

export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "bot",
    text: "Hello! I'm your Lumina AI Design Assistant. I can help you visualize new styles or solve design dilemmas. What's on your mind today?",
    timestamp: "10:24 AM"
  },
  {
    id: "msg-2",
    sender: "user",
    text: "I have a small North-facing living room. It feels a bit cold and cramped. Any tips?",
    timestamp: "10:25 AM"
  },
  {
    id: "msg-3",
    sender: "bot",
    text: "For North-facing rooms, you want to lean into warm undertones to counteract the cool natural light. Try these three things:",
    timestamp: "10:26 AM",
    bulletPoints: [
      'Use "Warm White" or "Terracotta" accents.',
      'Add layered lighting (floor lamps + sconces).',
      'Mirror placement to bounce what light you do have.'
    ],
    suggestedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsKYfW7yyadQF8jcA9RIj6t2FYwajiOg6y66gn5AusdSR9L3aOtdMLCm9-JUyPShd4ygH_cAeFaA8s5UZJYAS1-dQ5POm1xyuSkElYgrhMd-p9R0d3S_k8SxS31sNSD42us_E3cnAGA12852-GK-HwgokeXoxnbEMY_hRYoefN6WVyyqU6njkmYHAXvTHHlV5t-aITyXba9azIHQPJmImiVoZAWIBHt8IPaVFHMcG75OUvI8gwYVSFDtKzzfajHy4O8CxARlKE0lzK"
  }
];
