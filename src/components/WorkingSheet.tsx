import { useForm, useWatch } from "react-hook-form"
import { calculateDryMass, calculateWaterContent, calculateWetMass } from "../lib/calculationsMass"
import { validate } from "../lib/validate"
import { MoistureContent } from "../model/MoistureContent"

export default function WorkingSheet() {   
    // using React Hook Form to validate input of the form
    const {
        control,
        register, 
        handleSubmit,
        getValues,
        formState : {errors},
        } = useForm<MoistureContent>({
            defaultValues: {
                preparation: {
                    method: "B",
                    temp: 110,
                    balance: "01BAL",
                    oven: "01OVN",
                },
                measurement: {},
                drymass:{},
                result:{}
            }, 
            mode: "all"
        })
    // using useWatch to monitor method when changing
    const method = useWatch({
        control,
        name: "preparation.method",
    });

     
    // using State to calculate the field   
    const [tareMass, tareWetMass] = useWatch({
        control, 
        name: ["measurement.tareMass", "measurement.tareMaterialWetMass"]
    });    

    const tareDryMass = useWatch({
        control,
        name:"drymass.tareMaterialDryMass"
    })

    // Wet and Dry mass result
    const materialWetMass = !isNaN(tareWetMass) && !isNaN(tareMass) && tareWetMass >=0 && tareMass >=0 && tareWetMass > tareMass ? calculateWetMass(tareWetMass, tareMass) : 0;
    const materialDryMass = !isNaN(tareDryMass) && !isNaN(tareMass) && tareDryMass >=0 && tareMass >=0 && tareDryMass > tareMass && tareDryMass < tareWetMass ? calculateDryMass(tareDryMass, tareMass) : 0;
    // // water content
    const waterContent = tareDryMass && tareWetMass && tareMass ? calculateWaterContent(tareWetMass,tareDryMass,tareMass, method) : 0
    
    // console.log(materialDryMass)
    return (
        <form action="" onSubmit={handleSubmit(console.log)} className="container" style={{width: '520px'}}>
            {/* Preparation */}
            <div className=" d-flex justify-content-between py-3">
                <div>
                    <div>
                        <p className="m-0 text-left">Method</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <input type="radio" id="A" value="A" {...register("preparation.method")}/>                                   
                                <label >A</label>
                            </div>                    
                            <div>
                                <input type="radio" id="B" value="B" {...register("preparation.method")}/>                                 
                                <label >B</label>
                            </div>
                        </div>                   
                    </div>
                    <div>
                        <p className="">Drying Temperature ( &#8451;)</p>
                        <input type="text" id="dryingTemp" className="w-100" placeholder="Drying temperature"
                        {...register("preparation.temp")}/>
                        <p>Balance</p>
                        <select id="balanceEquips" {...register("preparation.balance")} className="w-100">
                            <option value="01bal">01BAL</option>
                            <option value="02bal">02BAL</option>            
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Visual Nominal Particle Size</p>
                        <select id="particleSize" {...register("preparation.size")}>
                            <option value="3">3" (75mm)</option>
                            <option value="4">4" (100mm)</option>            
                        </select>                     
                    </div>
                    <div>   
                        <div style={{paddingTop: '20px', paddingBottom: '5px'}}>
                            <input type="checkbox" id="materialExclude" {...register("preparation.excluded")} />
                            <label>Material Excluded</label>  
                        </div>                                      
                        <p>Oven</p>
                        <select id="ovenEquips" {...register("preparation.oven")}>
                            <option value="01OVN">01OVN</option>
                            <option value="02OVN">02OVN</option>            
                        </select>
                    </div> 
                </div>                               
            </div>
            {/* Measurement */}
            <p>Measurement</p>
            <div className="d-flex">
                <div>
                    <div className="d-flex flex-column w-50" style={{paddingBottom: '15px'}}>
                        <label htmlFor="tareId">Tare ID</label>
                        <input type="text" placeholder="Tare ID" id="tareId" style={{width: "125%"}}/>
                    </div>
                    <div>
                        <label htmlFor="measurement.tareMaterialWetMass">Tare and Material Wet Mass (g)</label>
                        <input type="number" id="measurement.tareMaterialWetMass" 
                            {...register("measurement.tareMaterialWetMass", {
                                valueAsNumber : true,   
                                validate : validate.measurement.tareWetMass                    
                            })}/>
                        {/* Error message for Tare and Material Wet Mass display here  */}
                        <p style={{color: 'red'}}>{errors.measurement?.tareMaterialWetMass && errors.measurement?.tareMaterialWetMass?.message}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="measurement.tareMass">Tare Mass</label>
                        <input type="text" placeholder="Tare Mass" id="measurement.tareMass"
                            {...register("measurement.tareMass", {
                                valueAsNumber : true,
                                validate : validate.measurement.tareMass,                    
                            })}/>  
                            <p style={{color: 'red'}}>{errors.measurement?.tareMass && errors.measurement?.tareMass?.message}</p>         
                    </div>
                    <div style={{paddingBottom: '15px'}}>
                        <p>Material Wet Mass (g)</p>
                        <span title="Material Wet Mass resutl">{materialWetMass}</span>
                    </div>                    
                </div>
            </div>           
            {/* Dry Mass */}
            <p className="font-weight-bold">Dry Mass</p>
            <div className="d-flex">       
                <div className="w-50">
                    <div style={{paddingBottom: '10px'}}>
                        <p>Dry Mass Balance</p>
                        <select id="balanceEquips" {...register("preparation.balance")} className="w-75">
                                <option value="01bal">01BAL</option>
                                <option value="02bal">02BAL</option>            
                        </select>
                    </div>
                    <div>
                        <label htmlFor="measurement.tareMaterialDryMass">Tare and Material Dry Mass (g)</label>
                        <input type="text" placeholder='Tare and material dry mass' 
                        id="measurement.tareMaterialDryMass" 
                        {...register("drymass.tareMaterialDryMass", {
                            valueAsNumber : true,   
                            validate : validate.measurement.tareDryMass                     
                        })}/>
                        {/* Error message for Tare Dry Mass display here */}
                        <p style={{color: 'red'}}>{errors.drymass?.tareMaterialDryMass && errors.drymass?.tareMaterialDryMass?.message}</p>
                    </div>
                </div>
                <div style={{paddingLeft: '60px'}}>
                    <p>Material Dry Mass (g) :</p>
                    <span title="Material Dry Mass result">{materialDryMass}</span>
                </div>
            </div>
            {/* Result */}
            <p>Result</p>
            <div>                
                <p>Water Content (%) :</p>
                <span id='waterContentResult'>{waterContent}</span>
                <div className='d-flex flex-column'>
                    <div>
                        <input type="checkbox" id="InsufMass"/>
                        <label>Insufficient Sample Mass</label>
                    </div>
                    <div>
                        <input type="checkbox" id="DryingTempCheck"/>
                        <label>Drying Temperature</label>
                    </div>
                    <div>
                        <input type="checkbox" id="materialExclude"/>
                        <label>Material Excluded</label>
                    </div>                    
                </div>
            </div>
        </form>
    )
}