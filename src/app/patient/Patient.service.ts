import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { PatientModel } from './PatientModel';
import { promise } from 'protractor';

@Injectable()
export class PatientService {
    private patientsUrl = 'http://localhost:4000/patients';

    constructor(private http: Http) {
        
    }
    
    GetList():Promise<any>{
        return this.http.get(this.patientsUrl).toPromise()
        .then(this.ExtractData)
        .catch(this.HandleError);
    }
    
    private ExtractData(res: Response){
        return res.json();
    }
    private HandleError(err: Response | any) {
        return Promise.reject(err.message || err);
    }


    async GetListViewModel(): Promise<PatientModel[]> {
        let patients = await this.GetList();
        let patientsModel = [];
        for (let temp of patients) {
            let sex;
            if (temp.MainDicomTags.PatientSex === 'F') {
                sex = 'Female';
            } else if (temp.MainDicomTags.PatientSex === 'M') {
                sex = 'Male';
            } else {
                sex = 'Other';
            }
            let lastUpdate = temp.LastUpdate;
            lastUpdate = lastUpdate.substr(0, 4) + '-' + lastUpdate.substr(4, 2) + '-' + lastUpdate.substr(6, 2);
            let birthDate = temp.MainDicomTags.PatientBirthDate;
            birthDate = birthDate.substr(0, 4) + '-' + birthDate.substr(4, 2) + '-' + birthDate.substr(6, 2);

            let patientModel = {
                'ID': temp.ID,
                'PatientID': temp.MainDicomTags.PatientID,
                'PatientName': temp.MainDicomTags.PatientName,
                'PatientBirthDate': birthDate,
                'PatientSex': sex,
                'NumberOfStudies': temp.Studies.length,
                'LastUpdate': lastUpdate
            };
            patientsModel.push(patientModel);
        }
        return patientsModel;
    }
}