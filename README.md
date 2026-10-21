# Status Checker
## Ihr helft Christian damit er seinene Porsche bekommt und ihr bekommt ein Danke
Ich möchte ein kleines Tool bauen, welches meine Kundenwebseiten aus einer json liest.
Jede Seite prüft ob sie erreichbar ist
Mir in der Konsole das ergebnis ausgibt
Mir eine Logdatei erstellt mit vergangen prüfungen

### Inhalt 
- Datum der Prüfung
- host name
- ip addresse
- status code

### todos
- ich möchte mit einem argument eine neue url hinzufügen (process.argv)
- ich möchte mir eine liste ausgeben mit nicht 200 status, aus der logfile gelesen

### Neue Dinge für uns
1. NPM Node Package Manager https://www.npmjs.com/
 - mit npm init erstellen wir ein eigenes Node Package


### Alte Dinge für uns
1. Git 
 - mit Git init erstellen wir ein neues Git Repository
 -> Versionsverwaltung (aktuell eher für us als Code Backup auf Github)
 - mit git add`<filename>`, fügen wir dateien in die staging area ein 
 - mit git commit erstellen wir einen commit aus der aktuellen staging area
  - git commit -m 'eine vielsagende message'
- wir wollen github nutzen und dafür müssen wir ein remote repository dort erstellen und hier lokal einbinden
- git remote add origin `<uri zum remote repository>`
- aktuelle commits werden mit git push origin main auf das remote repository gebracht

## Starten der Anwendung
1. Rename webseiten.example.json zu webseiten.json
2. Füge die zu prüfenden Webseiten in das Array von webseiten.json ein
3. node index.js