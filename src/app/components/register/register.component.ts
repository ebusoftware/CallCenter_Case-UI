import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/create-user';
import { User } from 'src/app/contracts/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/user.service';
import { matchPassword } from 'src/app/validators/match-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  frm:FormGroup;
  constructor(private userService: UserService, private toastrService: CustomToastrService,private formbuilder:FormBuilder,){
    this.frm = formbuilder.group({
      nameSurname:["",[Validators.required,Validators.minLength(3)]],
      username:["",[Validators.required,Validators.minLength(3)]],
      email:["",Validators.email],
      password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      passwordConfirm:["",Validators.required,]
    },{
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })

  }
  async onSubmit() 
  {
    const create_user: User = new User();
    create_user.nameSurname = this.frm.value.nameSurname,
    create_user.username =   this.frm.value.username,
    create_user.email =   this.frm.value.email,
    create_user.password =  this.frm.value.password,
    create_user.passwordConfirm =    this.frm.value.passwordConfirm
    
  
    const result: Create_User = await this.userService.create(create_user);
    if (result.succeeded)
    
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
        
      }
      
      )
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
      
  }


  get nameSurname(){
    return this.frm.get("nameSurname");
  }
  get username(){
    return this.frm.get("username");
  }
  get email(){
    return this.frm.get("email");
  }
  get password(){
    return this.frm.get("password");
  }
  get passwordConfirm(){
    return this.frm.get("passwordConfirm");
  }

}
