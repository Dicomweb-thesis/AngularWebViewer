import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { SeriesModel } from './SeriesModel';

@Injectable()
export class SeriesService {
    private serial:SeriesModel[];
    constructor(private http:Http) {
        
    }
    GetList(studyID): Promise<any> {
        let baseurl = 'http://localhost:4000/studies/' + studyID + '/series';
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

    async GetListViewModel(studyID): Promise<SeriesModel[]> {
        let series = await this.GetList(studyID);
        let seriesModel = [];
        for (let temp of series) {
            let serialModel = {
                'ID': temp.ID,
                'Manufacturer': temp.MainDicomTags.Manufacturer,
                'Modality': temp.MainDicomTags.Modality,
                'ProtocolName': temp.MainDicomTags.ProtocolName,
                'SeriesNumber': temp.MainDicomTags.SeriesNumber
            };
            seriesModel.push(serialModel);
        }
        return seriesModel;
    }
    

}