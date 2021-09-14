import { Component, OnInit, Injector } from '@angular/core';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'microfi-impression-rib',
  templateUrl: './impression-rib.component.html',
  styleUrls: ['./impression-rib.component.scss']
})
export class ImpressionRibComponent extends ViewComponent {
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  Disabled = false;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  recordRIB = this.formGroupBuilder.group({
    uniteBancaire: [],
    agence: [],
    compte: [],
    en_cours: []
  });
  signature: any = '';
  constructor(injector: Injector, public sanitizer: DomSanitizer) {
    super(injector)
  }

  ngOnInit(): void {
  }
  submitForm() {
    console.log(this.recordRIB.value);
    // return;
    this.apiService.get(environment.api.impressionRIB + '/' + this.recordRIB.value.compte.item.numeroCompte + '/' + this.recordRIB.value.compte.item.cleCompte + '/' + this.recordRIB.value.uniteBancaire.item.code + '/' + this.recordRIB.value.agence.item.code + "/ROOT").subscribe(async (data) => {
      console.log(data);
      if (data.success) {
        this.alerteDialog("Impression éffectué");
        this.signature = URL.createObjectURL(await this.createBlobImageFile(data.returnValue, 'application/pdf', 'signatureImage').toPromise());
        console.log(this.signature);
        const link = document.createElement('a');
        link.id = 'lnk';
        document.body.append(link);
        link.setAttribute('download', 'RIB ' + this.recordRIB.value.compte.item.numeroCompte);
        link.setAttribute('href', this.signature)
        link.click();
        document.body.removeChild(link);
      }
    })
  }

  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'application/pdf' });
      observer.next(blob);
      observer.complete();
    });
  }
  createBlobImageFile(base64TrimmedURL: string, typeImage: string, name?: string | undefined): Observable<String> {
    return Observable.create((observer: Observer<File>) => {
      // create an image object
      this.dataURItoBlob(base64TrimmedURL.trim()).subscribe((blob: Blob) => {
        const imageBlob: Blob = blob;
        if (!name) {
          name = "Example_name";
        }
        const imageFile: File = new File([imageBlob], name, {
          type: typeImage
        });
        observer.next(imageFile);
        observer.complete();

      });
    });
  }
}
