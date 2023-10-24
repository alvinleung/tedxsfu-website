import { schedule } from "@netlify/functions";
import puppeteer, { Puppeteer } from "puppeteer";

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
export const handler = schedule("0 0,12 * * *", async (event) => {
  const eventBody = JSON.parse(event.body as any);
  console.log(`Next function run at ${eventBody.next_run}.`);

  (async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://www.ticketmaster.ca/event/11005F2D0FDD4B2A");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const allSeats = (await page.$$(".seat")).length;
    const availableSeat = (await page.$$(".is-available")).length;
    const soldSeats = allSeats - availableSeat - 18;

    console.log(`The number of seats sold ${soldSeats}`);

    await browser.close();
  })();

  return {
    statusCode: 200,
  };
});
