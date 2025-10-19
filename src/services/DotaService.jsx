class DotaService {
  _apiBase = "https://api.opendota.com/api/";
  _baseOffset = 0;
  _baseLimit = 9;

  get baseLimit() {
    return this._baseLimit;
  }

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getHeroById = async (id) => {
    const hero = await this.getResource(`${this._apiBase}heroStats`).then(
      (heroes) => heroes.find((hero) => hero.id === id)
    );
    return this._transformHero(hero);
  };

  getHeroLimit = async (start = this._baseOffset, limit = this._baseLimit) => {
    const heroes = await this.getResource(`${this._apiBase}heroStats`);
    return this._transformHeroLimit(heroes, start, limit);
  };

  convertToAttribute = (attribute) => {
    switch (attribute) {
      case "str":
        return "Strength";
      case "agi":
        return "Agility";
      case "int":
        return "Intellect";
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
      fandom: `https://dota2.fandom.com/wiki/${hero.localized_name.replaceAll(
        " ",
        "_"
      )}`,
      baseStats: [
        ["Health", hero.base_health],
        ["Mana", hero.base_mana],
        ["Armor", hero.base_armor],
        ["Agility", hero.base_agi],
        ["Strength", hero.base_str],
        ["Intellect", hero.base_int],
        ["Move Speed", hero.move_speed],
        ["Day Vision", hero.day_vision],
        ["Night Vision", hero.night_vision],
      ],
    };
  };

  _transformHeroLimit = (heroes, start, limit) => {
    return heroes.slice(start, start + limit).map((hero) => ({
      id: hero.id,
      name: hero.localized_name,
      thumbnail: `https://cdn.cloudflare.steamstatic.com${hero.img}`,
    }));
  };
}

export default DotaService;
