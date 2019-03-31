import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { CharacterDetailComponent } from "./components/character-detail/character-detail.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HomeComponent, CharacterDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
