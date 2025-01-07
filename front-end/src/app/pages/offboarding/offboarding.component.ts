import {Component}    from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
	selector: 'app-offboarding',
	standalone: true,
	templateUrl: './offboarding.component.html',
	imports: [
		RouterOutlet
	],
	styleUrl: './offboarding.component.scss'
})
export default class OffboardingComponent {

}
