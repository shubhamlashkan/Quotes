import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
selector: 'app-quotes',
templateUrl: './quotes.component.html',
styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {


quotes:any=[];
quoteResult:any=[];
showAllQuote:boolean=false;
constructor(private service:APIService) { }

ngOnInit() {

  this.showAllQuote = true;
  this.getAllQuote();

}

getAllQuote()
{
  this.showAllQuote = true;
  let randomNumber = Math.floor(Math.random()*1642);
  //console.log(randomNumber);
  this.service.randomQuote().subscribe((result)=>{

    this.quoteResult = result;
  })


}


getRandomQuote()
{
  this.showAllQuote = false;

  let randomNumber = Math.floor(Math.random()*1642);
  //console.log(randomNumber);
  this.service.randomQuote().subscribe((result)=>{

    this.quoteResult = result;
    this.quotes = this.quoteResult[randomNumber];
  })


}
}
