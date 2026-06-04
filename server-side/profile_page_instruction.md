# Profile Page Revamp — instruction.md

## Overview

Revamp https://people.csail.mit.edu/yichenl/ to serve two hiring audiences while maintaining one clean page. The current page is a standard academic profile (Jon Barron template). The new version should read like a systems builder's portfolio, not a paper list.

## Two Audiences

**Audience A: GenAI + Multimodal (Video Generation, World Models, Controllable Generation)**
- Hiring managers at: xAI/Grok Imagine, Google DeepMind (Veo), ByteDance (Seedance), Runway, Pika, Physical Intelligence
- They care about: video generation systems, multimodal conditioning, controllable generation, world models, physics grounding
- Signal they want: "this person has built end-to-end video generation systems and understands the product"

**Audience B: Architecture + RL (Post-Training, Reinforcement Learning, Efficient Training)**
- Hiring managers at: Anthropic, OpenAI, xAI (post-training team), Google DeepMind (alignment/RL)
- They care about: RL post-training for generative models, reward design, training efficiency, scaling, alignment
- Signal they want: "this person understands RL post-training deeply and can make it work for new modalities"

## Design Approach

### Toggle Mechanism

Add a minimal, elegant toggle at the top of the page (below the name/photo header) with two lens options:

```
[ Video Generation & World Models ]  [ RL Post-Training & Architecture ]
```

- Default: Video Generation & World Models (Audience A)
- Toggle switches: bio text, featured work order, and highlighted tags
- Publications section stays the same for both — don't duplicate
- Toggle state should persist via URL hash (e.g., #genai, #rl) so links can be shared to the right view
- Transition should be smooth (fade or slide), not jarring
- Mobile-friendly: tabs should stack or scroll horizontally on small screens

### Design Constraints

- Keep the existing Jon Barron-inspired minimal aesthetic — white background, clean typography
- No frameworks required — vanilla HTML/CSS/JS is fine
- Toggle should look native to the page, not like a UI component bolted on
- Use subtle visual cues (e.g., a thin accent color underline on active tab)
- Page should look complete and polished with either tab selected — not like half the content is hidden

---

## Content Rewrites

### Bio — Audience A (Video Generation & World Models)

```
I build video generation systems, world models, and physics simulation frameworks.

My recent work: a multimodal action-conditioned video generation system achieving 40% improvement 
over baselines (ICCV 2025, sole author), a unified physics dynamics framework across soft, 
articulated, and rigid bodies with 51% error reduction (NVIDIA Research), and RL post-training 
systems for video diffusion achieving 3× speedup over standard methods.

I'm a final-year PhD at MIT CSAIL working with Antonio Torralba. Previously: three research 
internships at NVIDIA, two at Adobe, MS at Stanford with Leonidas Guibas.
```

### Bio — Audience B (RL Post-Training & Architecture)

```
I build reinforcement learning post-training systems for generative models and scalable 
training architectures.

My recent work: VARL, a block-wise dense reward RL system for autoregressive video diffusion 
achieving 3× wall-clock speedup over GRPO; ESES, an evolutionary RL framework using low-rank 
perturbations and quantization for memory-efficient population-based training; and foundational 
work on the mathematical connections between diffusion pretraining and RL objectives (AWM, ICML 2026).

I'm a final-year PhD at MIT CSAIL working with Antonio Torralba. Previously: three research 
internships at NVIDIA, two at Adobe, MS at Stanford with Leonidas Guibas.
```

### Featured Work Section

Replace the current "Blog" section with a "Featured Systems" section that reorders based on toggle.

**Audience A order:**
1. Multimodal Action Conditioned Video Generation (ICCV 2025)
2. Generalized Dynamics Generation / Physical World Model
3. VARL
4. ESES

**Audience B order:**
1. VARL
2. ESES
3. AWM: Advantage Weighted Matching (ICML 2026)
4. Multimodal Action Conditioned Video Generation (ICCV 2025)

### Featured Work Descriptions (rewrite from academic to builder voice)

**Multimodal Action Conditioned Video Generation**
```
Built end-to-end: a video generation system that jointly conditions on natural language, 
bounding box trajectories, and reference frames for controllable embodied video generation. 
Sole-authored the full pipeline — architecture, data, training on 8×H100 GPUs, evaluation. 
Outperformed best text-conditioned baselines by 40% on Fréchet Video Distance and 16% on 
mean squared error.
ICCV 2025 | paper | project page | code
```

**Generalized Dynamics Generation**
```
Built at NVIDIA Research: a unified physics simulation framework that learns anisotropic 
Young's modulus to handle soft-body, articulated-body, and rigid-body dynamics in a single 
representation. Reduced error by 51% over the team's baseline method. Being evaluated for 
integration into NVIDIA's robotics simulation pipeline.
Preprint 2025 | paper | project page
```

**VARL: Reinforcing Video Autoregressive Generation**
```
Built: a reinforcement learning post-training system for autoregressive video diffusion 
models. Introduces block-wise dense per-frame reward optimization that densifies reward 
signals across shorter block sequences, then randomly extends subsets for reward 
recomputation. Achieves 3× wall-clock training speedup over standard policy gradient 
methods on 8×H100 GPUs.
Blog 2025 | writeup
```

**ESES: Efficient and Stable Evolutionary RL**
```
Built: a zeroth-order evolutionary RL post-training system using low-rank (LoRA) parameter 
perturbations with quantized base weights. Enables population-based RL training at a 
fraction of standard memory cost. Designed for both language model and diffusion model 
post-training.
Blog 2025 | writeup
```

**AWM: Advantage Weighted Matching (show for Audience B only)**
```
Co-authored: established the mathematical equivalence between DDPO and DSM objectives for 
RL post-training of diffusion models. Introduces advantage-weighted matching that aligns 
RL fine-tuning with diffusion pretraining objectives.
ICML 2026 | paper
```

---

## Professional Experience Section — Expand

Replace the current minimal listing with substantive descriptions:

```
Professional Experience

NVIDIA Research — Summer 2024
Built a unified physics simulation framework for soft, articulated, and rigid body dynamics. 
Designed anisotropic Young's modulus learning across physics regimes. 
51% error reduction over team baseline.

Adobe Research — 2024
Built RL post-training systems for video diffusion models including zeroth-order evolutionary 
optimization and dense per-frame reward methods.

NVIDIA Research — Summer 2023  
Built a Gaussian kernel-based architecture for fast point cloud processing as a PointNet replacement.

Adobe Research — Summer 2021
Built a video layer decomposition system using source separation methods.

NVIDIA Research — Summer 2020
Built a point cloud completion system utilizing raycasting-based data generation. 
US Patent filed.
```

---

## Publications Section

Keep the existing publication list as-is (same format, same order). But add small colored tags next to each paper indicating relevance:

- Tag: `video` (blue) — for video generation related papers
- Tag: `rl` (green) — for RL/post-training related papers  
- Tag: `physics` (orange) — for physics/simulation related papers
- Tag: `3D` (purple) — for 3D vision papers
- Tag: `multimodal` (teal) — for multimodal/cross-modal papers

Tags should be small, pill-shaped, and subtle. Each paper can have multiple tags.

Tag assignments:
- Multimodal Action Conditioned Video Generation → video, multimodal
- Generalized Dynamics Generation → physics, video
- AWM → rl
- ESES → rl
- VARL → rl, video
- Learning Visual and Tactile → multimodal
- Multi-Part Multi-Joint Assembly → 3D
- Learning Preconditioners → physics
- ASAP → physics, 3D
- Assemble Them All → physics, 3D
- 3D Part Assembly → 3D
- Domain2Vec → multimodal
- Revisiting Image-Language → multimodal

---

## Other Changes

### Fix Typos
- "multimdoal" → "multimodal"
- "currently focus on" → "currently focused on" (though this will be replaced by new bio)

### News Section
Update with current items:
- [June 2026] CVPR 2026 workshop organizer (×2)
- [May 2026] AWM accepted to ICML 2026
- [May 2026] Projective Attention blog series published
- [June 2025] RSS 2025 Multimodal MultiSensory Robotics workshop
- [May 2025] Multimodal Action Conditioned Video Generation accepted to ICCV 2025

### Remove
- "This guy makes a nice webpage" footer credit (unprofessional for industry audience)

### Add
- One line at bottom of bio or in a subtle banner: "I'm on the job market for video generation and RL post-training roles at frontier AI labs." Only show this if she wants to — make it a commented-out section that can be toggled on.

### Workshop Organizing (add section, shows leadership)
```
Workshop Organizing
- CVPR 2026: [Workshop Name] (×2)
- RSS 2025: Multimodal & MultiSensory Robotics
- ECCV 2024: Geometry in the Large Model Era
```

---

## File Structure

```
index.html          — main page with toggle logic
style.css           — styles (keep minimal aesthetic)
toggle.js           — toggle logic + URL hash persistence
images/             — existing images (no changes needed)
```

Or if preferred, keep it as a single HTML file with inline CSS/JS to match the existing structure.

---

## Quality Checks

Before deploying, verify:
1. Both toggle states show a complete, polished page
2. Bio swaps smoothly without layout shift
3. Featured work reorders without flicker
4. Tags render correctly on all publications
5. Mobile layout works (toggle tabs don't overflow)
6. URL hash works (#genai and #rl load correct state)
7. All links (paper, project page, code) still work
8. No typos remain
9. Professional experience section has all 5 internships listed
