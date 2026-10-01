# chris-mrn.github.io

Source of my personal website, <https://chris-mrn.github.io>. GitHub Pages builds it with Jekyll
from the `main` branch.

## Content

| What | Where |
|---|---|
| Home page | `_pages/about.md` |
| Research page | `_pages/research.md`, figures in `images/research/` |
| CV | `_pages/cv.md` |
| Menu links | `_data/navigation.yml` |
| Name, photo and sidebar links | `author` in `_config.yml`, photo in `images/` |

## Code

| What | Where |
|---|---|
| Page skeleton | `_layouts/` and `_includes/` |
| Styles | `_sass/`, compiled from `assets/css/main.scss` |
| Theme switch, menu and footer placement | `assets/js/main.js` |

## Preview

```bash
bundle install
bundle exec jekyll serve
```

The site is then at <http://localhost:4000>.

## Credits

The layout and styles come from [AcademicPages](https://github.com/academicpages/academicpages.github.io),
a fork of [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/), both under the
MIT license (see `LICENSE`). Icons are from [Font Awesome](https://fontawesome.com).
