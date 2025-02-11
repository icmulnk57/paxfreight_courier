// import { Fragment } from "react";
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid2";
// import { styled, useTheme } from "@mui/material/styles";

// import RowCards from "./shared/RowCards";
// import StatCards from "./shared/StatCards";
// import Campaigns from "./shared/Campaigns";
// import StatCards2 from "./shared/StatCards2";
// import DoughnutChart from "./shared/Doughnut";
// import UpgradeCard from "./shared/UpgradeCard";
// import TopSellingTable from "./shared/TopSellingTable";

// // STYLED COMPONENTS
// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "2rem",
//   [theme.breakpoints.down("sm")]: { margin: "1rem" }
// }));

// const Title = styled("span")(() => ({
//   fontSize: "1rem",
//   fontWeight: "500",
//   marginRight: ".5rem",
//   textTransform: "capitalize"
// }));

// const SubTitle = styled("span")(({ theme }) => ({
//   fontSize: "0.875rem",
//   color: theme.palette.text.secondary
// }));

// const H4 = styled("h4")(({ theme }) => ({
//   fontSize: "1rem",
//   fontWeight: "500",
//   marginBottom: "1rem",
//   textTransform: "capitalize",
//   color: theme.palette.text.secondary
// }));

// export default function Analytics() {
//   const { palette } = useTheme();

//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <Grid container spacing={3}>
//           <Grid size={{ md: 8, xs: 12 }}>
//             <StatCards />
//             <TopSellingTable />
//             <StatCards2 />

//             <H4>Ongoing Projects</H4>
//             <RowCards />
//           </Grid>

//           <Grid size={{ md: 4, xs: 12 }}>
//             <Card sx={{ px: 3, py: 2, mb: 3 }}>
//               <Title>Traffic Sources</Title>
//               <SubTitle>Last 30 days</SubTitle>

//               <DoughnutChart
//                 height="300px"
//                 color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
//               />
//             </Card>

//             <UpgradeCard />
//             <Campaigns />
//           </Grid>
//         </Grid>
//       </ContentBox>
//     </Fragment>
//   );
// }

import React, { Fragment } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Breadcrumb } from "app/components";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" },
}));

const Image = styled("img")(() => ({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

  const Container = styled("div")(({ theme }) => ({
    margin: "10px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));

export default function Analytics() {
  return (
    <Container>
     <Box className="breadcrumb" >
              <Breadcrumb   routeSegments={[{ name: "Dashboard", path: "/dashboard/default" }, { name: "" }]} />
            </Box>
  <ContentBox className="analytics">
    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
     
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Image src="../../assets/images/dash5.jpeg" alt="Image 1" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Image src="../../assets/images/dash4.jpeg" alt="Image 2" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Image src="../../assets/images/dash3.jpeg" alt="Image 3" />
        </Grid>
      </Grid>

     
      <Grid container spacing={3} style={{ marginTop: "16px" }}>
        <Grid item xs={12} md={6}>
          <Image src="../../assets/images/dash2.jpeg" alt="Image 4" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src="../../assets/images/dash1.jpeg" alt="Image 5" />
        </Grid>
      </Grid>
    </Grid>
  </ContentBox>
  </Container>

  );
}

