import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";

const FavoriteProductsQuantity = ({
  title,
  chartData,
  subheader,
  ...props
}) => {
  const chartLabels = chartData.map((data) => data.product);
  const chartSeries = chartData.map((data) => data.quantity);

  const chartOptions = useChart({
    chart: {
      type: "donut",
    },
    labels: chartLabels,
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="donut"
          series={chartSeries}
          options={chartOptions}
          height={350}
        />
      </Box>
    </Card>
  );
};

FavoriteProductsQuantity.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default FavoriteProductsQuantity;
