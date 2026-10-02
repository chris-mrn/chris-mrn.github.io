---
permalink: /research/
title: "Research"
excerpt: "Concise descriptions of my research projects in generative modeling, representation learning, medical imaging and open-source software."
---

I work on generative modeling (diffusion models, flow matching) and on what its tools bring to representation learning. Earlier projects dealt with inverse problems in medical imaging and with open-source benchmarking software.

## Contrastive latent representation learning with denoising score matching (ScoreCLR) {#scoreclr}

University of Amsterdam, 2026 · with Grigory Bartosh and Christian A. Naesseth · submitted to ICLR 2027
{: .project-meta}

Contrastive representation learning methods operate by pulling different views of the same sample together while pushing them away from views of different samples. A fundamental challenge is the estimation of the repulsive force, which typically requires large batch sizes, can exhibit high variance, and is susceptible to the curse of dimensionality. We introduce ScoreCLR, a contrastive representation learning method that offers a novel way to estimate this repulsion term. We consider the framework of representation learning by maximizing the mutual information between two latent views of a sample. By deriving the gradient of the Shannon entropy with respect to the encoder parameters, we obtain an equivalent objective that involves the score of the latent representation, $$\nabla_z \log p_Z(z)$$. We then use denoising score matching techniques to estimate this score with a lightweight network that is trained jointly with the encoder. We further propose regularization techniques using different noise levels and a Gaussian prior on the latent representation. ScoreCLR replaces the batch of explicit negatives of contrastive methods with a learned, amortized repulsion whose cost is linear in the batch size rather than quadratic. On CIFAR-10 and ImageNet-100 it reaches linear-probe accuracy within 2–4 points of SimCLR under a shared recipe, while producing projector outputs of higher effective rank.

<figure>
  <a href="/images/research/scoreclr-repulsion.png"><img src="/images/research/scoreclr-repulsion.png" alt="Views of a dog and of a cat are encoded into two groups of points. The dog points are pushed away from the cat points by a repulsion force, estimated from a few circled batch samples for SimCLR and from the whole distribution for ScoreCLR." loading="lazy"></a>
  <figcaption>Separating cats and dogs in self-supervised learning: SimCLR, ScoreCLR.</figcaption>
</figure>

## FREE: Fisher–Rao Energy Equirepartition for Stochastic Interpolant Paths {#free}

Gatsby Computational Neuroscience Unit, UCL, 2025–2026 · supervised by Arthur Gretton and Arnaud Doucet
{: .project-meta}

We introduce a principled framework for time-schedule selection in stochastic interpolant models. Given a fixed interpolating path between data and noise, we consider the optimal time reparametrization as the one that distributes the path's information energy uniformly over time: the constant-speed (arc-length) reparametrization. The key observation is that, unlike the length, the energy of a path is not invariant to time reparametrization. We instantiate this framework for the infinite-dimensional Fisher–Rao metric, with speed $$v_t = \sqrt{\mathbb{E}[((\partial_t \log p_t)(X_t))^2]}$$, while also considering alternative geometric criteria. We derive closed-form expressions for the corresponding optimal schedule and propose a simple curriculum strategy that progressively aligns training dynamics with the optimal parametrization.

<figure>
  <a href="/images/research/free-time-samplers.png"><img src="/images/research/free-time-samplers.png" alt="Four two-dimensional datasets and, below each, the density of training times induced by three different speeds" loading="lazy"></a>
  <figcaption>Two-dimensional datasets and the time samplers induced by the arc-length reparametrization, for the Fisher–Rao metric (orange), the Fisher-score metric (green) and a speed heuristically derived from optimal transport (blue).</figcaption>
</figure>

## Data Dependent Discrete Diffusion (D4) {#d4}

CMAP, École Polytechnique, 2025 · supervised by Alain Durmus and Dario Shariatian
{: .project-meta}

We introduce D4 (Data Dependent Discrete Diffusion), a new type of generative model for discrete state space modeling that has the ability to learn how information is destroyed during training. The training procedure can be decomposed into two parts: first, a teacher model $$F^\varphi$$ produces a learnable degradation of the data, which is then passed to a student model aiming at reconstructing the conditional rate matrix of the underlying CTMC process. We consider factorized probability paths with

<div class="equation">
\[
p^{\varphi, i}_{t \mid 1,0}(x^i \mid x_1, x_0) \;=\; \frac{1}{Z_t^{\varphi}} \Big[ \alpha_t\,\delta(x^i, x_1^i) + (1-\alpha_t)\,\delta(x^i, x_0^i) + \alpha_t(1-\alpha_t)\,F^{\varphi}_t(x_1)_i \Big].
\]
</div>

Contrary to masked diffusion models, the conditional probability of the $$i$$-th token depends on the entire sequence, not only on the $$i$$-th token of the end points. Having more freedom in the set of exercises increases the flexibility of the sampling procedure, enabling the model to correct itself at each sampling step. Implemented in PyTorch Lightning with multi-GPU parallelization and mixed-precision training.

## Construction and Reconstruction of Under-sampled k-space for Five-dimensional Hyperpolarized MRI {#hp-mri}

Memorial Sloan Kettering Cancer Center, 2024 · supervised by Kayvan R. Keshari and Vesselin Miloushev · [notebook](https://github.com/chris-mrn/5D_CS_Reconstruction_HP_MRI) · [benchmark](https://github.com/chris-mrn/Benchmark_HP_MRI)
{: .project-meta}

Hyperpolarized <sup>13</sup>C-pyruvate MRI plays a crucial role in detecting and monitoring tumors: it enables tracking the conversion of <sup>13</sup>C-pyruvate into its metabolic products, such as lactate, bicarbonate and alanine. The purpose of the method is to construct a 5D image of the brain, where the first three dimensions represent the spatial coordinates, the fourth the spectrum, and the fifth the time evolution of metabolism. Due to the rapid depolarization of the hyperpolarized signal, the acquisition time is limited, leading to undersampling of k-space; the lost information must be recovered through compressed sensing techniques, taking into account the prior structure of the signal. The aim of the internship was to implement a framework for the construction and reconstruction of this undersampled k-space. Our approach, inspired by the principles of compressed sensing, uses random gradient waveforms to sample k-space: random sincs that the 3T scanner can reliably generate, tuned to achieve a sampling density that decreases with the radius. For the reconstruction we developed our own Python framework, using the open-source packages PyLops and PyProximal, in which the user can choose the dimension of the MRI array, the prior domain to sparsify and the prior coefficient. As hyperpolarized MRI lacks access to ground-truth data, we developed the first simulated 5D HP-MRI dataset, created from the BrainWeb dataset with a kinetic model of the conversion of pyruvate. We also conducted an open-source benchmark with Benchopt, to the best of our knowledge the first accessible benchmark for HP-MRI in Python, enabling comparisons between k-space trajectories, sparsity domains and NUFFT backends.

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

I benchmarked EEG signal classification methods for Brain-Computer Interfaces and developed a cross-validation tool for [Benchopt](https://benchopt.github.io), an open-source benchmarking software ([pull request #623](https://github.com/benchopt/benchopt/pull/623)).

The [BCI benchmark](https://github.com/benchopt/benchmark_bci) evaluates BCI methods on various tasks, datasets and paradigms. BCI problems aim to discriminate between various active conditions of subjects that are recorded using a neuroimaging device such as an EEG headband; the paradigm defines the conditions to recognize, for instance imagining the moving of the left or right hand. The choice of evaluation process defines which subjects and sessions are the training data and which are the test data (intra-session, inter-session or inter-subject), and the core metric of the benchmark is the balanced accuracy.

## Comment bien mélanger un jeu de cartes ? {#card-shuffling}

Pedagogical research project with Néo Tardy, ENS Paris-Saclay · [Quadrature n° 140](https://www.quadrature-mag.fr/catalogue/ouvrage/quadrature-n-140-qua140), 2026 (in French)
{: .project-meta}

It is often said that to shuffle a deck of cards, it suffices to repeat the riffle shuffle seven times. The aim of this article is to understand how mathematics justifies this assertion and to introduce the probabilistic methods used to study card shuffles. We first set up the mathematical framework and introduce a few central notions, in particular the total variation distance and strong uniform stopping times. The last part applies these concepts to two shuffles, the top-in-at-random and the riffle shuffle. The top-in-at-random shuffle is not very efficient: it would have to be iterated nearly 300 times for the distribution of the cards to be considered quasi-uniform. For the riffle shuffle our method sets the number of shuffles needed around 12; it does not justify the well-known fact that 7 riffle shuffles suffice.
