# Lokikirja → GitHub Issues

Katselimen **Lokikirja**-painike (työkalupalkki) lähettää anonyymejä ilmoituksia.
Ne tallentuvat [Katselin.fi-repon](https://github.com/Mikko-Huuskonen-Pro/Katselin.fi) GitHub-issueina.

Loppukäyttäjä **ei kirjaudu GitHubiin** Lokikirjassa. Ylläpitäjä konfiguroi alla olevan
tunnisteen kerran — sama malli kuin palvelinpuolen integraatioissa.

## Kehitys (paikallinen selain)

Luo [fine-grained personal access token](https://github.com/settings/tokens?type=beta):

- Repository access: vain `Katselin.fi`
- Permissions: **Issues** → Read and write

Aseta ympäristömuuttuja ennen `./mach run`:

```bash
export KOTISATAMA_GITHUB_TOKEN=ghp_xxxxxxxx
# valinnainen, oletus Mikko-Huuskonen-Pro/Katselin.fi
export KOTISATAMA_GITHUB_REPO=Mikko-Huuskonen-Pro/Katselin.fi
```

Windows (PowerShell):

```powershell
$env:KOTISATAMA_GITHUB_TOKEN = "ghp_xxxxxxxx"
```

**Älä commitoi tokenia** repoon. Älä jaa sitä asennetuissa julkaisuissa.

## Tuotanto (julkaistu selain)

Julkaisuissa tokenia ei saa upottaa selaimen binääriin. Käytä Cloudflare Workeria
tässä repossa:

```bash
cd workers/report
npx wrangler secret put GITHUB_TOKEN
npx wrangler deploy
```

Worker palauttaa URL-osoitteen (esim. `https://katselin-report.<tili>.workers.dev`).
Aseta se selaimen buildiin tai käyttäjän konfiguraatioon:

```bash
export KOTISATAMA_REPORT_URL=https://katselin-report.<tili>.workers.dev
```

Selain POSTaa saman JSON-rungon workerille, joka luo GitHub-issuen.

## Paikallinen varmuuskopio

Jokainen lähetys kirjataan myös tiedostoon `index-data/reports.jsonl` (tai
`KOTISATAMA_DATA_DIR`). Jos etäpalvelu epäonnistuu, merkintä säilyy levyllä.

## Issue-tyypit

| Lokikirja-valinta | GitHub-otsikko | Labelit |
|---|---|---|
| Sivusto ei toimi | `[Selain] domain` | bug, selain, lokikirja |
| Ehdota satamaan | `[Ehdotus] domain` | palaute, whitelist, lokikirja |

## Verkkosivun palaute

[katselin.fi/fi/palaute.html](../fi/palaute.html) on erillinen polku: käyttäjä täyttää
lomakkeen ja vahvistaa issuen **omalla** GitHub-tilillään. Lokikirja on anonyymi ja
suunnattu selaimen sisäiseen käyttöön.

## Tietosuoja

- Ei käyttäjätunnistetta, ei sähköpostia
- Älä kirjoita salasanoja tai henkilötunnuksia kuvaukseen
- Julkiset GitHub-issuet
