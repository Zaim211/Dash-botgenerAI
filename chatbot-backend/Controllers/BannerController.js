const Banner = require("../Models/bannerSchema");
const twilio = require("twilio");
const axios = require("axios");

const FACEBOOK_ACCESS_TOKEN = "your-facebook-access-token"; // Your Facebook access token
const AD_ACCOUNT_ID = "your-ad-account-id"; // Your Facebook Ad Account ID
const AD_CAMPAIGN_ID = "your-campaign-id";

// Twilio credentials
const accountSid = "ACf3f7146b5a580de0a12d6036413dc7c7";
const authToken = "c3fcfa08edce13fd90d1eceaca14581e";
const client = new twilio(accountSid, authToken);

class BannerController {
  static toggleAdStatus = async (req, res) => {
    const { id } = req.params; // Get banner ID from URL params
    const { platform } = req.body;
    console.log("bannerId", id);
    console.log("platform", platform);

    if (!platform) {
      return res.status(400).json({ message: "Platform is required" });
    }

    try {
      const banner = await Banner.findById(id);
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }
      if (!banner[`${platform.toLowerCase()}Fields`]) {
        return res
          .status(400)
          .json({ message: `No fields found for platform: ${platform}` });
      }
      let platformFields; // To hold platform-specific fields
      let adId; // To hold ad ID for the selected platform
      let accountId; // To hold account ID for the selected platform
      let isActive; // To hold current active status

      // Check platform and set corresponding fields
      if (platform === "Facebook") {
        platformFields = banner.facebookFields;
        adId = platformFields.adAccountId;
        accountId = platformFields.adAccountId;
        isActive = banner.instagramFields.isActive;
      } else if (platform === "YouTube") {
        platformFields = banner.youtubeFields;
        adId = platformFields.adIdYoutube;
        accountId = platformFields.AccountYoutubeId;
        isActive = banner.instagramFields.isActive;
      } else if (platform === "Instagram") {
        platformFields = banner.instagramFields;
        adId = platformFields.adIdInstagram;
        accountId = platformFields.adAccountIdInstagram;
        isActive = platformFields.isActive;
      } else {
        return res.status(400).json({ message: "Unsupported platform" });
      }

      // Validate platform-specific fields
      if (!adId || !accountId) {
        return res
          .status(400)
          .json({ message: `${platform} credentials are missing` });
      }

      // Determine new status (active or paused)
      const newStatus = isActive ? "PAUSED" : "ACTIVE";

      // Build API URL based on platform
      let url = "";
      let headers = {};

      if (platform === "Facebook") {
        // Facebook Ads API URL
        url = `https://graph.facebook.com/v17.0/${accountId}/ads`;
        headers = {
          Authorization: `Bearer ${platformFields.accessToken}`,
        };
      } else if (platform === "YouTube") {
        // YouTube Ads API URL (replace with the correct endpoint)
        url = `https://www.googleapis.com/youtube/v3/ads/${adId}`;
        headers = {
          Authorization: `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`, // YouTube API Token
        };
      } else if (platform === "Instagram") {
        // Instagram Ads API URL (Instagram ads typically use Facebook's API)
        url = `https://graph.facebook.com/v17.0/${accountId}/ads`;
        headers = {
          Authorization: `Bearer ${platformFields.accessToken}`,
        };
      }

      // Call the appropriate API to toggle the ad status
      const response = await axios.post(
        url,
        { status: newStatus },
        { headers }
      );

      if (response.status !== 200) {
        return res
          .status(500)
          .json({ message: `Failed to update ad status on ${platform}` });
      }

      // Update the isActive field in the database
      if (platform === "Facebook" || platform === "Instagram") {
        banner.instagramFields.isActive = !isActive;
      } else if (platform === "YouTube") {
        banner.instagramFields.isActive = !isActive; // Update the isActive field for YouTube as well
      }

      await banner.save();

      res.status(200).json({
        message: `${platform} Banner ${
          !isActive ? "Activated" : "Deactivated"
        } successfully`,
      });
    } catch (error) {
      console.error("Error toggling ad status:", error);
      res
        .status(500)
        .json({ message: "An error occurred while toggling the ad status" });
    }
  };

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

  // static async sendSMS(req, res) {
  //   const { phone, message } = req.body; // Extract phone and message from request body

  // // Validate phone and message
  // if (!phone || !message) {
  //   return res.status(400).json({ success: false, error: 'Phone number and message are required.' });
  // }

  // // Find the lead or phone number
  // const selectedLead = leads.find((lead) => lead.phone === phone);

  //   if (selectedLead) {
  //     client.messages
  //       .create({
  //         body: "Hello! This is your predefined message.",
  //         from: '+2126736967062',
  //         to: selectedLead.phone
  //       })
  //       .then((message) => {
  //         res.json({ success: true, sid: message.sid });
  //       })
  //       .catch((error) => {
  //         res.status(500).json({ success: false, error: error.message });
  //       });
  //   } else {
  //     res.status(404).json({ success: false, error: 'Lead not found' });
  //   }
  // }
  static async sendSMS(req, res) {
    const { request_phone, message } = req.body; // Extract phone and message from request body

    console.log("request_phone", request_phone);
    // Validate phone and message
    if (!request_phone || !message) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Phone number and message are required.",
        });
    }
    const fromNumber = "(978) 636-1896";
    const toNumber = request_phone.replace(/\s+/g, "");
    if (!/^(\+33|\+1)/.test(toNumber)) {
      // Only accept French or US numbers for now (adjust regex if needed)
      return res
        .status(400)
        .json({
          success: false,
          error:
            "Invalid phone number format. Only French numbers are supported.",
        });
    }

    try {
      // Send the message using Twilio
      const messageResponse = await client.messages.create({
        body: message,
        from: fromNumber, // Your verified French number
        to: toNumber, // Recipient's phone number (no spaces)
      });

      // Send back a successful response with the message SID
      res.json({ success: true, sid: messageResponse.sid });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = BannerController;
