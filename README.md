# Homework AI – instalare pe telefon

Aplicația poate primi o fotografie cu tema și folosește AI pentru a citi exercițiul și a explica rezolvarea. Este o aplicație web instalabilă (PWA), nu un APK Android.

## Important

Ca să o trimiți pe WhatsApp și să se instaleze pe telefon, trebuie publicată online. Arhiva ZIP nu se instalează direct. Publicarea cere un cont de hosting și o cheie API OpenAI. Cheia API poate avea costuri și trebuie pusă doar în setările private ale serverului, niciodată în site sau în WhatsApp.

## Publicare

1. Descarcă și dezarhivează acest ZIP pe PC.
2. Intră pe https://github.com și creează un repository nou.
3. În repository apasă **Add file → Upload files** și încarcă toate fișierele din folderul `homework-ai-vision` (inclusiv `render.yaml`). Apasă **Commit changes**.
4. Intră pe https://render.com și conectează contul GitHub.
5. Alege **New → Blueprint**, selectează repository-ul și pornește deploy-ul.
6. În setările serviciului, adaugă variabila `OPENAI_API_KEY` cu cheia ta API OpenAI. Nu o trimite nimănui.
7. Așteaptă să se termine deploy-ul și deschide adresa HTTPS oferită de Render.

## Instalare pe telefon

**Android:** deschide adresa HTTPS în Chrome → meniul cu trei puncte → **Instalează aplicația** sau **Adaugă la ecranul de pornire**.

**iPhone:** deschide adresa HTTPS în Safari → **Share** → **Add to Home Screen**.

După publicare, trimite adresa HTTPS pe WhatsApp. Celălalt telefon deschide linkul și instalează aplicația din browser.

## Testare pe PC

Necesită Node.js 18 sau mai nou. În acest folder rulează `npm install`, setează variabila `OPENAI_API_KEY`, apoi rulează `npm start` și deschide http://localhost:3000.
