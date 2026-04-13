import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Education", icon: "GraduationCap" },
    { name: "Health", icon: "HeartPulse" },
    { name: "Agriculture", icon: "Sprout" },
    { name: "Women & Child", icon: "Users" },
    { name: "Employment", icon: "Briefcase" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: { icon: category.icon },
      create: category,
    });
  }

  const educationCategory = await prisma.category.findUnique({ where: { name: "Education" } });
  const healthCategory = await prisma.category.findUnique({ where: { name: "Health" } });
  const agricultureCategory = await prisma.category.findUnique({ where: { name: "Agriculture" } });
  const womenChildCategory = await prisma.category.findUnique({ where: { name: "Women & Child" } });
  const employmentCategory = await prisma.category.findUnique({ where: { name: "Employment" } });

  if (!educationCategory || !healthCategory || !agricultureCategory || !womenChildCategory || !employmentCategory) {
    throw new Error("Missing base categories after seeding");
  }

  // Clear existing schemes for a fresh seed
  await prisma.scheme.deleteMany({});

  await prisma.scheme.createMany({
    data: [
      // 🎓 EDUCATION
      {
        title: "National Scholarship Scheme",
        shortDescription: "Financial support for students from low-income families.",
        fullDescription:
          "This scheme helps eligible students continue higher education by providing yearly scholarship support directly to their bank account.",
        eligibility:
          "Students from recognized institutions with annual family income below the prescribed limit.",
        benefits:
          "Tuition support, maintenance allowance, and renewal options for good academic performance.",
        documents:
          "Aadhaar card, income certificate, previous marksheet, bonafide certificate, bank passbook.",
        applicationProcess:
          "Register on the national scholarship portal, fill the form, upload documents, and track status online.",
        categoryId: educationCategory.id,
      },
      {
        title: "Pragati Scholarship",
        shortDescription: "Empowering girls through technical education.",
        fullDescription:
          "Aimed at providing assistance for advancement of girls pursuing technical education. Education is one of the most important means of empowering women with the knowledge, skill and self-confidence.",
        eligibility:
          "Girl students admitted to first year of Degree level course OR Second year of Degree level course through lateral entry in any of the AICTE approved Institution.",
        benefits:
          "Rs 50,000 per annum for every year of study for payment of college fee, purchase of computer, stationeries, books, equipments, software, etc.",
        documents:
          "Aadhaar card, income certificate, admission letter, bank mandate, 10th/12th marksheet.",
        applicationProcess:
          "Apply through the National Scholarship Portal (NSP) during the application window.",
        categoryId: educationCategory.id,
      },

      // 🏥 HEALTH
      {
        title: "Ayushman Bharat PM-JAY",
        shortDescription: "Cashless health coverage for eligible families up to Rs 5 lakh.",
        fullDescription:
          "PM-JAY offers secondary and tertiary hospitalization coverage for eligible households through empaneled network of hospitals across the country.",
        eligibility:
          "Families listed under SECC database criteria and other government-defined eligible groups (e.g. destitute, manual scavengers, etc).",
        benefits:
          "Cashless hospitalisation cover up to Rs. 5 lakh per family per year for secondary and major tertiary treatments.",
        documents:
          "Aadhaar card, ration card, active mobile number, or PM-JAY beneficiary letter.",
        applicationProcess:
          "Check eligibility at the official PM-JAY portal using mobile number, visit nearest Common Service Centre (CSC) or empaneled hospital help desk to verify and print the e-card.",
        categoryId: healthCategory.id,
      },
      {
        title: "National Health Mission (NHM)",
        shortDescription: "Accessible, affordable and quality health care to rural populations.",
        fullDescription:
          "Provides technical and financial support to States/UTs to strengthen their healthcare systems including infrastructure, human resources, and service delivery.",
        eligibility:
          "All citizens, with a special focus on vulnerable and marginalized groups in rural areas.",
        benefits:
          "Free diagnostic services, maternal and child healthcare, essential drugs, and mobile medical units.",
        documents:
          "Varies by specific sub-scheme, typically state residence proof and Aadhaar.",
        applicationProcess:
          "Visit the nearest Primary Health Centre (PHC) or Community Health Centre (CHC).",
        categoryId: healthCategory.id,
      },

      // 🌾 AGRICULTURE
      {
        title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        shortDescription: "Direct income support of Rs 6,000/year for farmers.",
        fullDescription:
          "Under PM-KISAN, eligible landholding farmer families receive targeted income support to supplement their financial needs for procuring various crop inputs.",
        eligibility:
          "Small and marginal farmer families with cultivable land records in their name and valid verified KYC.",
        benefits:
          "Rs. 6,000 per year transferred directly to Aadhaar-seeded bank accounts in three equal installments of Rs. 2,000.",
        documents:
          "Update Land ownership records, Aadhaar card, bank account details, and registered mobile number.",
        applicationProcess:
          "Apply via PM-KISAN portal (Farmer Corner) or local agriculture/revenue office, complete eKYC online or at CSC.",
        categoryId: agricultureCategory.id,
      },
      {
        title: "PM Fasal Bima Yojana (PMFBY)",
        shortDescription: "Crop insurance scheme against natural calamities.",
        fullDescription:
          "Provides comprehensive insurance cover against failure of the crop thus helping in stabilizing the income of the farmers and encouraging them to adopt innovative practices.",
        eligibility:
          "All farmers growing notified crops in a notified area who have insurable interest in the crop.",
        benefits:
          "Financial support in the event of crop failure as a result of natural calamities, pests & diseases. Low premium rates (1.5% to 2%).",
        documents:
          "Land cultivation proof, Aadhaar card, sowing certificate, bank account details.",
        applicationProcess:
          "Enroll via bank/PACS/CSC, or directly on the National Crop Insurance Portal.",
        categoryId: agricultureCategory.id,
      },

      // 👩‍👧 WOMEN & CHILD
      {
        title: "Beti Bachao Beti Padhao",
        shortDescription: "Promoting girls' education and fighting gender bias.",
        fullDescription:
          "A national initiative jointly run by the Ministry of Women and Child Development, Health and Family Welfare, and Education to address the declining Child Sex Ratio (CSR) and ensure empowerment of women over a life-cycle continuum.",
        eligibility:
          "The scheme operates at a systemic capacity level. Benefits such as Sukanya Samriddhi accounts linked to this require the girl child to be below 10 years.",
        benefits:
          "Awareness generation, community engagement, high-interest savings options for the girl child's future education and marriage.",
        documents:
          "Child's birth certificate, guardian's ID proof (for linked financial components).",
        applicationProcess:
          "Awareness campaigns are public. Linked savings accounts can be opened at any post office or authorized bank branch.",
        categoryId: womenChildCategory.id,
      },
      {
        title: "Pradhan Mantri Matru Vandana Yojana",
        shortDescription: "Maternity benefit programme for pregnant women.",
        fullDescription:
          "A maternity benefit programme run by the government providing partial compensation for the wage loss in terms of cash incentives so that the woman can take adequate rest before and after delivery of the first living child.",
        eligibility:
          "Pregnant Women and Lactating Mothers (PW&LM) who have their pregnancy registered for the first child in the family.",
        benefits:
          "Cash incentive of Rs 5,000 in three installments directly credited to the bank account.",
        documents:
          "Aadhaar card, MCP Card (Mother and Child Protection Card), bank account details.",
        applicationProcess:
          "Register at the nearest Anganwadi Centre (AWC) or approved health facility within prescribed months of pregnancy.",
        categoryId: womenChildCategory.id,
      },

      // 💼 EMPLOYMENT
      {
        title: "Mahatma Gandhi NREGA",
        shortDescription: "100 days of guaranteed wage employment in rural areas.",
        fullDescription:
          "Aims to enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.",
        eligibility:
          "Must be a citizen of India residing in a rural area, 18 years of age or above, and willing to do unskilled manual work.",
        benefits:
          "Guaranteed 100 days of wage employment per year per household. Equal wages for men and women.",
        documents:
          "Voter ID/Aadhaar, Job Card, Bank or Post Office account.",
        applicationProcess:
          "Register at the local Gram Panchayat to obtain a Job Card. Submit a written application for work to the Panchayat.",
        categoryId: employmentCategory.id,
      },
      {
        title: "PM MUDRA Yojana",
        shortDescription: "Loans up to Rs. 10 Lakhs for non-corporate, non-farm businesses.",
        fullDescription:
          "Pradhan Mantri Micro Units Development & Refinance Agency (MUDRA) Yojana provides loans to micro-enterprises. These loans are classified as MUDRA loans under Shishu, Kishore and Tarun to signify the stage of growth.",
        eligibility:
          "Any Indian citizen who has a business plan for a non-farm sector income generating activity such as manufacturing, processing, trading or service sector.",
        benefits:
          "Collateral-free loans. 'Shishu' up to Rs 50K, 'Kishore' Rs 50K to 5 Lakhs, 'Tarun' Rs 5 Lakhs to 10 Lakhs.",
        documents:
          "Identity proof, address proof, business plan, recent photographs, supplier quotations.",
        applicationProcess:
          "Approach a commercial bank, RRB, Small Finance Bank, cooperative bank, or apply online through the Udyamimitra portal.",
        categoryId: employmentCategory.id,
      },
      {
        title: "e-Shram",
        shortDescription: "National database and ID card for unorganized workers.",
        fullDescription:
          "A centralized database of unorganized workers seeded with Aadhaar. It aims to improve the implementation efficiency of the social security services for the unorganized workers.",
        eligibility:
          "Any unorganized worker aged between 16-59 years not a member of EPFO/ESIC or NPS.",
        benefits:
          "Accidental insurance cover of Rs 2 Lakhs under PMSBY. Dedicated UAN (Universal Account Number) e-Shram card.",
        documents:
          "Aadhaar Number, Aadhaar-linked mobile number, Bank account details.",
        applicationProcess:
          "Self-registration on the e-Shram portal or via nearest Common Service Centre (CSC).",
        categoryId: employmentCategory.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
