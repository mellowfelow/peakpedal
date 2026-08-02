# FAQ Bank — Peak Pedal (Market: UK)
**Generated:** August 2026
**Total Questions:** 48
**Pages with FAQ Schema Needed:** 16
**Source:** Question-intent keyword clusters, site audit findings, eMTB informational intent keywords

---

## USAGE RULES (WebForge)
- FAQ answers: 40–65 words maximum (WebForge AI extraction ceiling)
- FAQPage JSON-LD: one block per page, all questions in a single `@type: FAQPage` block
- Speakable schema: use `.faq-answer-speakable` class on the single most AI-extractable answer per page
- Never duplicate the same question across two pages — assign to most relevant page only
- All FAQ blocks go in the WebForge `faq:` YAML field in the page data file

---

## HOMEPAGE FAQ — / (6 questions)

**Use on:** Homepage
**WebForge Schema:** FAQPage JSON-LD

**Q1: What is Peak Pedal?**
A: Peak Pedal is a UK specialist retailer of electric mountain bikes, stocking 96 eMTBs from 14+ brands including Cube, Trek, Orbea, Santa Cruz, Specialized and Amflow. We offer expert advice, UK-wide delivery and a WhatsApp-first ordering process for riders who want to talk before they buy.

*[55 words — PASS]*

**Q2: Are electric mountain bikes legal in the UK?**
A: Yes. All eMTBs sold by Peak Pedal comply with UK EAPC (Electrically Assisted Pedal Cycle) regulations — motor output no greater than 250W continuous power, assistance cutting out at 15.5mph. They are classified as bicycles: no licence, registration or insurance required. Riders must be aged 14 or over.

*[48 words — PASS] ← Speakable: `.faq-answer-speakable`*

**Q3: How much do electric mountain bikes cost?**
A: Electric mountain bikes at Peak Pedal range from approximately £2,100 for an entry-level hardtail to over £9,000 for a premium full suspension enduro build. The majority of our full suspension range with Bosch Performance CX motors falls between £2,800 and £5,000. Finance options are available.

*[47 words — PASS]*

**Q4: Do you offer UK-wide delivery?**
A: Yes — Peak Pedal delivers electric mountain bikes across the UK. All bikes are professionally built, inspected and boxed before despatch. Delivery timescales and costs are confirmed at the point of order. Contact us via WhatsApp to discuss delivery for your specific postcode.

*[43 words — PASS]*

**Q5: Can I buy an electric mountain bike on finance?**
A: Finance options for electric mountain bikes are coming soon at Peak Pedal. In the meantime, the Cycle to Work scheme can reduce the purchase cost of an eligible eMTB by 25–47% through salary sacrifice — see our Cycle to Work guide for details.

*[44 words — PASS]*

**Q6: Who are electric mountain bikes suitable for?**
A: Electric mountain bikes are suitable for all adult riders — those returning to cycling, riders tackling bigger climbs, commuters wanting trail capability, and experienced mountain bikers looking for more time at the top. At Peak Pedal we stock everything from entry hardtails to elite enduro builds.

*[46 words — PASS]*

---

**FAQPage JSON-LD — Homepage:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Peak Pedal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peak Pedal is a UK specialist retailer of electric mountain bikes, stocking 96 eMTBs from 14+ brands including Cube, Trek, Orbea, Santa Cruz, Specialized and Amflow. We offer expert advice, UK-wide delivery and a WhatsApp-first ordering process for riders who want to talk before they buy."
      }
    },
    {
      "@type": "Question",
      "name": "Are electric mountain bikes legal in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All eMTBs sold by Peak Pedal comply with UK EAPC (Electrically Assisted Pedal Cycle) regulations — motor output no greater than 250W continuous power, assistance cutting out at 15.5mph. They are classified as bicycles: no licence, registration or insurance required. Riders must be aged 14 or over."
      }
    },
    {
      "@type": "Question",
      "name": "How much do electric mountain bikes cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Electric mountain bikes at Peak Pedal range from approximately £2,100 for an entry-level hardtail to over £9,000 for a premium full suspension enduro build. The majority of our full suspension range with Bosch Performance CX motors falls between £2,800 and £5,000. Finance options are available."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer UK-wide delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Peak Pedal delivers electric mountain bikes across the UK. All bikes are professionally built, inspected and boxed before despatch. Delivery timescales and costs are confirmed at the point of order. Contact us via WhatsApp to discuss delivery for your specific postcode."
      }
    },
    {
      "@type": "Question",
      "name": "Can I buy an electric mountain bike on finance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Finance options for electric mountain bikes are coming soon at Peak Pedal. In the meantime, the Cycle to Work scheme can reduce the purchase cost of an eligible eMTB by 25–47% through salary sacrifice — see our Cycle to Work guide for details."
      }
    },
    {
      "@type": "Question",
      "name": "Who are electric mountain bikes suitable for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Electric mountain bikes are suitable for all adult riders — those returning to cycling, riders tackling bigger climbs, commuters wanting trail capability, and experienced mountain bikers looking for more time at the top. At Peak Pedal we stock everything from entry hardtails to elite enduro builds."
      }
    }
  ]
}
```

---

## FAQ PAGE — /faq/ (12 questions — primary FAQ hub)

**Use on:** /faq/ page
**⚠️ CRITICAL: Page title must change to "Electric Mountain Bike FAQ — Peak Pedal" (per audit finding)**
**WebForge Schema:** FAQPage JSON-LD

### Theme: Legality & Trail Access

**Q7: Can I ride an electric mountain bike on any trail in the UK?**
A: EAPC-compliant eMTBs are classified as bicycles under UK law, so they are permitted on any trail open to regular mountain bikes. Most trail centres in the UK accept eMTBs. However, some privately managed venues or specific trail features may have their own policies — always confirm with the trail centre before your visit.

*[54 words — PASS]*

**Q8: Do I need a licence to ride an electric mountain bike?**
A: No licence, registration or insurance is required to ride an EAPC-compliant electric mountain bike in the UK. The minimum legal age is 14. All eMTBs at Peak Pedal are EAPC-compliant — 250W continuous motor power, pedal assistance only, and assistance cutting out at 15.5mph.

*[45 words — PASS]*

**Q9: What age can you ride an electric mountain bike in the UK?**
A: The minimum age to ride an EAPC-compliant electric mountain bike on public roads and trails in the UK is 14 years old. There is no upper age limit. For riders under 14, electric mountain bikes may only be used on private land with the landowner's permission.

*[46 words — PASS]*

### Theme: Cost & Finance

**Q10: How much should I spend on my first electric mountain bike?**
A: For a first eMTB with reliable motor support and serviceable components, £2,500–£3,500 is a practical starting range. This buys a hardtail or entry full suspension with a Bosch, Shimano or Yamaha motor. Below £2,000, motor quality and long-term parts availability become less consistent.

*[45 words — PASS]*

**Q11: Can I use the Cycle to Work scheme for an electric mountain bike?**
A: Yes — most EAPC-compliant electric mountain bikes qualify for the Cycle to Work scheme, which allows employees to purchase bikes through salary sacrifice at a gross saving of 25–47% depending on tax band. Peak Pedal can support Cycle to Work orders — see our guide for details or contact us via WhatsApp.

*[52 words — PASS]*

**Q12: Who sells electric mountain bikes in the UK?**
A: Electric mountain bikes are sold by specialist retailers like Peak Pedal, brand-direct websites, and some large cycling chains. Specialist retailers offer expertise across multiple brands and can advise on fitting, spec and aftersales — Peak Pedal stocks 14+ brands with UK-wide delivery and WhatsApp support.

*[46 words — PASS] ← Speakable: `.faq-answer-speakable`*

### Theme: Technical

**Q13: What is the best motor for an electric mountain bike?**
A: The right motor depends on your priorities. Bosch Performance CX (85Nm) is the most widely supported and suited to demanding terrain. Shimano EP801 is quieter and lighter for a more natural feel. DJI Avinox M1 offers the highest peak torque (105Nm) with smart features. Lightweight SL riders prefer TQ HPR50 or Bosch SX.

*[53 words — PASS]*

**Q14: How far can I ride on an electric mountain bike?**
A: Range depends on motor mode, terrain, rider weight and battery size. On a typical 750Wh battery with Bosch Performance CX in Trail mode, expect 50–90km of trail riding. Lightweight SL systems with smaller batteries (250–400Wh) typically offer 30–60km. Range estimates from manufacturers assume flat ground — factor in 20–30% reduction for hilly terrain.

*[56 words — PASS]*

**Q15: How long does an eMTB battery last before it needs replacing?**
A: Modern eMTB batteries (Bosch, Shimano, Yamaha) typically retain over 60% capacity after 500–1,000 full charge cycles — equivalent to several years of regular riding. Battery replacement is available through authorised service centres. Avoid fully discharging the battery and store it at 30–60% charge to maximise lifespan.

*[48 words — PASS]*

**Q16: How heavy are electric mountain bikes?**
A: Full-power eMTBs typically weigh 22–27kg depending on frame material, motor and battery. Lightweight SL models (Trek Fuel EXe, Orbea Rise LT, Specialized Turbo Levo SL) weigh 17–21kg. Carbon framed models are generally 1–2kg lighter than equivalent alloy builds. Weight is listed in each product spec at Peak Pedal.

*[51 words — PASS]*

### Theme: Buying Advice

**Q17: What is the difference between hardtail and full suspension eMTBs?**
A: A hardtail eMTB has front suspension only — lower weight, lower maintenance cost and better climbing efficiency. A full suspension eMTB adds rear suspension, improving comfort, control and traction on rough or technical terrain. For beginners or cross-country riders, hardtail. For trail, enduro and technical riding, full suspension.

*[49 words — PASS]*

**Q18: Should I buy a full suspension or hardtail electric mountain bike?**
A: Buy full suspension if you ride technical or rocky terrain, prioritise control on descents, or tackle enduro trails. Buy a hardtail if you predominantly ride smoother cross-country trails, want lower running costs, or are newer to mountain biking. Both types are excellent for general trail use at Peak Pedal's price points.

*[52 words — PASS]*

---

**FAQPage JSON-LD — /faq/ page:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I ride an electric mountain bike on any trail in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EAPC-compliant eMTBs are classified as bicycles under UK law, so they are permitted on any trail open to regular mountain bikes. Most trail centres in the UK accept eMTBs. However, some privately managed venues or specific trail features may have their own policies — always confirm with the trail centre before your visit."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a licence to ride an electric mountain bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No licence, registration or insurance is required to ride an EAPC-compliant electric mountain bike in the UK. The minimum legal age is 14. All eMTBs at Peak Pedal are EAPC-compliant — 250W continuous motor power, pedal assistance only, and assistance cutting out at 15.5mph."
      }
    },
    {
      "@type": "Question",
      "name": "What age can you ride an electric mountain bike in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum age to ride an EAPC-compliant electric mountain bike on public roads and trails in the UK is 14 years old. There is no upper age limit. For riders under 14, electric mountain bikes may only be used on private land with the landowner's permission."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I spend on my first electric mountain bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a first eMTB with reliable motor support and serviceable components, £2,500–£3,500 is a practical starting range. This buys a hardtail or entry full suspension with a Bosch, Shimano or Yamaha motor. Below £2,000, motor quality and long-term parts availability become less consistent."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the Cycle to Work scheme for an electric mountain bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — most EAPC-compliant electric mountain bikes qualify for the Cycle to Work scheme, which allows employees to purchase bikes through salary sacrifice at a gross saving of 25–47% depending on tax band. Peak Pedal can support Cycle to Work orders — see our guide for details or contact us via WhatsApp."
      }
    },
    {
      "@type": "Question",
      "name": "Who sells electric mountain bikes in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Electric mountain bikes are sold by specialist retailers like Peak Pedal, brand-direct websites, and some large cycling chains. Specialist retailers offer expertise across multiple brands and can advise on fitting, spec and aftersales — Peak Pedal stocks 14+ brands with UK-wide delivery and WhatsApp support."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best motor for an electric mountain bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The right motor depends on your priorities. Bosch Performance CX (85Nm) is the most widely supported and suited to demanding terrain. Shimano EP801 is quieter and lighter for a more natural feel. DJI Avinox M1 offers the highest peak torque (105Nm) with smart features. Lightweight SL riders prefer TQ HPR50 or Bosch SX."
      }
    },
    {
      "@type": "Question",
      "name": "How far can I ride on an electric mountain bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Range depends on motor mode, terrain, rider weight and battery size. On a typical 750Wh battery with Bosch Performance CX in Trail mode, expect 50–90km of trail riding. Lightweight SL systems with smaller batteries (250–400Wh) typically offer 30–60km. Range estimates from manufacturers assume flat ground — factor in 20–30% reduction for hilly terrain."
      }
    },
    {
      "@type": "Question",
      "name": "How long does an eMTB battery last before it needs replacing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Modern eMTB batteries (Bosch, Shimano, Yamaha) typically retain over 60% capacity after 500–1,000 full charge cycles — equivalent to several years of regular riding. Battery replacement is available through authorised service centres. Avoid fully discharging the battery and store it at 30–60% charge to maximise lifespan."
      }
    },
    {
      "@type": "Question",
      "name": "How heavy are electric mountain bikes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full-power eMTBs typically weigh 22–27kg depending on frame material, motor and battery. Lightweight SL models (Trek Fuel EXe, Orbea Rise LT, Specialized Turbo Levo SL) weigh 17–21kg. Carbon framed models are generally 1–2kg lighter than equivalent alloy builds. Weight is listed in each product spec at Peak Pedal."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between hardtail and full suspension eMTBs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A hardtail eMTB has front suspension only — lower weight, lower maintenance cost and better climbing efficiency. A full suspension eMTB adds rear suspension, improving comfort, control and traction on rough or technical terrain. For beginners or cross-country riders, hardtail. For trail, enduro and technical riding, full suspension."
      }
    },
    {
      "@type": "Question",
      "name": "Should I buy a full suspension or hardtail electric mountain bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Buy full suspension if you ride technical or rocky terrain, prioritise control on descents, or tackle enduro trails. Buy a hardtail if you predominantly ride smoother cross-country trails, want lower running costs, or are newer to mountain biking. Both types are excellent for general trail use at Peak Pedal's price points."
      }
    }
  ]
}
```

---

## CATEGORY PAGE FAQs

### /full-suspension-electric-mountain-bikes/ (3 questions)

**Q19: What is a full suspension electric mountain bike?**
A: A full suspension electric mountain bike (eMTB) has both front and rear suspension — typically 120–180mm of travel — combined with a mid-drive motor system. Full suspension improves traction, control and rider comfort on rough and technical terrain compared to hardtail eMTBs.

*[44 words — PASS]*

**Q20: How much travel do I need on a full suspension eMTB?**
A: 120–140mm suits trail and all-mountain riding on typical UK singletrack. 150–160mm handles technical enduro terrain and steeper descents. 170–180mm is reserved for dedicated enduro racing. Most riders on UK trails are well served by 140mm of travel front and rear.

*[43 words — PASS]*

**Q21: Is full suspension worth the extra cost over hardtail?**
A: For most UK trail riding, yes. Full suspension significantly improves rear wheel traction on loose or rocky ground, reduces rider fatigue on longer rides and provides better control on descents. The cost premium over hardtail is typically £500–£1,500 depending on brand and spec.

*[44 words — PASS]*

---

### /hardtail-electric-mountain-bikes/ (3 questions)

**Q22: Is a hardtail eMTB good for beginners?**
A: Yes — hardtail eMTBs are an excellent first electric mountain bike. Lower weight, simpler maintenance and a lower purchase price make them accessible. The rigid rear also provides direct feedback, which helps newer riders develop technique. Many experienced riders choose hardtails for smoother cross-country trails too.

*[47 words — PASS]*

**Q23: Are hardtail electric mountain bikes cheaper than full suspension?**
A: Generally, yes. At equivalent spec levels, hardtail eMTBs typically cost £500–£1,500 less than full suspension models from the same brand. This is because hardtail frames are simpler to manufacture and have fewer components. The entry price for hardtail eMTBs at Peak Pedal starts from around £2,100.

*[48 words — PASS]*

**Q24: Can I ride a hardtail eMTB on technical trails?**
A: Yes, though with more physical effort than full suspension. Hardtail eMTBs lack rear shock absorption, so rough or rocky terrain requires more active rider input. They perform well on smoother singletrack, cross-country routes and gravel trails. Many UK trail centres suit hardtail eMTBs well.

*[45 words — PASS]*

---

### /lightweight-electric-mountain-bikes/ (3 questions)

**Q25: What is a lightweight SL electric mountain bike?**
A: An SL (Super Light) electric mountain bike uses a smaller, lighter motor — typically 1.8–2.1kg and 50–60Nm torque — compared to a full-power system at 2.9–3.5kg and 85Nm. The result is a lighter, more natural-feeling ride. Common SL motors include Bosch Performance SX, TQ HPR50, and Fazua Ride 60.

*[52 words — PASS]*

**Q26: Is a lightweight eMTB better than a full-power eMTB?**
A: Neither is universally better — they suit different riders. Lightweight SL eMTBs feel closer to an unassisted mountain bike, are accepted on more trail networks and are easier to transport. Full-power eMTBs provide significantly more climbing assistance. For fit riders on technical climbs, SL. For max assist, full-power.

*[49 words — PASS]*

**Q27: What is the lightest electric mountain bike you sell?**
A: The lightest eMTBs in our range are SL (Super Light) models from Trek, Orbea and Specialized — typically 17–19kg. The Trek Fuel EXe and Orbea Rise LT are among our lightest options. Exact weights vary by frame size and are listed in each product specification.

*[46 words — PASS]*

---

### /enduro-electric-mountain-bikes/ (3 questions)

**Q28: What is an enduro electric mountain bike?**
A: An enduro eMTB is a long-travel full suspension electric mountain bike designed for technical descents and steep terrain. Enduro eMTBs typically have 150–175mm of suspension travel, slack geometry and robust componentry — they are ridden up climbs under motor assist, then raced or ridden hard on the descents.

*[49 words — PASS]*

**Q29: What travel do enduro eMTBs have?**
A: Enduro electric mountain bikes typically have 150–170mm of front and rear suspension travel. This range provides enough compliance for aggressive descending while retaining climbing efficiency. Models at 175mm+ cross into e-downhill territory. Our enduro eMTB range starts at 150mm travel with Bosch Performance CX and Shimano EP801 motor options.

*[51 words — PASS]*

**Q30: Can I use an enduro eMTB for everyday trail riding?**
A: Yes — enduro eMTBs are versatile. The long travel and slack geometry that excels on technical terrain still performs on standard singletrack. The main trade-off is additional weight (typically 25–28kg) and higher purchase cost versus a trail-focused eMTB. If you ride technical terrain occasionally, an enduro eMTB is a sound choice.

*[52 words — PASS]*

---

### /womens-electric-mountain-bikes/ (2 questions)

**Q31: Are women's electric mountain bikes different from standard bikes?**
A: Women's specific eMTBs may offer adjusted geometry for a broader range of rider heights, and are sometimes available in smaller frame sizes. Motor, battery and performance specifications are identical to equivalent standard models. Not all brands offer women's-specific versions — many women ride standard geometry eMTBs with no issues.

*[50 words — PASS]*

**Q32: What size electric mountain bike do I need as a woman?**
A: eMTB sizing is based on height, not gender. Most brands use S/M/L/XL sizing: S suits riders approximately 155–165cm, M suits 165–175cm, L suits 175–185cm. We recommend using each brand's geometry chart as a starting point. Contact us via WhatsApp for personalised sizing advice.

*[45 words — PASS]*

---

### /kids-electric-mountain-bike/ (3 questions)

**Q33: What age can a child ride an electric mountain bike in the UK?**
A: Under UK law, the minimum age to ride an EAPC-compliant electric mountain bike on public roads and trails is 14. Children under 14 can ride eMTBs on private land only. For younger riders, non-electric mountain bikes are the recommended option for trail riding.

*[44 words — PASS]*

**Q34: Are kids electric mountain bikes safe?**
A: Yes — kids and youth eMTBs from brands like Cube and Trek are designed with age-appropriate geometry, lower stand-over heights and reduced motor output settings. EAPC compliance ensures the motor cuts out at 15.5mph. As with any mountain bike, appropriate protective gear is strongly recommended.

*[46 words — PASS]*

**Q35: What size electric mountain bike does my child need?**
A: Youth eMTB sizing is primarily based on rider height and inside leg. Junior eMTBs typically use 24 or 27.5 inch wheel sizes. Most manufacturers publish youth sizing guides — contact us via WhatsApp with your child's height and we will recommend the right size.

*[45 words — PASS]*

---

## BRAND PAGE FAQs (Template — adapt per brand)

Each brand page should carry 2–3 FAQs specific to that brand. Template questions:

**Q: Are [Brand] electric mountain bikes available in the UK?**
A: Yes — [Brand] electric mountain bikes are available at Peak Pedal with UK-wide delivery. We stock the [core range] including [model examples]. Contact us via WhatsApp for availability and pricing on specific models or configurations.

**Q: What motors do [Brand] eMTBs use?**
A: [Brand-specific motor answer referencing actual motors stocked — e.g. Cube: Bosch Performance CX and Active Line Plus; Orbea: Bosch Performance CX and Shimano EP801; Specialized: S3 Full Power and SL 1.1]

**Q: How long is the warranty on [Brand] electric mountain bikes?**
A: [Brand] electric mountain bikes carry a standard [X]-year frame warranty and [Y]-year motor warranty. Battery warranty is [Z] years. Full warranty terms are confirmed at purchase — contact us for details on specific models.

---

## BLOG FAQ TEMPLATES

### /blog/electric-mountain-bikes-legal-uk/

**Q36: Do you need a driving licence for an electric mountain bike in the UK?**
A: No driving licence is required for an EAPC-compliant electric mountain bike in the UK. eMTBs that meet EAPC criteria — 250W maximum continuous motor power and assistance cutting out at 15.5mph — are classified as bicycles. Riders must be aged 14 or over.

*[44 words — PASS]*

**Q37: Are electric mountain bikes allowed on bridleways?**
A: Yes — EAPC-compliant eMTBs are permitted on bridleways in England and Wales, as they are classified as bicycles under the Countryside and Rights of Way Act 2000. However, bridleways are not permitted for cycling in Scotland; check local access land rules when riding north of the border.

*[48 words — PASS]*

**Q38: Can you ride an eMTB on the road in the UK?**
A: Yes — EAPC-compliant eMTBs can be ridden on public roads in the UK. They are classified as bicycles, so all normal cycling road rules apply. No insurance, tax or MOT is required. Lights are required for road riding between sunset and sunrise.

*[43 words — PASS]*

---

### /blog/electric-mountain-bike-cost-uk/

**Q39: What is the cheapest electric mountain bike worth buying?**
A: The lowest price at which long-term reliability and motor support become consistent is around £2,000–£2,500. Below that, motors may be less serviceable and componentry less durable. At Peak Pedal, entry-level eMTBs with established motor systems start from approximately £2,100.

*[43 words — PASS]*

**Q40: Why are electric mountain bikes so expensive?**
A: eMTBs cost more than standard mountain bikes due to the motor, battery, wiring harness and associated electronics — adding £500–£1,500 to an equivalent non-electric build. Battery cost (typically £400–£900 alone) is the primary driver. Premium motor systems, carbon frames and high-end components push prices above £5,000.

*[49 words — PASS]*

---

### /blog/emtb-vs-regular-mountain-bike/

**Q41: Is an electric mountain bike worth buying?**
A: For riders who want to cover more ground, tackle bigger climbs, return to cycling after a break, or simply ride further — yes. eMTBs open terrain and riding distances that are impractical on an unassisted bike. The extra cost and weight are the primary trade-offs.

*[46 words — PASS]*

**Q42: Are electric mountain bikes cheating?**
A: Only in the context of structured racing formats where they are excluded. On trails for personal riding, the pedal-assist motor simply allows riders to cover more terrain, climb more efficiently or ride for longer — the same as using a lower gear. Most trail centres and riders do not consider eMTBs cheating.

*[52 words — PASS]*

---

### /blog/emtb-battery-range-guide/

**Q43: How long does an eMTB battery take to charge?**
A: Most eMTB batteries charge from flat in 3–5 hours with the standard charger. Fast chargers (available for Bosch and Shimano systems) reduce this to around 2 hours. Peak Pedal recommends avoiding regular fast charging to maximise battery lifespan — standard charging overnight is the most battery-friendly approach.

*[47 words — PASS]*

**Q44: Can you replace the battery on an electric mountain bike?**
A: Yes — all eMTBs at Peak Pedal use removable batteries from Bosch, Shimano, Yamaha or DJI Avinox. Replacement batteries are available from authorised dealers. Battery lifespan is typically 500–1,000 full cycles before significant capacity reduction. Contact us for pricing on replacement batteries for specific models.

*[46 words — PASS]*

---

### /blog/cycle-to-work-scheme-emtb/

**Q45: Can you use the Cycle to Work scheme for an electric mountain bike?**
A: Yes — EAPC-compliant electric mountain bikes qualify for the Cycle to Work scheme. You purchase the bike through your employer via salary sacrifice, saving 25–47% depending on your income tax band. The scheme applies to bikes up to £5,000 with most providers, though limits vary.

*[46 words — PASS]*

**Q46: What is the Cycle to Work limit for electric bikes?**
A: The standard Cycle to Work limit was raised to £5,000 in 2019. Some employers may set a lower internal limit. Salary sacrifice saves 25% for basic-rate taxpayers and up to 47% for higher-rate taxpayers in Scotland. Check with your HR team for your employer's specific scheme ceiling.

*[48 words — PASS]*

---

### /blog/hardtail-vs-full-suspension-mountain-bike/

**Q47: Is full suspension worth the extra money for trail riding?**
A: For UK trail riding with technical sections, roots and rocks — yes, full suspension is typically worth the additional cost. It provides better rear wheel traction, improved comfort and more control on descents. For smoother XC trails or budget-conscious riders, a quality hardtail is a better use of the budget.

*[50 words — PASS]*

**Q48: Do hardtail eMTBs climb better than full suspension?**
A: Often yes — hardtail eMTBs transfer pedal power more efficiently on smoother climbs because the rigid rear doesn't absorb energy through suspension movement. On technical rocky climbs, full suspension can be faster as the rear wheel maintains better grip. For most UK trail climbing, the difference is marginal with eMTB power.

*[52 words — PASS]*

---

## FAQ ASSIGNMENT SUMMARY

| Page | Questions Assigned | Schema |
|------|--------------------|--------|
| / (Homepage) | Q1–Q6 | FAQPage JSON-LD |
| /faq/ | Q7–Q18 | FAQPage JSON-LD |
| /full-suspension-electric-mountain-bikes/ | Q19–Q21 | FAQPage JSON-LD |
| /hardtail-electric-mountain-bikes/ | Q22–Q24 | FAQPage JSON-LD |
| /lightweight-electric-mountain-bikes/ | Q25–Q27 | FAQPage JSON-LD |
| /enduro-electric-mountain-bikes/ | Q28–Q30 | FAQPage JSON-LD |
| /womens-electric-mountain-bikes/ | Q31–Q32 | FAQPage JSON-LD |
| /kids-electric-mountain-bike/ | Q33–Q35 | FAQPage JSON-LD |
| All brand pages | Template per brand | FAQPage JSON-LD |
| /blog/electric-mountain-bikes-legal-uk/ | Q36–Q38 | FAQPage JSON-LD |
| /blog/electric-mountain-bike-cost-uk/ | Q39–Q40 | FAQPage JSON-LD |
| /blog/emtb-vs-regular-mountain-bike/ | Q41–Q42 | FAQPage JSON-LD |
| /blog/emtb-battery-range-guide/ | Q43–Q44 | FAQPage JSON-LD |
| /blog/cycle-to-work-scheme-emtb/ | Q45–Q46 | FAQPage JSON-LD |
| /blog/hardtail-vs-full-suspension-mountain-bike/ | Q47–Q48 | FAQPage JSON-LD |

## SPEAKABLE SCHEMA TARGETS

| Page | Target Element | Answer |
|------|----------------|--------|
| / | `.brand-statement` | eMTB legality answer (Q2) |
| /faq/ | `.faq-answer-speakable` | "Who sells electric bikes" answer (Q12) |
| /blog/electric-mountain-bike-motor-comparison/ | `.faq-answer-speakable` | DJI Avinox answer |
| /blog/electric-mountain-bikes-legal-uk/ | `.faq-answer-speakable` | Q36 — licence answer |
