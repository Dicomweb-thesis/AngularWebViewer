import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { StudyModel } from './StudyModel';

@Injectable()
export class StudyService {
    private study:StudyModel;
    
    constructor(private http:Http) {
        
    }
    GetList(patientID):Promise<any>{
        let baseurl = 'http://localhost:4000/patients/' + patientID + '/studies';
        return this.http.get(baseurl).toPromise()
            .then(this.ExtractData)
            .catch(this.HandleError);
    }
    private ExtractData(res: Response) {
        return res.json();
    }
    private HandleError(err: Response | any) {
        return Promise.reject(err.message || err);
    }

    async GetListViewModel(patientID): Promise<StudyModel[]> {
        let studies=await this.GetList(patientID);
        let studiesModel = [];
        for(let temp of studies){
            let date = temp.MainDicomTags.StudyDate;
            date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
            let studyModel = {
                'ID': temp.ID,
                'StudyID': temp.MainDicomTags.StudyID,
                'StudyDate': date,
                'StudyDescription': temp.MainDicomTags.StudyDescription,
                'AccessionNumber': temp.MainDicomTags.AccessionNumber,
                'InstitutionName': temp.MainDicomTags.InstitutionName,
                'NumberOfSeries': temp.Series.length
            };
            studiesModel.push(studyModel);
        }
        return studiesModel;
    }
}