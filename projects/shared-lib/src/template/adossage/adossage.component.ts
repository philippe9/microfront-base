import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { DialogData } from '../../account-manager/manager-view/manager-view.component';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewComponent } from '../../template/view/view.component';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'microfi-adossage',
  templateUrl: './adossage.component.html',
  styleUrls: ['./adossage.component.scss']
})
export class AdossageComponent extends ViewComponent {

  signature: any = 'assets/images/adossage_placeholder.png';
  agentAnswer = {
    rightImage: '',
    rightSignature: false,

  }
  account: any = {
    intitule: ''
  };
  constructor(
    public dialogRef: MatDialogRef<AdossageComponent>,
    public sanitizer: DomSanitizer,
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
    console.log(data);
    this.account = data.item;
  }

  onValidateUser(): void {
    // this.dialogRef.close();
    if (this.agentAnswer.rightImage === '') {
      this.alerteDialog('Veuillez donner votre accord');
      return;
    }
    if (this.agentAnswer.rightImage === 'N' || this.agentAnswer.rightImage === 'n') {
      this.dialogRef.close('Non');
      return;
    }
    if (this.agentAnswer.rightSignature === false) {
      this.alerteDialog('Veuillez valider la signature en cochant la case a droite');
      return;
    }
    this.dialogRef.close('Oui');
  }

  async ngOnInit(): Promise<void> {
    let imageData = await this.apiService.get(environment.api.doparamBiometrieByCode + '/' + this.account.client.code).toPromise();
    if (imageData.returnValue.length == 0) {

    } else {
      this.signature = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.createBlobImageFile(imageData.returnValue[0].photo, 'image/png', 'signatureImage').toPromise()));
    }

    console.log(this.signature);
  }

  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
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
  filterInput(event) {
    if (event.key == 'o' || event.key == 'O' || event.key == 'N' || event.key == 'n') {

    } else {
      this.agentAnswer.rightImage = '';
    }
  }
}
