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
showQuoteImages:boolean = false;
ctx:any;
BgcolorCodeList:any=[];
fontcolorCodeList:any=[];
constructor(private service:APIService) { }

ngOnInit() {

  this.showAllQuote = true;
  this.getAllQuote();
  this.BgcolorCodeList[0] = '#FFFFFF';
  this.BgcolorCodeList[1] = '#576F72';
  this.BgcolorCodeList[2] = '#0f4c75';
  this.BgcolorCodeList[3] = '#000000';
  this.BgcolorCodeList[4] ='#34495e';
  this.BgcolorCodeList[5] ='#042f4b';
  this.fontcolorCodeList[0] ='#000000';
  this.fontcolorCodeList[1] ='#FFFFFF';
  this.fontcolorCodeList[2] ='#FFFFFF';
  this.fontcolorCodeList[3] ='#FFFFFF';
  this.fontcolorCodeList[4] ='#FFFFFF';
  this.fontcolorCodeList[5] ='#FFFFFF';
  // var c= <HTMLCanvasElement>document.getElementById("myCanvas");
  //   this.ctx=c.getContext("2d");
  //   this.ctx.font="30px Arial";
  //   this.ctx.fillText("Some Dummy Text",10,50);

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
  var anchorTag = document.getElementById('tweetLink');
  if(anchorTag!=null)
  {
    anchorTag.remove();
  }
  for(var i=1;i<=6;i++)
  {
    var element = document.getElementById('images'+i+' '+i);
    element?.remove();
  }
  this.showAllQuote = false;

  let randomNumber = Math.floor(Math.random()*1642);
  //console.log(randomNumber);
  this.service.randomQuote().subscribe((result)=>{

    this.quoteResult = result;
    this.quotes = this.quoteResult[randomNumber];

    if(this.quotes.author==null)
    {
      var text = '"'+this.quotes.text+'"';
    }
    else
    {
      var text = '"'+this.quotes.text+'" \n — '+this.quotes.author;
    }
    var a = document.createElement('a');
    var link = document.createTextNode("Tweet this");
    a.appendChild(link);
    a.title = "Tweet this";
    a.id = 'tweetLink';
    a.target='_blank';
    a.style.float = 'right';
    a.style.textDecoration = 'none';
    a.style.fontSize = '1rem';
    var finaltext = text + '%0A%0A'+'More Quotes => https://quotes-sl.vercel.app/'+'%0A%0A'+'Developed By: @shubhamlashkan';
    a.href = 'https://twitter.com/intent/tweet?text='+finaltext;
    var randomQuoteDiv = document.getElementById('randomQuoteDiv');
    randomQuoteDiv?.appendChild(a);
    for(var i=1;i<=6;i++)
    {
      var canvas = <HTMLCanvasElement>document.getElementById('myCanvas'+i);
      this.generateImage(text,canvas,this.BgcolorCodeList[i-1],this.fontcolorCodeList[i-1],'images'+i,i);
    }

  })

}


generateImage(text:any,canvas:any,BgcolorCodeList:any,fontcolorCodeList:any,imagediv:any,num:any)
{
  //var canvas = <HTMLCanvasElement>document.getElementById('myCanvas1');
    var maxWidth =0;
    var y = 0;
    if(text.length>30 && text.length<70)
    {
      canvas.width = 200;
      canvas.height = 200;
      maxWidth = canvas.width -10;
      y = 90;
    }
    else if(text.length>=70 && text.length<90)
    {
      canvas.width = 230;
      canvas.height = 230;
      maxWidth = canvas.width -10;
      y = 90;
    }
    else if(text.length>=90 && text.length<170)
    {
      canvas.width = 280;
      canvas.height = 280;
      maxWidth = canvas.width -20;
      y=90;
    }
    else if(text.length>=170 && text.length<200)
    {
      canvas.width = 330;
      canvas.height = 330;
      maxWidth = canvas.width -20;
      y=90;
    }

    else
    {
      canvas.width = 360;
      canvas.height = 360;
      maxWidth = canvas.width -20;
      y=100;
    }
  this.ctx = canvas.getContext('2d');
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.ctx.fillStyle = BgcolorCodeList;
  this.ctx.fillRect(0,0,320,320);

   var lineHeight = 25;

  var x = (canvas.width - maxWidth) / 2;


  this.ctx.font = '16pt Calibri';
  this.ctx.fillStyle = fontcolorCodeList;
  this.wrapText(this.ctx, text, x, y, maxWidth, lineHeight);
  var img = new Image();
  img.src = canvas.toDataURL();
  img.id = imagediv+' '+num;
  var imgDiv = document.getElementById(imagediv);
  imgDiv?.appendChild(img);
}

wrapText(context:any, text:any, x:any, y:any, maxWidth:any, lineHeight:any) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);

    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

}
