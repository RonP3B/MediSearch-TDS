import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";

const CategoriesQuantities = ({ title, chartData, subheader, ...props }) => {
  const theme = useTheme();
  const chartSeries = chartData.map((i) => i.value);
  const chartLabels = chartData.map((i) => i.label);

  const polarOptions = useChart({
    chart: {
      type: "polarArea",
    },
    labels: chartLabels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: theme.palette.primary.main,
        shadeTo: "light",
        shadeIntensity: 0.6,
      },
    },
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }}>
        <ReactApexChart
          type="polarArea"
          series={chartSeries}
          options={polarOptions}
          height={350}
        />
      </Box>
    </Card>
  );
};

CategoriesQuantities.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default CategoriesQuantities;
