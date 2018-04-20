import { Component } from '@angular/core';

import { CompuerPage } from '../computer/computer';
import { AboutPage } from '../about/about';
import { PlayerPage } from '../player/player';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CompuerPage;
  tab2Root = PlayerPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
