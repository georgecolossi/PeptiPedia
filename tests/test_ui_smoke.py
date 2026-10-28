import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    repo_root = r"C:\Users\georg\Documents\PeptiPedia\repo"
    html_path = "file:///" + os.path.join(repo_root, "index.html").replace("\\", "/")
    
    async with async_playwright() as p:
        # try msedge or chrome
        try:
            browser = await p.chromium.launch(channel="msedge", headless=True)
            print("Successfully launched msedge!")
        except Exception as e:
            print("Edge failed, trying chrome:", e)
            browser = await p.chromium.launch(channel="chrome", headless=True)
            print("Successfully launched chrome!")

        page = await browser.new_page()
        errors = []
        page.on("pageerror", lambda err: errors.append(str(err)))
        page.on("console", lambda msg: errors.append(f"CONSOLE: {msg.text}") if msg.type == "error" else None)
        
        await page.goto(html_path, wait_until="networkidle")
        title = await page.title()
        print(f"Page title: {title}")
        print(f"Errors detected on initial load: {len(errors)}")
        if errors:
            for e in errors[:5]:
                print(f"  {e}")
                
        # Count cards
        cards = await page.locator(".peptide-card").count()
        print(f"Peptide cards rendered: {cards}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
