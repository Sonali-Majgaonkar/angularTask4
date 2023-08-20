import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit{
  isFalse : boolean = true;
  subMarks : any;
  public chart: any;
  ngOnInit(): void {
    this.subMarks = new FormGroup({
      input1 : new FormControl('', [Validators.required, Validators.max(100)]),
      input2 : new FormControl({value:'',disabled:true}, Validators.required)
    })

  }
  getAnotherVal(){
    if(this.subMarks.get('input1').value >= 0 && this.subMarks.get('input1').value <= 100){
      this.subMarks.patchValue({
        input2: 100 - this.subMarks.get('input1').value,
      })
      // console.log(this.subMarks); 
    }
      
  }
  click(formValues: any){
    this.chart?.destroy();
    // console.log(this.subMarks.get('input1').value);
    this.createChart();
  }
  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Mark-1','Mark-2'],
	       datasets: [{
    label: 'My First Dataset',
    data: [this.subMarks.get('input1').value,this.subMarks.get('input2').value],
    backgroundColor: [
      'red',
      'blue'			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
