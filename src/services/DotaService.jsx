class DotaService {
  _apiBase = "https://api.opendota.com/api/";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getRandomHeroStats = async (id) => {
    const hero = await this.getResource(`${this._apiBase}heroStats`).then(
      (heroes) => heroes.find((hero) => hero.id === id)
    );
    return this._transformHero(hero);
  };

  getHeroMatchups = (id) => {
    return this.getResource(`${this._apiBase}heroes/${id}/matchups`);
  };

  convertToAttribute = (attribute) => {
    switch (attribute) {
      case "str":
        return "Strong";
      case "agi":
        return "Agility";
      case "int":
        return "Intelect";
      case "all":
        return "Universal";

      default:
        return "Unknown";
    }
  };

  _transformHero = (hero) => {
    return {
      name: hero.localized_name,
      description: (
        <>
          <p>
            <b>Attack type:</b> {hero.attack_type}
          </p>
          <hr />
          <p>
            <b>Primary attribute:</b>{" "}
            {this.convertToAttribute(hero.primary_attr)}
          </p>
          <hr />
          <p>
            <b>Roles:</b> {hero.roles.join(", ")}
          </p>
          <hr />
        </>
      ),
      thumbnail: `https://cdn.cloudflare.steamstatic.com${hero.img}`,
      homepage: null,
      wiki: `https://dota2.fandom.com/wiki/${hero.localized_name.replaceAll(
        " ",
        "_"
      )}`,
    };
  };
}

export default DotaService;
