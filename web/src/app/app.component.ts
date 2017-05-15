import { Component } from '@angular/core';

@Component({
    selector: 'cn-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // TODO: Automatically set based on width (840px?)
    sidenavMode: 'side' | 'over' = 'side';
}
