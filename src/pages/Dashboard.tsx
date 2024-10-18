import { useContext } from 'react'
import LogTable from '../components/LogTable'
import { DataContext } from '../components/DataProvider'
import Chart from 'react-apexcharts'


const Dashboard = () => {
    const dataContext = useContext(DataContext)
    const data = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: 'series-2',
                data: [0, 0, 0, 22, 0, 0, 0,]
            }
        ]
    };

    return (
        <div>
            <div className='text-2xl text-right mr-4'>Logged in as <span className='text-blue-400 text-bold text-underline'>{dataContext.log[dataContext.log.length - 1].email}</span></div>
            <LogTable />
            <div className='mx-auto w-fit mt-16'>
                <Chart options={data.options}
                    series={data.series}
                    type="bar"
                    width="500" />
            </div>
        </div>
    )
}

export default Dashboard