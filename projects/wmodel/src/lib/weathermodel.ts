export class Weathermodel {
  location: string;
  unit: string;
  constructor(args ? : any) {
    this.location = args.location;
    this.unit  = args.unit;
  }
}
