import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from './pages/login/login.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";
import { TabsComponent } from './pages/tabs/tabs.component';
import { MapComponent } from './pages/tabs/map/map.component';
import { ProfileComponent } from './pages/tabs/profile/profile.component';
import { HomeComponent } from './pages/tabs/home/home.component';
import { ChatComponent } from './pages/tabs/chat/chat.component';
import { SettingsComponent } from './pages/tabs/settings/settings.component';

// RadListView
// import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        // NativeScriptUIListViewModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        TabsComponent,
        MapComponent,
        ProfileComponent,
        HomeComponent,
        ChatComponent,
        SettingsComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
