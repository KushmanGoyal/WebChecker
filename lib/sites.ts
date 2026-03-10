export interface Site {
    name: string;
    url: string;
}

export const sites: Site[] = [
    { name: "eHealth Research Centre (EHRC)", url: "https://www.iiitb.ac.in/ehealth-research-centre-ehrc" },
    { name: "Machine Intelligence & Robotics (MINRO)", url: "https://www.iiitb.ac.in/machine-intelligence-robotics-coe-minro" },
    { name: "Centre for IT & Public Policy (CITAPP)", url: "https://www.iiitb.ac.in/centre-for-it-public-policy-citapp" },
    { name: "Cognitive Science Lab", url: "https://cognitive.iiitb.ac.in/" },
    { name: "CAGS", url: "https://cags.iiitb.ac.in/" },
    { name: "COMET Lab", url: "https://comet.iiitb.ac.in/" },
    { name: "Innovation Centre", url: "https://ic.iiitb.ac.in/" },
    { name: "MOSIP", url: "https://www.mosip.io/" },
    { name: "COSS", url: "https://coss.org.in/" },
    { name: "CDPI", url: "https://cdpi.dev/" },
    { name: "SARL Lab", url: "https://www.iiitb.ac.in/sarl/sarl.html" },
    { name: "SCADS Lab", url: "https://www.iiitb.ac.in/labs/scads-lab/scads-lab" },
    { name: "GVCL Lab", url: "https://www.iiitb.ac.in/gvcl/" },
    { name: "Web Science Lab", url: "https://wsl.iiitb.ac.in/" },
    { name: "MPL Lab", url: "http://mpl.iiitb.ac.in/" },
    { name: "SEAL Lab", url: "https://sealiiitb.github.io/" },
    { name: "HIDES Lab", url: "https://www.iiitb.ac.in/hides/hides.html" },
    { name: "Networking & Communication Lab", url: "https://www.iiitb.ac.in/ncl/" },
    { name: "SC Lab", url: "https://sclab.iiitb.ac.in/" },
    { name: "Indian Knowledge System (IKS) Lab", url: "https://www.iiitb.ac.in/indian-knowledge-system-iks-lab" },
    { name: "Smart City Lab", url: "https://www.iiitb.ac.in/smart-city-lab" },
    { name: "Ascend Studio", url: "https://www.iiitb.ac.in/labs/ascend-studio/ascend-studio" },
    { name: "Radar Sensing Lab", url: "https://www.iiitb.ac.in/labs/radar-sensing-lab/radar-sensing-lab" },
    { name: "CSSMP", url: "https://www.iiitb.ac.in/cssmp/" },
    { name: "Advanced Wireless Communications Lab", url: "https://www.iiitb.ac.in/labs/advanced-wireless-communications-lab/about-us-2" },
    { name: "Speech Lab", url: "https://www.iiitb.ac.in/labs/speech-lab/speech-lab" },
    { name: "CDWL Lab", url: "https://sites.google.com/view/cdwl/home" },
    { name: "Samvaad", url: "https://www.iiitb.ac.in/samvaad" },
    { name: "RISE", url: "https://rise.iiitb.ac.in/" },
    { name: "Avalokana Data Lake", url: "https://avalokana.karnataka.gov.in/DataLake/DataLake" },
    { name: "Summer Internship", url: "https://www.iiitb.ac.in/summer-internship" },

    // Main & Department Sites
    { name: "IIIT Bangalore (Main)", url: "https://www.iiitb.ac.in/" },
    { name: "CSE Department", url: "https://cse.iiitb.ac.in/" },
    { name: "DHSS Department", url: "https://dhss.iiitb.ac.in/" },
    { name: "DSAI Department", url: "https://dsai.iiitb.ac.in/" },
    { name: "ECE Department", url: "https://ece.iiitb.ac.in/" },
    { name: "Centre for Applied Sciences", url: "https://www.iiitb.ac.in/centre-for-applied-sciences" },

    // Academic Programmes
    { name: "B.Tech Programme", url: "https://www.iiitb.ac.in/btech" },
    { name: "Integrated M.Tech Programme", url: "https://www.iiitb.ac.in/integrated-mtech" },
    { name: "M.Tech Programme", url: "https://www.iiitb.ac.in/mtech" },
    { name: "M.Sc. by Research", url: "https://www.iiitb.ac.in/academics/research-programmes/master-of-science-by-research" },
    { name: "Ph.D. Programme", url: "https://www.iiitb.ac.in/academics/research-programmes/phd" },
    { name: "PG Diploma in Digital Product Design", url: "https://www.iiitb.ac.in/academics/masters-programmes/pg-diploma-in-digital-product-design-and-management" },
    { name: "M.Sc. Digital Society", url: "https://www.iiitb.ac.in/academics/masters-programmes/msc-digital-society" },
    { name: "Fellowships", url: "https://www.iiitb.ac.in/fellowships" },

    // Course Pages
    { name: "B.Tech / Integrated M.Tech Courses", url: "https://www.iiitb.ac.in/courses/btech-integrated-mtech" },
    { name: "M.Tech CSE / ECE Courses", url: "https://www.iiitb.ac.in/master-of-technology-cse-ece" },
    { name: "M.Sc. / Ph.D. Courses", url: "https://www.iiitb.ac.in/courses/master-of-science-by-researchdoctor-of-philosophy" },
    { name: "PG Diploma Courses", url: "https://www.iiitb.ac.in/courses/post-graduate-diploma-2" },

    // Areas
    { name: "Computer Science Area", url: "https://www.iiitb.ac.in/computer-science" },
    { name: "Data Sciences Area", url: "https://www.iiitb.ac.in/data-sciences" },
    { name: "Software Engineering Area", url: "https://www.iiitb.ac.in/software-engineering" },
    { name: "Mathematics & Basic Sciences Area", url: "https://www.iiitb.ac.in/mathematics-and-basic-sciences" },
    { name: "Networking, Communication & Signal Processing Area", url: "https://www.iiitb.ac.in/networking-communication-and-signal-processing" },
    { name: "VLSI Systems Area", url: "https://www.iiitb.ac.in/vlsi-systems" },
    { name: "Digital Society Area", url: "https://www.iiitb.ac.in/digital-society" },

    // Other Institutional Pages
    { name: "Exchange Program", url: "https://www.iiitb.ac.in/exchange-program" },
    { name: "Verification Process", url: "https://www.iiitb.ac.in/verification-process" },
    { name: "Curriculum", url: "https://www.iiitb.ac.in/curriculum" },
    { name: "Programme Outcomes", url: "https://www.iiitb.ac.in/programme-outcomes" },
    { name: "Academic Calendar", url: "https://www.iiitb.ac.in/academic-calendar-3" },
    { name: "Online Education", url: "https://www.iiitb.ac.in/online-education" },
    { name: "Long Term Programmes (CPE)", url: "https://www.iiitb.ac.in/academics/continuing-professional-education/long-term-programmes-1114-months-2" },
    { name: "Short Term Programme (CPE)", url: "https://www.iiitb.ac.in/academics/continuing-professional-education/short-term-programme-5-8-months" },

    // Misc other websites
    { name: "Feynman", url: "https://feynman-tasks.vercel.app" },
    { name: "Lisha", url: "https://lisha-drab.vercel.app" },

];
