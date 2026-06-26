# Tietoturva (Security Policy)

## Haavoittuvuuksien ilmoittaminen

**Älä ilmoita tietoturva-aukkoja julkisena GitHub-issuena.**

Ilmoita haavoittuvuudet sähköpostitse:

**mikko@ilio.fi**

Vastaus 48 tunnin sisällä. Vakavat haavoittuvuudet pyritään korjaamaan 7 päivän sisällä ilmoituksesta.

## Mitä ilmoittaa

Erityisen kriittisiä Katselin-kontekstissa:

- Whitelist-ohitukset — tavat päästä whitelistan ulkopuolisille sivuille
- Sisällönsuodatuksen ohitus lapsiprofiilissa
- CDN-valheellinen whitelist (supply chain)
- Meilisearch-indeksin manipulointi

Servo-moottoriin liittyvät haavoittuvuudet voi ilmoittaa myös suoraan
[servo/servo-repoon](https://github.com/servo/servo/security/advisories/new).

## Laajuus (Scope)

| Komponentti | Kuuluu Katselin-repoon |
|---|---|
| Whitelist-logiikka (`components/kotisatama/`) | Kyllä |
| Hakuindeksi-integraatio | Kyllä |
| CDN-päivitysmekanismi | Kyllä |
| Servo-selainmoottori (upstream) | Ei — ilmoita servo/servo-repoon |

*Katselin on osa Ilio-toiminimeä (Y-tunnus 2010).*
