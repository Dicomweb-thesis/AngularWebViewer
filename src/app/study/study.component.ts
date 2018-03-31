import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudyService } from './Study.service';
import { StudyModel } from './StudyModel';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  providers:[StudyService]
})
export class StudyComponent implements OnInit {
  private patientID;
  private selectedID;
  public studies: StudyModel[];
  errorMessage: String;
  countClick=0;

  settings = {
    columns: {
      StudyID: {
        title: 'Study ID',
        type: 'string',
      },
      StudyDate: {
        title: 'Study Date',
        type: 'string',
      },
      StudyTime: {
        title: 'Study Time',
        type: 'string',
      },
      AccessionNumber: {
        title: 'Accession Number',
        type: 'string',
      },
      InstitutionName: {
        title: 'Institution Name',
        type: 'string',
      },
      NumberOfSeries: {
        title: 'Number of series',
        type: 'number'
      }
    },
  };
  dataSource = this.studies;
  constructor(private studyService: StudyService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.loadStudies(id);
    });
    this.patientID=id;
  }
  async loadStudies(patientID){
    try {
      this.studies = await this.studyService.GetListViewModel(patientID);
      this.dataSource = this.studies;
    } catch (error) {
      this.errorMessage = error;
    }
  }

  onRowSelect(event) {
    this.selectedID = event.data.ID;
    this.countClick++;
    if (this.countClick === 2) {
      let element: HTMLElement = document.getElementById('seriDetails') as HTMLElement;
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
