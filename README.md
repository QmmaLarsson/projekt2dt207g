# Projekt i kursen DT207G, Backend-baserad webbutveckling
**Namn:** Emma Larsson\
**Student-ID:** emla2309

### Beskrivning av lösning
Detta är en webbplats som är skapad för en våffelrestaurang. Webbplatsen visar bland annat en meny över de maträtter och drycker som finns att beställa på restaurangen. Det finns även en adminfunktion som gör det möjligt för ansvariga på restaurangen att logga in på webbplatsen och göra förändringar i menyn.

Webbplatsen använder sig av Fetch API för att hämta data (GET), skicka data (POST), redigera data (PUT) samt radera data (DELETE) från och till en extern webbtjänst. Metoden GET används för att hämta innehållet i menyn på webbplatsen, metoderna POST, PUT och DELETE används för att göra förändringar i menyn på webbplatsen. Metoden POST används även för att logga in en redan existerande användare på webbplatsen.

När en användare loggas in skapas en JWT-token på den anropade webbtjänsten som skickas till klienten. Denna sparas i användarens localStorage. Tokenet används för att bibehålla användarens autetiseringsstatus mellan olika sessioner. Webbläsaren kontrollerar autentiseringen vid varje förfrågan till en skyddad resurs. Om tokenet är giltigt ges användaren tillgång till resursen, annars krävs en ny inloggning. Det krävs ett token för att kunna göra ändringar i menyn på webbplatsen.

### Länk till publicerad webbplats
https://projektdt207g.netlify.app/

### Länk till APIets GitHub-repo
https://github.com/QmmaLarsson/projekt_dt207g.git