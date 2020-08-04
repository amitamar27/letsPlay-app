import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { LoginComponent } from "./pages/login/login.component";
import { TabsComponent } from "./pages/tabs/tabs.component";
import { MapComponent } from "./pages/tabs/map/map.component";
import { ProfileComponent } from "./pages/tabs/profile/profile.component";
import { HomeComponent } from "./pages/tabs/home/home.component";
import { ChatComponent } from "./pages/tabs/chat/chat.component";
import { SettingsComponent } from "./pages/tabs/settings/settings.component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "tabs", component: TabsComponent },
    { path: "map", component: MapComponent },
    { path: "profile", component: ProfileComponent },
    { path: "home", component: HomeComponent },
    { path: "chat", component: ChatComponent },
    { path: "settings", component: SettingsComponent },


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
