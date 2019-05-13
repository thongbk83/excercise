import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { FormsModule } from "@angular/forms";

import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { Character } from "../../models/character.model";
import { MarvelList } from "../../models/marvel.model";

import { DebugElement } from "@angular/core";

import { HomeComponent } from "./home.component";
import { MarvelService } from "../../services/marvel.service";
import { By } from "@angular/platform-browser";

const character: Character = {
  id: 100,
  name: "thanos",
  description: "description",
  thumbnail: {
    path: "path",
    extension: ".jpg"
  }
};

const testMarvelList: MarvelList<Character> = {
  offset: 1,
  limit: 10,
  total: 100,
  count: 20,
  results: [character]
};

const charactersData = {
  attributionHTML: "",
  status: "200",
  code: 200,
  data: testMarvelList
};

class FakeMarvelService {
  getCharacters() {
    return Promise.resolve(charactersData);
  }
}

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector;
  let marvelService: MarvelService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: MarvelService, useClass: FakeMarvelService }],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        InfiniteScrollModule,
        FormsModule
      ]
    }).compileComponents();

    injector = getTestBed();
    marvelService = injector.get(MarvelService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load the first users of GitHub", fakeAsync(() => {
    spyOn(marvelService, "getCharacters").and.returnValue(
      Promise.resolve(charactersData)
    );

    component.ngOnInit();

    tick();
    fixture.detectChanges();

    expect(component.listCharacter.length).toBeGreaterThan(0);

    // check table character show up
    let tableEl: HTMLInputElement = fixture.debugElement.query(By.css("table"))
      .nativeElement;
    expect(tableEl.classList.contains("mt-3")).toBe(true);
  }));
});
