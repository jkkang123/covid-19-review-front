import BarLineChart from 'Molecules/BarLineChart';
import DoughnutChart from 'Molecules/DoughnutChart';
import Popular from 'Molecules/Popular';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Home() {
    return (
        <div className="home">
            <Box sx={{ maxWidth:1200, margin:'20px auto' }}>
                <Grid container spacing={2}>
                    {/* 인기글 & 국내 신규 확진자 */}
                    <Grid item xs={12} lg={6} alignSelf="stretch">
                        <Paper className="popular paper" elevation={2}>
                            <Popular />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={6} alignSelf="stretch">
                        <Paper className="barLine paper" elevation={2}>
                            <BarLineChart />
                        </Paper>
                    </Grid>

                    {/* 국내 백신 접종 현황 */}
                    <Grid item xs={12}>
                        <DoughnutChart />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
