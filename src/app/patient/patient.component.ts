import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { until } from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import { Observable } from 'rxjs/Observable';

import { PatientModel } from './PatientModel';
import { PatientService } from "./Patient.service";
import { Http, Response } from '@angular/http';
import { tryCatch } from 'rxjs/util/tryCatch';
import { catchError } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers:[PatientService]
})
export class PatientComponent implements OnInit {
  patients:PatientModel[];
  errorMessage: String;
  private selectedID: string;
  countClick = 0;
  settings = {
    columns: {
      PatientID: {
        title: 'Patient ID',
        type: 'string',
      },
      PatientName: {
        title: 'Patient Name',
        type: 'string',
      },
      PatientBirthDate: {
        title: 'Birthday',
        type: 'string',
      },
      PatientSex: {
        title: 'Sex',
        type: 'string',
      },
      NumberOfStudies: {
        title: 'Number of studies',
        type: 'number',
      },
      LastUpdate: {
        title: 'Last update',
        type: 'string'
      },
    }
  };
  dataSource = this.patients;
  constructor(private patientService:PatientService) { }

  ngOnInit():void{
    this.LoadPatient();
  }
  async LoadPatient(){
    try {
      this.patients=await this.patientService.GetListViewModel();
      this.dataSource=this.patients;
    } catch (error) {
      this.errorMessage=error;
    }
  }

  onRowSelect(event){
    this.selectedID = event.data.PatientID;
    this.countClick++;
    if (this.countClick === 2) {
      let element: HTMLElement = document.getElementById('studyDetails') as HTMLElement;
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
