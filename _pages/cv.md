---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Profile
======
Master’s student in Machine Learning (MVA) at ENS Paris-Saclay with research experience in generative modeling, probabilistic methods, compressed sensing MRI, and EEG/BCI analysis. Passionate about learning complex distributions and generating structured data with applications in healthcare.

Education
======
* **ENS Paris-Saclay** — Master in Machine Learning (MVA)
  Courses: Geometric Data Analysis, Reinforcement Learning, Time Series, Graphical Models, Deep Learning, LLM, Bayesian ML
* **ENS Paris-Saclay** — Master in Applied Mathematics, Honors
  Courses: Optimization, Probability & Statistics, Signal & Image Processing, Deep Learning for Medical Imaging
* **ENS Rennes** — Master in Mathematics, Highest Honors
* **Preparatory Classes (MPSI/MP*)**, Lycée Chaptal

Research & Experience
======
* **UCL, Gatsby Unit, London** — Research Intern, Generative Modeling for Heavy-Tailed Distributions
  *Supervisors: Arthur Gretton & Arnaud Doucet*
* **École Polytechnique (CMAP), France** — Research Intern, Learnable Destruction Process for Generative Modeling
  *Supervisors: Alain Durmus & Dario Shariatian*
* **Memorial Sloan Kettering Cancer Center, NY** — Graduate Research Assistant, Python-based compressed sensing for hyperpolarized MRI
  *Supervisors: Kayvan Keshari & Vesselin Miloushev*
* **INRIA Saclay, France** — Research Intern, EEG signal classification and cross-validation tool development for BenchOpt
  *Supervisor: Thomas Moreau*

Activities & Interests
======
* Pianist — Performed at Kremlin Theatre, Moscow & National Palace of Arts, Kiev
* Pastry Chef Assistant — La Baguette Mozart, Paris
* Piano Studies — Conservatory Rachmaninoff, Paris (Superior II level)

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>

Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Service and leadership
======
* Normalien Fonctionnaire Stagiaire, ENS Paris-Saclay — full government scholarship
