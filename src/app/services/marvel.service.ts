import { Injectable, Injector } from "@angular/core";

import { Md5 } from "ts-md5/dist/md5";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Character } from "../models/character.model";
import { MarvelResponse } from "../models/marvel.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MarvelService {
  private _marvelCharacterUrl: string =
    "https://gateway.marvel.com:443/v1/public/characters";

  private _http: HttpClient;

  constructor(injector: Injector) {
    this._http = injector.get(HttpClient);
  }

  private getHash(timeStamp: string): string {
    let hashGenerator: Md5 = new Md5();
    hashGenerator.appendStr(timeStamp);
    hashGenerator.appendStr(environment.marvelConfig.privateKey);
    hashGenerator.appendStr(environment.marvelConfig.publicKey);
    let hash: string = hashGenerator.end().toString();
    return hash;
  }

  private getTimeStamp(): string {
    return new Date().valueOf().toString();
  }

  public async getCharacters(
    limit: number,
    offset: number,
    nameStartsWith: string = ""
  ): Promise<MarvelResponse<Character>> {
    let timeStamp = this.getTimeStamp();
    let hash = this.getHash(timeStamp);
    let requestUrl =
      this._marvelCharacterUrl +
      "?ts=" +
      timeStamp +
      "&limit=" +
      limit +
      "&offset=" +
      offset +
      "&apikey=" +
      environment.marvelConfig.publicKey +
      "&hash=" +
      hash;

    if (nameStartsWith) {
      requestUrl = requestUrl + "&nameStartsWith=" + nameStartsWith;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    });

    let response = await this._http
      .get<MarvelResponse<Character>>(requestUrl, {
        headers: headers
      })
      .toPromise();

    return response;
  }

  public async getCharacterByCharacterId(
    characterId: number
  ): Promise<MarvelResponse<Character>> {
    let timeStamp = this.getTimeStamp();
    let hash = this.getHash(timeStamp);
    let requestUrl =
      this._marvelCharacterUrl +
      "/" +
      characterId +
      "?ts=" +
      timeStamp +
      "&apikey=" +
      environment.marvelConfig.publicKey +
      "&hash=" +
      hash;

    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    });

    let response = await this._http
      .get<MarvelResponse<Character>>(requestUrl, {
        headers: headers
      })
      .toPromise();

    return response;
  }

  public async getComicsByCharacterId(
    characterId: number
  ): Promise<MarvelResponse<Character>> {
    let timeStamp = this.getTimeStamp();
    let hash = this.getHash(timeStamp);
    let requestUrl =
      this._marvelCharacterUrl +
      "/" +
      characterId +
      "/comics" +
      "?ts=" +
      timeStamp +
      "&apikey=" +
      environment.marvelConfig.publicKey +
      "&hash=" +
      hash;

    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    });

    let response = await this._http
      .get<MarvelResponse<Character>>(requestUrl, {
        headers: headers
      })
      .toPromise();

    return response;
  }
}
