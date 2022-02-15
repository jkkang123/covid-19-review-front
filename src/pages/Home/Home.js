import './Home.scss';
import BarLineChart from 'Molecules/BarLineChart';
import DoughnutChart from 'Molecules/DoughnutChart';
import Paper from '@mui/material/Paper';

export default function Home() {
    return (
        <div className="home">
            <div className="inner">
                {/* 인기글 & 국내 신규 확진자 */}
                <div className="popular_barLine">
                    {/* 인기글 */}
                    <Paper className="popular paper" elevation={2}>
                        인기글
                    </Paper>

                    {/* 국내 신규 확진자 */}
                    <Paper className="barLine paper" elevation={2}>
                        <BarLineChart />
                    </Paper>
                </div>

                {/* 국내 백신 접종 현황 */}
                <DoughnutChart />
            </div>
        </div>
    )
}
