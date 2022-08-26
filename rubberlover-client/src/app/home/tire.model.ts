export class Tire {
    name: string = "";
    brand: string = "";
    weight: number = 0;
    width: number = 0;
    weightUnits: string = "";
    widthUnits: string = "";
    wheelSize: string = "";
    tireType: string = "";
    sources: string[] = [];
    approved: boolean = false;
    approvedBy: string = "";
    dateApproved: Date = new Date();
    retired: boolean = false;
    dateRetired: Date = new Date();
    dateCreated: Date = new Date();
    bicycleRollingResitanceArticle: string = "";
    tpi: string = "";
    color: string = "";
    casingType: string = "";
    countryManufactured: string = "";
    treadPattern: string = "";
    year: number = 0;
    icon: string = "";
}
