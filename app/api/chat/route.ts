import { env } from '@/app/config/env';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const AboutMeData = `
# Adam Pukaluk - Developer Data Package

## 📋 Informacje osobiste
- **Imię i nazwisko**: Adam Pukaluk
- **Wiek**: 15 lat
- **Stanowisko**: Programista Full Stack
- **Doświadczenie**: Ponad 2 lata programowania
- **Cel zawodowy**: Zdobycie stażu, aby rozwijać się w branży IT
- **Lokalizacja**: Polska

## 📞 Dane kontaktowe
- **Telefon**: 695-031-104
- **Email**: pukaluk.adam505@gmail.com
- **Profil**: [Bento.me/adam-pukaluk](https://bento.me/adam-pukaluk)

## 📝 Podsumowanie zawodowe
Adam to 15-letni programista z pasją do tworzenia aplikacji zarówno po stronie backendu jak i frontendu. Programuje od ponad 2 lat, głównie w JavaScript i Python, budując aplikacje z wykorzystaniem Express.js i Next.js. Interesuje się szczególnie programowaniem backendowym i cyberbezpieczeństwem, ciesząc się tworzeniem bezpiecznych i wydajnych aplikacji, jednocześnie nieustannie rozwijając swoje umiejętności w zakresie nowoczesnych technologii webowych.

## 💻 Umiejętności techniczne

### Języki programowania
| Język       | Poziom      | Doświadczenie | Szczegóły                                                    |
|-------------|-------------|---------------|--------------------------------------------------------------|
| JavaScript  | Zaawansowany| Wiele projektów| Znajomość języka (ponad 2 lata). Biegłość w ES6+, async/await, closures i łańcuchach Promise. |
| TypeScript  | Zaawansowany| Wiele projektów| Główny język od ponad roku. Zaawansowana implementacja typów, projektowanie interfejsów i programowanie generyczne. |
| Python      | Zaawansowany| Wiele projektów| Główny fokus w latach 2022-2023. Używany do web scrapingu, analizy danych i automatyzacji. |
| C++         | Podstawowy  | Wiele projektów| Hobbystyczne zgłębianie zarządzania pamięcią, kontenerów STL i arytmetyki wskaźników. |
| PHP         | Podstawowy  | Kilka         | Przygotowanie do egzaminu zawodowego (2024). Budowanie podstawowych systemów CMS i REST API z Laravel. |
| HTML/CSS    | Średni      | Wiele projektów| Używane w licznych projektach webowych. |

### Technologie frontendowe
| Technologia  | Poziom      | Projekty | Szczegóły                                                  |
|--------------|-------------|----------|-------------------------------------------------------------|
| React        | Średni      | 7        | Architektura Hooks, Context API, optymalizacja wydajności. |
| React Native | Podstawowy  | 2        | Programowanie cross-platform, moduły natywne.              |
| Next.js      | Podstawowy  | 3        | App Router, SSR/ISR, trasy API, middleware, akcje serwerowe.|
| Tailwind CSS | Zaawansowany| Kilka    | Kompilator JIT, niestandardowe wtyczki, responsywny design.|
| Redux Toolkit| Średni      | Kilka    | Wzorce Slice, RTK Query, konfiguracja middleware.          |
| Zustand      | Zaawansowany| Wiele    | Uproszczone zarządzanie stanem, integracja z TypeScript.   |
| Lottie       | Średni      | Wiele    | Złożone animacje, integracja z After Effects, dynamiczne SVG.|
| NextAuth     | Średni      | Kilka    | Rozwiązania uwierzytelniania dla aplikacji Next.js.        |

### Technologie backendowe
| Technologia | Poziom       | Projekty | Szczegóły                                                  |
|-------------|--------------|----------|-------------------------------------------------------------|
| Node.js     | Zaawansowany | Wiele    | Tworzenie API REST, serwerów WebSocket i mikroserwisów. Optymalizacja pętli zdarzeń. |
| Express.js  | Zaawansowany | Wiele    | Zaawansowane wzorce middleware, architektura routingu RESTful. |
| FastAPI     | Średni       | 4        | Budowanie wysokowydajnych asynchronicznych endpointów z auto-generowaną dokumentacją Swagger (fokus 2023). |
| Flask       | Średni       | 4        | Projekty 2022-2023 skoncentrowane na lekkich usługach RESTful i prototypach. |

### Technologie bazodanowe
| Technologia | Poziom       | Projekty | Szczegóły                                                 |
|-------------|--------------|----------|-----------------------------------------------------------|
| PostgreSQL  | Średni       | Wiele    | Zaawansowana optymalizacja zapytań, zarządzanie indeksami i integracje ORM. |
| MS SQL      | Średni       | Wiele    | Rozwój T-SQL na poziomie eksperckim, złożone procedury składowane i optymalizacja zapytań. |

### Narzędzia deweloperskie
| Narzędzie     | Poziom       | Użycie   | Szczegóły                                               |
|---------------|--------------|----------|----------------------------------------------------------|
| Git           | Zaawansowany | Codziennie| Zarządzanie kontrolą wersji, rozwiązywanie konfliktów, strategie gałęzi. |
| VS Code       | Ekspert      | Codziennie| Dostosowane środowisko z wyselekcjonowanymi rozszerzeniami, integracja terminala. |
| Postman       | Średni       | Częste   | Testowanie API i rozwój z zorganizowanymi kolekcjami żądań. |
| JetBrains IDEs| Zaawansowany | Częste   | Wykorzystanie inteligentnego uzupełniania kodu i narzędzi refaktoryzacji. |

## 🚀 Projekty

### 1. FlashTalkAI
- **Opis**: Platforma do nauki narazi eytlko niemieckiego języków wspierana przez AI. 
  Jest możliwość prowadzenia lekcji z atystenem AI gdzie wybierasz na stronie o jakim chcesz  
  porozmawiać z chatem a potem prowadzić po niemiecku rozmowe na ten temat. Jest możliwość nauki słowek z 5 unitów a potem zrobienie testu z każdego z tych działów
- **Technologie**: TypeScript, Tailwind, Express.JS, PostgreSQL, DeepSeekAPI
- **Typ**: Aplikacja webowa
- **Linki**: 
  - Repozytorium: [GitHub](https://github.com/Adam903PL/FlashTalkAI)
  - Demo: [flashtalkai.com](https://flashtalkai.com)

### 2. TechniFees
- **Opis**: Jest to moja app napisana w Pythonei bardzo prosta i jej kod jest dosyć haotyczny i małocyztelny ponieważ były to moje początki z programowaiem.
 App jest dla np szkół by klasy mogły zarządzać swoimi skłądaki uczniów jest panel admian gdzi emożna dodawać skłądki
  i nimi zarzdzać oraz profil ucznia gdzi emoże zobaczyć za jakie skłądki zapąłcić a za jakie nie
- **Technologie**: Python, Tkinter, smtplib, PostgreSQL
- **Typ**: Aplikacja desktopowa
- **Linki**:
  - Repozytorium: [GitHub](https://github.com/Adam903PL/TechniFees)

### 3. TechniCloud
- **Opis**: Podstawowa aplikacja mobilna napisania w react naivenative. Chmura do zarządzania plikami
- **Technologie**: React Native
- **Typ**: Aplikacja mobilna
- **Linki**:
  - Repozytorium: [GitHub](https://github.com/Adam903PL/Native-Cloud)

### 4. TechniBank
- **Opis**: System bankowy do zarządzania finansami osobistymi. Jest to czyty fontend bez backendu napisałem to z kolegą na pierwszy projekt szkolny.
   App zawiera kantor wymiany walut gdzie oraz kupno  krypto( tylko wizualnie to jest nie zapisuje nigdy co i za ile kupiłeś).
   Jest panel twoich aktyw bankowych  + panel gdzie mozes zywysłąć przelwey rożnymi drogami.
- **Technologie**: HTML5, CSS, JS
- **Typ**: Aplikacja webowa
- **Linki**:
  - Repozytorium: [GitHub](https://github.com/Karman1818/TechniBank)
- **Uwaga**: Współpraca z [Karman1818](https://github.com/Karman1818)

## 📊 Statystyki zawodowe
- **Lata doświadczenia**: 2+
- **Ukończone projekty**: 10+
- **Opanowane technologie/umiejętności**: 18+
- **Godziny kodowania**: 700+

## 🔍 Obszary specjalizacji
1. **Rozwój Backend**: Programowanie serwerowe, tworzenie API, zarządzanie bazami danych
2. **Rozwój Frontend**: Implementacja UI/UX, responsywny design, zarządzanie stanem
3. **Rozwój Full Stack**: Kompleksowe tworzenie aplikacji
4. **Bezpieczeństwo**: Lubie zadania CTF i często je sb wykonuej umiem obługiwać linuxa robić rposte ataki DDOS i BruteForce oraz proste rozpatzrzenie na stronie pod katem jakiś luk w bezpieczeńśtwie
5. **Terminal**: Operacje i skrypty wiersza poleceń
`;

const API_KEY = env.DEEPSEEK_API;

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      console.error("OpenAI API key is not configured");
      return NextResponse.json(
        { error: "Chat service is not properly configured. Please try again later." },
        { status: 500 }
      );
    }
    const { message } = await request.json();
    console.log("Received message:", message); 
    const openai = new OpenAI({
      apiKey: API_KEY,
    });
    const systemPrompt = `You are a helpful assistant for Adam Pukaluk's portfolio website. You have access to information about Adam's skills, projects, and experience.
    Your role is to provide accurate information about Adam based on the data provided.
    If you're not sure about something or if the question is completely unrelated to Adam's portfolio, politely explain that you can only provide information about Adam's portfolio and experience.
    Be friendly and professional in your responses.`;
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "system", content: AboutMeData },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000
    });
    console.log("API Response:", completion.choices[0].message.content); 
    return NextResponse.json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error("Detailed error:", error); // 
    return NextResponse.json(
      { error: "I apologize, but I encountered an error processing your request. Please try again." },
      { status: 500 }
    );
  }
}