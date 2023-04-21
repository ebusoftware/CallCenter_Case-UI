import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/create-user';
import { User } from 'src/app/contracts/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private userService: UserService, private toastrService: CustomToastrService){}
    frm = new FormGroup({
    nameSurname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    
  });


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
      })
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }

}
