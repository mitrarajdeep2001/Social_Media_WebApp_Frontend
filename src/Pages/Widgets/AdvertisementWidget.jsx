import { Typography, useTheme } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import sponsorImg from "../../Assets/sponsor_img.jpeg";

const AdvertisementWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight={500}>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width={"100%"}
        height={"auto"}
        src={sponsorImg}
        alt="ad_img"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={dark} fontWeight={500}>Vine Cosmetics</Typography>
        <Typography color={medium}>
          <a target="_blank" rel="noreferrer" href="https://www.vinecosmetics.com" style={{color: medium, textDecoration: "none"}}>vinecosmetics.com</a>
        </Typography>
      </FlexBetween>
      <Typography color={medium} m={"0.5rem 0"}>
        Your path to stunning and immaculate beauty and made sure your skin is
        exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertisementWidget;
