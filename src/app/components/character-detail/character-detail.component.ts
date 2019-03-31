import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { MarvelService } from "../../services/marvel.service";
import { Character } from "../../models/character.model";

@Component({
  selector: "app-character-detail",
  templateUrl: "./character-detail.component.html",
  styleUrls: ["./character-detail.component.css"]
})
export class CharacterDetailComponent implements OnInit {
  characterDetail: Character = null;
  characterId: number;
  comics: any[] = [];

  constructor(
    private _activeRoute: ActivatedRoute,
    private _marvelService: MarvelService
  ) {}

  ngOnInit() {
    this.characterId = this._activeRoute.snapshot.params["characterId"];
    this.loadCharacterInfo();
    this.loadComics();
  }

  async loadCharacterInfo() {
    const responseData = await this._marvelService.getCharacterByCharacterId(
      this.characterId
    );
    console.log(responseData);
    this.characterDetail = responseData.data.results[0];
  }

  async loadComics() {
    const responseData = await this._marvelService.getComicsByCharacterId(
      this.characterId
    );
    console.log(responseData);
    this.comics = responseData.data.results;
  }
}
