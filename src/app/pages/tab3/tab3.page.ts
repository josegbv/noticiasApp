import { Component } from '@angular/core';
import { allowedNodeEnvironmentFlags } from 'process';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public DataLocalService:DataLocalService) {}

desabilitar = {
  allowSlidePrev:false,
  allowSlideNext:false
}

}
  