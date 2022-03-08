import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss', "../../../assets/sass/pages/page-users.scss", "../../../assets/sass/libs/select.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UsersEditComponent implements OnInit {

  user_id:any
  form = this.fb.group({
    nombre_corto: [],
    nombre_largo: [],
    status: [],
    url: [],

  });

  user:any

  formGroup: FormGroup = new FormGroup({
    nombre_corto: new FormControl(''),
    nombre_largo:new FormControl(''),
    status:new FormControl(''),
    url: new FormControl(''),

})
  constructor(  private fb: FormBuilder,private route: ActivatedRoute,private apiService:ApiService) {

    this.route.paramMap.subscribe(() => {
      this.user_id = this.route.snapshot.paramMap.get('id');
      this.userDetail()
    });
   }

  ngOnInit(): void {

  }

 userDetail(){
   this.apiService.corporativoDetalle(this.user_id).subscribe(res=>{
     console.log(res.data.corporativo)
     this.user=res.data.corporativo
     this.formGroup.patchValue({nombre_corto:this.user.S_NombreCorto});
     this.formGroup.patchValue({nombre_largo:this.user.S_NombreCompleto});
     this.formGroup.patchValue({url:this.user.S_SystemUrl});
     this.formGroup.patchValue({status:this.user.S_Activo});

     console.log(this.formGroup.value)
   })
 }
 onSubmit(){
  console.log('submit')
   console.log(this.formGroup.value)
 }
}
