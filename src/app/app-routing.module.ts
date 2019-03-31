import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { CharacterDetailComponent } from "./components/character-detail/character-detail.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "character/:characterId", component: CharacterDetailComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
