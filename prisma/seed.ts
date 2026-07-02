import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  port: Number(process.env.DATABASE_PORT) || 20962,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@gnsspices.com" },
    update: {},
    create: {
      id: "0b30355e-7058-11f1-9acd-088fc3432790",
      name: "Admin",
      email: "admin@gnsspices.com",
      password: "$2b$10$.4zX9fD.9u8KcEa87dqx7.SBYxpcYRKARjF7jp0thLYmzE3XL8BBG",
      role: "admin",
    },
  });

  // Categories
  const categories = [
    { name: "Pure Powders", description: "Turmeric, chilli, coriander & more" },
    { name: "Signature Masalas", description: "Garam, biryani, tandoori, kitchen king" },
    { name: "Whole Seeds", description: "Mustard & cumin for tempering" },
    { name: "Whole Spices", description: "Tellicherry pepper, bay leaves" },
    { name: "Indian Pickles", description: "Traditional Indian pickles" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }
// Products
const products = [
  { title: "Turmeric Powder", category: "Pure Powders", desc: "Bright, earthy, with clean curcumin warmth.", badge: "Home Kitchen", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780488830/tcbebhvmu17r4wvyl4mm.png", price: 48, origin: "Erode & Salem, Tamil Nadu", inStock: true, tiers: [{name:"Home Kitchen",weight:"100g · 500g",desc:"Salem · 5% curcumin"},{name:"Chef's Reserve",weight:"100g · 500g",desc:"Erode · 7% curcumin"}] },
  { title: "Red Chilli Powder", category: "Pure Powders", desc: "Three grades from gentle blush to fiery sting.", badge: "Home Kitchen", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489144/nggwx6omgmz8vpcvw0u2.png", price: 20, origin: "Kashmir, Karnataka & Andhra Pradesh", inStock: true, tiers: [{name:"Home Kitchen",weight:"100g · 500g",desc:"Kashmiri · mild & vivid red"},{name:"Professional Choice",weight:"100g · 500g",desc:"Byadgi · medium, deep red"},{name:"Chef's Reserve",weight:"100g · 500g",desc:"Guntur Sannam · hot, fiery"}] },
  { title: "Coriander Powder", category: "Pure Powders", desc: "Sweet-citrus base note for every Indian gravy.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489338/p7n0880xed1qh75acqui.png", price: 40, origin: "Kota, Rajasthan", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Standard"}] },
  { title: "Cumin Powder", category: "Pure Powders", desc: "Slow-roasted before milling for deep, smoky aroma.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489473/jfaqe7csk57mqtuvz3s7.png", price: 47, origin: "Unjha, Gujarat", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Roasted"}] },
  { title: "Black Pepper Powder", category: "Pure Powders", desc: "Tellicherry — bold, citrus-piney, gloss-black.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489622/ouqwo6jmzxyrvkrjt8qc.png", price: 30, origin: "Tellicherry, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Tellicherry · fine grind"}] },
  { title: "Asafoetida (Hing) Powder", category: "Pure Powders", desc: "A pinch transforms dal — savoury, allium-deep.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489712/mhqceixf5njgmt0ksedi.png", price: 19, origin: "Hadik, blended in India", inStock: true, tiers: [{name:"House Selection",weight:"50g · 100g",desc:"Compounded · gluten-free"}] },
  { title: "Mango Powder (Amchur)", category: "Pure Powders", desc: "Sun-dried green mango — bright sour finish.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489814/vxtcf2iispsctrqjbhkb.png", price: 50, origin: "Uttar Pradesh", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Premium"}] },
  { title: "Black Salt (Kala Namak)", category: "Pure Powders", desc: "Mineral-rich, sulphurous — chaat-essential.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780489909/vkdigeu2qljodxgsfpdw.png", price: 30, origin: "Himalayan foothills", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Fine grind"}] },
  { title: "Ginger Powder", category: "Pure Powders", desc: "Sun-dried Cochin ginger — warm, lemony bite.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490039/a99lbxyxbuvscw6hcelv.png", price: 70, origin: "Cochin, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Standard"}] },
  { title: "Cardamom Powder", category: "Pure Powders", desc: "Freshly ground green cardamom — sweet, floral, intense.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490139/egvtbhiphb3h8l12wokl.png", price: 50, origin: "Idukki, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Premium · stone-ground"}] },
  { title: "Cinnamon Powder", category: "Pure Powders", desc: "Sweet Ceylon cinnamon — warm, mellow, never bitter.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490250/fehc54wk3h8xmppjkuxc.png", price: 80, origin: "Munnar, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Ceylon · fine grind"}] },
  { title: "Pink Himalayan Salt", category: "Pure Powders", desc: "Hand-mined rock salt — mineral-rich, gently mineral-sweet.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490369/ykfddxp10furqaexfefc.png", price: 40, origin: "Punjab foothills, Himalayas", inStock: true, tiers: [{name:"House Selection",weight:"200g · 1kg",desc:"Fine grind"}] },
  { title: "White Pepper Powder", category: "Pure Powders", desc: "Fermented & polished pepper — sharper, less aromatic than black.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490528/psksm39m9ydxwftwahqq.png", price: 50, origin: "Sarawak / Tellicherry, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Fine grind"}] },
  { title: "Mustard Seeds", category: "Whole Seeds", desc: "Black mustard — pop them in hot oil.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490656/lwlb8khids3v9t3kmaj4.png", price: 19, origin: "Rajasthan", inStock: true, tiers: [{name:"House Selection",weight:"200g · 1kg",desc:"Black · whole"}] },
  { title: "Cumin Seeds", category: "Whole Seeds", desc: "Whole jeera — earthy, perfect for tempering.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490763/yrxymx2g2dmzszjkbrth.png", price: 120, origin: "Unjha, Gujarat", inStock: true, tiers: [{name:"House Selection",weight:"200g · 1kg",desc:"Standard · whole"}] },
  { title: "Garam Masala", category: "Signature Masalas", desc: "Family blend No. 7 — warming, fragrant, slow-roasted.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490860/od7jzxbdftqfzjt2o91u.png", price: 90, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Chhole Masala", category: "Signature Masalas", desc: "Punjabi-style — anardana, dry mango, ginger.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780490980/uhcalgklymlfcz7ua4mj.png", price: 60, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Curry Masala", category: "Signature Masalas", desc: "Everyday gravies — turmeric, coriander, chilli.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491069/jycy7epqaxovewolhrzz.png", price: 90, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Tandoori Masala", category: "Signature Masalas", desc: "Smoky, deep red — for chicken, paneer, naan.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491164/vmqhwsjlus383u41s7b4.png", price: 150, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Biryani Masala", category: "Signature Masalas", desc: "Saffron, mace, star anise — long-grain rice ready.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491256/e7ggmxzpvlqgug2do13x.png", price: 80, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Chicken Masala", category: "Signature Masalas", desc: "Balanced heat & body for every chicken curry.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491382/omod9dkwyamx0fzq6wdv.png", price: 80, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Mutton Masala", category: "Signature Masalas", desc: "Robust, peppery — slow-cooked mutton & lamb.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491647/ooyup23kwtwzprkvr2so.png", price: 89, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Kitchen King Masala", category: "Signature Masalas", desc: "The all-rounder — vegetables, dals, paneer.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491783/lc4wx0cvrgzdftjxvfrp.png", price: 68, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Whole Black Pepper", category: "Whole Spices", desc: "Saffron, mace, star anise — long-grain rice ready.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491884/mswbwooznkfkkl6mbrqp.png", price: 38, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Whole Bay Leaves", category: "Whole Spices", desc: "Indian tej patta — cinnamon-like, for pulao & dal.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780491987/lanmyvqslkzru4tjslpw.png", price: 19, origin: "Uttarakhand", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Hand-sorted"}] },
  { title: "Whole Nutmeg (Jaiphal)", category: "Whole Spices", desc: "Warm, sweet — grate fresh into desserts and pulao.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492094/botazt4k62zmhxwq7eac.png", price: 69, origin: "Kerala", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Whole nuts"}] },
  { title: "Whole Cloves (Laung)", category: "Whole Spices", desc: "Aromatic, sweet-pungent — for biryani, masala chai.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492301/ao1wdwzkq2siqb9cecwv.png", price: 36, origin: "Madagascar / Kerala", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Hand-sorted whole buds"}] },
  { title: "Jaipatri (Mace)", category: "Whole Spices", desc: "Lacy outer covering of nutmeg — delicate, floral.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492406/m3qjnkurufjgrynarck7.png", price: 45, origin: "Kerala", inStock: true, tiers: [{name:"House Selection",weight:"25g · 100g",desc:"Whole blades"}] },
  { title: "Cinnamon Sticks", category: "Whole Spices", desc: "True Ceylon cinnamon quills — sweet, mellow, paper-thin.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492539/e4kf2badghwwlr0qvswv.png", price: 39, origin: "Munnar, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Ceylon quills"}] },
  { title: "Whole Green Cardamom", category: "Whole Spices", desc: "Plump green pods from the Idukki hills.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492641/ye7drpo3pzjhp21waghl.png", price: 90, origin: "Idukki, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"8mm AAA grade"}] },
  { title: "Whole Black Cardamom", category: "Whole Spices", desc: "Smoky, resinous — for slow-cooked meats and rice.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492733/wdkzkvu1crnaomnjy5jl.png", price: 50, origin: "Sikkim", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Hand-sorted pods"}] },
  { title: "Whole White Pepper", category: "Whole Spices", desc: "Fermented, polished peppercorns — sharper, less aromatic.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492848/df3syvronwarxxhqik0i.png", price: 88, origin: "Sarawak / Tellicherry, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"50g · 200g",desc:"Whole peppercorns"}] },
  { title: "Whole Turmeric Fingers", category: "Whole Spices", desc: "Sun-dried turmeric rhizome — grate or grind fresh.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780492966/o1i7wzmilko9jawwz4px.png", price: 44, origin: "Erode, Tamil Nadu", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Premium fingers"}] },
  { title: "Whole Dried Ginger (Sonth)", category: "Whole Spices", desc: "Sun-dried Cochin ginger — for masala chai and chutneys.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493058/zemvx0ex9mxudefizavr.png", price: 70, origin: "Cochin, Kerala", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Sun-dried whole"}] },
  { title: "Whole Byadgi Chillies", category: "Whole Spices", desc: "Deep red Karnataka chillies — colour without much heat.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493192/tfcqpbeic4aessfuidnv.png", price: 42, origin: "Byadgi, Karnataka", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Stemless, hand-sorted"}] },
  { title: "Kasuri Methi", category: "Whole Spices", desc: "Sun-dried fenugreek leaves — bitter, herbal finish.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493299/tvxzy6rvpyatgzn8ftqh.png", price: 37, origin: "Rajasthan", inStock: true, tiers: [{name:"House Selection",weight:"25g · 100g",desc:"Hand-rubbed"}] },
  { title: "Whole Coriander Seeds", category: "Whole Seeds", desc: "Sweet-citrus base — toast & grind for every gravy.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493488/wza4dcdwkfoup3daogwa.png", price: 50, origin: "Kota, Rajasthan", inStock: true, tiers: [{name:"House Selection",weight:"200g · 1kg",desc:"Hand-sorted whole"}] },
  { title: "Fennel Seeds (Saunf)", category: "Whole Seeds", desc: "Sweet, anise-like — for chai, mukhwas & paan.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493584/bjifh3zilheegapuiyqw.png", price: 60, origin: "Gujarat", inStock: true, tiers: [{name:"House Selection",weight:"200g · 1kg",desc:"Green saunf, whole"}] },
  { title: "Fenugreek Seeds (Methi)", category: "Whole Seeds", desc: "Bitter, maple-toned — essential for pickles & curries.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493693/aekda5zljnclzbi5eomj.png", price: 50, origin: "Rajasthan", inStock: true, tiers: [{name:"House Selection",weight:"200g · 1kg",desc:"Whole seeds"}] },
  { title: "Carom Seeds (Ajwain)", category: "Whole Seeds", desc: "Sharp, thyme-like — for parathas, dals, and digestion.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493784/zyr268nivwn66lhykwdo.png", price: 42, origin: "Madhya Pradesh", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Whole seeds"}] },
  { title: "Chaat Masala", category: "Signature Masalas", desc: "Tangy, sulphurous, salty — sprinkle on everything chaat.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780493921/fju7ws1lncrs9sevbozh.png", price: 22, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Chai Masala", category: "Signature Masalas", desc: "Cardamom, ginger, clove, pepper — your perfect cup.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494009/hijdiqefupcqugklux8n.png", price: 18, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Paneer Masala", category: "Signature Masalas", desc: "Mellow, creamy — for paneer butter masala & tikka.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494104/cbhhee1lwapyhy82acmg.png", price: 59, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Fish Masala", category: "Signature Masalas", desc: "Mustard, methi, kokum — for coastal-style fish curries.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494215/z8rwjoqjju6ktz1wgpvc.png", price: 60, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Pav Bhaji Masala", category: "Signature Masalas", desc: "Bombay street-side classic — buttery, bright, bold.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494313/baigtoylajiejqxabtv4.png", price: 49, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Sambar Masala", category: "Signature Masalas", desc: "South Indian classic — toor dal, tamarind, coconut.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494414/ktivuu9yjebhjgqyqsgr.png", price: 38, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Chicken Biryani Masala", category: "Signature Masalas", desc: "Hyderabadi-style — for tender, aromatic chicken biryani.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494516/fqqtrix0sdcixjcko57f.png", price: 16, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Mutton Biryani Masala", category: "Signature Masalas", desc: "Lucknowi-style — for slow-cooked, fragrant mutton biryani.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494668/jvf99n0ktrunrqz81izp.png", price: 49, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Shahi Biryani Masala", category: "Signature Masalas", desc: "Royal blend — saffron, mace, rose & nuts. For special occasions.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494788/bqsgamzf1zssq1ohcnfw.png", price: 11, origin: "Blended in India", inStock: true, tiers: [{name:"House Selection",weight:"100g · 500g",desc:"Signature blend"}] },
  { title: "Mango Pickle", category: "Indian Pickles", desc: "Aam ka achaar — raw mango in mustard oil & spices.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780494885/xadwdxixgvpjemwldfij.png", price: 151, origin: "Punjab", inStock: true, tiers: [{name:"House Selection",weight:"300g · 1kg",desc:"Traditional recipe"}] },
  { title: "Lime Pickle", category: "Indian Pickles", desc: "Nimbu ka achaar — tangy, sun-cured lime.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780495034/unpmhe9irrdz4q3vixih.png", price: 120, origin: "Andhra Pradesh", inStock: true, tiers: [{name:"House Selection",weight:"300g · 1kg",desc:"Traditional recipe"}] },
  { title: "Lime & Chilli Pickle", category: "Indian Pickles", desc: "Lime tang meets chilli heat — twice as bold.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780495135/hcowx18naou7f6lysrzl.png", price: 59, origin: "Andhra Pradesh", inStock: true, tiers: [{name:"House Selection",weight:"300g · 1kg",desc:"Traditional recipe"}] },
  { title: "Green Chilli Pickle", category: "Indian Pickles", desc: "Hari mirch achaar — whole green chillies, sharp & sour.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780495238/n3io8dv2jrqiusjxhduy.png", price: 150, origin: "Punjab", inStock: false, tiers: [{name:"House Selection",weight:"300g · 1kg",desc:"Traditional recipe"}] },
  { title: "Mixed Pickle", category: "Indian Pickles", desc: "Mango, lime, chilli, carrot & ginger — the everything achaar.", badge: "House Selection", image: "https://res.cloudinary.com/dquyiefex/image/upload/v1780495344/uhprqdpqjfyvprlyhedo.png", price: 130, origin: "Punjab", inStock: true, tiers: [{name:"House Selection",weight:"300g · 1kg",desc:"Traditional recipe"}] },
];

for (const p of products) {
  await prisma.product.create({
    data: {
      title: p.title,
      category: p.category,
      desc: p.desc,
      badge: p.badge,
      image: p.image,
      price: p.price,
      origin: p.origin,
      inStock: p.inStock,
      tiers: p.tiers,
    },
  });
  console.log(`✅ ${p.title}`);
}
  console.log("✅ Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());