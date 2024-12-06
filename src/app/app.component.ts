import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private loadingService: LoadingService) {}


  loading = false;

  ngOnInit() {
		this.listenToLoading();
	}

	listenToLoading() {
		this.loadingService.isLoadingSubject.pipe(delay(0)).subscribe((loading: any) => {
			if (this.loading !== loading) this.loading = loading;
		});
	}

} 