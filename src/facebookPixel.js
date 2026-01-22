import ReactPixel from "react-facebook-pixel";

export const initFacebookPixel = () => {
  const fbPixelId = import.meta.env.VITE_FB_PIXEL_ID;
  
  ReactPixel.init(fbPixelId, {
    autoConfig: true,
    debug: false,
  });

  ReactPixel.pageView();
};