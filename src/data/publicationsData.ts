export interface PublicationCardProps {
  title: string;
  link: string;
  journal?: string;
  year?: string;
  description?: string;
}

export const publicationsData: PublicationCardProps[] = [
  {
    title: "Scaling Effects on AI Fairness: An Empirical Analysis of Stereotypical Bias in State-of-the-Art Transformer-Based Models",
    link: "https://www.ijter.org/article/212509259733/scaling-effects-on-ai-fairness-an-empirical-analysis-of-stereotypical-bias-in-state-of-the-art-transformer-based-models",
    journal: "International Journal of Technology & Emerging Research (IJTER)",
    year: "2025",
    description: "This paper presents a comparative analysis of bias in four small-scale and four large-scale LLMs, including several state-of-the-art models. The analysis reveals that large models were significantly less biased (54.6% bias rate) than smaller counterparts (67.8% bias rate), suggesting increased model scale contributes to reduced stereotypical outputs."
  },
  {
    title: "Comparative Analysis of Regression Models on Datasets with Varying Feature Complexity",
    link: "https://ieeexplore.ieee.org/document/11293872",
    journal: "IEEE Xplore",
    year: "2024",
    description: "This study compares different regression models across datasets with varying feature complexity to understand how model performance changes with increasing data dimensionality and feature interactions."
  },
  {
    title: "Performance Analysis of Deep Learning Models on Modern Hardware Accelerators: A Comparative Study of CPU, GPU, and TPU",
    link: "https://ashlanduniversity-my.sharepoint.com/:b:/g/personal/aabushgr_ashland_edu/EX_Mzg3MyL1JjsZgdG4HqA8BOy_1Ed3HrIexQmzKcqaLfg?e=v69omQ",
    journal: "Ashland University Research",
    year: "2024",
    description: "A comprehensive analysis comparing the performance of deep learning models across different hardware accelerators including CPU, GPU, and TPU, examining inference speed, memory usage, and energy efficiency."
  },
  {
    title: "Impact of Containerization and Orchestration on Deep Learning Inference Performance",
    link: "https://ashlanduniversity-my.sharepoint.com/:w:/g/personal/apatel12_ashland_edu/IQBgiZkPq8ROSJnwamjXbsuyAWPDWEq47FsXFEJWEPcdWg4?e=xB8ewg",
    journal: "Ashland University Research",
    year: "2024",
    description: "This research investigates how containerization technologies and orchestration frameworks affect the performance of deep learning inference workloads, with a focus on deployment efficiency and scalability."
  }
];
