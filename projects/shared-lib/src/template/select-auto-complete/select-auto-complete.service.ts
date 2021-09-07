import {Injectable} from "@angular/core"
import {FormGroup, FormBuilder, FormArray} from "@angular/forms"
import {BehaviorSubject, Observable} from "rxjs"

@Injectable()
export class SelectAutoCompleteService {
  private selectAutoCompleteForm: BehaviorSubject<FormGroup | undefined>
    = new BehaviorSubject(this.fb.group({}));
  selectAutoCompleteFormForm$: Observable<FormGroup>
    = this.selectAutoCompleteForm.asObservable()

  constructor(private fb: FormBuilder) {
  }
}
