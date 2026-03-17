import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "features": "Features",
        "domains": "Products",
        "about": "About",
        "signIn": "Sign In",
        "signUp": "Sign Up"
      },
      "auth": {
        "signInTitle": "Welcome Back",
        "signInSub": "Pick up where you left off with your AI companion.",
        "signUpTitle": "Join CompanionAI",
        "signUpSub": "Start your journey towards intelligent decision-making today.",
        "email": "Email Address",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "rememberMe": "Remember Me",
        "forgot": "Forgot Password?",
        "noAccount": "Don't have an account?",
        "hasAccount": "Already have an account?",
        "btnSignIn": "Sign In",
        "btnSignUp": "Create Account",
        "name": "Full Name"
      },
      "landing": {
        "heroTitle1": "AI-Powered ",
        "heroTitle2": "Decision Intelligence",
        "heroSub": "Empowering small businesses, founders, and farmers with actionable guidance and automated assistance across multiple domains.",
        "launchBtn": "Launch Platform",
        "feature1Title": "Startup Growth",
        "feature1Desc": "Idea validation, MVP planning, and funding guidance for modern founders.",
        "feature2Title": "Business Strategy",
        "feature2Desc": "Cost optimization and marketing insights for small business operations.",
        "feature3Title": "Smart Farming",
        "feature3Desc": "Crop selection and weather-impact analysis for sustainable agriculture.",
        "contactTitle": "Get in Touch",
        "contactDesc": "Have questions? We're here to help you get the most out of CompanionAI.",
        "contactBtn": "Contact Support"
      },
      "aboutPage": {
        "title": "Meet the Minds",
        "subtitle": "The dedicated team behind CompanionAI, working to bring intelligence to every corner of industry.",
        "team": [
          {
            "name": "Vedant Agarkar",
            "role": "Creator & Full Stack AI Developer",
            "bio": "Built CompanionAI from the ground up — designing the AI engine, full-stack platform, and premium user experience."
          }
        ]
      },
      "featuresPage": {
        "title": "Platform Features",
        "subtitle": "Discover how CompanionAI empowers your decision-making process with cutting-edge AI technology.",
        "f1Title": "Domain-Specific AI",
        "f1Desc": "Tailored intelligence for startups, small businesses, and agriculture, trained on specialized datasets.",
        "f2Title": "Multilingual Magic",
        "f2Desc": "Communicate fluently in English, Hindi, and Marathi with full localized support.",
        "f3Title": "Secure Analysis",
        "f3Desc": "Upload documents safely for AI-powered insights and summaries without compromising privacy.",
        "f4Title": "Real-time Guidance",
        "f4Desc": "Get instant answers and actionable steps to complex problems anytime, anywhere.",
        "f5Title": "Cross-Device Sync",
        "f5Desc": "Access your data and chat history seamlessly across phones, tablets, and desktops.",
        "f6Title": "Premium UI",
        "f6Desc": "A sleek, dark-mode first interface designed for focus and productivity."
      },
      "domains": {
        "explore": "Explore ",
        "aiDomains": "AI Domains",
        "businessTitle": "Business Advisor",
        "businessDesc": "Get comprehensive business strategy and decision support based on your operations.",
        "businessReq": "Requirements: Financial Statements, Marketing Plan, Operational Data, Compliance Needs.",
        "startupTitle": "Startup Mentor",
        "startupDesc": "Assess your startup's market fit and MVP planning using advanced AI analysis.",
        "startupReq": "Requirements: Idea Validation, Competitor Analysis, Pitch Deck, Growth Metrics.",
        "farmingTitle": "Farming Expert",
        "farmingDesc": "Evaluate your crop health and farming strategy with our comprehensive guidance.",
        "farmingReq": "Requirements: Soil Type, Weather Data, Crop History, Irrigation Status.",
        "generalTitle": "General Assistant",
        "generalDesc": "Get help with daily tasks, research, and general information across various topics.",
        "generalReq": "Requirements: None. Just start a conversation with the AI.",
        "launch": "Launch"
      },
      "chat": {
        "products": "Products",
        "backToProducts": "Back to Products",
        "generalAI": "General AI",
        "businessAI": "Business AI",
        "startupAI": "Startup AI",
        "farmingAI": "Farming AI",
        "startConv": "Start a conversation",
        "askAbout": "Ask anything about",
        "messagePlaceholder": "Message",
        "thinking": "Thinking...",
        "enterHint": "Press Enter to send · Shift+Enter for new line",
        "error": "Sorry, I encountered an error. Please try again."
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "home": "होम",
        "features": "विशेषताएं",
        "domains": "उत्पाद",
        "about": "हमारे बारे में",
        "signIn": "साइन इन",
        "signUp": "साइन अप"
      },
      "auth": {
        "signInTitle": "वापसी पर स्वागत है",
        "signInSub": "जहां आपने अपने एआई साथी के साथ छोड़ा था, वहीं से शुरू करें।",
        "signUpTitle": "CompanionAI में शामिल हों",
        "signUpSub": "बुद्धिमान निर्णय लेने की दिशा में आज ही अपनी यात्रा शुरू करें।",
        "email": "ईमेल पता",
        "password": "पासवर्ड",
        "confirmPassword": "पासवर्ड की पुष्टि करें",
        "rememberMe": "मुझे याद रखें",
        "forgot": "पासवर्ड भूल गए?",
        "noAccount": "खाता नहीं है?",
        "hasAccount": "पहले से ही एक खाता है?",
        "btnSignIn": "साइन इन करें",
        "btnSignUp": "खाता बनाएं",
        "name": "पूरा नाम"
      },
      "landing": {
        "heroTitle1": "एआई-संचालित ",
        "heroTitle2": "निर्णय बुद्धिमत्ता",
        "heroSub": "छोटे व्यवसायों, संस्थापकों और किसानों को कई डोमेन में कार्रवाई योग्य मार्गदर्शन और स्वचालित सहायता के साथ सशक्त बनाना।",
        "launchBtn": "प्लेटफ़ॉर्म लॉन्च करें",
        "feature1Title": "स्टार्टअप विकास",
        "feature1Desc": "आधुनिक संस्थापकों के लिए विचार सत्यापन, एमवीपी योजना और फंडिंग मार्गदर्शन।",
        "feature2Title": "व्यापार रणनीति",
        "feature2Desc": "छोटे व्यवसाय संचालन के लिए लागत अनुकूलन और विपणन अंतर्दृष्टि।",
        "feature3Title": "स्मार्ट खेती",
        "feature3Desc": "टिकाऊ कृषि के लिए फसल चयन और मौसम-प्रभाव विश्लेषण।",
        "contactTitle": "संपर्क करें",
        "contactDesc": "क्या आपके पास प्रश्न हैं? हम यहाँ CompanionAI का अधिकतम लाभ उठाने में आपकी मदद करने के लिए हैं।",
        "contactBtn": "समर्थन से संपर्क करें"
      },
      "aboutPage": {
        "title": "महारथियों से मिलें",
        "subtitle": "CompanionAI के पीछे की समर्पित टीम, जो उद्योग के हर कोने में बुद्धिमत्ता लाने के लिए काम कर रही है।",
        "team": [
          {
            "name": "Vedant Agarkar",
            "role": "निर्माता और फुल स्टैक एआई डेवलपर",
            "bio": "CompanionAI को शुरू से बनाया — AI इंजन, फुल-स्टैक प्लेटफ़ॉर्म और प्रीमियम यूजर एक्सपीरियंस डिजाइन किया।"
          }
        ]
      },
      "featuresPage": {
        "title": "प्लेटफ़ॉर्म की विशेषताएं",
        "subtitle": "जानें कि CompanionAI अत्याधुनिक AI तकनीक के साथ आपकी निर्णय लेने की प्रक्रिया को कैसे सशक्त बनाता है।",
        "f1Title": "डोमेन-विशिष्ट AI",
        "f1Desc": "विशेष डेटासेट पर प्रशिक्षित स्टार्टअप, छोटे व्यवसायों और कृषि के लिए अनुकूलित बुद्धिमत्ता।",
        "f2Title": "बहुभाषी जादू",
        "f2Desc": "पूर्ण स्थानीयकृत समर्थन के साथ अंग्रेजी, हिंदी और मराठी में धाराप्रवाह संवाद करें।",
        "f3Title": "सुरक्षित विश्लेषण",
        "f3Desc": "गोपनीयता से समझौता किए बिना AI-संचालित अंतर्दृष्टि और सारांश के लिए सुरक्षित रूप से दस्तावेज़ अपलोड करें।",
        "f4Title": "वास्तविक समय मार्गदर्शन",
        "f4Desc": "कभी भी, कहीं भी जटिल समस्याओं के त्वरित उत्तर और कार्रवाई योग्य कदम प्राप्त करें।",
        "f5Title": "क्रॉस-डिवाइस सिंक",
        "f5Desc": "फोन, टैबलेट और डेस्कटॉप पर अपने डेटा और चैट इतिहास को निर्बाध रूप से एक्सेस करें।",
        "f6Title": "प्रीमियम UI",
        "f6Desc": "फोकस और उत्पादकता के लिए डिज़ाइन किया गया एक आकर्षक, डार्क-मोड इंटरफ़ेस।"
      },
      "domains": {
        "explore": "एक्सप्लोर करें ",
        "aiDomains": "एआई डोमेन",
        "businessTitle": "व्यापार सलाहकार",
        "businessDesc": "अपने संचालन के आधार पर व्यापक व्यवसाय रणनीति और निर्णय समर्थन प्राप्त करें।",
        "businessReq": "आवश्यकताएं: वित्तीय विवरण, विपणन योजना, परिचालन डेटा, अनुपालन आवश्यकताएं।",
        "startupTitle": "स्टार्टअप मेंटर",
        "startupDesc": "उन्नत एआई विश्लेषण का उपयोग करके अपने स्टार्टअप के बाजार फिट और एमवीपी योजना का आकलन करें।",
        "startupReq": "आवश्यकताएं: विचार सत्यापन, प्रतियोगी विश्लेषण, पिच डेक, विकास मेट्रिक्स।",
        "farmingTitle": "कृषि विशेषज्ञ",
        "farmingDesc": "हमारे व्यापक मार्गदर्शन के साथ अपने फसल स्वास्थ्य और कृषि रणनीति का मूल्यांकन करें।",
        "farmingReq": "आवश्यकताएं: मिट्टी का प्रकार, मौसम डेटा, फसल का इतिहास, सिंचाई की स्थिति।",
        "generalTitle": "सामान्य सहायक",
        "generalDesc": "विभिन्न विषयों पर दैनिक कार्यों, अनुसंधान और सामान्य जानकारी में सहायता प्राप्त करें।",
        "generalReq": "आवश्यकताएं: कोई नहीं। बस एआई के साथ बातचीत शुरू करें।",
        "launch": "लॉन्च करें"
      },
      "chat": {
        "products": "उत्पाद",
        "backToProducts": "उत्पादों पर वापस",
        "generalAI": "सामान्य AI",
        "businessAI": "व्यापार AI",
        "startupAI": "स्टार्टअप AI",
        "farmingAI": "कृषि AI",
        "startConv": "बातचीत शुरू करें",
        "askAbout": "इसके बारे में कुछ भी पूछें",
        "messagePlaceholder": "मैसेज",
        "thinking": "सोच रहा है...",
        "enterHint": "भेजने के लिए एंटर दबाएं · नई पंक्ति के लिए Shift+Enter",
        "error": "क्षमा करें, मुझे एक त्रुटि मिली। कृपया पुनः प्रयास करें।"
      }
    }
  },
  mr: {
    translation: {
      "nav": {
        "home": "मुख्य पृष्ठ",
        "features": "वैशिष्ट्ये",
        "domains": "उत्पादने",
        "about": "आमच्याबद्दल",
        "signIn": "साइन इन",
        "signUp": "साइन अप"
      },
      "auth": {
        "signInTitle": "पुन्हा स्वागत आहे",
        "signInSub": "तुमच्या AI सोबत्यासह जिथे थांबला होतात तिथून पुन्हा सुरुवात करा.",
        "signUpTitle": "CompanionAI मध्ये सामील व्हा",
        "signUpSub": "आजच बुद्धिमान निर्णय घेण्याच्या दिशेने आपला प्रवास सुरू करा.",
        "email": "ईमेल पत्ता",
        "password": "पासवर्ड",
        "confirmPassword": "पासवर्डची पुष्टी करा",
        "rememberMe": "माझी आठवण ठेवा",
        "forgot": "पासवर्ड विसरलात?",
        "noAccount": "खाते नाही?",
        "hasAccount": "आधीच खाते आहे का?",
        "btnSignIn": "साइन इन करा",
        "btnSignUp": "खाते तयार करा",
        "name": "पूर्ण नाव"
      },
      "landing": {
        "heroTitle1": "AI-सक्षम ",
        "heroTitle2": "निर्णय बुद्धिमत्ता",
        "heroSub": "लहान व्यवसाय, संस्थापक आणि शेतकर्‍यांना एकाधिक डोमेनमध्ये कृती करण्यायोग्य मार्गदर्शन आणि स्वयंचलित सहाय्याने सक्षम करणे.",
        "launchBtn": "प्लॅटफॉर्म लाँच करा",
        "feature1Title": "स्टार्टअप वाढ",
        "feature1Desc": "आधुनिक संस्थापकांसाठी कल्पना प्रमाणीकरण, MVP नियोजन आणि निधी मार्गदर्शन.",
        "feature2Title": "व्यवसाय धोरण",
        "feature2Desc": "लहान व्यवसाय ऑपरेशन्ससाठी खर्च ऑप्टिमायझेशन आणि मार्केटिंग अंतर्दृष्टी.",
        "feature3Title": "स्मार्ट शेती",
        "feature3Desc": "शाश्वत शेतीसाठी पीक निवड आणि हवामान-प्रभाव विश्लेषण.",
        "contactTitle": "संपर्कात रहा",
        "contactDesc": "काही प्रश्न आहेत? आपण CompanionAI चा जास्तीत जास्त फायदा घेण्यासाठी आम्ही येथे आहोत.",
        "contactBtn": "सपोर्टशी संपर्क साधा"
      },
      "aboutPage": {
        "title": "महारथींना भेटा",
        "subtitle": "CompanionAI मागील समर्पित टीम, जी उद्योगाच्या प्रत्येक कोपऱ्यात बुद्धिमत्ता आणण्यासाठी काम करत आहे.",
        "team": [
          {
            "name": "Vedant Agarkar",
            "role": "निर्माता आणि फुल स्टॅक AI डेव्हलपर",
            "bio": "CompanionAI सुरुवातीपासून तयार केले — AI इंजिन, फुल-स्टॅक प्लॅटफॉर्म आणि प्रीमियम यूजर एक्सपीरियन्स डिझाइन केले."
          }
        ]
      },
      "featuresPage": {
        "title": "प्लॅटफॉर्मची वैशिष्ट्ये",
        "subtitle": "CompanionAI अत्याधुनिक AI तंत्रज्ञानासह तुमची निर्णय घेण्याची प्रक्रिया कशी सक्षम करते ते जाणून घ्या.",
        "f1Title": "डोमेन-विशिष्ट AI",
        "f1Desc": "स्टार्टअप्स, लहान व्यवसाय आणि शेतीसाठी तयार केलेली विशिष्ट बुद्धिमत्ता, विशेष डेटासेटवर प्रशिक्षित.",
        "f2Title": "बहुभाषिक जादू",
        "f2Desc": "पूर्ण स्थानिक समर्थनासह इंग्रजी, हिंदी आणि मराठीमध्ये अस्खलितपणे संवाद साधा.",
        "f3Title": "सुरक्षित विश्लेषण",
        "f3Desc": "गोपनीयतेशी तडजोड न करता AI-आधारित अंतर्दृष्टि आणि सारांशासाठी सुरक्षितपणे कागदपत्रे अपलोड करा.",
        "f4Title": "रिअल-टाइम मार्गदर्शन",
        "f4Desc": "कधीही, कुठेही जटिल समस्यांची त्वरित उत्तरे आणि कृती करण्यायोग्य पावले मिळवा.",
        "f5Title": "क्रॉस-डिव्हाइस सिंक",
        "f5Desc": "फोन, टॅब्लेट आणि डेस्कटॉपवर तुमचा डेटा आणि चॅट इतिहास अखंडपणे ॲक्सेस करा.",
        "f6Title": "प्रीमियम UI",
        "f6Desc": "फोकस आणि उत्पादकतेसाठी डिझाइन केलेले एक स्लीक, डार्क-मोड इंटरफेस."
      },
      "domains": {
        "explore": "एक्सप्लोर करा ",
        "aiDomains": "AI डोमेन",
        "businessTitle": "व्यवसाय सल्लागार",
        "businessDesc": "तुमच्या ऑपरेशन्सवर आधारित व्यापक व्यवसाय धोरण आणि निर्णय समर्थन मिळवा.",
        "businessReq": "आवश्यकता: आर्थिक स्टेटमेंट्स, मार्केटिंग योजना, ऑपरेशनल डेटा, अनुपालन गरजा.",
        "startupTitle": "स्टार्टअप मेंटर",
        "startupDesc": "प्रगत AI विश्लेषण वापरून तुमच्या स्टार्टअपच्या मार्केट फिटचे आणि MVP नियोजनाचे मूल्यांकन करा.",
        "startupReq": "आवश्यकता: आयडिया व्हॅलिडेशन, स्पर्धक विश्लेषण, पिच डेक, ग्रोथ मेट्रिक्स.",
        "farmingTitle": "शेती तज्ञ",
        "farmingDesc": "आमच्या सर्वसमावेशक मार्गदर्शनासह तुमच्या पिकाचे आरोग्य आणि शेती धोरणाचे मूल्यांकन करा.",
        "farmingReq": "आवश्यकता: मातीचा प्रकार, हवामान डेटा, पिकाचा इतिहास, सिंचन स्थिती.",
        "generalTitle": "सामान्य सहाय्यक",
        "generalDesc": "विविध विषयांवरील दैनंदिन कामे, संशोधन आणि सामान्य माहितीमध्ये मदत मिळवा.",
        "generalReq": "आवश्यकता: काहीही नाही. फक्त AI सोबत संभाषण सुरू करा.",
        "launch": "लाँच करा"
      },
      "chat": {
        "products": "उत्पादने",
        "backToProducts": "उत्पादनांवर परत",
        "generalAI": "सामान्य AI",
        "businessAI": "व्यवसाय AI",
        "startupAI": "स्टार्टअप AI",
        "farmingAI": "शेती AI",
        "startConv": "संभाषण सुरू करा",
        "askAbout": "याबद्दल काहीही विचारा",
        "messagePlaceholder": "मॅसेज",
        "thinking": "विचार करत आहे...",
        "enterHint": "पाठवण्यासाठी एंटर दाबा · नवीन ओळीसाठी Shift+Enter",
        "error": "माफ करा, मला एक त्रुटी आढळली. कृपया पुन्हा प्रयत्न करा."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
