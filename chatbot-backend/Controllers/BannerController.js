const Banner = require("../Models/bannerSchema");

const FACEBOOK_ACCESS_TOKEN = "your-facebook-access-token"; // Your Facebook access token
const AD_ACCOUNT_ID = "your-ad-account-id"; // Your Facebook Ad Account ID
const AD_CAMPAIGN_ID = "your-campaign-id";

class BannerController {
  static async toggleAdStatus(req, res) {
    const { id } = req.params;

    try {
      // Find the banner by ID
      const banner = await Banner.findById(id);
      if (!banner) {
        return res.status(404).json({ error: "Banner not found" });
      }

      // Toggle the active status of the banner
      banner.isActive = !banner.isActive;
      await banner.save();

      // Prepare Facebook API endpoint
      const facebookApiUrl = `https://graph.facebook.com/v13.0/${AD_CAMPAIGN_ID}/status?access_token=${FACEBOOK_ACCESS_TOKEN}`;

      // Prepare the data to toggle the ad status
      const adStatusData = {
        status: banner.isActive ? "ACTIVE" : "PAUSED", // "ACTIVE" to start the ad, "PAUSED" to stop
      };

      // Make the request to Facebook Marketing API to start/stop the ad
      try {
        const response = await axios.post(facebookApiUrl, adStatusData);
        console.log(`Facebook ad status updated: ${response.data}`);
      } catch (facebookError) {
        console.error("Error updating Facebook ad status", facebookError);
        return res
          .status(500)
          .json({ error: "Failed to update Facebook ad status" });
      }

      // Respond to client
      res.status(200).json({
        message: `Banner ad ${
          banner.isActive ? "activated" : "deactivated"
        } successfully!`,
      });
    } catch (error) {
      console.error("Error in toggleAdStatus", error);
      res.status(500).json({ error: "Failed to toggle banner status" });
    }
  }
  static async getAdMetrics(req, res) {
    const metricsUrl = `https://graph.facebook.com/v13.0/${AD_CAMPAIGN_ID}/insights?access_token=${FACEBOOK_ACCESS_TOKEN}`;
  
  try {
    const response = await axios.get(metricsUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to fetch ad metrics", error);
    res.status(500).json({ error: "Failed to fetch ad metrics" });
  }
  }
}

module.exports = BannerController;
