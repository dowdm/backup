import { Injectable } from '@angular/core';
import {Account} from './models/account.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AccountsService {

  accounts: FirebaseListObservable<any[]>;
  assets: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.accounts = database.list('accounts');
   }

  getAccounts(){
    return this.accounts;
  }

  getAccountById(accountId: string) {
    return this.database.object('accounts/' + accountId);
  }

  assetsUpdate(accountToUpdate, result, destination){
    console.log(destination);
    var accountEntryInFirebase = this.getAccountById(accountToUpdate.$key);
    accountEntryInFirebase.update({assets: accountToUpdate.assets + result + destination+'; '});


  }

  balanceUpdate(accountToUpdate, amount){
     var accountEntryInFirebase = this.getAccountById(accountToUpdate.$key);
     accountEntryInFirebase.update({balance: accountToUpdate.balance -= parseInt(amount)});

   }
 }
