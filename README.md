# MovieShelf

MovieShelf to aplikacja webowa do zarządzania osobistą biblioteką filmów.  
Umożliwia dodawanie, edytowanie, usuwanie i przeglądanie filmów, a także wyszukiwanie tytułów oraz wyświetlanie szczegółowych informacji o wybranym filmie.

---

## 1. Opis projektu

Celem projektu było stworzenie aplikacji webowej opartej na wzorcu architektonicznym MVC (Model–View–Controller).  
Aplikacja umożliwia użytkownikowi:

- dodawanie nowych filmów do biblioteki  
- edytowanie istniejących filmów  
- usuwanie filmów  
- przeglądanie kolekcji filmów  
- wyszukiwanie filmów po tytule  
- wyświetlanie szczegółowych informacji o wybranym filmie  

Dodatkowo aplikacja integruje się z zewnętrznym REST API (OMDb) w celu automatycznego pobierania plakatów filmów, jeśli użytkownik nie poda adresu URL obrazu ręcznie.

---

## 2. Wzorzec architektoniczny (MVC)

Aplikacja została zaimplementowana z wykorzystaniem wzorca MVC (Model–View–Controller):

- **Model** – warstwa danych zaimplementowana przy użyciu Prisma ORM oraz bazy danych SQLite  
- **View** – interfejs użytkownika zaimplementowany przy użyciu szablonów EJS oraz CSS  
- **Controller** – logika aplikacji i obsługa żądań HTTP zaimplementowana przy użyciu kontrolerów Express  

Taki podział pozwala na lepszą organizację kodu, łatwiejsze utrzymanie aplikacji oraz wyraźny podział odpowiedzialności pomiędzy poszczególnymi warstwami.

---

## 3. Wykorzystane technologie i framework

- Node.js  
- Express.js  
- EJS (szablony HTML)  
- Prisma ORM  
- Baza danych SQLite  
- CSS  
- REST API (OMDb)  

---

## 4. Architektura frameworka i użyte narzędzia

### 4.1 Routery kierujące ruchem HTTP

Do obsługi routingu HTTP wykorzystano Express Router.  
Zdefiniowano m.in. następujące trasy:

- `GET /movies` – wyświetlenie listy filmów  
- `GET /movies/new` – wyświetlenie formularza dodawania filmu  
- `POST /movies` – dodanie nowego filmu  
- `GET /movies/:id` – wyświetlenie szczegółów filmu  
- `GET /movies/:id/edit` – wyświetlenie formularza edycji  
- `POST /movies/:id/edit` – aktualizacja danych filmu  
- `POST /movies/:id/delete` – usunięcie filmu  

---

### 4.2 Szablony HTML (Views)

Interfejs użytkownika został zaimplementowany przy użyciu szablonów EJS.  
Szablony odpowiadają za renderowanie:

- listy filmów  
- widoku szczegółów filmu  
- formularzy dodawania i edycji  
- wspólnego layoutu i nawigacji  

---

### 4.3 Konektor do bazy danych i ORM

Jako konektor do bazy danych wykorzystano Prisma ORM.  
Jako bazę danych zastosowano SQLite (lekka baza plikowa).

Prisma zapewnia:

- definicję modeli danych  
- migracje schematu bazy danych  
- typowane zapytania do bazy  
- automatyczne generowanie klienta bazy danych  

---

### 4.4 Integracja z REST API

Aplikacja integruje się z zewnętrznym REST API **OMDb**.

Podczas dodawania filmu:

- jeśli użytkownik nie poda adresu URL obrazu  
- serwer wysyła żądanie HTTP do API OMDb  
- pobiera plakat filmu  
- i automatycznie zapisuje go w bazie danych  

Dzięki temu dane w aplikacji są wzbogacane o informacje pochodzące z zewnętrznego serwisu.

---

## 5. Problemy i sposoby ich rozwiązania

### 5.1 Zmiany schematu bazy danych

Problem:  
Po rozszerzeniu modelu Movie o nowe pole (`imageUrl`) konieczna była aktualizacja struktury bazy danych.

Rozwiązanie:  
Zastosowano migracje Prisma w celu zsynchronizowania schematu bazy danych z aktualnym modelem aplikacji.

---

### 5.2 Integracja z zewnętrznym REST API

Problem:  
Aplikacja musiała pobierać plakaty filmów z zewnętrznego serwisu oraz obsługiwać możliwe błędy API.

Rozwiązanie:  
Utworzono osobną warstwę serwisową (`omdb.service.js`) odpowiedzialną za komunikację HTTP z API OMDb.  
Kontroler korzysta z tej warstwy oraz stosuje logikę awaryjną (fallback), jeśli API nie zwróci poprawnych danych.

---

### 5.3 Długie opisy psujące układ strony

Problem:  
Bardzo długie opisy lub ciągi znaków bez spacji powodowały problemy z układem interfejsu.

Rozwiązanie:  
Wymuszono zawijanie tekstu za pomocą CSS oraz ograniczono długość wyświetlanego opisu w widokach listy i szczegółów filmu.

---

## 6. Jak uruchomić projekt

1. Instalacja zależności:

```bash
npm install

Utworzenie bazy danych i zastosowanie migracji:

npx prisma migrate dev

Uruchomienie aplikacji:

npm run dev

Otwarcie w przeglądarce:

http://localhost:3000

7. Struktura projektu
src/
  controllers/
  routes/
  views/
  public/
  services/
  db/
prisma/

8. Możliwe kierunki rozwoju

uwierzytelnianie i autoryzacja użytkowników

kategorie i tagi filmów

stronicowanie listy filmów

konta użytkowników

przechowywanie obrazów w chmurze

9. Podsumowanie

MovieShelf to kompletna aplikacja webowa w architekturze MVC, demonstrująca:

wzorzec MVC

integrację z bazą danych przy użyciu ORM

integrację z REST API

operacje CRUD

dynamiczne szablony HTML

przejrzystą strukturę projektu

Projekt spełnia wszystkie wymagania zaliczeniowe przedmiotu PAI MVC.