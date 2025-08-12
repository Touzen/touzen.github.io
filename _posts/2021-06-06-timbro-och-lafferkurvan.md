---
layout:            post
title:             "Timbro och Lafferkurvan"
date:              2021-06-06 15:00:00 +0200
---
Jacob Lundberg har en doktorsexamen från Uppsala Universitet, är [chefsekonom på Timbro](https://timbro.se/person/jacob-lundberg/?prev=/om-oss/medarbetare/) och är en varm anhängare av *Lafferkurvan*. Det är en idé som bygger på att det finns en optimal skattenivå som maximerar skatteintäkterna, men som lustigt nog alltid används för att argumentera för att denna optimala nivå är lägre än dagens skattesatser.

![En Lafferkurva där den optimala skattesatsen bedömts vara 70 %.](/images/nek/laffer.png){: .center-image }

I [en bloggpost](https://timbro.se/ekonomi/skatter/lafferkurvans-aterkomst/) bygger han caset för att Lafferkurvan inte förtjänar sitt rykte som pseudointellektuell tramsteori utan i själva verket går att belägga empiriskt. Det gör han på ett väldigt tokigt sätt.

## Lafferkurvan är orimlig
Först vill jag dock bemöta ett vanligt motargument mot Lafferkurvan, nämligen att den är ointressant eftersom den är tautologiskt och oanvändbar eftersom vi inte känner till dess exakta form. Det här argumentet ger Lafferkurvan alldeles för mycket legitimitet som idé, och tar för givet att kurvan överhuvudtaget har ett maximum. Premissen är att människor kommer att arbeta mindre och mindre ju högre skattenivån är. Om staten tar mellan 90 - 100 % av din inkomst så kommer du ju helt enkelt att sluta arbeta eftersom det inte tjänar något till.

Är detta verkligen ett så uppenbart antagande? I vårt ekonomiska system har vi vissa utgifter som vi *måste* betala. Om staten tar 90 % av min inkomst så innebär inte det att jag slutar behöva äta mat eller någonstans att bo. Är det då inte lika tänkbart att människors arbetsutbud snarare *ökar* med stigande skatter eftersom de måste arbeta mer för att försörja sig?[^1] 

På samma sätt kan man utan problem föreställa sig att skattesänkningar leder till att folk går ner i arbetstid, eftersom deras levnadskostnader är konstanta men antalet arbetade timmar som krävs för försörjning sjunker. TCO [hittade](https://www.tco.se/nyheter-och-debatt/Pressmeddelanden/Press2011/Bara-2-procent-sager-sig-jobba-mer-genom-jobbskatteavdraget/)[^2] faktiskt stöd för liten sådan effekt i samband med att jobbskatteavdragen infördes.

Vilket leder oss in på en annan stark kritik av Lafferkurvan som är lite vanligare: att sambandet bygger på att människor fritt kan välja hur mycket de arbetar. För att effekten av sänkta skatter ska bli högre skatteintäkter måste möjligheten att öka sin inkomst[^3] leda till att folk arbetar fler timmar. Men i Sverige har vi en väldigt stark 8-timmarsnorm som man i princip bara avviker från om man går *ner* i arbetstid. Dessutom är det många, [särskilt bland höginkomsttagare](https://www.researchgate.net/publication/221963254_Den_utbredda_flexibiliteten_Ett_forsok_att_berakna_forekomsten_av_lagreglerade_arbetsvillkor), som jobbar med förtroendearbetstid och därmed inte kan öka sin inkomst genom att arbeta fler timmar[^4].

## Varför Lundberg har fel alldeles oavsett
Studien som Lundberg skriver om i sin bloggpost har han själv gjort, och i den studien hävdar han att han har hittat parametrar som beskriver vilken form Lafferkurvan har i Sverige. Den som läst vetenskapsfilosofi studsar nog till här. Hur konstruerar man ett sådant experiment? Ett förslag är att välja ut två grupper med samma inkomstfördelning, sänka den ena gruppens skatter, låta den andra gruppen vara kontrollgrupp och sedan mäta skillnaden i totalt antal arbetade timmar mellan grupperna.

Det är såklart omöjligt. Till skillnad från naturvetare och teknologer så kan inte en nationalekonom alltid konstruera experiment för att pröva sina hypoteser. Så det Lundberg istället har gjort är helt enkelt att uppskatta parametrarna baserat på att samhällsekonomin beter sig som ett datorprogram han själv har utvecklat[^5] och som heter [SLIMM](https://www.econstor.eu/handle/10419/197649).

Skummar man igenom artikeln som beskriver modellen blir det genast tydligt att den bygger på väldigt många antaganden om hur människor beter sig. Något så komplext som människors reaktion på ändrade skattesatser, deras funderingar kring att gå ner i arbetstid för att vara en mer närvarande förälder, eller ambitioner om att jobba hårt för att ha råd med en bostadsrätt, allt detta reduceras till:

{% raw %}
  $$ \varepsilon_w (s) = \theta (s) \frac{v'(y^*-T(y^*)[y^* - T(y^*) + T(0;s)])}{v(y^* - T(y^*)) - \mu(y;s) - v(-T(0;s))}$$ 
{% endraw %}

Det ser ut som en väldigt komplicerad formel, och det är det också på sätt och vis. Men det är i grunden en formel som antar att alla människor med en vissa "skill" på arbetsmarknaden tänker exakt likadant. Det finns något oerhört arrogant i idén att den här typen av beteenden, som ofta bygger på värderingar och magkänsla och hundra andra faktorer, kan modelleras med deterministiska formler som får plats på en A4. Människor reduceras till ofria hyperrationella miniräknare, och grädden på moset är att den här människosynen torgförs av en tankesmedja som påstår sig sätta individens frihet i centrum.

## Ideologisk blindhet förklädd som forskning
Jag arbetar med artificiell intelligens och maskininlärning. Precis som många nationalekonomer så jobbar jag alltså med att bygga och utvärdera modeller som genom att förklara data också ska kunna säga något användbart om framtiden. En av de viktigaste delarna i det arbetet är att säkerställa modellernas kvalité.

Om våra modeller inte är bra nog kommer de ge spotta ur sig resultat som i bästa fall är opålitliga men i värsta fall är farliga. En ansiktsigenkänningsmodell som är tränad på etniskt snedvriden data kan t.ex. diskriminera minoriteter. För att undvika sådana utfall läggs stort fokus på att utvärdera modeller på ett vetenskapligt robust sätt för att utesluta olika former av bias. Sambanden som en ansiktsigenkänningsmodell beskriver testas till exempel genom att vi låter den gissa vem det är på en given bild där vi vet vad rätt svar är.

Lundberg verkar inte göra något sådant för att säkerställa kvalitén hos sin modell. Det enda han gör är att gissa effekterna av olika ändringar i skattesatserna. Detta är dock inte en utvärdering av modellen eftersom han *inte vet vad rätt svar är* och därmed inte har något att jämföra mot. Modellens användbarhet vilar alltså helt och hållet på att alla de antaganden han gör är korrekta. Ett exempel på ett antagande som görs är att en anställd *själv kan bestämma sin lön* och att *efterfrågan på arbetskraft är obegränsad*.

Det är självklart inte ekonomers fel att de nästan aldrig kan utföra riktiga experiment. Även andra samhällsvetenskaper lider av det problemet. Nationalekonomins huvudfåra verkar dock lida av en patologisk oförmåga att *inse sina begränsningar*. Om dina slutsatser helt och hållet vilar på dina (ej empiriskt vederlagda och ofta orealistiska) antaganden så ska de tolkas extremt försiktigt. Är det dessutom så att dina svaga slutsatser dessutom riskerar att användas för att underminera ett lands skatte- och välfärdssystem bör du nog explicit avråda läsaren från att dra några slutsatser.

Det gör inte Lundberg på Timbro. Han använder sin väldigt svaga forskningsmetod för att komma fram till orealistiskt starka föreskrifter om att Sveriges politiker bör sänka skatterna för höginkomsttagare. Det kan inte beskrivas som något annat än ett naket försök att klä radikal högerpolitik i vetenskaplig skrud.

---

[^1]: Det finns såklart goda invändningar även mot detta resonemang. Man kan t.ex. förvänta sig att den svarta marknaden växer om skattenivåerna är så höga att folk inte kan försörja sig. Men eftersom Lafferkurvan uteslutande används för att motivera skattesänkningar för höginkomsttagare med *dagens* skattenivåer gäller inte detta eftersom gruppen svartjobbande höginkomsttagare är obefintlig och ärligt talat svår att föreställa sig.
[^2]: Jag vet att jag har sett starkare belägg för den här effekten tidigare, men jag minns inte riktigt var. Får bli en TODO för mig att leta fram den källan.
[^3]: Som vanligt kan inte teorierna hantera att människor drivs av något annat än att maximera sin inkomst. Att människor skulle välja att konsumera på samma nivå och istället umgås mer med sin familj funkar inte eftersom det är ekonomiskt irrationellt att prioritera sina nära och kära.
[^4]: Även om du som anställd teoretiskt skulle kunna/vilja arbeta mer än 100 % är det osannolikt att din arbetsgivare skulle gå med på det. För det första skulle det innebära att arbetsgivaren har en underdimensionerad arbetsstyrka och samtidigt ha utrymme för att betala den extra lönen dina timmar kräver. Din arbetsgivare skulle också behöva vara helt omedveten om den ocean av forskning som visar att de där extra timmarna du erbjuder inte kommer gå att använda effektivt i och med att en anställds produktivitet stadigt minskar med antalet arbetade timmar.
[^5]: Baserat på sökningar i Google Scholar är det också framförallt han själv som använder det. Sverige är ett litet land, så det behöver inte vara så anmärkningsvärt i sig. Men givet att artikeln som introducerar SLIMM inte tycks vara peer-reviewad och att koden till modellen inte går att hitta online är det svårt att bedöma modellens kvalité.