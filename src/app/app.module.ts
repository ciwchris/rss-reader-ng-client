import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgArrayPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { FeedServiceService } from './feed-service.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgArrayPipesModule
    ],
    providers: [FeedServiceService],
    bootstrap: [AppComponent]
})
export class AppModule { }
