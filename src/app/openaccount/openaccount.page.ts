import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';
import { LotusServiceProxy,CreateCustomerPayload,CreateCustomerPayloadBody,CreateAccountPayload,CreateAccountPayloadBody, DisplayName, CustomerName, CommunicationDevice, Street, Address, Country } from '../_services/service-proxies';
import { ShortcutsService } from '../_services/shortcuts.service';
import { CountryserviceService } from '../_services/countryservice.service';
import { ICountry } from '../_models/country.type';
import libphonenumber from 'google-libphonenumber';
interface NewCustomer{
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  phoneNo?: string,
  email?: string,
  street?: string,
  address?: string,
  country?: string,
  dateOfBirth?: string,
  customerStatus?: string,
  nationality?: string,
  residence?: string,
  industry?: string,
  target?: string,
  maritalStatus?: string,
  bvn?: string,


  residentPermit?:string,
  motherMaidenName?: string,
  nextOfKinName?:string,
  nextOfKinPhone?: string,
  nextOfKinRelationship?: string,
  regulatoryId?: string,
  termsandcondition?: boolean,
  chooseaccount?:string,
  desiredNumber?: string,
  secQuestion?: string,
  secQuestionAnswer?: string

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
  ICountrys: ICountry[];
  ICountry: ICountry;
  newAccountOpeningForm: FormGroup;
  newAccountOpeningCustomer: NewCustomer = {};
  newAccount: newAccount = {};
  newCustomer: boolean = false;
  page = 0;
  CreateCustomer = new CreateCustomerPayload().clone();
  bodyCreateCustomer = new CreateCustomerPayloadBody().clone();
  CreateAccount = new CreateAccountPayload().clone();
  bodyCreateAccount = new CreateAccountPayloadBody().clone();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  selectedFlag: any="";
  selectedCallingCode:  any="";
  alpha2Code = "NG";
  phoneError: boolean = false;
   
  constructor(private navCtrl: NavController, private AuthenService: AuthenticationService, private router: Router,
    private activatedroute: ActivatedRoute,
    private GalertService: GlobalalertservicesService,
    private lotusService: LotusServiceProxy,
    private shortcuts: ShortcutsService,
    public Cservice: CountryserviceService,) { }
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
           if(key == 'residence'){
           let nObj = {
             key: 'Residence',
             value: value
           }
           acctDet.push(nObj);
         }
              if(key == 'industry'){
           let nObj = {
             key: 'Industry',
             value: value
           }
           acctDet.push(nObj);
         }
           if(key == 'target'){
           let nObj = {
             key: 'Target',
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
              if(key == 'regulatoryId'){
           let nObj = {
             key: 'Do you have a regulatory ID Card?',
             value: value
           }
           acctDet.push(nObj);
         }
      if(key == 'termsandcondition'){
           let nObj = {
             key: 'Accept Lotus Terms and Condition?',
             value: value
           }
           acctDet.push(nObj);
         }
   if(key == 'chooseaccount'){
           let nObj = {
             key: 'Choose Account',
             value: value
           }
           acctDet.push(nObj);
         }
           if(key == 'desiredNumber'){
           let nObj = {
             key: 'Desired Number',
             value: value
           }
           acctDet.push(nObj);
         }

       });
    return acctDet;
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
    this.newAccountOpeningCustomer.phoneNo=pnumber;
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
    this.AuthenService.getuser().then(userData => {
      if (userData && userData.length > 0) {
        this.openAccount();
      } else {     

        this.GalertService.gPresentLoading('Please wait...');
        var displaname = new DisplayName().clone(); displaname.firstName = this.newAccountOpeningCustomer.firstName;
        this.bodyCreateCustomer.displayNames.push(displaname)
        var customername = new CustomerName().clone(); customername.lastName = this.newAccountOpeningCustomer.lastName;
        this.bodyCreateCustomer.customerNames.push(customername);
        var communicationdevices = new CommunicationDevice().clone();
        communicationdevices.phoneNumber = this.newAccountOpeningCustomer.phoneNumber;
        communicationdevices.phoneNo = this.newAccountOpeningCustomer.phoneNumber;
        communicationdevices.email = this.newAccountOpeningCustomer.email;
        this.bodyCreateCustomer.communicationDevices.push(communicationdevices);
        var strreet = new Street().clone(); strreet.street = this.newAccountOpeningCustomer.street;
        this.bodyCreateCustomer.streets.push(strreet);
        var address = new Address().clone(); address.address = this.newAccountOpeningCustomer.address;
        var country = new Country().clone(); country.country = this.newAccountOpeningCustomer.country;
        this.bodyCreateCustomer.countries.push(country);
        this.bodyCreateCustomer.dateOfBirth = this.shortcuts.formatDAte(new Date(this.newAccountOpeningCustomer.dateOfBirth));
        this.bodyCreateCustomer.customerStatus ="1" //this.newAccountOpeningCustomer.customerStatus;
        this.bodyCreateCustomer.nationality = this.newAccountOpeningCustomer.nationality;
        this.bodyCreateCustomer.residence = this.newAccountOpeningCustomer.residence;
        this.bodyCreateCustomer.industry = this.newAccountOpeningCustomer.industry;
        this.bodyCreateCustomer.target = "1" //this.newAccountOpeningCustomer.target;
        this.bodyCreateCustomer.maritalStatus = this.newAccountOpeningCustomer.maritalStatus;
        this.bodyCreateCustomer.bvn = this.newAccountOpeningCustomer.bvn;
   
    
        this.CreateCustomer.body = this.bodyCreateCustomer;
       
        this.lotusService.createCustomer(this.CreateCustomer, "",this.AuthenService.imei.value).subscribe(data => {
          this.GalertService.gdismissLoading();
          if (!data.hasError) {
            this.GalertService.gPresentToast(data.message, "success");
            this.CreateCustomer = new CreateCustomerPayload().clone();
            this.bodyCreateCustomer = new CreateCustomerPayloadBody().clone();
            this.newAccountOpeningCustomer = {};
            this.newAccount.customerNo = data.result.header.id;
            this.openAccount();
            this.bodyCreateCustomer.displayNames = [];
            this.bodyCreateCustomer.customerNames = [];
            this.bodyCreateCustomer.communicationDevices  = [];
            this.bodyCreateCustomer.countries = [];
            this.bodyCreateCustomer.streets = [];
          }
          else {
            this.GalertService.gPresentToast("Oops! Account Creation Failed", "danger");
          }
        });

      }
    });   
  }
  openAccount() {
    this.GalertService.gPresentLoading('Please wait...');
    this.CreateAccount.body = this.bodyCreateAccount;
    this.AuthenService.getuser().then(userData => {
      this.bodyCreateAccount.customerNo = this.newAccount.customerNo;
      this.bodyCreateAccount.previousAcct = "";
      var sessionToken = ""; 
      if (userData) {
        if (userData.length > 0) {
          var user = userData[0];
          this.bodyCreateAccount.customerNo = user.userAccounts[0].accountNo.substring(0, 7);
          this.bodyCreateAccount.previousAcct = user.userAccounts[0].accountNo;
          sessionToken = userData[0].sessionToken;
  }
}      
      this.bodyCreateAccount.category = this.newAccount.category;
      this.bodyCreateAccount.accountName = this.newAccount.accountName;
      this.bodyCreateAccount.currency = this.newAccount.currency;
      this.bodyCreateAccount.accountOfficer = this.newAccount.accountOfficer;
      this.bodyCreateAccount.openingDate = this.shortcuts.formatDAte(new Date()) ;
      
      
      this.lotusService.createAccount(this.CreateAccount,sessionToken,this.AuthenService.imei.value ).subscribe(data => {
        this.GalertService.gdismissLoading();
        if (!data.hasError) {
          this.GalertService.gPresentToast(data.message, "success");
          this.CreateAccount = new CreateAccountPayload().clone();
          this.bodyCreateAccount = new CreateAccountPayloadBody().clone();
          
          this.newAccountOpeningCustomer = {};
        }
        else {
          this.GalertService.gPresentToast("Oops! Account Creation Failed", "danger");
        }
      })
     });
    }
  ionViewWillEnter() {
    this.getcountry();
    this.getCountryFlag("NG");
    this.bodyCreateCustomer.displayNames = [];
    this.bodyCreateCustomer.customerNames = [];
    this.bodyCreateCustomer.communicationDevices  = [];
    this.bodyCreateCustomer.countries = [];
    this.bodyCreateCustomer.streets = [];
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.newCustomer = false;
          this.page = 3;
        } else {
          this.newCustomer = true;
        }
      } else {
        this.newCustomer = true;
      }
    })
    this.newAccountOpeningCustomer.nationality = "NG";
    this.newAccountOpeningCustomer.residence = "NG";
    this.newAccountOpeningCustomer.country = "NG";
   }
  goBack(){
    this.navCtrl.back()
  }
  navBack() {
    this.page -= 1;
  }
  navNext() {
    this.page += 1;
  }
  ngOnInit() {
  }

}
