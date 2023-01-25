export type Method = "A" | "B";

export type Preparation = {
    method: Method;
    size?: number;
    temp: number;
    excluded?: string;
    balance: string;
    oven: string;
};

export type Measurement = {
    tareId : string;
    tareMass : number;
    tareMaterialWetMass : number;
    materialWetMass : number;    
}

export type DryMass = {
    balance: number;
    tareMaterialDryMass: number;
    material: number;
};

export type Result = {
    waterContent: number;
    report: Report;
};

export type Report = {
    insufficientSample?: boolean;
    dryingTemperature?: boolean;
    materialExcluded?: boolean;
};

export type MoistureContent = {
    preparation?: Preparation;
    measurement : Measurement;
    drymass: DryMass;
    result: Result
}