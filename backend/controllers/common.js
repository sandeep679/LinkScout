import URL from "../models/url.js";
import TempURL from "../models/tempUrl.js";
import { nanoid } from "nanoid";
import axios from "axios";

async function handleNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortid = nanoid(6);

  const shortenURL = req.headers.referer + "redirect/" + shortid;

  const url = await TempURL.create({
    shortId: shortid,
    redirectURL: body.url,
    shortenURL: shortenURL,
  });

  return res.json(url);
}

async function handleShortUrl(req, res) {
  //console.log(req.route.path);

  const shortid = req.params.shortid;

  let country;
  try {
    const userIP = req.headers["x-forwarded-for"];

    const parts = userIP.split(',');

    
    firstIp = parts[0].trim();

    //for location also check geoip-lite package

    //console.log(req.headers['x-forwarded-for']);

    const countryByIP =await axios.get(`http://ip-api.com/json/${firstIp}`)
    country= countryByIP.data.country
  } catch (error) {
    country = "India";
  }

  console.log(shortid.length);
  console.log(shortid);

  try {
    if (shortid.length === 6) {
      const entry = await TempURL.findOne({ shortId: shortid });
    

      return res.json({ redirectURL: entry.redirectURL });
    } else {
      const MainDBEntry = await URL.findOneAndUpdate(
        { shortId: shortid },
        {
          $inc: { totalClicks: 1 },
          $push: {
            visitHistory: {
              timestamp: new Date(),
              country,
            },
          },
        }
      );
      

      return res.json({ redirectURL: MainDBEntry.redirectURL });
    }
  } catch (error) {
    return res.json({ redirectURL: req.headers.referer });
  }

  //res.redirect(entry.redirectURL);
}

export { handleNewShortUrl, handleShortUrl };
