import ud from "urban-dictionary";

export interface DefinitionObject {
  author: string;
  current_vote: string;
  defid: number;
  definition: string;
  example: string;
  permalink: string;
  sound_urls: string[];
  thumbs_down: number;
  thumbs_up: number;
  word: string;
  written_on: string;
}

export interface AutocompleteExtraObject {
  preview: string;
  term: string;
}

export class Dictionary {
  find(term: string): Promise<DefinitionObject[]> {
    return new Promise((resolve) => {
      ud.define(term, (error: Error, results: DefinitionObject[]) => {
        return resolve(error ? [] : results);
      });
    });
  }

  findOne(term: string): Promise<DefinitionObject | null> {
    return new Promise((resolve) => {
      ud.define(term, (error: Error, results: DefinitionObject[]) => {
        return resolve(error ? null : results[0]);
      });
    });
  }

  findOneById(id: number): Promise<DefinitionObject | null> {
    return new Promise((resolve) => {
      ud.getDefinitionByDefid(id, (error: Error, result: DefinitionObject) => {
        return resolve(error ? null : result);
      });
    });
  }

  random(): Promise<DefinitionObject | null> {
    return new Promise((resolve) => {
      ud.random((error: Error, results: DefinitionObject[]) => {
        return resolve(error ? null : results[0]);
      });
    });
  }

  todays(): Promise<DefinitionObject | null> {
    return new Promise((resolve) => {
      ud.wordsOfTheDay((error: Error, results: DefinitionObject[]) => {
        return resolve(error ? null : results[0]);
      });
    });
  }

  autocomplete(term: string): Promise<AutocompleteExtraObject[]> {
    return new Promise((resolve) => {
      ud.autocompleteExtra(
        term,
        (error: Error, results: AutocompleteExtraObject[]) => {
          return resolve(error ? [] : results);
        },
      );
    });
  }
}
