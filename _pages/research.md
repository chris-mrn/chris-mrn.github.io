---
permalink: /research/
title: "Research"
excerpt: "Concise descriptions of my research projects in generative modeling, representation learning, medical imaging and open-source software."
---

## Contrastive latent representation learning with denoising score matching (ScoreCLR) {#scoreclr}

University of Amsterdam, 2026 · with Grigory Bartosh and Christian A. Naesseth · submitted to ICLR 2027
{: .project-meta}

We introduce ScoreCLR, a contrastive representation learning method that offers a novel way to estimate the repulsive force between views of different samples, which typically requires large batch sizes, can exhibit high variance, and is susceptible to the curse of dimensionality: ScoreCLR replaces the batch of explicit negatives of contrastive methods with a learned, amortized repulsion whose cost is linear in the batch size rather than quadratic. On CIFAR-10 and ImageNet-100, this comes with a minimal downgrade in linear-probe accuracy compared with SimCLR under a shared recipe, while producing projector outputs of higher effective rank. To do so, we consider the framework of representation learning by maximizing the mutual information between two latent views of a sample: by deriving the gradient of the Shannon entropy with respect to the encoder parameters, we obtain an equivalent objective that involves the score of the latent representation, $$\nabla_z \log p_Z(z)$$, and we use denoising score matching techniques to estimate this score with a lightweight network that is trained jointly with the encoder.

<figure>
  <a href="/images/research/scoreclr-repulsion.png"><img src="/images/research/scoreclr-repulsion.png" alt="Views of a dog and of a cat are encoded into two groups of points. The dog points are pushed away from the cat points by a repulsion force, estimated from a few circled batch samples for SimCLR and from the whole distribution for ScoreCLR." loading="lazy"></a>
  <figcaption>Separating cats and dogs in self-supervised learning: SimCLR, ScoreCLR.</figcaption>
</figure>

## FREE: Fisher–Rao Energy Equirepartition for Stochastic Interpolant Paths {#free}

Gatsby Computational Neuroscience Unit, UCL, 2025–2026 · supervised by Arthur Gretton and Arnaud Doucet
{: .project-meta}

We introduce FREE, a principled framework for time-schedule selection in stochastic interpolant models, and derive closed-form expressions for the corresponding optimal schedule. Given a fixed interpolating path between data and noise, we consider the optimal time reparametrization as the one that distributes the path's information energy uniformly over time, the constant-speed (arc-length) reparametrization: unlike the length, the energy of a path is not invariant to time reparametrization. We instantiate this framework for the infinite-dimensional Fisher–Rao metric, with speed $$v_t = \sqrt{\mathbb{E}[((\partial_t \log p_t)(X_t))^2]}$$, while also considering alternative geometric criteria, and propose a simple curriculum strategy that progressively aligns training dynamics with the optimal parametrization.

<figure>
  <a href="/images/research/free-time-samplers.png"><img src="/images/research/free-time-samplers.png" alt="Four two-dimensional datasets and, below each, the density of training times induced by three different speeds" loading="lazy"></a>
  <figcaption>Two-dimensional datasets and the time samplers induced by the arc-length reparametrization, for the Fisher–Rao metric (orange), the Fisher-score metric (green) and a speed heuristically derived from optimal transport (blue).</figcaption>
</figure>

## Data Dependent Discrete Diffusion (D4) {#d4}

CMAP, École Polytechnique, 2025 · supervised by Alain Durmus and Dario Shariatian
{: .project-meta}

We introduce D4 (Data Dependent Discrete Diffusion), a new type of generative model for discrete state space modeling that has the ability to learn how information is destroyed during training. Having more freedom in the set of exercises increases the flexibility of the sampling procedure, enabling the model to correct itself at each sampling step. The training procedure is decomposed into two parts: first, a teacher model $$F^\varphi$$ produces a learnable degradation of the data, which is then passed to a student model aiming at reconstructing the conditional rate matrix of the underlying CTMC process. We consider factorized probability paths with

<div class="equation">
\[
p^{\varphi, i}_{t \mid 1,0}(x^i \mid x_1, x_0) \;=\; \frac{1}{Z_t^{\varphi}} \Big[ \alpha_t\,\delta(x^i, x_1^i) + (1-\alpha_t)\,\delta(x^i, x_0^i) + \alpha_t(1-\alpha_t)\,F^{\varphi}_t(x_1)_i \Big].
\]
</div>

Contrary to masked diffusion models, the conditional probability of the $$i$$-th token depends on the entire sequence, not only on the $$i$$-th token of the end points.

## Construction and Reconstruction of Under-sampled k-space for Five-dimensional Hyperpolarized MRI {#hp-mri}

Memorial Sloan Kettering Cancer Center, 2024 · supervised by Kayvan R. Keshari and Vesselin Miloushev · [notebook](https://github.com/chris-mrn/5D_CS_Reconstruction_HP_MRI) · [benchmark](https://github.com/chris-mrn/Benchmark_HP_MRI)
{: .project-meta}

We implemented a framework for the construction and reconstruction of undersampled k-space for five-dimensional hyperpolarized <sup>13</sup>C-pyruvate MRI, a technique that plays a crucial role in detecting and monitoring tumors by tracking the conversion of <sup>13</sup>C-pyruvate into its metabolic products, such as lactate, bicarbonate and alanine. The first three dimensions of the image represent the spatial coordinates, the fourth the spectrum, and the fifth the time evolution of metabolism; due to the rapid depolarization of the hyperpolarized signal, the acquisition time is limited to about two minutes, leading to undersampling of k-space. Our approach samples k-space with random sinc gradient waveforms that the 3T scanner can reliably generate, and reconstructs the image with our own Python framework, built on PyLops and PyProximal. As hyperpolarized MRI lacks access to ground-truth data, we also developed the first simulated 5D HP-MRI dataset and an open-source Benchopt benchmark, to the best of our knowledge the first for HP-MRI in Python. By leveraging the sparsity prior, we achieve the same precision with 10 times fewer acquisition points.

<figure>
  <a href="/images/research/hpmri-kspace-sampling.png"><img src="/images/research/hpmri-kspace-sampling.png" alt="Eight binary masks showing which points of k-space are sampled" loading="lazy"></a>
  <figcaption>K-space sampling: coefficients reached by the encoding gradients (in white), for the first eight spectral indices.</figcaption>
</figure>

<figure>
  <a href="/images/research/hpmri-reconstruction-full.png" style="max-width: 660px; margin: 0 auto;"><img src="/images/research/hpmri-reconstruction.png" alt="Brain slices of the phantom, of the zero-filled reconstruction and of the compressed-sensing reconstruction, for pyruvate and bicarbonate" loading="lazy"></a>
  <figcaption>5D reconstruction with ℓ<sub>1</sub> sparsity on the simulated phantom, first time point, for pyruvate (top) and bicarbonate (bottom). Left: phantom. Center: zero-filled image (ZF), given by only taking the inverse Fourier transform of the sampled k-space. Right: compressed sensing reconstruction (CS), with the mean squared errors. <a href="/images/research/hpmri-reconstruction-full.png">Full figure with the five time points</a>.</figcaption>
</figure>

## Benchopt and the Brain Computer Interface (BCI) Benchmark {#benchopt}

INRIA Saclay, MIND team, 2023 · supervised by Thomas Moreau
{: .project-meta}

I developed a cross-validation tool for [Benchopt](https://benchopt.github.io), an open-source benchmarking software: it was merged into the library ([pull request #623](https://github.com/benchopt/benchopt/pull/623)) and released in version 1.6. I also benchmarked EEG signal classification methods for Brain-Computer Interfaces in the [BCI benchmark](https://github.com/benchopt/benchmark_bci), which evaluates BCI methods on various tasks, datasets and paradigms, with the balanced accuracy as its core metric. BCI problems aim to discriminate between various active conditions of subjects that are recorded using a neuroimaging device such as an EEG headband, for instance imagining the moving of the left or right hand; the choice of evaluation process defines which subjects and sessions are the training data and which are the test data (intra-session, inter-session or inter-subject).

## Comment bien mélanger un jeu de cartes ? {#card-shuffling}

Pedagogical research project with Néo Tardy, ENS Paris-Saclay · [Quadrature n° 140](https://www.quadrature-mag.fr/catalogue/ouvrage/quadrature-n-140-qua140), 2026 (in French)
{: .project-meta}

It is often said that to shuffle a deck of cards, it suffices to repeat the riffle shuffle seven times. The aim of this article is to understand how mathematics justifies this assertion and to introduce the probabilistic methods used to study card shuffles, in particular the total variation distance and strong uniform stopping times, which we apply to the top-in-at-random and the riffle shuffle.
