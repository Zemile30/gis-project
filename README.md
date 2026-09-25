## Filial Idarəetməsi
 
Next.js (TypeScript, App Router) əsasında qurulmuş, Leaflet ilə interaktiv xəritə və real yol marşrutu göstərən nümunə layihə.
 
## Xüsusiyyətlər
 
-  **Filial xəritəsi** — markerlər, klasterləşdirmə, poliqon (çatdırılma zonası)
-  **Marşrut nümunəsi** — iki nöqtə arasında real yol marşrutu (OSRM routing engine ilə)

## Texnologiyalar
 
| Kateqoriya | Alət |
| Framework | Next.js (App Router) |
| Dil | TypeScript |
| Xəritə | Leaflet, react-leaflet |
| Klasterləşdirmə | react-leaflet-cluster |
| Marşrut hesablama | leaflet-routing-machine + OSRM |
| Data formatı | GeoJSON |
 

## Layihə strukturu
 
```
gis-project/
├── app/
│   ├── page.tsx              # Əsas səhifə (naviqasiya)
│   ├── page.module.css       # Əsas səhifənin stilləri
│   ├── globals.css
│   ├── map/
│   │   └── page.tsx           # Filial xəritəsi səhifəsi
│   └── route/
│       └── page.tsx           # Marşrut nümunəsi səhifəsi
├── components/
│   ├── MapView.tsx            # Filial xəritəsi komponenti
│   ├── MapWrapper.tsx         # MapView-un SSR-siz (client-only) wrapper-i
│   └── RouteView.tsx          # Real marşrut hesablayan komponent
├── types/
│   └── gis.ts                 # GIS data tipləri (Branch, DeliveryZone, RouteLine)
├── next.config.ts             # reactStrictMode: false (dev rejimində routing xətasının qarşısını alır)
└── package.json
```
 
## Qeydlər
 
- `/route` səhifəsi marşrut hesablamaq üçün **pulsuz OSRM demo serverindən** (`router.project-osrm.org`) istifadə edir — bu, yalnız test məqsədlidir. Real, çox istifadəçili layihədə öz OSRM serverini qurmaq və ya Mapbox/Google Directions API kimi ödənişli xidmətdən istifadə etmək tövsiyə olunur.
- Leaflet-in default marker ikonları Next.js bundler-i ilə uyğunsuzluq yaratdığı üçün `MapView.tsx` və `RouteView.tsx`-də əl ilə düzəldilib.
- `reactStrictMode: false` yalnız development rejimindəki `leaflet-routing-machine` ilə bağlı bir konsol xətasının qarşısını almaq üçün əlavə olunub, production build-ə təsiri yoxdur.
## Növbəti addımlar
 
- [ ] Statik `branches` massivini real API-dən (backend) gələn data ilə əvəz etmək
- [ ] Öz OSRM serverini production üçün deploy etmək
- [ ] Ünvandan koordinata çevirmə (geocoding) əlavə etmək
 