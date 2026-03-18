import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Go to the local Next.js resume page
  await page.goto('http://localhost:3000/resume?pdf=1', {
    waitUntil: 'networkidle0',
  });
  
  // The page has a setTimeout for printing, let's wait a bit extra just in case
  await new Promise(r => setTimeout(r, 1000));
  
  await page.pdf({
    path: 'data/Jag_Karnan_Resume.pdf',
    // ATS systems prefer standard PDF sizes like A4 or Letter
    format: 'A4',
    // Print background might be needed if there were actual bg colors but they are black text on white
    printBackground: true,
  });
  
  console.log('PDF generated successfully');
  await browser.close();
  process.exit(0);
})();
