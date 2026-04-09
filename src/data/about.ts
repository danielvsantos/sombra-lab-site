export interface Founder {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export interface Collaborator {
  name: string;
  role?: string;
  photo?: string;
}

export const founders: Founder[] = [
  {
    name: "Patricia Bressiani",
    role: "Production & Creative Direction",
    bio: "Patricia Bressiani steers the production and creative direction helm with her expansive expertise in production, strategy, and styling. Celebrated for her contributions to notable brands and publications, Patricia's strategic insight and stylistic flair turn the ordinary into the extraordinary, crafting stories that captivate and connect.",
    photo: "/assets/about/patricia.jpg",
  },
  {
    name: "Leonardo Cadore",
    role: "Photography & Visual Art",
    bio: "Leonardo Cadore brings his exceptional talent in photography and visual art to lead content production at Sombra. With each snapshot and video, Leonardo blends artistic vision with meticulous execution, ensuring that Sombra's creations not only capture the eye but also touch the heart, making every interaction memorable.",
    photo: "/assets/about/leonardo.jpg",
  },
];

export const collaborators: Collaborator[] = [
  {
    name: "Tulio Brzezinski",
    role: "Photographer & Videomaker",
    photo: "/assets/about/tulio.jpg",
  },
];
