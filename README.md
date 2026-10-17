# Premium Portfolio - Hafsa Ashraf

A hand-written portfolio using only HTML5, CSS3 and vanilla JavaScript. No build tools, no frameworks.

## Files
- `index.html` - page structure and content
- `style.css` - design, themes, responsive layout, loader
- `script.js` - loader, theme, menu, animations, filters, form
- `assets/hafsa-profile.png` - your photo, `assets/favicon.svg` - icon

## What to know
- **Contact form:** it opens the visitor's own email app with the message ready. It does not send anything to a server.
- **Project previews:** decorative illustrations, not real screenshots.
- **Portfolio repository link:** the Premium Portfolio card links to your GitHub profile. After you create the repo, change that link in `index.html` to `https://github.com/hafsaashraf4093-cell/Premium-Portfolio`.
- **Fonts:** Google Fonts load when online; the site falls back to Georgia and system fonts offline.

## Publish it (Windows 10, VS Code, PowerShell)

**1. Extract.** Right-click `Premium-Portfolio.zip`, choose *Extract All*, and pick a place such as `Documents`.

**2. Open in VS Code.** Open VS Code, then *File > Open Folder* and choose the extracted `Premium-Portfolio` folder.

**3. Preview.** Double-click `index.html` in File Explorer to open it in your browser. (Optional: install the *Live Server* extension, right-click `index.html`, *Open with Live Server*.)

**4. Create the repository.** On github.com click **+ > New repository**. Name it `Premium-Portfolio`, set it to **Public**, do NOT add a README, then click *Create repository*.

**5. Upload with Git.** In VS Code press Ctrl+` to open the terminal (PowerShell) and run these one at a time. Install Git first from git-scm.com if `git --version` shows an error.
```powershell
git --version
git init
git add .
git commit -m "Add premium portfolio"
git branch -M main
git remote add origin https://github.com/hafsaashraf4093-cell/Premium-Portfolio.git
git push -u origin main
```
If you chose a different repository name, replace `Premium-Portfolio` in the `git remote add` line. If Git asks who you are, run `git config --global user.name "Hafsa Ashraf"` and `git config --global user.email "hafsaashraf4093@gmail.com"`, then repeat the commit. A GitHub login window may appear on the first push: sign in there.

**6. Turn on GitHub Pages.** In the repository go to **Settings > Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.

**7. Find your live URL.** Wait 1 to 3 minutes and refresh Settings > Pages. It shows: `https://hafsaashraf4093-cell.github.io/Premium-Portfolio/`. Open it and check the loader, menu, theme button and your links.

**8. Update later.** Edit files in VS Code, save, then in the terminal:
```powershell
git add .
git commit -m "Update portfolio"
git push
```
The live site refreshes in a minute or two.

This guide only creates a new repository. Your NoteFlow and SSRMS repositories are not touched.
