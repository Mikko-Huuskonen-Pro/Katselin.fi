# Katselimeen osallistuminen

Katselin on Servo-fork. Lähdekoodi: [github.com/Mikko-Huuskonen-Pro/Kotisatama](https://github.com/Mikko-Huuskonen-Pro/Kotisatama).

Ennen muutoksia lue selainrepon `AGENT.md` — siellä on tärkeimmät säännöt, erityisesti:
**älä muokkaa Servo-upstream-tiedostoja suoraan** ilman pakottavaa syytä.

## Missä voi auttaa

Tällä hetkellä hyödyllisintä:

- **Bugiilmoitukset** — erityisesti whitelist-ohitukset tai hakuindeksin ongelmat
- **Crawler-testaus** — Playwright-indeksoinnin toimivuus eri sivustoilla
- **Servo-yhteensopivuus** — Telakka-korjaukset tärkeille sivuille (Kela, Suomi.fi, …)
- **Dokumentaatio** — parannukset tähän Katselin.fi-repoon

## Whitelist-ehdotukset

Kuratoidut sivulistat (Sataman whitelist) hallinnoidaan yksityisessä repossa. Jos haluat
ehdottaa uutta domainia Satamaan, avaa asiasta keskustelu GitHubissa tai ota yhteyttä
ylläpitäjään. Julkiseen selainrepoon ei lisätä tuotantodataa.

## Rust-muutokset

Kaikki Katselin-spesifinen Rust-koodi kuuluu `components/kotisatama/`-hakemistoon.
Älä muokkaa Servo-upstream-tiedostoja ilman pakottavaa syytä.

Tarkistuslista ennen PR:ää:

```bash
cargo build                          # pitää toimia ilman featurea
cargo build --features kotisatama    # pitää toimia featurella
```

Whitelist toteutetaan embedder-hookissa (`ports/servoshell`), ei `components/net/`-tasolla.

## Kehitysympäristö

1. Asenna [Servon kehitysympäristö](https://book.servo.org/hacking/setting-up-your-environment.html).
2. Kloonaa repo ja rakenna:

```bash
git clone https://github.com/Mikko-Huuskonen-Pro/Kotisatama.git
cd Kotisatama
./mach build --release
./mach run
```

Paikallinen whitelist kehityksessä:

```bash
cp config/whitelist.example.json config/whitelist.json
export KOTISATAMA_WHITELIST_PATH=config/whitelist.json
```

## Bugiilmoitukset

Avaa GitHub Issue selainrepossa. Kerro:

1. Mitä teit
2. Mitä odotit tapahtuvan
3. Mitä tapahtui
4. Käyttöjärjestelmä ja versio

Tietoturva-aukoista: katso [tietoturva.md](tietoturva.md) — **ei julkisena issuena**.

## Servo-upstream

Servo-projektin omiin muutoksiin osallistuminen tapahtuu
[servo/servo-repon kautta](https://github.com/servo/servo/blob/main/CONTRIBUTING.md).
