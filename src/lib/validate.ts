import { MoistureContent } from "../model/MoistureContent";

export const validate = {
    measurement: {
        tareMass: {
            positive: (v: number) =>
                isNaN(v) || v >= 0 || "Mass cannot be less than 0",
            isNotNull: (v: number, values: MoistureContent) =>
                v != 0 ||
                (isNaN(v) &&
                    isNaN(values.measurement.tareMaterialWetMass) &&
                    isNaN(values.drymass.tareMaterialDryMass)) ||
                "Tare mass is expected, a missing or 0 tare mass may indicate an issue with the result",
            withTareMaterialWetMass: (v: number, values: MoistureContent) =>
                isNaN(v) ||
                isNaN(values.measurement.tareMaterialWetMass) ||
                v < values.measurement.tareMaterialWetMass ||
                "Tare and Wet mass must be greater than Tare mass",
        },
        tareWetMass: {
            positive: (v: number) =>
                isNaN(v) || v >= 0 || "Mass cannot be less than 0",
        },
        tareDryMass: {
            positive: (v: number) =>
                isNaN(v) || v >= 0 || "Mass cannot be less than 0",
            withTareMass: (v: any, values: MoistureContent) =>
                v > values.measurement.tareMass ||
                "Tare mass is greater/ equal to tare and dry material mass, cannot calculate a result",
            withWetMass: (v: any, values: MoistureContent) =>
                v < values.measurement.tareMaterialWetMass ||
                "Dry mass greater than wet mass, cannot calculate a result",
        },
    },
};
