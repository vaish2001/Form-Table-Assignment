import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentDataTransferService } from '../student-data-transfer.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';


@Component({
  selector: 'app-secondform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    RadioButtonModule
  ],
  templateUrl: './secondform.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrl: './secondform.component.scss'
})

export class SecondformComponent {

  studentForm: FormGroup;
  selectUser: any;
  visible: boolean = false;
  studentList: any[];
  
  bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'B+', value: 'B+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' }
  ];

  genderlist: any[] = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'other', value: 'other' },
  ];
  
  constructor(private router: Router, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private studentDataService: StudentDataTransferService, private confirmationService: ConfirmationService) 
  {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {

      id: 0,
      firstName: undefined,
      lastName: undefined,
      gender: undefined,
      age: undefined,
      dob: undefined,
      streetAdd: undefined,
      city: undefined,
      state: undefined,
      pinCode: undefined,
      sA: undefined,
      c: undefined,
      s: undefined,
      pC: undefined,
      phoneno: undefined,
      bloodgroup: undefined

    };

    this.studentList = state ? [{ ...state }] : [];
    console.log('incoming data:', state);
  }

  ngOnInit() {

    this.studentForm = this.formBuilder.group({
      date: [null, Validators.required],
      id: [0, Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18), Validators.max(50)]],
      dob: [null, Validators.required],
      cloneAddress: [false],
      streetAdd: ['', Validators.maxLength(255)],
      city: ['', Validators.maxLength(50)],
      state: ['', Validators.maxLength(50)],
      pinCode: ['', Validators.maxLength(10)],
      sA: [''],
      c: [''],
      s: [''],
      pC: [''],
      phoneno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      bloodGroup: ['']
    });
  }

  showDialog() {
    this.visible = true;
  }

  cloneCheckboxChange() {
    const cloneAddress = this.studentForm.get('cloneAddress').value;

    if (cloneAddress) {
      const cloneAddressValue = cloneAddress.value;
      this.studentForm.get('sA').setValue(this.studentForm.get('streetAdd').value);
      this.studentForm.get('c').setValue(this.studentForm.get('city').value);
      this.studentForm.get('s').setValue(this.studentForm.get('state').value);
      this.studentForm.get('pC').setValue(this.studentForm.get('pinCode').value);
    } 
    else {
      this.studentForm.get('sA').setValue('');
      this.studentForm.get('c').setValue('');
      this.studentForm.get('s').setValue('');
      this.studentForm.get('pC').setValue('');
    }
    this.cdr.detectChanges();
  }

  submit() {
    console.log('userdata', this.studentForm.value);
    const userFormData = { ...this.studentForm.value };
    const existingUserIndex = this.studentList.findIndex(user => user.id === userFormData.id);
    if (existingUserIndex !== -1) {
      this.studentList[existingUserIndex] = { ...userFormData };
    } 
    else {
      this.studentList.push({ ...userFormData });
    }
    this.visible = false;
    this.studentForm.reset();
    this.selectUser = null;
  }

  edit(user: any) {
    this.selectUser = { ...user };
    this.studentForm.patchValue(this.selectUser);
    this.visible = true;
  }

  addressesAreEqual(user: any): boolean {
    return user.streetAdd === user.sA &&
      user.city === user.c &&
      user.state === user.s &&
      user.pinCode === user.pC;
  }

  deleteUser(userId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this student?',
      header: 'Confirmation',
      accept: () => {
        const index = this.studentList.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.studentList.splice(index, 1);
        }
      }
    });
  }
}
