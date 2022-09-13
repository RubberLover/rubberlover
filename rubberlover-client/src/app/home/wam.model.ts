export class WamGeneric {
    tireId: string = "";
    weight: number | undefined;
    width : number | undefined;
    weightUnits: string | undefined;
    widthUnits: string | undefined;
    psi: number | undefined;
    rimInnerWidthMM: number | undefined;
    createdBy: string | undefined;
    dateCreated: Date | undefined;
    createdByName: string | undefined;
    _id: string | undefined;
}


export class WamBase {
    tireId: string = "";
    createdBy: string | undefined;
    dateCreated: Date | undefined;
    createdByName: string | undefined;  
    _id: string | undefined; 
}

export class WamWeight extends WamBase {
    weight: number | undefined;
    weightUnits: string | undefined;
}

export class WamWidth extends WamBase {
    width : number | undefined;
    widthUnits: string | undefined;
    psi: number | undefined;
    rimInnerWidthMM: number | undefined;
}