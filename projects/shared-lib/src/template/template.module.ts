import { MicrofiUserFormComponent } from './microfi-user-form/microfi-user-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAutoCompleteComponent } from './select-auto-complete/select-auto-complete.component';
import { MaterialModule } from '../material/material.module';
import { IconsModule } from '../material/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ViewComponent } from './view/view.component';
import { ButtonComponent } from './button/button.component';
import { SelectCustomerFormComponent } from './select-customer-form/select-customer-form.component';
import { SelectAccountFormComponent } from './select-account-form/select-account-form.component';
import { CommissionTaxComponent } from './commission-tax/commission-tax.component';
import { ApiService } from './api.service';
import { AmountComponent } from './amount/amount.component';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DisableDialogComponent } from './disable-dialog/disable-dialog.component';
import { EnableDialogComponent } from './enable-dialog/enable-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AlerteDialogComponent } from './alerte-dialog/alerte-dialog.component';
import { MicrofiAccountFormComponent } from './microfi-account-form/microfi-account-form.component';
import { MicrofiLovFormComponent } from './microfi-lov-form/microfi-lov-form.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectPatnerFormComponent } from './select-patner-form/select-patner-form.component';
import { SelectOrganismeFormComponent } from './select-organisme-form/select-organisme-form.component';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AdossageComponent } from './adossage/adossage.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TemplateInterceptor } from './template.interceptor';

@NgModule({
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TemplateInterceptor,
    multi: true
  },],
  declarations: [
    SelectAutoCompleteComponent,
    MainComponent,
    ViewComponent,
    ButtonComponent,
    SelectCustomerFormComponent,
    SelectAccountFormComponent,
    CommissionTaxComponent,
    AmountComponent,
    LogoutDialogComponent,
    CancelDialogComponent,
    ConfirmationDialogComponent,
    DeleteDialogComponent,
    DisableDialogComponent,
    EnableDialogComponent,
    ErrorDialogComponent,
    CloseDialogComponent,
    FileUploadComponent,
    AlerteDialogComponent,
    MicrofiAccountFormComponent,
    MicrofiLovFormComponent,
    MicrofiUserFormComponent,
    SelectPatnerFormComponent,
    SelectPatnerFormComponent,
    SelectOrganismeFormComponent,
    AdossageComponent
  ],
  exports: [
    SelectAutoCompleteComponent,
    MainComponent,
    ViewComponent,
    ButtonComponent,
    SelectCustomerFormComponent,
    SelectAccountFormComponent,
    SelectPatnerFormComponent,
    CommissionTaxComponent,
    AmountComponent,
    CloseDialogComponent,
    LogoutDialogComponent,
    CancelDialogComponent,
    ConfirmationDialogComponent,
    DeleteDialogComponent,
    DisableDialogComponent,
    EnableDialogComponent,
    ErrorDialogComponent,
    FileUploadComponent,
    MicrofiAccountFormComponent,
    MicrofiLovFormComponent,
    MicrofiUserFormComponent,
    SelectOrganismeFormComponent,
    AdossageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    InputTextModule,
    OverlayPanelModule,
    DropdownModule,
    ListboxModule,
    TooltipModule,
    AutoCompleteModule
  ]
})
export class TemplateModule {
}
