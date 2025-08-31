- rsync, vedi altra app (ngproj??) (https://jaygould.co.uk/2022-08-12-docker-node-problems-development-prisma/ e https://unix.stackexchange.com/questions/178078/how-to-rsync-a-directory-to-a-new-directory-with-different-name)
- per sviluppo: servono devcontainer o sviluppo docker che ricompila il codice dentro container ogni volta che lo cambi in locale
- usa nuovo sito cloudflare?? ma serve container cloudflare ddns penso
- i due eseguibili sono diversi solo per qualche lettera, non è possibile tenere solo un eseguibile e semmai, se si hanno degli input all'eseguibile, si potrebbe far partire un container invece che un altro?
- node alpine?? vulnerabilities... (https://www.youtube.com/watch?v=mA8wtTUCdgc)
- multi stage builds per ridurre dimensione immagine (https://www.youtube.com/watch?v=YlVmVO0zAfw)

# Sul codice
- app.use(express.json());
- throw dell'errore anche quando non c'è secret_token, e forse anche gli altri parametri (subito dopo init())
- All'inizio: stampa tutto -> dominio, porta, tutto, e altra roba che c'è anche sul .env (basterebbe fare env.ts e stampare quello come su Traffic-Monitoring)
 