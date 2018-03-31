import { Component, OnInit } from '@angular/core';
import { CornerstoneService } from "./web-viewer.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstanceService } from "./Instances.service";
import { InstanceModel } from "./InstanceModel";
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
@Component({
  selector: 'app-web-viewer',
  templateUrl: './web-viewer.component.html',
  styleUrls: ['./web-viewer.component.css'],
  providers: [CornerstoneService,
    InstanceService
  ]
})
export class WebViewerComponent implements OnInit {
  imageData: any;
  imageHeaders: Array<string>;
  private seriesID;
  public arr = ["f0200ea6-f87841f7-bc747be9-499fb06d-e3b50a6c",
    "6a863e98-22664ba2-5d119098-55e3e3ee-4cdbcd58",
    "f0b9f0ab-110181f8-ce83a1a2-4d8eb2c9-0b682503",
    "9b41ef96-b4031ffc-b1b7ea5d-8a38d55d-fe804601",];
  constructor(public csS: CornerstoneService, public instanceService: InstanceService, private route: ActivatedRoute) { }
  getSeriesID(){
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.seriesID = id;
    });
  }

  ngOnInit() {
    this.getSeriesID();
    this.instanceService.GetList(this.seriesID);
    // from seriesID start to request again to fetch array of instances
   
    
    
    for (var i in this.arr) {
      this.csS.fetchDicomImage('http://localhost:8042/instances/' + this.arr[i] + '/file')
        .subscribe(res => this.imageData = res);
    }
  }
  
  
  
  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }

  

}
