import { Component, OnInit } from '@angular/core';
import { CornerstoneService } from "./web-viewer.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstanceService } from "./Instances.service";
import { InstanceModel } from "./InstanceModel";
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Http } from '@angular/http';

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
  public list = [];
  public x;
  public listInstances = [];
  constructor(public csS: CornerstoneService,
    public instanceService: InstanceService,
    private route: ActivatedRoute,
    private http: Http,
  ) {

  }

  getSeriesID() {
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.seriesID = id;
    });
  }
  HandleInstance() {
    this.listInstances = ["f0200ea6-f87841f7-bc747be9-499fb06d-e3b50a6c",
      "6a863e98-22664ba2-5d119098-55e3e3ee-4cdbcd58",];
  }
  ngOnInit() {
    this.getSeriesID();
    console.log('id cua seri la:' + this.seriesID);
    this.HandleInstance();
    console.log(this.listInstances);


    this.RequestServer(this.listInstances);

  }


  RequestServer(array: Array<string>) {
    for (var i in array) {
      this.csS.fetchDicomImage('http://localhost:8042/instances/' + array[i] + '/file')
        .subscribe(res => this.imageData = res);
    }
  }
  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }
}
