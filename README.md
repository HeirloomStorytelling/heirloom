# Heirloom

Heirloom is a polished Jekyll starter for a warm, editorial portfolio site. It includes a responsive homepage, supporting pages, lightweight scroll reveal animations, and Netlify-ready deployment settings.

## Local Setup

1. Install Ruby and Bundler if they are not already available on your machine.
2. From the `heirloom` folder, install dependencies:

   ```bash
   bundle install
   ```

3. Start the Jekyll development server:

   ```bash
   bundle exec jekyll serve
   ```

4. Open the local URL shown in the terminal, usually `http://127.0.0.1:4000/`.

If macOS defaults to the system Ruby and `bundle` fails, use the Homebrew Bundler directly on this machine:

```bash
/opt/homebrew/opt/ruby/bin/bundle install
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve
```

## Project Structure

- `_config.yml` contains the Jekyll site configuration.
- `_layouts/default.html` provides the main document shell.
- `_includes/header.html` and `_includes/footer.html` provide shared navigation and footer markup.
- `assets/css/style.scss` contains the site styles.
- `assets/js/main.js` contains the mobile navigation and scroll reveal logic.
- `assets/images/` contains placeholder artwork you can replace later.

## GitHub Publishing

Since the GitHub account has not been created yet:

1. Create a GitHub account.
2. Create a new repository named `heirloom`.
3. From inside the `heirloom` folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial Heirloom Jekyll site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/heirloom.git
   git push -u origin main
   ```

4. Replace `USERNAME` with the actual GitHub username.

## Netlify Publishing

Since the Netlify account has not been created yet:

1. Create a Netlify account.
2. Connect Netlify to the GitHub account.
3. Import the `heirloom` repository.
4. Use these build settings:
   Build command: `bundle exec jekyll build`
   Publish directory: `_site`
5. Deploy the site.
6. Add a custom domain later if desired.

## Customization Notes

- Replace placeholder images in `assets/images/` with project photography or brand imagery.
- Update the page copy, contact details, and call-to-action links before launch.
- Adjust brand colors in `assets/css/style.scss` through the CSS custom properties in `:root`.
