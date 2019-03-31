import { TestBed, inject } from "@angular/core/testing";
import { Character } from "../models/character.model";
import { MarvelResponse, MarvelList } from "../models/marvel.model";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { MarvelService } from "./marvel.service";

describe("MarvelService", () => {
  let character: Character = {
    id: 100,
    name: "thanos",
    description: "description",
    thumbnail: {
      path: "path",
      extension: ".jpg"
    }
  };

  let testMarvelList: MarvelList<Character> = {
    offset: 1,
    limit: 10,
    total: 100,
    count: 20,
    results: [character]
  };

  let charactersData = {
    attributionHTML: "",
    status: "200",
    code: 200,
    data: testMarvelList
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelService]
    })
  );

  function setup() {
    const service = TestBed.get(MarvelService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { service, httpTestingController };
  }

  it("should be created", () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it("should get marvel characters data", () => {
    const { service, httpTestingController } = setup();

    service.getCharacters(10, 10).then(result => {
      expect(result).toEqual(charactersData);
    });

    const calls = httpTestingController.match(
      request => request.url.match("/character") && request.method === "GET"
    );
  });

  it("should get character by Id", () => {
    const { service, httpTestingController } = setup();

    service.getCharacterByCharacterId(100).then(result => {
      expect(result).toEqual(charactersData);
    });

    const calls = httpTestingController.match(
      request =>
        request.url.match("/characters/100") && request.method === "GET"
    );
  });

  it("should get movies by  character Id", () => {
    const { service, httpTestingController } = setup();

    service.getComicsByCharacterId(100).then(result => {
      expect(result).toEqual(charactersData);
    });

    const calls = httpTestingController.match(
      request => request.url.match("/100/comics") && request.method === "GET"
    );
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });
});
