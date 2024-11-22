const Banner = require("../Models/bannerSchema");
const mongoose = require("mongoose");

class AdsController {
  // static async createBanner(req, res) {
  //   try {
  //     const { title, 
  //       userId, 
  //       mainText, 
  //       imageUrl,  
  //       platform,
  //       facebookAdId,
  //       youtubeAdId,
  //       instagramAdId,  } = req.body;
  //     const newBanner = new Banner({
  //       title,
  //       mainText,
  //       imageUrl,
  //       platform,
  //       adsIds: {
  //         facebookAdId,
  //         youtubeAdId,
  //         instagramAdId,
  //       },
  //       admin: userId,
  //     });

  //     const savedBanner = await newBanner.save();
  //     res
  //       .status(201)
  //       .json({ message: "Banner created successfully!", form: savedBanner });
  //   } catch (error) {
  //     console.error("Error creating banner:", error);
  //     res.status(500).json({ error: "Failed to create banner." });
  //   }
  // }

  static async createBanner(req, res) {
    try {
      const {
        title,
        userId,
        mainText,
        imageUrl,
        platform,
        accessToken,
       adAccountId,
       adIdYoutube,
       AccountYoutubeId,
       adIdInstagram,
       adAccountIdInstagram
      } = req.body;
  
      // Build the Banner object dynamically based on the platform
      const bannerData = {
        title,
        mainText,
        imageUrl,
        platform,
        admin: userId,
      };
      // Add platform-specific fields
      if (platform === "Facebook") {
        bannerData.facebookFields = {
          accessToken,
          adAccountId,
        };
      } else if (platform === "YouTube") {
        bannerData.youtubeFields = {
          adIdYoutube,
          AccountYoutubeId
        };
      } else if (platform === "Instagram") {
        bannerData.instagramFields = {
          adIdInstagram,
          adAccountIdInstagram
        };
      }
  
      // Create and save the new banner
      const newBanner = new Banner(bannerData);
      const savedBanner = await newBanner.save();
  
      res
        .status(201)
        .json({ message: "Banner created successfully!", banner: savedBanner });
    } catch (error) {
      console.error("Error creating banner:", error);
      res.status(500).json({ error: "Failed to create banner." });
    }
  }
  
  static async getBanners(req, res) {
    try {
      const banners = await Banner.find();
      res.status(200).json(banners);
    } catch (error) {
      console.error("Error getting banners:", error);
      res.status(500).json({ error: "Failed to get banners." });
    }
  }

  static async deleteBanner(req, res) {
    const { id } = req.params; 

    try {
      const banner = await Banner.findById(id); // Find the banner by ID in the database

      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' }); // Handle if the banner doesn't exist
      }

      await banner.remove(); // Remove the banner from the database

      return res.status(200).json({ message: 'Banner deleted successfully' }); // Respond with success message
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting banner' }); // Handle any errors
    }
  }

  // Update banner by ID
  static async updateBanner(req, res) {
    const { id } = req.params; 
    const updatedData = req.body; // Get the updated data from the request body

    try {
      const banner = await Banner.findById(id); // Find the banner by ID in the database

      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' }); // Handle if the banner doesn't exist
      }

      // Update the banner's data
      Object.assign(banner, updatedData);

      await banner.save(); // Save the updated banner back to the database

      return res.status(200).json({ message: 'Banner updated successfully', banner }); // Respond with success message and updated banner
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating banner' }); // Handle any errors
    }
  }

    // Get banner by ID
    static async getBannerById(req, res) {
        try {
            const { id } = req.params;
            console.log("Banner ID:", id);

            // Check if id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({ message: "Invalid banner ID" });
            }
        
            const banner = await Banner.findById(id);
            
            if (!banner) {
              return res.status(404).json({ message: "Banner not found" });
            }
        
            res.status(200).json(banner);
          } catch (error) {
            console.error("Error fetching banner:", error);
            res.status(500).json({ message: "Server error" });
          }
    }
    
}

module.exports = AdsController;
