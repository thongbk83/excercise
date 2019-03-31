import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { CharacterDetailComponent } from "./character-detail.component";

describe("CharacterDetailComponent", () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
