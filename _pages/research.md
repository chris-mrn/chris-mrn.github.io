---
permalink: /research/
title: "Research"
excerpt: "Concise descriptions of my research projects in generative modeling, representation learning, medical imaging and open-source software."
author_profile: true
---

I work on generative modeling (diffusion models, flow matching) and on what its tools bring to representation learning. Earlier projects dealt with inverse problems in medical imaging and with open-source benchmarking software.

[ScoreCLR](#scoreclr) · [FREE](#free) · [D4](#d4) · [Hyperpolarized MRI](#hp-mri) · [Benchopt](#benchopt) · [Card shuffling](#card-shuffling)

## ScoreCLR: contrastive learning with a learned score {#scoreclr}

*Amsterdam Machine Learning Lab, University of Amsterdam · June – September 2026*<br>
*With Grigory Bartosh and Christian A. Naesseth · submitted to ICLR 2027*

Contrastive methods pull two views of an image together and push different images apart. The repulsion is usually estimated against the rest of the batch, which requires large batches and costs quadratically in the batch size. We show that, when the mutual information between two views is maximized, the gradient of the repulsion term only involves the score $$\nabla_z \log p_Z$$ of the latent distribution. ScoreCLR learns this score by denoising score matching, with a small network trained jointly with the encoder, at a cost linear in the batch size. On CIFAR-10 and ImageNet-100, it comes within 2–4 points of SimCLR in linear-probe accuracy under a shared recipe, with projector outputs of much higher effective rank (220 of 256 dimensions on CIFAR-10, against 96 for SimCLR).

## FREE: a time schedule from information geometry {#free}

*Gatsby Computational Neuroscience Unit, UCL · October 2025 – March 2026*<br>
*Internship supervised by Arthur Gretton and Arnaud Doucet*

Flow matching and diffusion models transport noise to data along a path of distributions $$(p_t)_{t \in [0,1]}$$, and the time schedule along this path is usually set by heuristics. FREE (Fisher–Rao Energy Equirepartition) derives it from a principle: the length of a path in the space of probability measures does not depend on how it is parametrized, but its energy does, and the energy is minimal at constant speed. For the Fisher–Rao metric, which all f-divergences induce, the speed is $$v_t = \sqrt{\mathbb{E}[(\partial_t \log p_t(X_t))^2]}$$ and can be estimated from the model being trained. A curriculum then moves the training times from the uniform distribution to a density proportional to $$v_t$$, so that information changes at a constant rate. On CIFAR-10 with self-interpolants (paths between two data samples), this lowers the FID (on 10k samples) from 6.82 to 3.26 at 200 function evaluations, and from 61.8 to 14.4 at 50, compared with uniform time sampling at the same training budget.

<figure>
  <a href="/images/research/free-time-samplers.png"><img src="/images/research/free-time-samplers.png" alt="Four two-dimensional datasets and, below each, the density of training times induced by three different speeds" loading="lazy"></a>
  <figcaption>Top: two-dimensional datasets. Bottom: density of training times \(q(t)\) induced by the constant-speed parametrization, on a log scale, for the Fisher–Rao metric (orange), the Fisher-score metric (green) and a speed inspired by optimal transport (blue). The optimal schedule changes with the data and with the metric.</figcaption>
</figure>

## D4: discrete diffusion with a learnable forward process {#d4}

*CMAP, École Polytechnique · April – August 2025*<br>
*Supervised by Alain Durmus and Dario Shariatian*

Masked discrete diffusion corrupts a sequence by masking its tokens independently, at a fixed rate. D4 (Data-Dependent Discrete Diffusion) learns how the data is destroyed instead. A teacher network $$F^\varphi$$ perturbs the bridge between noise $$x_0$$ and data $$x_1$$ in a state-dependent way,

<div style="overflow-x: auto;">
\[
p^{\varphi, i}_{t \mid 1,0}(x^i \mid x_1, x_0) \;\propto\; \alpha_t\,\delta(x^i, x_1^i) + (1-\alpha_t)\,\delta(x^i, x_0^i) + \alpha_t(1-\alpha_t)\,F^{\varphi}_t(x_1)_i ,
\]
</div>

so that the corruption of each token depends on the whole sequence, through a term that vanishes at both ends of the path. A student network learns the rate matrix of the resulting continuous-time Markov chain, and the two are trained jointly: this is the discrete counterpart of learnable forward processes such as Neural Flow Diffusion Models. Implemented in PyTorch Lightning, with multi-GPU and mixed-precision training.

## Compressed sensing for 5D hyperpolarized MRI {#hp-mri}

*Memorial Sloan Kettering Cancer Center, New York · April – August 2024*<br>
*Supervised by Kayvan R. Keshari and Vesselin Miloushev · [notebook](https://github.com/chris-mrn/5D_CS_Reconstruction_HP_MRI) · [benchmark](https://github.com/chris-mrn/Benchmark_HP_MRI)*

Hyperpolarized <sup>13</sup>C-pyruvate MRI images tumor metabolism, the conversion of pyruvate into lactate, bicarbonate and alanine. The signal is lost within a couple of minutes, so the five-dimensional k-space (three spatial dimensions, spectrum and time) can only be sampled very sparsely. I designed random sinc gradient waveforms that respect the hardware limits of the scanner, and a Python compressed-sensing framework, built on PyLops and PyProximal, that reconstructs the 5D image with ℓ<sub>1</sub> or total-variation priors. As ground-truth data are not available for this modality, I built a simulated 5D brain phantom from BrainWeb with a kinetic model of pyruvate conversion: on it, compressed sensing divides the mean squared error by 3 to 5 compared with the zero-filled baseline. The code is open source, together with a Benchopt benchmark of reconstruction methods.

<figure>
  <a href="/images/research/hpmri-kspace-sampling.png"><img src="/images/research/hpmri-kspace-sampling.png" alt="Eight binary masks showing which points of k-space are sampled" loading="lazy"></a>
  <figcaption>Points of k-space reached by the random sinc waveforms (in white), for the first eight spectral indices: the center is sampled densely, the periphery sparsely.</figcaption>
</figure>

<figure>
  <a href="/images/research/hpmri-reconstruction-full.png" style="max-width: 660px; margin: 0 auto;"><img src="/images/research/hpmri-reconstruction.png" alt="Brain slices of the phantom, of the zero-filled reconstruction and of the compressed-sensing reconstruction, for pyruvate and bicarbonate" loading="lazy"></a>
  <figcaption>Simulated phantom, first time point, for pyruvate (top) and bicarbonate (bottom). Left: ground truth. Center: zero-filled reconstruction (ZF). Right: compressed-sensing reconstruction with an ℓ<sub>1</sub> prior (CS). The mean squared errors are given above the reconstructions. <a href="/images/research/hpmri-reconstruction-full.png">Full figure with the five time points</a>.</figcaption>
</figure>

## Benchopt: cross-validation and a BCI benchmark {#benchopt}

*INRIA Saclay, MIND team (ex-Parietal) · May – July 2023*<br>
*Supervised by Thomas Moreau*

[Benchopt](https://benchopt.github.io) is an open-source framework for reproducible benchmarks of optimization and machine-learning methods. I added native cross-validation to the library ([pull request #623](https://github.com/benchopt/benchopt/pull/623), released in version 1.6): the objective of a benchmark declares a scikit-learn splitter, and each repetition of a solver then runs on a new fold.

```python
class Objective(BaseObjective):
    def set_data(self, X, y):
        self.X, self.y = X, y
        self.cv = KFold(n_splits=5)  # any scikit-learn splitter

    def get_objective(self):
        self.X_train, self.X_test, self.y_train, self.y_test = \
            self.get_split(self.X, self.y)
        return dict(X=self.X_train, y=self.y_train)
```

During the same internship, I built the first version of the [BCI benchmark](https://github.com/benchopt/benchmark_bci), which compares methods that decode motor imagery from EEG signals: CSP with LDA, Riemannian classifiers (MDM, tangent-space SVM) and a deep network (ShallowFBCSPNet) with data augmentation, on datasets from MOABB, within and across subjects and sessions.

## How to shuffle a deck of cards well? {#card-shuffling}

*"Comment bien mélanger un jeu de cartes ?", written with Néo Tardy at ENS Paris-Saclay*<br>
*Published in [Quadrature n° 140](https://www.quadrature-mag.fr/catalogue/ouvrage/quadrature-n-140-qua140) (April – June 2026), in French*

How many shuffles does it take to mix a deck of cards? This expository article models a shuffle as a probability distribution on permutations and measures its quality by the total variation distance to the uniform distribution. With elementary tools only (the strong uniform stopping times of Aldous and Diaconis, the coupon collector and the birthday paradox), we bound the number of shuffles needed for 52 cards: about 300 for the top-in-at-random shuffle, against a dozen for the riffle shuffle. The well-known answer of seven riffle shuffles requires finer tools.
