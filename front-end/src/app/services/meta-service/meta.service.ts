import {inject, Injectable, signal} from '@angular/core';
import {Title}                      from '@angular/platform-browser';
import {ActivatedRoute}             from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly title: Title = inject(Title);

  public pageTitle = signal<string>('');

  public setTitleByRouteData(route: ActivatedRoute): void {
    const titleValue: string = route.snapshot.data['title'];

    if (titleValue) {
      this.pageTitle.set(titleValue);
      this.title.setTitle(titleValue);
    }
  }

  public setTitle(title: string): void {
    this.pageTitle.set(title);
    this.title.setTitle(title);
  }
}
