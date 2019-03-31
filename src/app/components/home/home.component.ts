import { Component, OnInit } from "@angular/core";

import { MarvelService } from "../../services/marvel.service";
import { Character } from "../../models/character.model";
import { MarvelResponse } from "../../models/marvel.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  listOfCharacter: any = [];
  pageIndex: number = 0;
  limit: number = 10;
  nameStartsWith: string = "";
  keyword: string = "";

  listCharacter: Character[] = [];

  constructor(private _marvelService: MarvelService) {}

  ngOnInit() {
    this.loadCharacter();
  }

  async loadCharacter() {
    const responseData = await this._marvelService.getCharacters(
      this.limit,
      this.limit * this.pageIndex,
      this.nameStartsWith
    );
    this.listCharacter.push(...responseData.data.results);
  }

  onScroll() {
    this.pageIndex++;
    this.loadCharacter();
  }

  onClickSearchButton() {
    this.searchCharacter();
  }

  onKeydownForSearching(event) {
    if (event.key === "Enter") {
      this.searchCharacter();
    }
  }

  searchCharacter() {
    if (this.keyword && this.keyword !== this.nameStartsWith) {
      this.pageIndex = 0;
      this.nameStartsWith = this.keyword;
      this.listCharacter = [];
      this.loadCharacter();
    }
  }
}
