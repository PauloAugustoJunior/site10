import { Component, computed, output, signal } from '@angular/core';
import { SERVICES, ServiceId } from './data/services';
@Component({selector:'nexo-catalog',templateUrl:'./catalog.html',styleUrl:'./catalog.scss'})
export class Catalog {
 readonly services=SERVICES;
 readonly selected=signal<ServiceId>('presenca');
 readonly current=computed(()=>this.services.find(service=>service.id===this.selected())??this.services[0]);
 readonly interest=output<ServiceId>();
 select(id:ServiceId):void{this.selected.set(id);}
}
