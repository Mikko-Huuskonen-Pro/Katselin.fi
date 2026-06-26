# Katselimen arkkitehtuuri

*Versio 1.0 — kesäkuu 2026*

Katselin on Servo-pohjainen selain. Oma logiikka on eriytetty `components/kotisatama/`-hakemistoon
ja servoshell-embedderiin. Tekniset polut käyttävät vielä nimeä *kotisatama* asteittaisen
uudelleennimeämisen vuoksi.

## Yleiskuva

```text
[Katselin — Servo-fork]
    ├── components/kotisatama/whitelist   ← whitelist-logiikka
    ├── components/kotisatama/search      ← haku-API (Meilisearch-client)
    └── ports/servoshell                  ← embedder-hook (navigointi, UI)

[Android — servoshell EGL]
    └── support/android/apk + JNI-host    ← Servon oma Android-polku

[Hallintapaneeli — Tauri 2.0, valinnainen]
    └── Vanhempi hallinnoi whitelistia    ← ei selainmoottori

[CDN — staattinen]
    ├── /free/whitelist.json
    └── /pro/whitelist.json               ← API-avain vaaditaan

[Crawler — CI-prosessi]
    └── Playwright → Meilisearch-dump → CDN
```

Ei omaa palvelinta. Ei VPN-infraa. Haku tapahtuu laitteelle esiladatusta indeksistä.

## Meilisearch laitteella

Indeksi on Meilisearch-dump (CDN), mutta haku vaatii Meilisearch-prosessin laitteessa
(bundlattu binääri, subprocess). Kyselyt tehdään HTTP:llä paikalliseen instanssiin.

## Selaustilat

Käyttäjä valitsee ympäristön. Ympäristö määrittää säännöt:

```text
Katselin
├─ Satama      ← kuratoitu whitelist, paikallinen haku
├─ Laituri     ← käyttäjän hyväksymät sivut
└─ Avomeri     ← muistiton avoin internet
```

Sataman osoitekenttä reitittää hakusanat paikalliseen indeksiin (esim. `kela` → Kela.fi).
Avomeri on erillinen tila, ei vahingossa tapahtuva fallback.

## Whitelist ja data

Kuratoidut sivulistat ja allekirjoitettu jakelu hallinnoidaan erillisessä yksityisessä
repossa. Julkinen selainkoodi lukee whitelistin CDN:stä tai paikallisesta polusta
kehityksessä.

## Varustamo

Varustamo on luotettujen sovellusten varasto. Sovellukset ovat tyypillisesti Tauri 2.0
-ohjelmia, jotka julkaisevat paikallisen HTTP-rajapinnan. Katselin avaa ne Sataman
sisällä. Sovelluskehitys tapahtuu erillisessä repossa ilman täyttä Servo-buildia.

## Upstream-suhde

Katselin on Servo-fork. Tavoite on pitää upstream mahdollisimman puhtaana ja tarjota
Servo-korjaukset takaisin upstreamiin Telakka-työnkululla. Katso
[filosofia.md](../philosophy/filosofia.md) ja [telakka-kela.md](../developer/telakka-kela.md).

## Nykytila

Katso [nykytila-2026-06-24.md](nykytila-2026-06-24.md).
