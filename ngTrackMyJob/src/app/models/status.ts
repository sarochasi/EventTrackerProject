export class Status {
  id: number;
  status: string;

  constructor(
    id: number = 0,
    status: string = ''
  ){
    this.id = id;
    this.status = status
  }
}
