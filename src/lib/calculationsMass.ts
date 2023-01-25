import { Method } from "../model/MoistureContent";

export const calculateWetMass = (tareWetMass : number, tareMass: number) => {    
        return tareWetMass - tareMass;
}

export const calculateDryMass = (tareDryMass : number, tareMass: number) => {
        console.log(tareDryMass - tareMass)
        return tareDryMass - tareMass;
}

export const calculateWaterContent = (
        tareWetMass : number, 
        tareDryMass: number, 
        tareMass: number,
        method: Method ) => {
                const waterContent = ((tareWetMass - tareDryMass)*100)/(tareDryMass-tareMass);
                console.log(waterContent)
                return method === "A" ? Math.round(waterContent) : (waterContent).toFixed(1)

        
}