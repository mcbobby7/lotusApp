import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';
import { LotusServiceProxy,GetIndustryListResponseBody, GetAcctCategoriesResponseBody, GetProductListResponseBody, GetSectorListResponseBody, CreateCustomerModelBody, Bank, Customer, Header2 } from '../_services/service-proxies';
import { ShortcutsService } from '../_services/shortcuts.service';
import { CountryserviceService } from '../_services/countryservice.service';
import { ICountry } from '../_models/country.type';
import libphonenumber from 'google-libphonenumber';
import { ApiProvider } from '../_services/api.service'

interface NewCustomer{
  street?: string,
  address?: string,
  country?: string,
  residentPermit?: string,
  motherMaidenName?: string,
  nextOfKinName?:string,
  nextOfKinPhone?: string,
  nextOfKinRelationship?: string,
  regulatoryId?: string,
  termsandcondition?: boolean,
  chooseaccount?:string,
  desiredNumber?: string,
  middleName?: string,
  otherIdCard?: string,


  
  firstName?: string,
  lastName?: string,  
  phoneNumber?: string,
  email?: string,
  dateOfBirth?: string,
  customerStatus?: string,
  nationality?: string,
  residenceCountry?: string,
  residence?: string,
  industry?: string,
  target?: string,
  maritalStatus?: string,
  bvn?: string,


  businessType?: string,
  title?: string,
  sector?: string,
  customerTierType?: string,
  currencyId?: string,
  gender?: string,
  fullName?: string,
  familyName?: string,
  language?: string,
  socialHandle?: string,
  
  accountOfficer?: string,
  customerType?: string,
  segment?: string,


  productId?:string
}

interface newAccount{
  customerNo?: string,
  previousAcct?: string,
  category?: string,
  accountName?: string,
  currency?: string,
  accountOfficer?: string,
  openingDate?: string
}

@Component({
  selector: 'app-openaccount',
  templateUrl: './openaccount.page.html',
  styleUrls: ['./openaccount.page.scss'],
})
export class OpenaccountPage implements OnInit {
  BVNverified = false
  ICountrys: ICountry[];
  newICountry: ICountry[];
  ICountry: ICountry;
  newAccountOpeningForm: FormGroup;
  newAccountOpeningCustomer: NewCustomer = {};
  newAccount: newAccount = {};
  newCustomer: boolean = false;
  page = 0;
  bodyCreateCustomer = new CreateCustomerModelBody().clone();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  selectedFlag: any="";
  selectedCallingCode:  any="";
  alpha2Code = "NG";
  phoneError: boolean = false;
  GetIndustryListResponseBody: GetIndustryListResponseBody[] = [];
  GetAcctCategoriesResponseBody: GetAcctCategoriesResponseBody[] = [];
  GetProductListResponseBody: GetProductListResponseBody[] = [];
  GetSectorListResponseBody: GetSectorListResponseBody[] = [];
  bank: Bank[] = [];
  customer: Customer[] = [];
  accountOpeningSuccess: boolean = false;
  accountOpeningResult = new Header2().clone();
  bvnError: string = "";
  idType: any = '';
  message: any = null
  bvnSelected: boolean = false
  true: boolean = true
  false: boolean = false
  buttonGood: boolean = false
  // titles: [
  //   {name: "Mrs", sex: 'female'},
  //   {name: "Mr", sex: 'male'},
  //   {name: "Miss", sex: 'female'},
  //   {name: "Ms", sex: 'female'},
  //   {name: "Alhaja", sex: 'female'},
  //   {name: "Alhaji", sex: 'male'},
  //   {name: "Dr", sex: 'both'},
  //   {name: "Others", sex: 'both'},
  // ]  
  // sex: [
  //   'Male',
  //   'Female',
  //   'Others'
  // ]
  constructor(private navCtrl: NavController, private AuthenService: AuthenticationService, private router: Router,
    private activatedroute: ActivatedRoute,
    private GalertService: GlobalalertservicesService,
    private lotusService: LotusServiceProxy,
    public shortcuts: ShortcutsService,
    public Cservice: CountryserviceService,
    private toastCtrl: ToastController,
    private api: ApiProvider
    ) { }
  get accountOpeningDetails(){
    var acctDet = [];
       Object.entries(this.newAccountOpeningCustomer).map(([key, value], index) => {  
         if(key == 'firstName'){
           let nObj = {
             key: 'First Name',
             value: value
           }
           acctDet.push(nObj);
         }    

            if(key == 'lastName'){
           let nObj = {
             key: 'Last Name',
             value: value
           }
           acctDet.push(nObj);
         }
              if(key == 'phoneNumber'){
           let nObj = {
             key: 'Phone Number',
             value: value
           }
           acctDet.push(nObj);
         }
               if(key == 'email'){
           let nObj = {
             key: 'Email',
             value: value
           }
           acctDet.push(nObj);
         }

              if(key == 'street'){
           let nObj = {
             key: 'Street',
             value: value
           }
           acctDet.push(nObj);
         }         
              if(key == 'address'){
           let nObj = {
             key: 'Address',
             value: value
           }
           acctDet.push(nObj);
         }
     if(key == 'country'){
           let nObj = {
             key: 'Country',
             value: value
           }
           acctDet.push(nObj);
         }
             if(key == 'dateOfBirth'){               
     
           let nObj = {
             key: 'Date Of Birth',
             value: value
           }
           acctDet.push(nObj);
         }
       if(key == 'nationality'){
           let nObj = {
             key: 'Nationality',
             value: value
           }
           acctDet.push(nObj);
         }
           if(key == 'residenceCountry'){
           let nObj = {
             key: 'Residence',
             value: value
           }
           acctDet.push(nObj);
         }
         
       if(key == 'maritalStatus'){
           let nObj = {
             key: 'Marital Status',
             value: value
           }
           acctDet.push(nObj);
         }

       if(key == 'bvn'){
           let nObj = {
             key: 'BVN',
             value: value
           }
           acctDet.push(nObj);
       }
         
       if(key == 'residentPermit'){
        let nObj = {
          key: 'Resident Permit',
          value: value
        }
        acctDet.push(nObj);
       }
       if(key == 'motherMaidenName'){
        let nObj = {
          key: 'Mother Maiden Name',
          value: value
        }
        acctDet.push(nObj);
       }
       if(key == 'nextOfKinName'){
        let nObj = {
          key: 'Next Of Kin Name',
          value: value
        }
        acctDet.push(nObj);
       }
       if(key == 'nextOfKinPhone'){
        let nObj = {
          key: 'Next Of Kin Phone',
          value: value
        }
        acctDet.push(nObj);
       }
       if(key == 'nextOfKinRelationship'){
        let nObj = {
          key: 'Next Of Kin Relationship',
          value: value
        }
        acctDet.push(nObj);
      }
       });
   

    return acctDet;
  }

  get validateForm() {
    
    let resp: boolean = true;
    let nullable = [
      'middleName',
      'residentPermit',
      'desiredNumber',
      'otherIdCard',
        'socialHandle',
        'businessType',
        'accountOfficer',
        'customerType',
        'segment',
      'customerStatus',
      'industry',
      'target',
      'maritalStatus',
        'productId',
      'sector',
      'customerTierType',
      'currencyId',
      'language',
      'familyName',
      'fullName',
    ]
    
    Object.entries(this.newAccountOpeningCustomer).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
 
    });
    return resp;
  }

    async  phoneValidation(pNumber){
      var reg = new RegExp('^[+.0-9]+$');
      let pnumber="";
      let phonecode = this.alpha2Code;
  
      let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance(),
      PNF = libphonenumber.PhoneNumberFormat;
      if(pNumber !== "" && pNumber && reg.test(pNumber)){
       
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          let phoneNumber = "" + pNumber + "",
          
              region = phonecode,
              number = phoneUtil.parse(phoneNumber, region),
              isValidNumber = phoneUtil.isValidNumber(number);
             pnumber = phoneUtil.format(number, PNF.E164);
  if(isValidNumber){
    this.phoneError = false;  
    this.newAccountOpeningCustomer.phoneNumber = pnumber;
  }else{
    this.phoneError = true;
  }
      }
      else {
        this.GalertService.gPresentToast("valid Phone Number is required", "danger");
       this.phoneError = true;
  
      }
  
    
    }
    openCountries(){
      setTimeout(() => {
      // this.ICountrys = this.Cservice.setItems(); 
       let radios=document.getElementsByClassName('alert-radio-label');
       for (let index = 0; index < radios.length; index++) {
           let element = radios[index];
          var elValue = element.innerHTML.valueOf();
          element.innerHTML = '<img class="country-image" style="width: 30px;height:16px;" src="'+this.ICountrys[index].flag+'" />';
           element.innerHTML=element.innerHTML.concat(' '+ elValue);
         }
      }, 1000);
       }
    getCountryFlag(countVal){
      this.selectedFlag = this.Cservice.getCountryFlag(countVal);
      this.alpha2Code = countVal;
      
    }
    getcountry() {
      this.ICountrys = this.Cservice.setItems(); 
         }
  createCustomer() {
    this.GalertService.gPresentLoading('Please wait...');
    this.AuthenService.getuser().then(userData => {
      if (userData && userData.length > 0) {
 
      } else {
        this.newAccountOpeningCustomer.familyName = this.newAccountOpeningCustomer.lastName;
        this.newAccountOpeningCustomer.fullName = this.newAccountOpeningCustomer.lastName + " " + this.newAccountOpeningCustomer.firstName;
        this.newAccountOpeningCustomer.accountOfficer = "1";
        this.newAccountOpeningCustomer.target = "1";
        this.newAccountOpeningCustomer.customerStatus = "1";
        this.newAccountOpeningCustomer.title = this.newAccountOpeningCustomer.title.toUpperCase();
        this.newAccountOpeningCustomer.sector = "1001";
        this.newAccountOpeningCustomer.businessType = "Individual";
        this.newAccountOpeningCustomer.segment = "1002";
        this.newAccountOpeningCustomer.productId = "SAVINGS.ACCOUNT";
        this.newAccountOpeningCustomer.currencyId = "NGN";
        this.newAccountOpeningCustomer.language = "1";
        this.newAccountOpeningCustomer.customerTierType = this.newAccountOpeningCustomer.regulatoryId == "3" ? "1" :
          (this.newAccountOpeningCustomer.regulatoryId == "2" ? "2" :
            (this.newAccountOpeningCustomer.regulatoryId == "1" ? "3" : "0"));
        this.newAccountOpeningCustomer.customerType = "ACTIVE";
        this.newAccountOpeningCustomer.productId = this.newAccountOpeningCustomer.productId.toString();
        this.newAccountOpeningCustomer.dateOfBirth = this.shortcuts.formatDAte(new Date(this.newAccountOpeningCustomer.dateOfBirth))
  //   console.log(this.newAccountOpeningCustomer)
        this.idType = this.newAccountOpeningCustomer.regulatoryId;
        this.newAccountOpeningCustomer.residence = this.newAccountOpeningCustomer.residenceCountry;;

        this.newAccountOpeningCustomer.socialHandle = "xxxxxxxxxxxx";


        this.openAccount(this.newAccountOpeningCustomer)

      }
    });   
  }
  openAccount(payload) {
   console.log(payload);
   
    var nBank= new Bank().clone();
    nBank.bvn = this.newAccountOpeningCustomer.bvn;
    this.bank.push(nBank)
    let nCustomer = new Customer().clone();
    nCustomer.bank = this.bank;
    this.customer.push(nCustomer);
    delete  payload.address
    delete  payload.chooseaccount
    delete  payload.middleName
    delete  payload.motherMaidenName
    delete  payload.nextOfKinName
    delete  payload.nextOfKinPhone
    delete  payload.nextOfKinRelationship
    delete  payload.regulatoryId
    delete  payload.residenceCountry
    delete  payload.residentPermit
    delete  payload.street
    delete payload.termsandcondition
    delete  payload.country

     this.bodyCreateCustomer = {...payload };
    this.bodyCreateCustomer.customer = this.customer;
    console.log(this.bodyCreateCustomer);
    



   console.log(this.bodyCreateCustomer)
      this.lotusService.createAccountsLtb(this.bodyCreateCustomer,"",this.AuthenService.imei.value ).subscribe(data => {
        this.GalertService.gdismissLoading();
        if (!data.hasError) {
          if (data.result.status != "failed") {
            this.page++;
            this.accountOpeningSuccess = true;
            this.accountOpeningResult.accountName = data.result.accountName;
            this.accountOpeningResult.accountNo = data.result.accountNo;
            this.accountOpeningResult.accountType = data.result.accountType;
            if(this.newAccountOpeningCustomer.customerTierType == '1') {
              this.GalertService.gPresentToast("Please proceed to Customer Care Desk to submit your recent passport photograph", "success");
              this.message = "Please proceed to Customer Care Desk to submit your recent passport photograph"
            }else if(this.newAccountOpeningCustomer.customerTierType == '2') {
              this.GalertService.gPresentToast("Please proceed to Customer Care Desk to submit your recent passport photograph, a valid ID Card and Proof of address", "success");
              this.message = "Please proceed to Customer Care Desk to submit your recent passport photograph, a valid ID Card and Proof of address"
            } else {
              this.GalertService.gPresentToast("Please proceed to Customer Care Desk to submit your recent passport photograph, a valid Regulatory ID Card and Proof of address", "success");
              this.message = "Please proceed to Customer Care Desk to submit your recent passport photograph, a valid Regulatory ID Card and Proof of address"
            }
          } else {
            let error = JSON.parse(data.result.error.message)
            this.GalertService.gPresentToast(error.error.errorDetails[0].message, "danger");
       }
       let error = JSON.parse(data.result.error.message)
       if(error) {
        this.GalertService.gPresentToast(error.error.errorDetails[0].message, "danger");         
       }else {
        this.GalertService.gPresentToast("Something went wrong", "danger"); 
       }
        }
        else {
          let error = JSON.parse(data.result.error.message)
          this.GalertService.gPresentToast(error.error.errorDetails[0].message, "danger");          
        }
      })

  }
  
  async getIndustryList() {  
    var data =await this.lotusService.getIndustryList('', this.AuthenService.imei.value).toPromise();
    this.GalertService.gdismissLoading();
    if (!data.hasError) {
      this.GetIndustryListResponseBody = data.result.body;
    }
  }
  async getSectorList() {
    var data =await this.lotusService.getSectorList('',this.AuthenService.imei.value).toPromise();
    if (!data.hasError) {
      this.GetSectorListResponseBody = data.result.body;
    }
  }
  async getAccountCategories() {
    var data =await this.lotusService.getAcctCategories(undefined,undefined,undefined,'', this.AuthenService.imei.value).toPromise();
    if (!data.hasError) {
      this.GetAcctCategoriesResponseBody = data.result.body;
    }
  }

  async getAccountProductList() {
    var data =await this.lotusService.getProductList(undefined,undefined,'', this.AuthenService.imei.value).toPromise();
    if (!data.hasError) {
      this.GetProductListResponseBody = data.result.body;
    }
  }

  ionViewWillEnter() {
     this.getcountry();
    this.getCountryFlag("NG");
    //this.page = 4;
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.newCustomer = true;
        //  this.page = 3;
        } else {
          this.newCustomer = true;         
        }
      } else {
        this.newCustomer = true;
      }
    })
   
    this.newAccountOpeningCustomer.country = "NG";
    this.newICountry = this.ICountrys;
    this.newAccountOpeningCustomer.residenceCountry = "NG";
    this.getIndustryList();
    this.getAccountCategories();
    this.getAccountProductList();
    this.getSectorList()
    this.bodyCreateCustomer.customer = [];
   
   }
  goBack(){
    this.router.navigate(['/dashbord']);
  }
  navBack() {
    this.page -= 1;
  }
  navNext() {
    this.page += 1;
  }
  ngOnInit() {
    
  }
  gotoHome() {
    this.router.navigate(['/dashbord']);
  }
  changeDate(event) {
    let day1 = +this.newAccountOpeningCustomer.dateOfBirth[9]
    let day2 = +this.newAccountOpeningCustomer.dateOfBirth[9]
    if( day1 == 0 && day2 == 0) {
      this.GalertService.gPresentToast("Plases check selected and make sure you select the right date", "danger");
     this.newAccountOpeningCustomer.dateOfBirth = "" 
    }
    
  }
  onChangeTime(event) {
    let bvn = event
    if(bvn.length == 11){
      this.api
  .verifBvn(bvn)
    .subscribe(
    (resSuccess: any) => {
      console.log(resSuccess); 
      console.log(this.newAccountOpeningCustomer);
      if(resSuccess.Result.FirstName) {
        this.newAccountOpeningCustomer.firstName = resSuccess.Result.FirstName
        this.newAccountOpeningCustomer.lastName = resSuccess.Result.LastName
        this.newAccountOpeningCustomer.middleName = resSuccess.Result.MiddleName
        this.newAccountOpeningCustomer.bvn = resSuccess.Result.BVN
        this.newAccountOpeningCustomer.dateOfBirth = resSuccess.Result.DateOfBirth
        this.BVNverified = true
      }else {
        this.GalertService.gPresentToast("Error verifying BVN please input corrrect BVN", "danger");
        this.BVNverified = false
      }
      },
        (resErr) => {
          this.BVNverified = false
        }
      )
    }
    else {
      this.newAccountOpeningCustomer.firstName = null
      this.newAccountOpeningCustomer.lastName = null
      this.newAccountOpeningCustomer.middleName = null
      this.newAccountOpeningCustomer.dateOfBirth = null
      this.BVNverified = false
      
    }
    
  }
  async avalidate(event){
    var inputentry =  event.target.value;
    var reg = new RegExp('^[-,-.0-9]+$');
    if (inputentry && reg.test(inputentry)) {
      if (inputentry.length != 11) {
        this.bvnError = "BVN must be 11 digits"
        return false;
      } else {
        this.bvnError = "";
        return true;
      }
    }else{
      if(event.key == "Backspace" || event.key == "Delete" || event.key == "ArrowLeft" || event.key == "ArrowRight"){

      }else{
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'Please input number only',
          color: "danger"
        });
        toast.present();
        this.bvnError = "BVN must be 11 digits"
        event.target.value = inputentry.slice(0,-1);

        return false;

      }
     
  }
    }

    onChange(event) {      
      if(event.target.value == "Male" ) {
        if( this.newAccountOpeningCustomer.title == "Mrs" ||this.newAccountOpeningCustomer.title == "Miss" || this.newAccountOpeningCustomer.title == "Ms" || this.newAccountOpeningCustomer.title == "Alhaja") {
          this.GalertService.gPresentToast("Your gender must match your title", "danger");
          this.buttonGood = true
        }else {
          this.buttonGood = false
        }
      }
      else if(event.target.value == "Female"){
        if(this.newAccountOpeningCustomer.title == "Mr" || this.newAccountOpeningCustomer.title == "Alhaji") {
          this.GalertService.gPresentToast("Your gender must match your title", "danger");
          this.buttonGood = true
        }else {
          this.buttonGood = false
        }
      }
  }



  onChange1(event) {      
    if(event.target.value == "Mrs" || event.target.value == "Miss" || event.target.value == "Ms" || event.target.value == "Alhaja" ) {
      if( this.newAccountOpeningCustomer.gender == "Male") {
        this.GalertService.gPresentToast("Your gender must match your title", "danger");
        this.buttonGood = true
        }else {
          this.buttonGood = false
      }
    }
    else if(event.target.value == "Mr" || event.target.value == "Alhaji"){
      if(this.newAccountOpeningCustomer.gender == "Female") {
        this.GalertService.gPresentToast("Your gender must match your title", "danger");
        this.buttonGood = true
        }else {
          this.buttonGood = false
      }
    }
}
changeBvn(event) {
if(event.target.value == "Yes") {
  this.bvnSelected = true
}else if(event.target.value == "No") {
  this.bvnSelected = false
}
}

}
