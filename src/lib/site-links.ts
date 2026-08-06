/**
 * Single source of truth for Egrow Plants contact details and outbound links.
 * Update here — every component reads from this file.
 */

export const EGROW = {
  name: "Egrow Plants",
  tagline: "Make Your Home Stylish",
  parent: "An initiative by Egrocy Retail Private LTD.",
  manager: { role: "Marketing Manager", name: "Rohit Tomar" },
  address: {
    lines: ["1/9, Rajendra Nagar, Sector-2", "Sahibabad, Ghaziabad – 201005"],
    full: "1/9, Rajendra Nagar, Sector-2, Sahibabad, Ghaziabad – 201005",
  },
  phones: [
    { display: "+91 91493 19342", raw: "+919149319342" },
    { display: "+91 79733 21986", raw: "+917973321986" },
  ],
  email: "Marketing@egrocy.in",
  whatsappNumber: "917973321986",
  whatsappMessage: "Hi Egrow Plants! I'd love to know more about your plants and planters.",
  instagram:
    "https://www.instagram.com/egrow_plants?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
} as const;

export const whatsappUrl = (message: string = EGROW.whatsappMessage) =>
  `https://wa.me/${EGROW.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Egrow Plants, ${EGROW.address.full}`,
  )}`;

export const telUrl = (raw: string) => `tel:${raw}`;
export const mailUrl = () => `mailto:${EGROW.email}`;
