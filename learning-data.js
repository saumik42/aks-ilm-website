const terms=[
["Tawḥīd","التوحيد","Affirming the oneness of Allah and worshipping Him alone without associating any partners with Him.","Allah is One, and He alone deserves worship.","Qur’an 2:163; see Tafsīr al-Ṭabarī for Allah’s oneness and His exclusive right to worship."],
["Taqwā","التقوى","Consciousness of Allah that leads a person to obey Him and guard against what displeases Him.","Be mindful of Allah in how you live and what you do.","Qur’anic foundation: Qur’an 2:197. Definition clarified by the explanation of Ibn Rajab: taqwā involves placing a protection between oneself and Allah’s displeasure by obeying His commands and avoiding His prohibitions."],
["Tawakkul","التوكل","Reliance upon Allah while taking the appropriate means available to you.","Take the proper steps, then entrust the outcome to Allah.","Qur’an 3:159; its tafsīr explains that tawakkul does not mean abandoning appropriate means and planning."],
["Iḥsān","الإحسان","To worship Allah as though you see Him; and although you do not see Him, know that He sees you.","Worship Allah with excellence and awareness that He always sees you.","Ṣaḥīḥ Muslim 8a"],
["Khushūʿ","الخشوع","Humble submission and attentiveness before Allah, especially in prayer.","Having a humble, focused and present heart before Allah.","Qur’an 23:1–2; Tafsīr Ibn Kathīr on 23:2 explains khushūʿ through fear, tranquillity, humility and the state of the heart."],
["Ṣabr","الصبر","Patient perseverance and steadfastness in obedience to Allah, refraining from sin, and facing hardship.","Remain patient and steadfast in obedience, against sin and through difficulty.","Qur’an 2:153; scholarly tafsīr explains ṣabr as steadfastness in obedience, against disobedience, and through hardship."],
["Shukr","الشكر","Recognizing Allah’s blessings and responding to them with gratitude.","Recognize your blessings as being from Allah and be grateful to Him.","Qur’an 14:7; tafsīr explains shukr as recognizing Allah’s blessings and responding to them with gratitude."],
["Dhikr","الذكر","Remembering Allah with the heart and tongue.","Keeping Allah in your remembrance inwardly and through words of remembrance.","Qur’an 7:205; see its tafsīr for the heart-and-tongue explanation."],
["Duʿāʾ","الدعاء","Calling upon Allah in supplication, praise and need.","Turning directly to Allah and calling upon Him.","Qur’an 2:186; 40:60"],
["Istighfār","الاستغفار","Seeking forgiveness from Allah.","Asking Allah to forgive your sins and shortcomings.","Qur’an 4:110; 71:10"],
["Barakah","البركة","Blessing from Allah through which goodness is established and increased.","Goodness and blessing that Allah places in something.","Qur’an 7:96; its tafsīr explains barakah in terms of blessing, increase and benefit from Allah."],
["Sunnah","السنة","The guidance and way of the Prophet Muhammad ﷺ, known through his sayings, actions and approvals.","The guidance and example of the Prophet Muhammad ﷺ.","Sunan Abī Dāwūd 4607 — the Prophet ﷺ explicitly instructed Muslims to adhere to his Sunnah."],
["Farḍ","الفرض","An act or duty established as obligatory in Islamic law.","Something a Muslim is required to do.","Islamic legal terminology (fiqh).<br><span class='note'>The majority of jurists generally use farḍ and wājib synonymously; the Hanafi school makes a technical distinction between them.</span>"],
["Ṣadaqah","الصدقة","Charity and acts of goodness done seeking Allah’s pleasure.","Giving or doing good for the sake of Allah.","Ṣaḥīḥ Muslim 1005"],
["Ākhirah","الآخرة","The Hereafter: the life that follows this worldly life.","The life after death, including resurrection, judgment and the eternal life to come.","Qur’an 29:64"],
["Shahādah","الشهادة","The testimony that none has the right to be worshipped except Allah and that Muhammad ﷺ is the Messenger of Allah.","The declaration of faith at the foundation of Islam.","Ṣaḥīḥ al-Bukhārī 8; Ṣaḥīḥ Muslim 8a"],
["Ṣalāh","الصلاة","The prescribed act of worship performed through specific words and actions at appointed times.","The five obligatory prayers Muslims perform each day.","Qur’an 4:103 establishes appointed times; Ṣaḥīḥ al-Bukhārī 8 establishes Ṣalāh as a pillar of Islam. The concise definition reflects the prescribed form of prayer taught in the Sunnah."],
["Zakāh","الزكاة","An obligatory form of charity due on qualifying wealth and given to those entitled to receive it.","Giving a required portion of qualifying wealth as an act of worship.","Qur’an 9:60; Ṣaḥīḥ al-Bukhārī 8"],
["Ṣawm","الصوم","Fasting by abstaining from what invalidates the fast from dawn until sunset with the intention of worshipping Allah.","Fasting for Allah from dawn to sunset; fasting Ramadan is one of Islam’s five pillars.","Qur’an 2:183–187"],
["Ḥajj","الحج","The pilgrimage to the Sacred House in Makkah, performed through prescribed rites at their appointed times.","The pilgrimage to Makkah required once in a lifetime for Muslims who are able.","Qur’an 3:97; Ṣaḥīḥ al-Bukhārī 8"],
["ʿIlm","العلم","Knowledge and understanding, especially knowledge that is beneficial and leads a person toward what is true and right.","Beneficial knowledge that helps you learn and understand what is right.","Qur’an 20:114 — Allah instructed the Prophet ﷺ to ask Him for an increase in knowledge."],
["Ikhlāṣ","الإخلاص","Sincerity and purity of intention in worshipping and obeying Allah for His sake alone.","Worship and obey Allah sincerely for His sake.","Qur’an 98:5; the verse commands sincere devotion to Allah in worship."],
["Rizq","الرزق","Provision and sustenance granted by Allah to His creation.","The provision and sustenance that ultimately comes from Allah.","Qur’an 51:58 — Allah is Ar-Razzāq, the Provider."],
["Niyyah","النية","The intention and purpose in a person's heart behind an action.","The intention behind what you do.","Ṣaḥīḥ al-Bukhārī 1 — deeds are according to intentions."],
["Raḥmah","الرحمة","Mercy and compassion, with Allah possessing perfect and all-encompassing mercy.","Mercy and compassion, with Allah's mercy encompassing all things.","Qur’an 7:156 — Allah states that His mercy encompasses all things."],
["Ummah","الأمة","A community or nation united by something in common, often referring in Islamic usage to the community of Muslims.","The worldwide Muslim community united by Islam.","Qur’an 2:143; the verse describes the believers as an ummah, meaning a community or nation."]
];
const benefits=[
  {
    arabic:"رَّبِّ زِدْنِي عِلْمًا",
    text:"“My Lord, increase me in knowledge.”",
    url:"https://quran.com/20/114",
    source:"Surah Taha — Qur’an 20:114"
  },
  {
    text:"Allah raises those who believe and those who have been given knowledge in rank.",
    url:"https://quran.com/58/11",
    source:"Surah Al-Mujadila — Qur’an 58:11",
    note:"Excerpt shown"
  },
  {
    text:"“Are those who know equal to those who do not know?”",
    url:"https://quran.com/39/9",
    source:"Surah Az-Zumar — Qur’an 39:9",
    note:"Excerpt shown"
  },
  {
    text:"Whoever is granted wisdom has certainly been granted abundant good.",
    url:"https://quran.com/2/269",
    source:"Surah Al-Baqarah — Qur’an 2:269",
    note:"Excerpt shown"
  },
  {
    text:"“Ask those who have knowledge if you do not know.”",
    url:"https://quran.com/16/43",
    source:"Surah An-Nahl — Qur’an 16:43",
    note:"Excerpt shown"
  },
  {
    text:"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.",
    url:"https://sunnah.com/muslim:2699a",
    source:"Sahih Muslim 2699a",
    note:"Excerpt from a longer hadith"
  },
  {
    text:"When a person dies, their deeds come to an end except for three, including knowledge from which benefit is gained.",
    url:"https://sunnah.com/muslim:1631",
    source:"Sahih Muslim 1631",
    note:"Excerpt from a longer hadith"
  },
  {
    text:"When Allah intends good for someone, He gives them understanding of the religion.",
    url:"https://sunnah.com/bukhari:71",
    source:"Sahih al-Bukhari 71",
    note:"Excerpt from a longer hadith"
  },
  {
    text:"“Convey from me, even if one verse.”",
    url:"https://sunnah.com/bukhari:3461",
    source:"Sahih al-Bukhari 3461",
    note:"Excerpt from a longer hadith"
  },
  {
    arabic:"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً",
    text:"“O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.”",
    url:"https://sunnah.com/ibnmajah:925",
    source:"Sunan Ibn Majah 925",
    note:"Graded Sahih (Darussalam)"
  },
  {
    text:"The Prophet ﷺ sought refuge in Allah from knowledge that does not benefit.",
    url:"https://sunnah.com/muslim:2722",
    source:"Sahih Muslim 2722",
    note:"Excerpt from a longer supplication"
  }
];