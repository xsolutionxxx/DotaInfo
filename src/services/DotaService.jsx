import { useHttp } from "../hooks/http.hook";

const useDotaService = () => {
  const _apiBase = "https://api.opendota.com/api/";
  const _baseOffset = 0;
  const _baseLimit = 9;

  const { request, process, setProcess, clearError } = useHttp();

  const getHeroById = async (id) => {
    const hero = await request(`${_apiBase}heroStats`).then((heroes) =>
      heroes.find((hero) => hero.id === +id)
    );

    if (!hero) {
      throw new Error("Hero not found");
    }

    return _transformHero(hero);
  };

  const getRandomHero = async () => {
    const res = await request(`${_apiBase}heroStats`);

    const randomIndex = Math.floor(Math.random() * res.length);
    return _transformHero(res[randomIndex]);
  };

  const getHeroByName = async (name) => {
    const hero = await request(`${_apiBase}heroStats`).then((heroes) =>
      heroes.find(
        (hero) => hero.localized_name.toLowerCase() === name.toLowerCase()
      )
    );

    if (!hero) {
      return null;
    }

    return _transformHero(hero);
  };

  const getHeroLimit = async (start = _baseOffset, limit = _baseLimit) => {
    const heroes = await request(`${_apiBase}heroStats`);
    return _transformHeroLimit(heroes, start, limit);
  };

  const getTeamsByRating = async (
    rating,
    start = _baseOffset,
    limit = _baseLimit
  ) => {
    const teams = await request(`${_apiBase}teams`).then((teams) =>
      teams.filter((team) => team.rating > rating)
    );
    return _transformTeams(teams, start, limit);
  };

  const getTeamById = async (id) => {
    const team = await request(`${_apiBase}teams/${id}`);
    return team;
  };

  const convertToAttribute = (attribute) => {
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

  const _transformHero = (hero) => {
    return {
      id: hero.id,
      name: hero.localized_name,
      description: (
        <>
          <p>
            <b>Attack type:</b> {hero.attack_type}
          </p>
          <hr />
          <p>
            <b>Primary attribute:</b> {convertToAttribute(hero.primary_attr)}
          </p>
          <hr />
          <p>
            <b>Roles:</b> {hero.roles.join(", ")}
          </p>
          <hr />
        </>
      ),
      thumbnail: `https://cdn.cloudflare.steamstatic.com${hero.img}`,
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

  const _transformHeroLimit = (heroes, start, limit) => {
    return heroes.slice(start, start + limit).map((hero) => ({
      id: hero.id,
      name: hero.localized_name,
      thumbnail: `https://cdn.cloudflare.steamstatic.com${hero.img}`,
    }));
  };

  const _transformTeams = (teams, start, limit) => {
    return teams.slice(start, start + limit).map((team) => ({
      id: team.team_id,
      name: team.name,
      logo_url: team.logo_url,
      tag: team.tag,
      rating: team.rating,
    }));
  };

  return {
    _baseLimit,
    process,
    setProcess,
    clearError,
    getRandomHero,
    getHeroById,
    getHeroByName,
    getHeroLimit,
    getTeamsByRating,
    getTeamById,
  };
};

export default useDotaService;
