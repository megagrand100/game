/* ═══════════════════════════════════════════
   विद्यासागर — Main App JS (Fixed)
   ═══════════════════════════════════════════ */

/* ── CONFIG ── */
const API_BASE = 'https://gamvidyasagar-backende.onrender.com/api';

/* ── INLINE FALLBACK DATA (JSON load fail होने पर) ── */
const FALLBACK_QUESTIONS = {
  math: {
    categories: {
      "Arithmetic": [
        { q:"625 का वर्गमूल क्या है?", opts:["20","25","30","35"], ans:1 },
        { q:"एक संख्या का 35% = 280 है, तो संख्या क्या है?", opts:["700","750","800","850"], ans:2 },
        { q:"यदि 3x + 7 = 22, तो x = ?", opts:["3","4","5","6"], ans:2 },
        { q:"2⁸ का मान क्या है?", opts:["128","256","512","1024"], ans:1 },
        { q:"12 आदमी एक काम को 15 दिन में करते हैं। 9 आदमी कितने दिन में करेंगे?", opts:["16","18","20","22"], ans:2 },
        { q:"LCM(12, 18, 24) = ?", opts:["36","48","72","96"], ans:2 },
        { q:"HCF(36, 48, 60) = ?", opts:["6","12","18","24"], ans:1 },
        { q:"1000 रु. पर 2 वर्षों का 5% साधारण ब्याज क्या होगा?", opts:["50","100","150","200"], ans:1 },
        { q:"यदि A:B = 2:3 और B:C = 4:5, तो A:C = ?", opts:["8:15","2:5","4:9","6:10"], ans:0 },
        { q:"√(0.0625) = ?", opts:["0.025","0.25","2.5","25"], ans:1 }
      ],
      "Reasoning": [
        { q:"श्रृंखला: 2, 6, 12, 20, 30, ?", opts:["40","42","44","46"], ans:1 },
        { q:"श्रृंखला: 1, 4, 9, 16, 25, ?", opts:["30","35","36","49"], ans:2 },
        { q:"श्रृंखला: 3, 9, 27, 81, ?", opts:["162","243","324","270"], ans:1 },
        { q:"एक परीक्षा में A का rank 15वाँ और नीचे से 20वाँ है। कुल छात्र = ?", opts:["33","34","35","36"], ans:1 },
        { q:"श्रृंखला: Z, X, V, T, ?", opts:["Q","R","S","P"], ans:1 },
        { q:"यदि A + B = 10, A - B = 4, तो A × B = ?", opts:["21","24","20","25"], ans:0 },
        { q:"श्रृंखला: 2, 3, 5, 8, 13, ?", opts:["18","20","21","23"], ans:2 },
        { q:"एक कोड में COLD को DPME लिखा जाता है। WARM को कैसे लिखेंगे?", opts:["XBSN","XASN","YBSN","ZBSM"], ans:0 }
      ],
      "Number System": [
        { q:"1 से 100 तक सम संख्याओं का योग = ?", opts:["2500","2550","2600","2650"], ans:1 },
        { q:"सबसे छोटी 5 अंकीय संख्या = ?", opts:["99999","10000","11111","10001"], ans:1 },
        { q:"दो अंकों की सबसे बड़ी prime संख्या = ?", opts:["89","91","97","99"], ans:2 },
        { q:"किसी संख्या में 9 जोड़ने पर वह 5 गुनी हो जाती है। संख्या = ?", opts:["2","3","4","5"], ans:0 },
        { q:"0 से 9 अंकों में prime numbers की संख्या = ?", opts:["3","4","5","6"], ans:1 }
      ],
      "Simplification": [
        { q:"5 + 3 × 8 - 4 ÷ 2 = ?", opts:["27","28","29","30"], ans:0 },
        { q:"√144 + √169 = ?", opts:["23","24","25","26"], ans:2 },
        { q:"3³ + 4² - 2⁵ = ?", opts:["11","12","13","14"], ans:0 },
        { q:"(25 + 75) ÷ (10 × 2) = ?", opts:["5","50","100","1"], ans:0 },
        { q:"2/3 + 3/4 - 1/6 = ?", opts:["5/4","4/3","3/2","7/6"], ans:0 }
      ]
    }
  },
  english: {
    categories: {
      "Vocabulary": [
        { q:"Synonym of 'Benevolent':", opts:["Cruel","Kind","Harsh","Rude"], ans:1 },
        { q:"Antonym of 'Affluent':", opts:["Wealthy","Prosperous","Destitute","Rich"], ans:2 },
        { q:"'Ephemeral' means:", opts:["Lasting forever","Short-lived","Very large","Very small"], ans:1 },
        { q:"One word for 'A person who knows many languages':", opts:["Polygamist","Polyglot","Polymath","Polygraph"], ans:1 },
        { q:"Synonym of 'Obstinate':", opts:["Flexible","Stubborn","Lazy","Clever"], ans:1 },
        { q:"'Ameliorate' means:", opts:["Worsen","Improve","Destroy","Create"], ans:1 },
        { q:"One word for 'Fear of heights':", opts:["Claustrophobia","Hydrophobia","Acrophobia","Xenophobia"], ans:2 },
        { q:"Antonym of 'Verbose':", opts:["Talkative","Wordy","Concise","Fluent"], ans:2 }
      ],
      "Grammar": [
        { q:"Correct passive: 'She writes a letter.'", opts:["A letter is written by her.","A letter was written by her.","A letter will be written by her.","A letter has been written by her."], ans:0 },
        { q:"'He has been working here ___ 2019.'", opts:["for","since","from","until"], ans:1 },
        { q:"Which is correct?", opts:["I am going to school yesterday.","She did not went there.","They were playing cricket.","He have a car."], ans:2 },
        { q:"'She ___ (go) to market every day.'", opts:["go","goes","going","gone"], ans:1 },
        { q:"'Neither Ram nor Shyam ___ responsible.'", opts:["are","is","were","be"], ans:1 },
        { q:"The word 'beautiful' is a:", opts:["Noun","Verb","Adjective","Adverb"], ans:2 },
        { q:"'I wish I ___ a bird.'", opts:["am","was","were","be"], ans:2 },
        { q:"Identify the gerund: 'Swimming is good exercise.'", opts:["Swimming","good","exercise","is"], ans:0 }
      ],
      "Synonyms/Antonyms": [
        { q:"Synonym of 'Gregarious':", opts:["Solitary","Sociable","Shy","Quiet"], ans:1 },
        { q:"Antonym of 'Frugal':", opts:["Thrifty","Economical","Extravagant","Careful"], ans:2 },
        { q:"Synonym of 'Pandemonium':", opts:["Peace","Chaos","Silence","Order"], ans:1 },
        { q:"Antonym of 'Lucid':", opts:["Clear","Obvious","Ambiguous","Bright"], ans:2 },
        { q:"Synonym of 'Appease':", opts:["Annoy","Pacify","Agitate","Provoke"], ans:1 }
      ],
      "Reading": [
        { q:"Words that sound alike but have different meanings:", opts:["Synonyms","Antonyms","Homophones","Homonyms"], ans:2 },
        { q:"'Break a leg' is an example of:", opts:["Simile","Idiom","Metaphor","Proverb"], ans:1 },
        { q:"A word with same meaning as another:", opts:["Antonym","Synonym","Homophone","None"], ans:1 }
      ]
    }
  },
  hindi: {
    categories: {
      "व्याकरण": [
        { q:"'गाय' शब्द का बहुवचन क्या है?", opts:["गायें","गायाँ","गाएं","गाय"], ans:0 },
        { q:"'राजा-रानी' में कौन सा समास है?", opts:["तत्पुरुष","द्वंद्व","कर्मधारय","बहुव्रीहि"], ans:1 },
        { q:"'आकाश' का पर्यायवाची शब्द क्या है?", opts:["नभ","जल","पृथ्वी","अग्नि"], ans:0 },
        { q:"'मीठा' का विलोम शब्द क्या है?", opts:["खट्टा","कड़वा","तीखा","नमकीन"], ans:1 },
        { q:"हिंदी वर्णमाला में स्वरों की संख्या कितनी है?", opts:["11","12","13","14"], ans:0 },
        { q:"'हरिण' का स्त्रीलिंग क्या है?", opts:["हरिणा","हरिणी","हरिनी","हरिन"], ans:1 },
        { q:"रस के कितने प्रकार होते हैं?", opts:["7","8","9","11"], ans:2 },
        { q:"सूर्योदय में कौन सी संधि है?", opts:["यण संधि","गुण संधि","वृद्धि संधि","दीर्घ संधि"], ans:1 }
      ],
      "साहित्य": [
        { q:"तुलसीदास जी की प्रमुख रचना कौन सी है?", opts:["सूरसागर","रामचरितमानस","पद्मावत","कामायनी"], ans:1 },
        { q:"कबीरदास किस शाखा के कवि थे?", opts:["सगुण भक्ति","निर्गुण भक्ति","वैष्णव","शाक्त"], ans:1 },
        { q:"प्रेमचंद का वास्तविक नाम क्या था?", opts:["धनपतराय","भवानीप्रसाद","रामनाथ","शिवप्रसाद"], ans:0 },
        { q:"मैथिलीशरण गुप्त को किस उपाधि से सम्मानित किया गया?", opts:["राष्ट्रकवि","महाकवि","कविवर","कविश्रेष्ठ"], ans:0 },
        { q:"रामधारी सिंह दिनकर की प्रसिद्ध रचना:", opts:["कामायनी","रश्मिरथी","साकेत","प्रिय प्रवास"], ans:1 }
      ],
      "मुहावरे": [
        { q:"'नौ दो ग्यारह होना' का अर्थ:", opts:["गणित करना","भाग जाना","एकता","लड़ाई होना"], ans:1 },
        { q:"'आँखें चार होना' का अर्थ:", opts:["चार आँखें होना","प्रेम होना","दुश्मनी होना","दुखी होना"], ans:1 },
        { q:"'पेट में चूहे दौड़ना' का अर्थ:", opts:["बहुत भूख लगना","पेट दर्द होना","डर लगना","खुशी होना"], ans:0 },
        { q:"'हाथ पर हाथ धरे बैठना' का अर्थ:", opts:["मेहनत करना","आलसी रहना","हाथ धोना","इंतजार करना"], ans:1 }
      ],
      "संधि-समास": [
        { q:"'देवालय' में कौन सी संधि है?", opts:["दीर्घ संधि","गुण संधि","वृद्धि संधि","यण संधि"], ans:0 },
        { q:"'नीलकमल' में कौन सा समास है?", opts:["द्वंद्व","तत्पुरुष","कर्मधारय","अव्ययीभाव"], ans:2 },
        { q:"'चतुर्भुज' में कौन सा समास है?", opts:["द्विगु","द्वंद्व","बहुव्रीहि","कर्मधारय"], ans:0 }
      ]
    }
  },
  science: {
    categories: {
      "भौतिकी": [
        { q:"प्रकाश की गति कितनी है?", opts:["3×10⁸ m/s","3×10⁶ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], ans:0 },
        { q:"ओम का नियम क्या है?", opts:["V=IR","V=I/R","V=I²R","V=R/I"], ans:0 },
        { q:"पृथ्वी पर g का मान = ?", opts:["9.8 m/s²","10 m/s²","8.9 m/s²","11 m/s²"], ans:0 },
        { q:"ध्वनि की गति हवा में लगभग = ?", opts:["300 m/s","343 m/s","400 m/s","500 m/s"], ans:1 },
        { q:"किस रंग का प्रकाश सबसे ज्यादा झुकता है?", opts:["लाल","नीला","बैंगनी","हरा"], ans:2 },
        { q:"विद्युत प्रतिरोध की इकाई = ?", opts:["वाट","ओम","एम्पियर","वोल्ट"], ans:1 }
      ],
      "रसायन": [
        { q:"जल का रासायनिक सूत्र = ?", opts:["H₂O","CO₂","NaCl","H₂SO₄"], ans:0 },
        { q:"नमक का रासायनिक नाम = ?", opts:["सोडियम क्लोराइड","सोडियम हाइड्रोऑक्साइड","सोडियम कार्बोनेट","सोडियम बाइकार्बोनेट"], ans:0 },
        { q:"सबसे हल्का तत्व = ?", opts:["हीलियम","हाइड्रोजन","लिथियम","बोरान"], ans:1 },
        { q:"pH मान 7 से कम = ?", opts:["क्षारीय","अम्लीय","उदासीन","कोई नहीं"], ans:1 },
        { q:"हीरा और ग्रेफाइट किस तत्व के अपरूप हैं?", opts:["सिलिकन","नाइट्रोजन","कार्बन","फास्फोरस"], ans:2 }
      ],
      "जीव विज्ञान": [
        { q:"मनुष्य के शरीर में कुल कितनी हड्डियाँ?", opts:["206","207","208","210"], ans:0 },
        { q:"रक्त में लाल रंग किसके कारण?", opts:["हीमोग्लोबिन","प्लाज्मा","प्लेटलेट्स","WBC"], ans:0 },
        { q:"मानव शरीर की सबसे बड़ी ग्रंथि = ?", opts:["थायरॉइड","अग्न्याशय","यकृत","अधिवृक्क"], ans:2 },
        { q:"DNA का पूर्ण रूप = ?", opts:["Deoxyribonucleic Acid","Deoxyribose Nucleotide Acid","Deoxyribose Nuclear Acid","Double Nucleic Acid"], ans:0 },
        { q:"मलेरिया किस परजीवी से होता है?", opts:["जीवाणु","विषाणु","प्लाज्मोडियम","कवक"], ans:2 }
      ],
      "पर्यावरण": [
        { q:"ओजोन परत किस गैस से बनी है?", opts:["O₂","O₃","CO₂","N₂"], ans:1 },
        { q:"भारत का राष्ट्रीय पशु = ?", opts:["शेर","हाथी","बाघ","मोर"], ans:2 },
        { q:"वायुमंडल में सर्वाधिक कौन सी गैस?", opts:["ऑक्सीजन","कार्बन डाइऑक्साइड","नाइट्रोजन","आर्गन"], ans:2 }
      ]
    }
  },
  gk: {
    categories: {
      "इतिहास": [
        { q:"भारत की प्रथम महिला प्रधानमंत्री कौन थीं?", opts:["सरोजिनी नायडू","इंदिरा गांधी","विजयलक्ष्मी पंडित","मीरा कुमार"], ans:1 },
        { q:"1857 की क्रांति का आरंभ कहाँ से हुआ?", opts:["मेरठ","दिल्ली","कानपुर","लखनऊ"], ans:0 },
        { q:"ताजमहल का निर्माण किसने करवाया?", opts:["अकबर","बाबर","शाहजहाँ","औरंगजेब"], ans:2 },
        { q:"भारत का संविधान कब लागू हुआ?", opts:["15 अगस्त 1947","26 जनवरी 1950","26 नवंबर 1949","2 अक्टूबर 1948"], ans:1 },
        { q:"जलियाँवाला बाग हत्याकांड कब हुआ?", opts:["1917","1918","1919","1920"], ans:2 },
        { q:"भारत छोड़ो आंदोलन कब शुरू हुआ?", opts:["1940","1942","1945","1947"], ans:1 },
        { q:"पानीपत की पहली लड़ाई कब हुई?", opts:["1526","1556","1576","1527"], ans:0 }
      ],
      "भूगोल": [
        { q:"भारत का सबसे बड़ा राज्य (क्षेत्रफल में)?", opts:["मध्य प्रदेश","उत्तर प्रदेश","राजस्थान","महाराष्ट्र"], ans:2 },
        { q:"गंगा नदी का उद्गम स्थल?", opts:["यमुनोत्री","गंगोत्री","केदारनाथ","बद्रीनाथ"], ans:1 },
        { q:"भारत का सबसे छोटा राज्य (क्षेत्रफल में)?", opts:["गोवा","सिक्किम","त्रिपुरा","मणिपुर"], ans:0 },
        { q:"भारत की सबसे लंबी तटरेखा किस राज्य की?", opts:["महाराष्ट्र","गुजरात","आंध्र प्रदेश","तमिलनाडु"], ans:1 },
        { q:"किस राज्य को 'मसालों का बगीचा' कहते हैं?", opts:["गोवा","केरल","कर्नाटक","तमिलनाडु"], ans:1 }
      ],
      "राजनीति": [
        { q:"भारत के पहले राष्ट्रपति कौन थे?", opts:["जवाहरलाल नेहरू","सर्वपल्ली राधाकृष्णन","राजेंद्र प्रसाद","वल्लभभाई पटेल"], ans:2 },
        { q:"लोकसभा में कुल कितनी सीटें हैं?", opts:["543","544","545","550"], ans:2 },
        { q:"भारत के प्रधानमंत्री की नियुक्ति कौन करता है?", opts:["लोकसभा अध्यक्ष","राष्ट्रपति","उपराष्ट्रपति","सुप्रीम कोर्ट"], ans:1 },
        { q:"संसद का निम्न सदन किसे कहते हैं?", opts:["राज्यसभा","लोकसभा","विधानसभा","विधान परिषद"], ans:1 }
      ],
      "अर्थशास्त्र": [
        { q:"भारत का केंद्रीय बैंक कौन सा है?", opts:["SBI","PNB","RBI","NABARD"], ans:2 },
        { q:"भारत में GST कब लागू हुई?", opts:["1 अप्रैल 2017","1 जुलाई 2017","1 जनवरी 2017","15 अगस्त 2017"], ans:1 },
        { q:"भारत की आर्थिक राजधानी कौन सी है?", opts:["दिल्ली","कोलकाता","मुंबई","चेन्नई"], ans:2 }
      ]
    }
  },
  computer: {
    categories: {
      "O Level": [
        { q:"O Level परीक्षा किस संस्था द्वारा आयोजित?", opts:["CBSE","NIELIT","UGC","AICTE"], ans:1 },
        { q:"Binary में 1010 का decimal value?", opts:["8","9","10","11"], ans:2 },
        { q:"RAM का पूर्ण रूप?", opts:["Random Access Memory","Read All Memory","Readable Access Memory","Read Access Module"], ans:0 },
        { q:"HTML में heading tag?", opts:["<h>","<head>","<h1>","<header>"], ans:2 },
        { q:"CPU का पूर्ण रूप?", opts:["Control Processing Unit","Central Processing Unit","Computer Processing Unit","Central Program Unit"], ans:1 },
        { q:"1 GB = कितने MB?", opts:["512","1000","1024","2048"], ans:2 },
        { q:"WWW का पूर्ण रूप?", opts:["World Wide Web","World Wide Ware","Web World Wide","Wide World Web"], ans:0 },
        { q:"कौन सा Operating System नहीं है?", opts:["Windows","Linux","Android","Java"], ans:3 }
      ],
      "CCC": [
        { q:"CCC का पूर्ण रूप?", opts:["Computer Course Certificate","Course on Computer Concepts","Certificate of Computer Course","Computer Concepts Course"], ans:1 },
        { q:"MS Word में नया document खोलने की shortcut?", opts:["Ctrl+N","Ctrl+O","Ctrl+W","Ctrl+D"], ans:0 },
        { q:"MS Excel में formula किससे शुरू होता है?", opts:["+","-","=","@"], ans:2 },
        { q:"Cut की shortcut key?", opts:["Ctrl+C","Ctrl+X","Ctrl+V","Ctrl+Z"], ans:1 },
        { q:"Undo की shortcut key?", opts:["Ctrl+Y","Ctrl+Z","Ctrl+U","Ctrl+A"], ans:1 },
        { q:"भारत में internet किस वर्ष शुरू हुआ?", opts:["1993","1995","1997","2000"], ans:1 },
        { q:"PowerPoint presentation की extension?", opts:[".doc",".xls",".ppt",".pdf"], ans:2 }
      ],
      "MS Office": [
        { q:"MS Word में page break की shortcut?", opts:["Ctrl+Enter","Ctrl+Break","Ctrl+B","Alt+Enter"], ans:0 },
        { q:"MS Excel में cell A1 में जाने की shortcut?", opts:["Ctrl+Home","Ctrl+A1","F5","Ctrl+G"], ans:0 },
        { q:"Excel में SUM formula का उदाहरण:", opts:["=SUM(A1:A10)","SUM(A1:A10)","=ADD(A1:A10)","=TOTAL(A1:A10)"], ans:0 },
        { q:"MS Access किस प्रकार का software है?", opts:["Word Processor","Spreadsheet","Database","Presentation"], ans:2 }
      ],
      "NIELIT": [
        { q:"NIELIT का पूर्ण रूप?", opts:["National Institute of Electronics and Information Technology","National IT Electronics Learning","New Information Electronics Learning IT","None"], ans:0 },
        { q:"NIELIT का मुख्यालय कहाँ है?", opts:["मुंबई","नई दिल्ली","बेंगलुरु","चेन्नई"], ans:1 },
        { q:"NIELIT के अंतर्गत कौन सा course नहीं आता?", opts:["O Level","A Level","B Level","MBA"], ans:3 }
      ]
    }
  },
  sanskrit: {
    categories: {
      "व्याकरण": [
        { q:"'रामः' में कौन सी विभक्ति है?", opts:["प्रथमा","द्वितीया","तृतीया","चतुर्थी"], ans:0 },
        { q:"'गच्छति' का अर्थ क्या है?", opts:["आता है","जाता है","खाता है","पीता है"], ans:1 },
        { q:"'बालक' का बहुवचन?", opts:["बालकौ","बालकाः","बालकम्","बालकेन"], ans:1 },
        { q:"'अहम्' का अर्थ?", opts:["वह","तुम","मैं","हम"], ans:2 },
        { q:"संस्कृत में वचन कितने होते हैं?", opts:["1","2","3","4"], ans:2 }
      ],
      "श्लोक": [
        { q:"'विद्या ददाति विनयम्' का अर्थ?", opts:["विद्या से पैसा मिलता है","विद्या विनम्रता देती है","विद्या शक्ति देती है","विद्या सुख देती है"], ans:1 },
        { q:"भगवद्गीता में कुल कितने अध्याय हैं?", opts:["16","17","18","19"], ans:2 },
        { q:"'सर्वे भवन्तु सुखिनः' का अर्थ?", opts:["सब सुखी हों","सब धनी हों","सब पढ़े-लिखे हों","सब बलवान हों"], ans:0 }
      ],
      "अनुवाद": [
        { q:"'फल' का संस्कृत शब्द?", opts:["पुष्पम्","फलम्","पर्णम्","वृक्षः"], ans:1 },
        { q:"'Mother' का संस्कृत?", opts:["पितः","माता","भगिनी","पुत्री"], ans:1 },
        { q:"'Water' का संस्कृत शब्द?", opts:["वायुः","जलम्","अग्निः","पृथ्वी"], ans:1 }
      ],
      "धातुरूप": [
        { q:"'खाद्' धातु का अर्थ?", opts:["जाना","खाना","पीना","देखना"], ans:1 },
        { q:"'पा' धातु का अर्थ?", opts:["पीना","जाना","आना","लिखना"], ans:0 },
        { q:"'दृश्' धातु का अर्थ?", opts:["सुनना","देखना","बोलना","चलना"], ans:1 }
      ]
    }
  },
  current: {
    categories: {
      "राष्ट्रीय": [
        { q:"डिजिटल इंडिया अभियान कब शुरू हुआ?", opts:["2014","2015","2016","2017"], ans:1 },
        { q:"स्वच्छ भारत मिशन कब शुरू हुआ?", opts:["2 अक्टूबर 2013","2 अक्टूबर 2014","2 अक्टूबर 2015","15 अगस्त 2014"], ans:1 },
        { q:"UPI का पूर्ण रूप?", opts:["Unified Payment Interface","Universal Payment Interface","Unified Pay Instrument","Universal Pay Instrument"], ans:0 },
        { q:"भारत का सबसे बड़ा बैंक?", opts:["PNB","HDFC","SBI","BOB"], ans:2 },
        { q:"आयुष्मान भारत योजना किस वर्ष शुरू हुई?", opts:["2016","2017","2018","2019"], ans:2 }
      ],
      "अंतर्राष्ट्रीय": [
        { q:"संयुक्त राष्ट्र की स्थापना कब हुई?", opts:["1944","1945","1946","1947"], ans:1 },
        { q:"WHO का मुख्यालय कहाँ है?", opts:["न्यूयॉर्क","पेरिस","जिनेवा","लंदन"], ans:2 },
        { q:"IMF का मुख्यालय?", opts:["न्यूयॉर्क","वाशिंगटन D.C.","लंदन","पेरिस"], ans:1 }
      ],
      "खेल": [
        { q:"क्रिकेट में एक over में कितनी balls?", opts:["5","6","7","8"], ans:1 },
        { q:"ओलंपिक खेल कितने वर्षों में एक बार?", opts:["2","3","4","5"], ans:2 },
        { q:"भारत ने पहला Cricket World Cup कब जीता?", opts:["1975","1979","1983","1987"], ans:2 }
      ],
      "पुरस्कार": [
        { q:"भारत का सर्वोच्च नागरिक सम्मान?", opts:["पद्म विभूषण","पद्म भूषण","भारत रत्न","पद्म श्री"], ans:2 },
        { q:"प्रथम भारतीय नोबेल पुरस्कार विजेता?", opts:["सीवी रमन","रबींद्रनाथ टैगोर","अमर्त्य सेन","हरगोविंद खुराना"], ans:1 }
      ]
    }
  }
};

const FALLBACK_STATES = {
  "उत्तर प्रदेश": [
    { q:"उत्तर प्रदेश की राजधानी?", opts:["आगरा","लखनऊ","वाराणसी","कानपुर"], ans:1 },
    { q:"UP में कुल कितने जिले हैं?", opts:["70","72","75","77"], ans:2 },
    { q:"UP का राज्य पशु?", opts:["बाघ","हाथी","बारहसिंगा","शेर"], ans:2 },
    { q:"ताजमहल किस जिले में?", opts:["लखनऊ","वाराणसी","आगरा","मथुरा"], ans:2 },
    { q:"UP का प्रसिद्ध 'कुंभ मेला' कहाँ लगता है?", opts:["काशी","मथुरा","प्रयागराज","अयोध्या"], ans:2 }
  ],
  "मध्य प्रदेश": [
    { q:"मध्य प्रदेश की राजधानी?", opts:["इंदौर","भोपाल","जबलपुर","ग्वालियर"], ans:1 },
    { q:"MP का राज्य पशु?", opts:["बाघ","शेर","हाथी","बारहसिंगा"], ans:0 },
    { q:"नर्मदा नदी का उद्गम स्थल?", opts:["अमरकंटक","विंध्याचल","सतपुड़ा","चित्रकूट"], ans:0 }
  ],
  "राजस्थान": [
    { q:"राजस्थान की राजधानी?", opts:["जोधपुर","उदयपुर","जयपुर","अजमेर"], ans:2 },
    { q:"राजस्थान का राज्य पशु?", opts:["ऊंट","बाघ","चीतल","शेर"], ans:0 },
    { q:"जयपुर को 'पिंक सिटी' क्यों कहते हैं?", opts:["फूलों के कारण","गुलाबी पत्थर के मकानों के कारण","सूर्यास्त के कारण","झील के कारण"], ans:1 }
  ],
  "बिहार": [
    { q:"बिहार की राजधानी?", opts:["गया","भागलपुर","पटना","मुजफ्फरपुर"], ans:2 },
    { q:"झारखंड बिहार से कब अलग हुआ?", opts:["1998","1999","2000","2001"], ans:2 }
  ],
  "महाराष्ट्र": [
    { q:"महाराष्ट्र की राजधानी?", opts:["पुणे","नागपुर","मुंबई","नासिक"], ans:2 },
    { q:"मुंबई को पहले क्या कहते थे?", opts:["बॉम्बे","बंगलुरु","मद्रास","कलकत्ता"], ans:0 }
  ]
};

/* ── APP STATE ── */
const App = {
  user: null, token: null,
  selectedSubject: null, selectedSub: null, selectedState: null,
  quizQuestions: [], quizIdx: 0, score: 0,
  quizLabel: '', quizEmoji: '📝',
  historyData: [], quizStartTime: null,
  currentTab: 'home',
};

const SUBJECTS = [
  { id:'math',    emoji:'🔢', name:'गणित',          count:'850+', color:'#f4820a' },
  { id:'english', emoji:'🔤', name:'English',        count:'720+', color:'#3b82f6' },
  { id:'hindi',   emoji:'📖', name:'हिंदी',          count:'600+', color:'#8b5cf6' },
  { id:'science', emoji:'🔬', name:'विज्ञान',        count:'540+', color:'#10b981' },
  { id:'gk',      emoji:'🌍', name:'सामान्य ज्ञान', count:'980+', color:'#ef4444' },
  { id:'computer',emoji:'💻', name:'Computer',       count:'430+', color:'#06b6d4' },
  { id:'sanskrit',emoji:'🕉️', name:'संस्कृत',        count:'280+', color:'#f59e0b' },
  { id:'current', emoji:'📰', name:'करंट अफेयर्स',  count:'320+', color:'#ec4899' }
];

const STATES = [
  'उत्तर प्रदेश','मध्य प्रदेश','राजस्थान','बिहार','महाराष्ट्र',
  'गुजरात','पंजाब','हरियाणा','उत्तराखंड','हिमाचल प्रदेश',
  'दिल्ली','छत्तीसगढ़','झारखंड','ओडिशा','पश्चिम बंगाल',
  'आंध्र प्रदेश','तेलंगाना','कर्नाटक','केरल','तमिलनाडु',
  'असम','गोवा','जम्मू-कश्मीर','मणिपुर','मेघालय',
  'नागालैंड','सिक्किम','त्रिपुरा'
];

/* ══════════════════════════════════ INIT ══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const savedToken = localStorage.getItem('vs_token');
  const savedUser  = localStorage.getItem('vs_user');
  if (savedToken && savedUser) {
    App.token = savedToken;
    App.user  = JSON.parse(savedUser);
  }
  setTimeout(() => {
    if (App.token && App.user) enterApp(App.user, false);
    else showScreen('screen-login');
  }, 2400);
});

/* ══════════════════════════════════ SCREEN ══════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  setTimeout(() => { document.getElementById(id).scrollTop = 0; }, 50);
}

/* ══════════════════════════════════ AUTH ══════════════════════════════════ */
function switchAuthTab(tab) {
  document.getElementById('form-login').style.display  = tab==='login'  ? 'block' : 'none';
  document.getElementById('form-signup').style.display = tab==='signup' ? 'block' : 'none';
  document.getElementById('tab-login').classList.toggle('active',  tab==='login');
  document.getElementById('tab-signup').classList.toggle('active', tab==='signup');
  const el = document.getElementById('auth-msg');
  el.className = 'auth-error'; el.textContent = '';
}

function showAuthError(msg)   { const el=document.getElementById('auth-msg'); el.className='auth-error show';   el.textContent='⚠️ '+msg; }
function showAuthSuccess(msg) { const el=document.getElementById('auth-msg'); el.className='auth-success show'; el.textContent='✅ '+msg; }

async function doLogin() {
  const email=document.getElementById('login-email').value.trim();
  const password=document.getElementById('login-pass').value.trim();
  if (!email||!password) return showAuthError('ईमेल और पासवर्ड दर्ज करें');
  const btn=document.getElementById('btn-login');
  btn.textContent='लॉगिन हो रहा है...'; btn.disabled=true;
  try {
    const res=await fetch(`${API_BASE}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data=await res.json();
    if (!data.success) throw new Error(data.message);
    App.token=data.token; App.user=data.user;
    localStorage.setItem('vs_token',data.token);
    localStorage.setItem('vs_user',JSON.stringify(data.user));
    showAuthSuccess('लॉगिन सफल! 🎉');
    setTimeout(()=>enterApp(data.user,true),800);
  } catch(err) {
    showAuthError(err.message||'Server से जुड़ नहीं पाए। Skip करके जारी रखें।');
    btn.textContent='लॉगिन करें →'; btn.disabled=false;
  }
}

async function doSignup() {
  const name=document.getElementById('signup-name').value.trim();
  const email=document.getElementById('signup-email').value.trim();
  const password=document.getElementById('signup-pass').value.trim();
  if (!name||!email||!password) return showAuthError('सभी fields भरें');
  if (password.length<6) return showAuthError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए');
  const btn=document.getElementById('btn-signup');
  btn.textContent='बन रहा है...'; btn.disabled=true;
  try {
    const res=await fetch(`${API_BASE}/auth/signup`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})});
    const data=await res.json();
    if (!data.success) throw new Error(data.message);
    App.token=data.token; App.user=data.user;
    localStorage.setItem('vs_token',data.token);
    localStorage.setItem('vs_user',JSON.stringify(data.user));
    showAuthSuccess('Account बन गया! Welcome 🎉');
    setTimeout(()=>enterApp(data.user,true),800);
  } catch(err) {
    showAuthError(err.message||'Server से जुड़ नहीं पाए। Skip करके जारी रखें।');
    btn.textContent='Account बनाएं →'; btn.disabled=false;
  }
}

function skipLogin() {
  App.user={name:'अतिथि',email:'',isGuest:true};
  App.token=null;
  enterApp(App.user,false);
}

function doLogout() {
  App.user=null; App.token=null;
  localStorage.removeItem('vs_token');
  localStorage.removeItem('vs_user');
  showScreen('screen-login');
  showToast('लॉगआउट हो गए','success');
}

/* ══════════════════════════════════ ENTER APP ══════════════════════════════════ */
function enterApp(user, fetchHistory) {
  App.user=user;
  const initial=user.name.charAt(0).toUpperCase();
  document.getElementById('nav-avatar').textContent=initial;
  document.getElementById('nav-username').textContent=user.name;
  document.getElementById('hist-avatar').textContent=initial;
  document.getElementById('hist-name').textContent=user.name;
  document.getElementById('hist-joined').textContent=
    user.isGuest?'अतिथि मोड — History save नहीं होगी':`जुड़े: ${formatDate(user.joinedAt||new Date())} • ${user.email}`;
  if (user.totalQuizzes!==undefined) {
    document.getElementById('hist-total').textContent=user.totalQuizzes||0;
    document.getElementById('hist-correct').textContent=user.totalCorrect||0;
    document.getElementById('hist-wrong').textContent=user.totalWrong||0;
  }
  renderSubjectGrid();
  renderStatesGrid();
  showScreen('screen-main');
  switchTab('home');
  if (fetchHistory&&App.token) loadHistory();
}

/* ══════════════════════════════════ TABS ══════════════════════════════════ */
function switchTab(tab) {
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  const n=document.getElementById('nav-'+tab);
  const p=document.getElementById('panel-'+tab);
  if(n) n.classList.add('active');
  if(p) p.classList.add('active');
  if(tab==='history') renderHistory();
}

/* ══════════════════════════════════ SUBJECT GRID ══════════════════════════════════ */
function renderSubjectGrid() {
  const grid=document.getElementById('subject-grid');
  grid.innerHTML=SUBJECTS.map(s=>`
    <button class="subject-card" id="subj-${s.id}" onclick="selectSubject('${s.id}')" style="--card-color:${s.color}">
      <span class="subject-emoji">${s.emoji}</span>
      <span class="subject-name">${s.name}</span>
      <span class="subject-count">${s.count} प्रश्न</span>
    </button>`).join('');
}

function selectSubject(id) {
  App.selectedSubject=id; App.selectedSub=null; App.selectedState=null;
  document.querySelectorAll('.subject-card').forEach(b=>b.classList.remove('selected'));
  document.getElementById('subj-'+id).classList.add('selected');
  document.querySelectorAll('.state-chip').forEach(b=>b.classList.remove('selected'));

  // Get categories from FALLBACK (instant — no fetch needed)
  const data=FALLBACK_QUESTIONS[id];
  const subj=SUBJECTS.find(s=>s.id===id);
  const cats=data?.categories?Object.keys(data.categories):[];

  const area=document.getElementById('subcategory-area');
  if(cats.length) {
    area.style.display='block';
    area.innerHTML=`
      <div class="subcategory-box">
        <div class="subcategory-label">${subj?.emoji||''} ${subj?.name||id} — भाग चुनें:</div>
        <div class="sub-chips" id="sub-chips">
          ${cats.map(c=>`<button class="sub-chip" id="sub-${safeId(c)}" onclick="selectSub('${c.replace(/'/g,"\\'")}','${safeId(c)}')">${c}</button>`).join('')}
        </div>
      </div>`;
  } else {
    area.style.display='none';
  }
  checkCanStart();
}

function selectSub(name,safeid) {
  App.selectedSub=name; App.selectedState=null;
  document.querySelectorAll('.sub-chip').forEach(b=>b.classList.remove('selected'));
  const el=document.getElementById('sub-'+safeid);
  if(el) el.classList.add('selected');
  document.querySelectorAll('.state-chip').forEach(b=>b.classList.remove('selected'));
  checkCanStart();
}

/* ══════════════════════════════════ STATES GRID ══════════════════════════════════ */
function renderStatesGrid() {
  const grid=document.getElementById('states-grid');
  grid.innerHTML=STATES.map(s=>`
    <button class="state-chip" id="state-${safeId(s)}" onclick="selectState('${s.replace(/'/g,"\\'")}','${safeId(s)}')">${s}</button>`
  ).join('');
}

function selectState(name,safeid) {
  App.selectedState=name; App.selectedSubject=null; App.selectedSub=null;
  document.querySelectorAll('.subject-card').forEach(b=>b.classList.remove('selected'));
  document.querySelectorAll('.sub-chip').forEach(b=>b.classList.remove('selected'));
  document.getElementById('subcategory-area').style.display='none';
  document.querySelectorAll('.state-chip').forEach(b=>b.classList.remove('selected'));
  document.getElementById('state-'+safeid).classList.add('selected');
  checkCanStart();
}

function checkCanStart() {
  const ready=(App.selectedSubject&&App.selectedSub)||App.selectedState;
  document.getElementById('btn-start').disabled=!ready;
}

/* ══════════════════════════════════ QUIZ ══════════════════════════════════ */
function startQuiz() {
  let questions=[];
  if(App.selectedState) {
    App.quizLabel=App.selectedState+' — राज्य GK';
    App.quizEmoji='🗺️';
    questions=FALLBACK_STATES[App.selectedState]||getFallbackQuestions();
  } else {
    const subj=SUBJECTS.find(s=>s.id===App.selectedSubject);
    App.quizLabel=`${subj?.name||App.selectedSubject} — ${App.selectedSub}`;
    App.quizEmoji=subj?.emoji||'📝';
    questions=FALLBACK_QUESTIONS[App.selectedSubject]?.categories?.[App.selectedSub]||getFallbackQuestions();
  }
  App.quizQuestions=shuffle(questions).slice(0,Math.min(10,questions.length));
  App.quizIdx=0; App.score=0;
  App.quizStartTime=Date.now();
  document.getElementById('quiz-topic-label').textContent=App.quizLabel;
  showScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const total=App.quizQuestions.length;
  const q=App.quizQuestions[App.quizIdx];
  const pct=((App.quizIdx+1)/total*100).toFixed(0);
  document.getElementById('quiz-counter').textContent=`प्रश्न ${App.quizIdx+1} / ${total}`;
  document.getElementById('quiz-progress-bar').style.width=pct+'%';
  const labels=['A','B','C','D'];
  document.getElementById('quiz-body').innerHTML=`
    <div class="q-num">प्रश्न ${App.quizIdx+1} / ${total}</div>
    <div class="q-text">${q.q}</div>
    <div class="options-grid" id="options-grid">
      ${q.opts.map((opt,i)=>`
        <button class="option-btn" id="opt-${i}" onclick="selectOption(${i})">
          <span class="option-label">${labels[i]}</span><span>${opt}</span>
        </button>`).join('')}
    </div>
    <div class="quiz-footer">
      <div class="score-live">स्कोर: <strong>${App.score}/${App.quizIdx}</strong></div>
      <div class="quiz-actions">
        <button class="btn-quit" onclick="confirmQuit()">← वापस</button>
        <button class="btn-next" id="btn-next" onclick="nextQuestion()">अगला →</button>
      </div>
    </div>`;
}

function selectOption(idx) {
  const q=App.quizQuestions[App.quizIdx];
  document.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
  document.getElementById(`opt-${q.ans}`).classList.add('correct');
  if(idx!==q.ans) document.getElementById(`opt-${idx}`).classList.add('wrong');
  else App.score++;
  document.querySelector('.score-live strong').textContent=`${App.score}/${App.quizIdx+1}`;
  const nb=document.getElementById('btn-next');
  nb.style.display='block';
  nb.textContent=App.quizIdx+1>=App.quizQuestions.length?'परिणाम देखें ✓':'अगला →';
}

function nextQuestion() {
  App.quizIdx++;
  if(App.quizIdx>=App.quizQuestions.length){showResult();return;}
  renderQuestion();
}

function confirmQuit() {
  if(confirm('क्या आप वाकई क्विज़ छोड़ना चाहते हैं?')) {
    showScreen('screen-main'); switchTab('quiz');
  }
}

async function showResult() {
  const total=App.quizQuestions.length;
  const pct=Math.round(App.score/total*100);
  const timeTaken=Math.round((Date.now()-App.quizStartTime)/1000);
  const emoji=pct>=80?'🏆':pct>=60?'🎯':pct>=40?'📚':'💪';
  const msg=pct>=80?'शानदार प्रदर्शन!':pct>=60?'बहुत अच्छा!':pct>=40?'और मेहनत करें!':'हार मत मानो!';
  const grade=pct>=80?'A':pct>=60?'B':pct>=40?'C':'D';

  document.getElementById('quiz-body').innerHTML=`
    <div class="result-wrap">
      <div class="result-card">
        <span class="result-emoji">${emoji}</span>
        <div class="result-title">${msg}</div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:4px">${App.quizLabel}</div>
        <div class="result-score">${pct}%</div>
        <div class="result-sub">Grade: ${grade} &nbsp;|&nbsp; समय: ${formatTime(timeTaken)} &nbsp;|&nbsp; ${App.score}/${total} सही</div>
        <div class="result-stats">
          <div class="r-stat"><div class="r-stat-num r-correct">${App.score}</div><div class="r-stat-label">✅ सही</div></div>
          <div class="r-stat"><div class="r-stat-num r-wrong">${total-App.score}</div><div class="r-stat-label">❌ गलत</div></div>
          <div class="r-stat"><div class="r-stat-num" style="color:var(--gold)">${grade}</div><div class="r-stat-label">🎖️ Grade</div></div>
        </div>
        <div class="result-btns">
          <button class="btn-secondary" onclick="restartQuiz()">🔄 फिर खेलें</button>
          <button class="btn-primary" style="max-width:160px;padding:12px 20px;font-size:14px" onclick="goBackHome()">🏠 होम</button>
        </div>
      </div>
    </div>`;

  const entry={subject:App.quizLabel,score:App.score,total,percentage:pct,emoji:App.quizEmoji,date:new Date().toLocaleDateString('hi-IN'),timeTaken};
  App.historyData.unshift(entry);
  updateLocalHistoryStats();

  if(App.token&&!App.user?.isGuest) {
    try {
      await fetch(`${API_BASE}/history/save`,{
        method:'POST',
        headers:{'Content-Type':'application/json',Authorization:`Bearer ${App.token}`},
        body:JSON.stringify({subject:App.selectedSubject||'states',subCategory:App.selectedSub||'',state:App.selectedState||'',score:App.score,total,timeTaken})
      });
    } catch{}
  }
}

function restartQuiz() {
  App.quizIdx=0; App.score=0; App.quizStartTime=Date.now();
  App.quizQuestions=shuffle(App.quizQuestions);
  document.getElementById('quiz-body').innerHTML='';
  renderQuestion();
}

function goBackHome() {
  document.getElementById('quiz-body').innerHTML='';
  showScreen('screen-main'); switchTab('home');
}

/* ══════════════════════════════════ HISTORY ══════════════════════════════════ */
async function loadHistory() {
  if(!App.token) return;
  try {
    const res=await fetch(`${API_BASE}/history`,{headers:{Authorization:`Bearer ${App.token}`}});
    const data=await res.json();
    if(data.success) {
      App.historyData=data.history.map(h=>({
        subject:h.subject,score:h.score,total:h.total,
        percentage:h.percentage,emoji:'📝',
        date:new Date(h.playedAt).toLocaleDateString('hi-IN'),
        timeTaken:h.timeTaken
      }));
      updateLocalHistoryStats();
    }
  } catch{}
}

function renderHistory() {
  updateLocalHistoryStats();
  const list=document.getElementById('history-list');
  if(!App.historyData.length) {
    list.innerHTML=`<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-title">अभी कोई Quiz नहीं खेली</div><div class="empty-desc">Quiz सेक्शन में जाएं और शुरुआत करें!</div></div>`;
    return;
  }
  list.innerHTML=`<div class="history-list">${App.historyData.map(h=>{
    const pct=h.percentage||Math.round(h.score/h.total*100);
    const cls=pct>=70?'good':pct>=40?'avg':'low';
    return `<div class="history-item">
      <div class="hist-icon">${h.emoji}</div>
      <div class="hist-info"><div class="hist-title">${h.subject}</div><div class="hist-date">📅 ${h.date}${h.timeTaken?' &nbsp;⏱️ '+formatTime(h.timeTaken):''}</div></div>
      <div class="hist-badge ${cls}">${h.score}/${h.total} — ${pct}%</div>
    </div>`;
  }).join('')}</div>`;
}

function updateLocalHistoryStats() {
  const tc=App.historyData.reduce((a,b)=>a+b.score,0);
  const tw=App.historyData.reduce((a,b)=>a+(b.total-b.score),0);
  document.getElementById('hist-total').textContent=App.historyData.length;
  document.getElementById('hist-correct').textContent=tc;
  document.getElementById('hist-wrong').textContent=tw;
}

/* ══════════════════════════════════ UTILS ══════════════════════════════════ */
function showToast(msg,type='info') {
  const icons={success:'✅',error:'❌',info:'ℹ️',warning:'⚠️'};
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  t.innerHTML=`<span>${icons[type]}</span><span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.animation='toastOut 0.3s ease forwards';setTimeout(()=>t.remove(),300);},3000);
}

function safeId(str) { return str.replace(/[^a-zA-Z0-9\u0900-\u097F]/g,'_'); }
function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function formatDate(d) { try{return new Date(d).toLocaleDateString('hi-IN');}catch{return '—';} }
function formatTime(s) { if(!s) return '—'; const m=Math.floor(s/60),sec=s%60; return m>0?`${m}मि ${sec}से`:`${sec}से`; }
function getFallbackQuestions() {
  return [
    {q:'भारत की राजधानी क्या है?',opts:['मुंबई','दिल्ली','कोलकाता','चेन्नई'],ans:1},
    {q:'भारत में कितने राज्य हैं?',opts:['28','29','30','31'],ans:0},
    {q:'भारत का राष्ट्रीय पशु कौन सा है?',opts:['शेर','हाथी','बाघ','मोर'],ans:2},
    {q:'भारत का संविधान कब लागू हुआ?',opts:['15 अगस्त 1947','26 जनवरी 1950','26 नवंबर 1949','2 अक्टूबर 1948'],ans:1},
    {q:'भारत के प्रथम प्रधानमंत्री कौन थे?',opts:['सरदार पटेल','डॉ. राजेंद्र प्रसाद','जवाहरलाल नेहरू','डॉ. अंबेडकर'],ans:2},
  ];
}
