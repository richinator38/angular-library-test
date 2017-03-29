import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Jsonp } from '@angular/http';
import { MenuSourceItem } from '../model/menu-source-item';


@Injectable()
export class MenuService {
    private url = '/Menu?callback=JSONP_CALLBACK';
    constructor(private jsonp: Jsonp) { }

    getMenuItems(): Observable<any> {
        return this.jsonp.get(this.url)
            .map(resp => <MenuSourceItem[]>resp.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.JSON().error || 'Server error');
    }
}
