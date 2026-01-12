type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  img: string
}

type ActressNationality = "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality
}

function isActresses(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === 'object' &&
    "id" in dati &&
    typeof dati.id === 'number' &&
    "name" in dati &&
    typeof dati.name === 'string' &&
    "birth_year" in dati &&
    typeof dati.birth_year === 'number' &&
    "death_year" in dati &&
    typeof dati.death_year === 'number' &&
    "biography" in dati &&
    typeof dati.biography === 'string' &&
    "img" in dati &&
    typeof dati.img === 'string'
  ) {
    return true;
  }
  return false
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const res = await fetch(`http://localhost:3333/actresses/${id}`);
    if (!res.ok) {
      throw new Error(`Errore http ${res.status}: ${res.statusText}`)
    }

    const dati: unknown = await res.json()
    if (!isActresses(dati)) {
      throw new Error('Formato non valido')
    }
    return dati;
  } catch (err) {
    console.error(err)
    return null
  }
}