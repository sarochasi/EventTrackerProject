import { OnsiteRemote } from "./onsite-remote";
import { Status } from "./status";

export class Job{
  id: number;
  position: string;
  company: string;
  dateApplied: string | undefined;
  updateDate: string | undefined;
  description: string;
  enabled: boolean;
  note:string;
  status:Status;
  onsiteRemote: OnsiteRemote

  constructor(
    id: number = 0,
    position: string = '',
    company: string = '',
    dateApplied: string = '',
    updateDate: string= '',
    description: string ='',
    enabled: boolean = true,
    note:string ='',
    status: Status = new Status(),
    onsiteRemote: OnsiteRemote = new OnsiteRemote()

  ){
    this.id = id;
    this.position = position;
    this.company = company;
    this.dateApplied = dateApplied;
    this.updateDate = updateDate;
    this.description = description;
    this.enabled = enabled;
    this.note = note;
    this.status = status;
    this.onsiteRemote = onsiteRemote;
  }

}
