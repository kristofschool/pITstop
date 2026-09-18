/* =========================================================
   ICT PITSTOP — data.
   Dit is het ENIGE bestand dat je aanpast om een stappenplan
   toe te voegen, te wijzigen of te verwijderen. index.html en
   app.js blijven onaangeroerd.

   Elke tegel: id, icon (zie ICONS in app.js), title, sub, en stappen.
   - Platte lijst:  steps:[ {title, note} ]
   - Met delen:     sections:[ {title, steps:[...]} ]
   - Prijslijst:    type:"prices", groups:[ {title, items:[{name,price,note}]} ]
   - Optioneel info-kaartje bovenaan: info:"tekst"
   ========================================================= */
const PLANS = [
  {
    id:"badge-kwijt",
    icon:"badge",
    title:"Badge kwijt",
    sub:"Nieuwe Click4Food-badge",
    info:"Meld het meteen als je je badge kwijt bent: wie ze vindt, kan met jouw account eten in het schoolrestaurant.",
    sections:[
      {
        title:"Badge kwijt?",
        steps:[
          {title:"Ga tijdens een pauze naar het ICT-lokaal"},
          {title:"Neem €5 mee", note:"Betalen met cash of Bancontact."},
          {title:"Wij maken meteen een nieuwe badge voor je"}
        ]
      },
      {
        title:"Badge werkt niet meer?",
        steps:[
          {title:"Geen zichtbare schade? Dan krijg je gratis een nieuwe", note:"Werkt je badge niet meer terwijl hij niet beschadigd is, dan vervangen we hem kosteloos."}
        ]
      }
    ]
  },
  {
    id:"herstelling-ipad",
    icon:"wrench",
    title:"Herstelling iPad",
    sub:"iPad of screenprotector kapot?",
    info:"Kies hieronder de situatie die bij jou past.",
    sections:[
      {
        title:"1 — Heb je een verzekering via de school?",
        steps:[
          {title:"Meld de herstelling aan in het ICT-lokaal", note:"Je krijgt een blaadje met info om de franchise (€60,50) te betalen."},
          {title:"Betaal de franchise van €60,50"},
          {title:"Geef je iPad af in het ICT-lokaal"},
          {title:"Je krijgt een vervang-iPad van ICT", note:"Zo kan je gewoon verder werken tijdens de herstelling."}
        ]
      },
      {
        title:"2 — Geen verzekering?",
        steps:[
          {title:"Zorg zelf voor een herstelling", note:"De herstelling regel én betaal je dan zelf."},
          {title:"Heb je ondertussen een iPad nodig? Leen er één van de school", note:"Betaal een waarborg van €60,50. Die krijg je terug als je de leen-iPad onbeschadigd teruggeeft."}
        ]
      },
      {
        title:"3 — Enkel je screenprotector kapot?",
        steps:[
          {title:"Kom met €15 naar het ICT-lokaal"},
          {title:"Wij leggen meteen een nieuwe screenprotector op"}
        ]
      }
    ]
  },
  {
    id:"ipad-raar",
    icon:"help",
    title:"De iPad doet raar?",
    sub:"App of iPad vertoont vreemd gedrag",
    info:"Volg deze stappen van boven naar onder.",
    steps:[
      {title:"Herstart eerst je iPad", note:"Zet hem volledig uit en terug aan."},
      {title:"Controleer je opslag en updates", note:"Heb je nog genoeg opslagruimte vrij? En staan er updates klaar? Kijk na in de Instellingen of in de Jamf Student-app."},
      {title:"Open de Student-app en klik onderaan links op je naam"},
      {title:"Kijk hoelang geleden je iPad contact maakte met Jamf", note:"Dit hoort maar enkele seconden geleden te zijn."},
      {title:"Zijn dat uren of dagen? Klik dan op 'Verversen'"},
      {title:"Probeer daarna de app of handeling opnieuw", note:"Kijk of het probleem nu weg is."},
      {title:"Nog niet opgelost en niet dringend? Maak een helpdeskticket via Smartschool"},
      {title:"Is het wél dringend? Ga langs het ICT-lokaal tijdens de openingsuren"}
    ]
  },
  {
    id:"ipad-batterij",
    icon:"battery",
    title:"iPad niet opgeladen",
    sub:"Batterij leeg of loopt snel plat?",
    info:"Kies hieronder wat er bij jou aan de hand is.",
    sections:[
      {
        title:"1 — Gewoon vergeten op te laden?",
        steps:[
          {title:"Laad je iPad op in het ICT-lokaal", note:"We lenen geen laders uit, maar je mag je iPad bij ons komen opladen."}
        ]
      },
      {
        title:"2 — Loopt je iPad snel plat?",
        steps:[
          {title:"Zet de helderheid lager", note:"Een scherm op volle helderheid verbruikt veel batterij."},
          {title:"Zet de energiebesparingsmodus aan", note:"Instellingen → Batterij → Energiebesparingsmodus."},
          {title:"Sluit apps die je niet gebruikt"},
          {title:"Zet wifi of Bluetooth uit als je ze niet nodig hebt"}
        ]
      },
      {
        title:"3 — Batterijconditie checken (iPad 11)",
        steps:[
          {title:"Ga naar Instellingen → Batterij → Batterijconditie", note:"Alleen de iPad 11 heeft dit scherm. Je ziet er de maximale capaciteit en het aantal laadcycli."}
        ]
      },
      {
        title:"4 — Batterijconditie checken (iPad 9 of iPad 10)",
        steps:[
          {title:"Zet analyse-deling aan", note:"Instellingen → Privacy en beveiliging → Analyse en verbeteringen → zet 'Deel iPad-analyse' aan. Deze iPads hebben géén batterijconditie-scherm."},
          {title:"Wacht 24 tot 48 uur", note:"Stond het delen net uit? Dan maakt je iPad eerst een logbestand aan."},
          {title:"Open de analysegegevens", note:"Terug naar Analyse en verbeteringen → tik op 'Analysegegevens'."},
          {title:"Zoek het nieuwste logbestand", note:"Scroll naar het recentste bestand dat begint met 'Analytics' of eindigt op '.synced' (of 'log-aggregated')."},
          {title:"Zoek de batterijwaarden op", note:"Open het bestand, tik op de zoek-/deelknop en zoek naar 'MaximumCapacityPercent' (batterijconditie in %) en 'CycleCount' (aantal laadcycli)."},
          {title:"Lukt het niet? Kom langs bij het ICT-team", note:"Wij lezen de batterij ook uit met een computerprogramma (bv. iMazing of coconutBattery)."}
        ]
      },
      {
        title:"5 — Vermoed je een technisch probleem?",
        steps:[
          {title:"Breng je iPad, lader én kabel mee naar het ICT-team", note:"Zo kunnen we alles samen testen."}
        ]
      }
    ]
  },
  {
    id:"ipad-configuratie",
    icon:"settings",
    title:"Nieuwe iPad instellen",
    sub:"Configuratie van een nieuwe iPad",
    info:"Kies hieronder welke situatie bij jou past.",
    sections:[
      {
        title:"1 — iPad kopen of huren via de school",
        steps:[
          {title:"Ga langs bij het ICT-team", note:"Zij regelen de aankoop of huur en zetten je iPad klaar."}
        ]
      },
      {
        title:"2 — Je eigen iPad koppelen",
        steps:[
          {title:"Wis je iPad volledig", note:"Zet hem terug op de fabrieksinstellingen (leeg beginscherm)."},
          {title:"Ga met je gewiste iPad naar het ICT-team", note:"Je iPad wordt gekoppeld aan het systeem van de school."}
        ]
      },
      {
        title:"3 — Daarna",
        steps:[
          {title:"Doorloop de configuratiestappen", note:"Volg dit stappenplan om je iPad helemaal in te stellen.", link:{url:"https://docs.google.com/document/d/1hbkc2CwMuH4d3xFT3Hsv_nOQAAPtitROAX1QAm_aQF0/edit", label:"Open het stappenplan"}}
        ]
      }
    ]
  },
  {
    id:"safe-exam-browser",
    icon:"lock",
    title:"Safe Exam Browser",
    sub:"Foutmelding bij een toets of taak?",
    info:"Krijg je een foutmelding bij het opstarten van je BookWidgets-toets of -taak? Werk de stappen hieronder af.",
    sections:[
      {
        title:"1 — Lees eerst de foutmelding",
        steps:[
          {title:"Lees de foutmelding aandachtig", note:"Vaak staat er precies wat je moet doen — bijvoorbeeld toegang geven tot je camera of microfoon via de Instellingen."}
        ]
      },
      {
        title:"2 — Geen duidelijke foutmelding? Werk deze lijst af",
        steps:[
          {title:"Herstart je iPad"},
          {title:"Test je internet in Safari", note:"Surf naar een willekeurige website en kijk of die laadt."},
          {title:"Geen internet? Controleer of je wifi aan staat"},
          {title:"Wifi in orde én iPad herstart? Controleer je updates", note:"Kijk zowel in de Student Resources als in de Instellingen van je iPad of er updates klaarstaan."},
          {title:"Voer alle beschikbare updates uit"}
        ]
      },
      {
        title:"3 — Lukt het nog steeds niet?",
        steps:[
          {title:"Ga met je iPad naar het ICT-team"}
        ]
      }
    ]
  },
  {
    id:"apps-installeren",
    icon:"apps",
    title:"Apps installeren",
    sub:"Apps via de Jamf Student-app",
    info:"Zolang je ingelogd bent met je managed Apple ID installeer je apps enkel via de Jamf Student-app.",
    sections:[
      {
        title:"1 — Hoe werkt het?",
        steps:[
          {title:"Belangrijke apps staan er automatisch op", note:"Die installeren wij voor jou. Sommige kan je zelfs niet verwijderen."},
          {title:"Andere apps installeer je zelf via Jamf Student", note:"Open de Jamf Student-app en installeer de app die je nodig hebt."}
        ]
      },
      {
        title:"2 — Is er een app verdwenen?",
        steps:[
          {title:"Kijk of je de enige in je klas bent met dit probleem"},
          {title:"Controleer of de app niet in de resources staat", note:"Kijk in de Student Resources of je hem daar (opnieuw) kan installeren."},
          {title:"Alles in orde en toch weg? Maak een helpdeskticket aan", note:"Via Smartschool."}
        ]
      },
      {
        title:"3 — Een app die wij niet aanbieden?",
        steps:[
          {title:"Log uit bij iCloud en meld je aan met een persoonlijk Apple ID", note:"Op dit moment de enige manier om een app te installeren die wij niet aanbieden."},
          {title:"Installeer de gewenste app"},
          {title:"Log daarna opnieuw in met je managed Apple ID", note:"Let op: we weten nog niet of deze werkwijze blijvend is of maar tijdelijk werkt."},
          {title:"Apps buiten onze whitelist werken niet tijdens de schooluren", note:"Een zelf geïnstalleerde app die niet op onze whitelist staat, kan je tijdens de lesuren niet gebruiken."}
        ]
      }
    ]
  },
  {
    id:"goodnotes",
    icon:"goodnotes",
    title:"Goodnotes",
    sub:"Documenten verdwenen of niet zichtbaar?",
    info:"Volg deze stappen van boven naar onder.",
    steps:[
      {title:"Herstart eerst je iPad", note:"Zet hem volledig uit en terug aan."},
      {title:"Controleer of er updates klaarstaan", note:"Kijk in de Instellingen of in de Jamf Student-app of er updates zijn voor Goodnotes of je iPad."},
      {title:"Staat Goodnotes in iCloud en ben je ingelogd met je managed Apple ID?", note:"Dat is je schoolaccount, eindigend op @leerling.sjsp.be."},
      {title:"Staat er een filter aan die documenten verbergt?", note:"Tik op het filter-icoontje (3 horizontale streepjes die een pijl vormen) en zet het op 'Alle'."},
      {title:"Bevat het wolkje bij je documenten een uitroepteken?", note:"Dat wijst op een probleem met de cloudopslag of synchronisatie."},
      {title:"Nog niet opgelost en niet dringend? Maak een helpdeskticket via Smartschool"},
      {title:"Is het wél dringend? Ga langs het ICT-lokaal tijdens de openingsuren"}
    ]
  },
  {
    id:"prijzen",
    icon:"euro",
    title:"Prijzen",
    sub:"Wat kost wat?",
    type:"prices",
    groups:[
      {
        title:"iPad-toebehoren",
        items:[
          {name:"Pencil (Apple-compatibel)", price:"€15", note:"Geen originele Apple Pencil, wel met logo van de school."},
          {name:"Screenprotector", price:"€15", note:"Wij leggen hem meteen voor je op."},
          {name:"Nieuw hoesje", price:"€45", note:"Verkrijgbaar in het ICT-lokaal."},
          {name:"Nieuwe lader", price:"€15"},
          {name:"Originele Apple-kabel", price:"€25"}
        ]
      },
      {
        title:"Bij het onthaal",
        items:[
          {name:"Lockersleutel", price:"Onthaal", note:"Niet bij ICT — te verkrijgen bij het onthaal."},
          {name:"T-shirt LO", price:"Onthaal", note:"Niet bij ICT — te verkrijgen bij het onthaal."}
        ]
      },
      {
        title:"Diensten",
        items:[
          {name:"Franchise iPad-herstelling", price:"€60,50", note:"Bij verzekering via de school."},
          {name:"Waarborg leen-iPad", price:"€60,50", note:"Krijg je terug bij correcte teruggave."}
        ]
      }
    ]
  }
];
