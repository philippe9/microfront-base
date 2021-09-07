import { FormGroup } from '@angular/forms';
/**
 * @Author Yannick SADE 
 */
export function MustMatch(form?: any, controlFields?: ITest[] | any): any {
    return (formGroup?: FormGroup) => {
        form.errors = null;
        let isObj = false;
        if (controlFields) { // to use in the controller
            controlFields.forEach(controlName => {
                let control: any;
                if (form.controls) {
                    control = form.controls[controlName.field]; isObj = false;
                } else {
                    control = form; isObj = true;
                }
                // return null if controls haven't initialised yet or no fields exist
                if (!control) {
                    return null;
                }

                if (isObj) { control.value = control[controlName.field]; }
                // set error on form and Control if validation fails
                if (control.value !== 0 && !control.value || control.value.empty || control.value && (control.value.item && control.value.item.empty)) {
                    const msg = controlName.msg || `must not be empty or null`;
                    const name = controlName.field.toUpperCase();
                    if (!isObj) { control.setErrors({ mustBe: msg }); }
                    if (!form.errors) { form.errors = [] }
                    form.errors.push(`${name} : ${msg}`);
                    console.log(`${name} : must not be empty or null`);
                    console.log(`data: ${form}`);
                }
            });
        } else if (!isObj && formGroup && !formGroup.controls.empty) { // to use in the form
            const cls: any = formGroup.controls;
            cls.forEach(control => {
                if (control.value !== 0 && !control.value || control.value && (control.value.item && control.value.item.empty)) {
                    const msg = `must not be empty or null`;
                    control.key = control.key.toUpperCase();
                    control.setErrors({ mustBe: msg });
                    form.errors.push(`${control.key} : ${msg}`);
                    console.log(`${control.key} : must not be empty or null`);
                }
            });
        }
    };
}
// export function MustMatchRecord(form?: any, controlFields?: ITest[]): boolean {   
//     console.log("controlFields",controlFields)
//         if (controlFields) { // to use in the controller
//             controlFields.forEach(controlName => {  
//                    let field =  controlName.field;          
//                    console.log("field",field)
//                    console.log("field",form?.[field])
//                    console.log("field",form?.controlName.field)
//                 if (form?.[field] !=undefined && form?.field !=null) {
//                     console.log("!=undefined")
//                     return false;
//                 }else if(form?.field !=undefined || form?.field !=null) {
//                     console.log("!undefined")
//                     if(controlName.msg){
//                         this.openInfo(controlName.msg);
//                         return true
//                     }else{
//                         this.openInfo(controlName.field + " "+ "is empty");
//                         return true
//                     }
                    
//                 }               
//             });
//         }
//         return false; 
//     }

export interface ITest {
    field: string;
    msg?: string;
}
