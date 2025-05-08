Funksjonalitetsbeskrivelse:
Kundeklager 360 er en app som lar kunder gi oss klager. Disse klagene inkluderer navn på kunden og en beskrivelse av hva klagen er. Klagen inneholder også prioritet på hvor viktig klagen er, statusen på om klagen er ny, under behandlig eller ferdig, og en kategori på hva klagen handler om.

For å bruke siden så starter du med å lage en bruker og logger inn. H


Begrunnelse for teknologivalg:
    Frontend
    React:  React er et rammeverk for javascript som jeg velger siden jeg har brukt det mest og er det jeg kan mest om.
    Typescript: Typscript lar deg definere typer som gjør at du kan se hva en funksjon tar inn som props og får opp autofylling når du bruker data fra databasen og liknende quality of life ting. Jeg velger å bruke typescript siden det blir veldig hjelpsomt når jeg skal bruke komponenter jeg har lagd og data fra databasen.
    Vite: Vite er et byggeverktøy som lar deg lage en ny frontend applikasjon og gir deg en god template slik at jeg kan begynne med en gang.
    Mui: Mui er et komponent bibliotek som har mange komponenter klare for bruk og som kan lett tilpasses med styling. Jeg velger Mui på grunn av min erfaring med biblioteket og stort tilbud av komponenter.
    Tanstack query: Tanstack query gjør data henting mer effektiv og automatisk slik at jeg får mindre å gjøre når jeg setter opp data henting.
    
    Backend
    .NET: Jeg velger å bruke .Net siden det er veldig raskt og effektivt og har tillgang til masse verktøy som forbedrer det. .NET er også det jeg har mest erfaring og kunnskap om. 
    Swagger: Swagger lar deg enkelt teste kontrollere i backenden. Her vises hvilke data som trengs i et API kall og gir deg. Jeg velger å bruke swagger slik at jeg kan lett teste kontrollere.
    
    Database
    MySQL:  MySQL er det database systemet jeg har brukt mest og velger å bruke her også


Hvordan kjøre prosjektet:
Gå i terminalen og kjør:
“git clone git@github.com:EvenM05/Kundeklager360.git”.
Så skriver du “cd backend” og så skriver du “dotnet restore” for å laste ned alle pakkene til prosjektet. Etter det skriver du “dotnet run” for å kjøre backenden til prosjektet

Etter det så åpner du en ny terminal og skriver “cd frontend” og skriver “npm install” for å laste ned alle pakkene til frontenden. Så skriver du “npm run dev” for å kjøre frontenden. 

Det siste du skal gjøre er å starte databasen. Last ned et program som heter docker desktop. Så går lager du en ny terminal og skriver “cd backend” og så “docker-compose up -d”. Dette vil gjøre databasen tilgjengelig i docker desktop slik at du kan kjøre den.


Skisser, diagrammer, etc:
