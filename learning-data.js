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
["Ḥajj","الحج","The major pilgrimage to Makkah and nearby sacred sites, performed through prescribed rites on specific days of Dhul-Hijjah.","One of Islam’s five pillars, required once in a lifetime for Muslims who are able.","Qur’an 3:97 establishes Hajj’s obligation for those able to undertake it. Sahih al-Bukhari 8 identifies it as a pillar of Islam, and Sahih Muslim 1337 establishes its once-in-a-lifetime obligation. Sahih Muslim 1218a describes its appointed rites, including being present at ʿArafah."],
["ʿIlm","العلم","Knowledge and understanding, especially knowledge that is beneficial and leads a person toward what is true and right.","Beneficial knowledge that helps you learn and understand what is right.","Qur’an 20:114 — Allah instructed the Prophet ﷺ to ask Him for an increase in knowledge."],
["Ikhlāṣ","الإخلاص","Sincerity and purity of intention in worshipping and obeying Allah for His sake alone.","Worship and obey Allah sincerely for His sake.","Qur’an 98:5; the verse commands sincere devotion to Allah in worship."],
["Rizq","الرزق","Provision and sustenance granted by Allah to His creation.","The provision and sustenance that ultimately comes from Allah.","Qur’an 51:58 — Allah is Ar-Razzāq, the Provider."],
["Niyyah","النية","The intention and purpose in a person's heart behind an action.","The intention behind what you do.","Ṣaḥīḥ al-Bukhārī 1 — deeds are according to intentions."],
["Raḥmah","الرحمة","Mercy and compassion, with Allah possessing perfect and all-encompassing mercy.","Mercy and compassion, with Allah's mercy encompassing all things.","Qur’an 7:156 — Allah states that His mercy encompasses all things."],
["Ummah","الأمة","A community or nation united by something in common, often referring in Islamic usage to the community of Muslims.","The worldwide Muslim community united by Islam.","Qur’an 2:143; the verse describes the believers as an ummah, meaning a community or nation."],
["Tawbah","التوبة","Sincerely returning to Allah by giving up a sin, regretting it, and resolving not to return to it.","Turn back to Allah and turn away from sin.","Qur’an 66:8 commands sincere repentance. Imam al-Nawawi explains in Riyad al-Salihin, Chapter 2, that repentance involves leaving the sin, regretting it, and resolving not to repeat it. Where another person’s rights are involved, those rights must also be addressed."],
["Ḥayāʾ","الحياء","A sense of modesty that encourages good conduct and restrains a person from wrongdoing.","Let modesty guide your behaviour and keep you away from wrongdoing.","Sahih al-Bukhari 6118; Sahih Muslim 37b. The Prophet ﷺ described haya as part of faith and entirely good."],
["Amānah","الأمانة","A trust or responsibility that must be fulfilled faithfully.","Be trustworthy with what you are entrusted with.","Qur’an 4:58 commands the fulfilment of trusts. Tafsir Ibn Kathir explains that these include duties towards Allah and the rights and possessions entrusted to us by others."],
["Ṣidq","الصدق","Truthfulness, especially in what a person says.","Speak the truth and avoid lying.","Sahih al-Bukhari 6094. The Prophet ﷺ taught that truthfulness leads to righteousness, and righteousness leads to Paradise. The hadith encourages consistently speaking the truth and warns against lying."],
["Rifq","الرفق","Gentleness and kindness in how a person speaks and acts.","Deal with others gently and kindly.","Sahih Muslim 2593; 2594a. The Prophet ﷺ taught that Allah loves gentleness and that gentleness beautifies whatever it accompanies."],
["ʿAdl","العدل","Justice and fairness in judgments and dealings with others.","Be fair, including towards people you dislike.","Qur’an 16:90 commands justice. Qur’an 5:8 instructs believers not to let hatred of others lead them to act unjustly."],
["Īmān","الإيمان","Faith in Allah, His angels, His books, His messengers, the Last Day, and divine decree, both its good and its bad.","Believe in the foundations of faith taught by the Prophet ﷺ.","Sahih Muslim 8a identifies these six foundations of iman. Sahih Muslim 35b also describes faith as having branches that include words and actions, such as declaring Allah’s oneness and removing harm from a path."],
["Hidāyah","الهداية","Guidance towards the truth and the straight path.","Being guided to what is right and helped to follow it.","Qur’an 1:6 teaches us to ask Allah for guidance to the straight path. Tafsir Ibn Kathir explains that this includes being directed to the truth and remaining firm upon it."],
["Tawāḍuʿ","التواضع","Humility for the sake of Allah, without arrogance or looking down on others.","Be humble and do not consider yourself above others.","Sahih Muslim 2588 teaches that Allah raises the status of those who humble themselves for His sake. Sahih Muslim 91a describes arrogance as rejecting the truth and looking down on people."],
["Qanāʿah","القناعة","Contentment with the provision Allah has granted.","Be content with what Allah has provided for you.","Sahih Muslim 1054 praises the person who accepts Islam, receives sufficient provision, and is made content by Allah with what He has given. Sahih al-Bukhari 6446 teaches that true wealth is inner richness rather than an abundance of possessions."],
["Mīqāt","الميقات","A designated boundary by which a person approaching Makkah with the intention of performing Hajj or Umrah must enter ihram.","The boundary by which an arriving pilgrim must enter ihram.","Sahih al-Bukhari 1524. The Prophet ﷺ designated pilgrimage boundaries for those approaching with the intention of Hajj or Umrah. The hadith also explains that people already living within these boundaries have different starting-point rules."],
["Iḥrām","الإحرام","The sacred state entered with the intention of beginning Hajj or Umrah, during which certain normally permitted actions become prohibited.","Entering the sacred state of pilgrimage and observing its restrictions.","Islamic legal terminology (fiqh); the Haramain’s official terminology guide explains ihram as the intention to begin the rites of Hajj or Umrah, with specific restrictions applying. Wearing the garments alone does not constitute ihram."],
["Ṭawāf","الطواف","Circling the Kaʿbah seven times as an act of worship.","Going around the Kaʿbah seven times in worship of Allah.","Qur’an 22:29 mentions circling the Sacred House. Sahih al-Bukhari 1645–1646 records the Prophet ﷺ performing seven circuits around the Kaʿbah."],
["Saʿy","السعي","Making seven one-way journeys between Safa and Marwah as part of Hajj or Umrah, beginning at Safa and ending at Marwah.","Going between Safa and Marwah seven times, counting each one-way journey as one.","Qur’an 2:158 establishes the rite between Safa and Marwah. Sahih al-Bukhari 1645–1646 records seven journeys, and Sahih Muslim 1218a describes beginning at Safa and finishing at Marwah. Each one-way journey counts as one, rather than a return trip."],
["ʿUmrah","العمرة","The minor pilgrimage to Makkah, performed through prescribed rites including ihram, tawaf, saʿy, and the prescribed cutting of the hair.","A pilgrimage that can be performed throughout the year, rather than only during Hajj’s annual season.","Qur’an 2:196 commands completing Hajj and Umrah for Allah. Sahih al-Bukhari 1791–1792 describes the Prophet ﷺ performing Umrah, including tawaf and saʿy. The Haramain’s official terminology guide explains its rites and that it is not confined to Hajj’s season."]
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