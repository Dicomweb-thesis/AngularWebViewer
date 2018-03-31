import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SeriesService } from './Series.service';
import { SeriesModel } from './SeriesModel';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [SeriesService]
})
export class SeriesComponent implements OnInit {
  private studyID;
  private selectedID;
  errorMessage: String;
  countClick = 0;
  public series:SeriesModel[];

  settings = {
    columns: {
      Manufacturer: {
        title: 'Manufacturer',
        type: 'string',
      },
      Modality: {
        title: 'Modality',
        type: 'string',
      },
      ProtocolName: {
        title: 'ProtocolName',
        type: 'string',
      },
      SeriesNumber: {
        title: 'SeriesNumber',
        type: 'string',
      },
     
    },
  };
  dataSource=this.series;
  constructor(private seriesService: SeriesService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.loadSeries(id);
    });
    this.studyID = id;
  }

  async loadSeries(studyID) {
    try {
      this.series = await this.seriesService.GetListViewModel(studyID);
      this.dataSource = this.series;
    } catch (error) {
      this.errorMessage = error;
    }
  }

  onRowSelect(event) {
    this.selectedID = event.data.ID;
    this.countClick++;
    if (this.countClick === 2) {
      let element: HTMLElement = document.getElementById('ViewerDetails') as HTMLElement;
      element.click();
    }
    this.timeout();
  }

  timeout() {
    var timeout = setTimeout(() => {
      this.countClick = 0;
      this.timeout();
    }, 300);
    if (!this.countClick) {
      clearTimeout(timeout);
    }
  }

}
