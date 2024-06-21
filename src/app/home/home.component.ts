import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selected : Date | null = new Date()
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {}; // required

  constructor(){
    this.chartOptions=
    {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Project Completion'
      },
      tooltip: {
          valueSuffix: '%'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      credits:{
        enabled:false
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'E-commerce',
                      y: 55.02
                  },
                  {
                      name: 'Blog',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Personal Website',
                      y: 1.09
                  },
                  {
                      name: 'Students',
                      y: 15.5
                  },
                  {
                      name: 'Individuals',
                      y: 1.68
                  }
              ]
          }
      ]
  }
  }
}
