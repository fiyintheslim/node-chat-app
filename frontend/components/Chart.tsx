import 'chart.js/auto';
import {useEffect, useState} from 'react'
import { Doughnut} from 'react-chartjs-2'
import {getActivities} from "../utilities/requests"

type results = {all:string, mine:string, sent:string, received:string}
type dataset = {label:string, backgroundColor:string[], hoverBackgroundColor:string[], data:number[]}
interface Data {
  labels:string[],
  datasets:dataset[], 
  
}

const data:Data = {
  labels: [],
  datasets: [
    {
      label: 'Activities',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      ],
      data:[]
    }
  ]
}
const Chart = () => {
  const [activities, setActivities] = useState<{all:string, mine:string, sent:string, received:string} | undefined>()
  const [chartObj, setChartObj] = useState<Data>()

  useEffect(()=>{
    getActivities(setActivities)
  }, [])

  useEffect(()=>{
    console.log("Activities", activities)
    if(activities){

      const data= {
        labels: [...Object.keys(activities)],
        datasets: [
          {
            label: 'Activities',
            backgroundColor: [
              '#1b1736',
              '#53350f',
              '#113f03',
              '#194b50',
            ],
            hoverBackgroundColor: [
            '#0d051d',
            '#2c2312',
            '#102409',
            '#0d2227',
            ],
            data:[...Object.values(activities).map((el)=>parseInt(el))]
          }
        ]
      }

      setChartObj(data)
      console.log("Chart object", chartObj)
    }
  }, [activities])

  return (
    <>{chartObj &&
      <Doughnut
            data={chartObj}
            redraw={true}
            options={{responsive:true}}
          />
    }
    </>
  )
}

export default Chart