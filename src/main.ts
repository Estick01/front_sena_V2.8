import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'jquery';
import 'slick-carousel';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
