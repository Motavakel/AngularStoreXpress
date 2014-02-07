import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { register as registerSwiperElements } from 'swiper/element/bundle';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
setTimeout(()=>{
  registerSwiperElements();
},500)
